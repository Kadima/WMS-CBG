var appControllers = angular.module( 'WMSAPP.controllers', [
    'ionic',
    'ngCordova.plugins.dialogs',
    'ngCordova.plugins.toast',
    'ngCordova.plugins.appVersion',
    'ngCordova.plugins.file',
    'ngCordova.plugins.fileTransfer',
    'ngCordova.plugins.fileOpener2',
    'ngCordova.plugins.datePicker',
    'ngCordova.plugins.barcodeScanner',
    'ui.select',
    'WMSAPP.config',
    'WMSAPP.services'
] );

appControllers.controller( 'IndexCtrl', [ 'ENV', '$rootScope', '$scope', '$state',
    '$ionicPopup', '$ionicSideMenuDelegate',
    function( ENV, $rootScope, $scope, $state, $ionicPopup, $ionicSideMenuDelegate ) {
        var alertPopup = null;
        var alertPopupTitle = '';
        $scope.Status = {
            Login: false
        };
        $scope.logout = function() {
            $rootScope.$broadcast( 'logout' );
            $state.go( 'index.login', {}, {} );
        };
        $scope.gotoSetting = function() {
            $state.go( 'index.setting', {}, {
                reload: true
            } );
        };
        $scope.gotoUpdate = function() {
            if ( !ENV.fromWeb ) {
                var url = ENV.website + '/update.json';
                $http.get( url )
                    .success( function( res ) {
                        var serverAppVersion = res.version;
                        $cordovaAppVersion.getVersionNumber().then( function( version ) {
                            if ( version != serverAppVersion ) {
                                $ionicSideMenuDelegate.toggleLeft();
                                $state.go( 'index.update', {
                                    'Version': serverAppVersion
                                } );
                            } else {
                                alertPopupTitle = 'Already the Latest Version!';
                                alertPopup = $ionicPopup.alert( {
                                    title: alertPopupTitle,
                                    okType: 'button-assertive'
                                } );
                            }
                        } );
                    } )
                    .error( function( res ) {
                        alertPopupTitle = 'Connect Update Server Error!';
                        alertPopup = $ionicPopup.alert( {
                            title: alertPopupTitle,
                            okType: 'button-assertive'
                        } );
                    } );
            } else {
                alertPopupTitle = 'Web Platform Not Supported!';
                alertPopup = $ionicPopup.alert( {
                    title: alertPopupTitle,
                    okType: 'button-assertive'
                } );
            }
        }
        $rootScope.$on( 'logout', function() {
            $scope.Status.Login = false;
            $ionicSideMenuDelegate.toggleLeft();
        } );
        $rootScope.$on( 'login', function() {
            $scope.Status.Login = true;
        } );
    }
] );

appControllers.controller( 'SplashCtrl', [ '$state', '$timeout',
    function( $state, $timeout ) {
        $timeout( function() {
            $state.go( 'index.login', {}, {
                reload: true
            } );
        }, 2500 );
    } ] );

appControllers.controller( 'LoginCtrl', [ '$rootScope', '$scope', '$state', '$stateParams', '$ionicPopup', '$timeout', 'ApiService',
    function( $rootScope, $scope, $state, $stateParams, $ionicPopup, $timeout, ApiService ) {
        $scope.logininfo = {};
        if ( undefined == $scope.logininfo.strUserName ) {
            $scope.logininfo.strUserName = '';
        }
        if ( undefined == $scope.logininfo.strPassword ) {
            $scope.logininfo.strPassword = '';
        }
        $( '#iUserName' ).on( 'keydown', function( e ) {
            if ( e.which === 9 || e.which === 13 ) {
                $( '#iPassword' ).focus();
            }
        } );
        $( '#iPassword' ).on( 'keydown', function( e ) {
            if ( e.which === 9 || e.which === 13 ) {
                $scope.login();
            }
        } );
        $scope.login = function() {
            if ( window.cordova && window.cordova.plugins.Keyboard ) {
                cordova.plugins.Keyboard.close();
            }
            if ( $scope.logininfo.strUserName == '' ) {
                var alertPopup = $ionicPopup.alert( {
                    title: 'Please Enter User Name.',
                    okType: 'button-assertive'
                } );
                $timeout( function() {
                    alertPopup.close();
                }, 2500 );
                return;
            }
            /*
            if ($scope.logininfo.strPassword == '') {
                var alertPopup = $ionicPopup.alert({
                    title: 'Please Enter Password.',
                    okType: 'button-assertive'
                });
                $timeout(function () {
                    alertPopup.close();
                }, 2500);
                return;
            }
            */
            var strUri = '/api/wms/login/check?UserId=' + $scope.logininfo.strUserName + '&Password=' + hex_md5( $scope.logininfo.strPassword );
            ApiService.GetParam( strUri, true ).then( function success( result ) {
                $rootScope.$broadcast( 'login' );
                sessionStorage.clear();
                sessionStorage.setItem( 'UserId', $scope.logininfo.strUserName );
                $state.go( 'index.main', {}, {
                    reload: true
                } );
            } );
        };
    } ] );

appControllers.controller( 'SettingCtrl', [ 'ENV', '$scope', '$state', '$ionicHistory', '$ionicPopup', '$cordovaToast', '$cordovaFile',
    function( ENV, $scope, $state, $ionicHistory, $ionicPopup, $cordovaToast, $cordovaFile ) {
        $scope.Setting = {
            Version: ENV.version,
            WebApiURL: ENV.api.replace( 'http://', '' ),
            WebSiteUrl: ENV.website.replace( 'http://', '' )
        };
        $scope.return = function() {
            if ( $ionicHistory.backView() ) {
                $ionicHistory.goBack();
            } else {
                $state.go( 'index.login', {}, {
                    reload: true
                } );
            }
        };
        $scope.save = function() {
            if ( is.not.empty( $scope.Setting.WebApiURL ) ) {
                ENV.api = onStrToURL( $scope.Setting.WebApiURL );
            } else {
                $scope.Setting.WebApiURL = ENV.website.replace( 'http://', '' );
            }
            if ( is.not.empty( $scope.Setting.WebSiteUrl ) ) {
                ENV.website = onStrToURL( $scope.Setting.WebSiteUrl );
            } else {
                $scope.Setting.WebSiteUrl = ENV.api.replace( 'http://', '' );
            }
            if ( !ENV.fromWeb ) {
                var data = 'website=' + ENV.website + '##api=' + ENV.api;
                var path = cordova.file.externalRootDirectory;
                var file = ENV.rootPath + '/' + ENV.configFile;
                $cordovaFile.writeFile( path, file, data, true )
                    .then( function( success ) {
                        $state.go( 'index.login', {}, {
                            reload: true
                        } );
                    }, function( error ) {
                        $cordovaToast.showShortBottom( error );
                    } );
            } else {
                $state.go( 'index.login', {}, {
                    reload: true
                } );
            }
        };
        $scope.reset = function() {
            $scope.Setting.WebApiURL = 'www.sysfreight.net:8081/WebApi';
            $scope.Setting.WebSiteUrl = 'www.sysfreight.net:8081/mobileapp-wh';
            if ( !ENV.fromWeb ) {
                var path = cordova.file.externalRootDirectory;
                var file = ENV.rootPath + '/' + ENV.configFile;
                $cordovaFile.removeFile( path, file )
                    .then( function( success ) {

                    }, function( error ) {
                        $cordovaToast.showShortBottom( error );
                    } );
            }
        };
    } ] );

appControllers.controller( 'UpdateCtrl', [ 'ENV', '$scope', '$state', '$stateParams', 'DownloadFileService',
    function( ENV, $scope, $state, $stateParams, DownloadFileService ) {
        $scope.strVersion = $stateParams.Version;
        $scope.return = function() {
            onError();
        };
        var onError = function() {
            $state.go( 'index.login', {}, {
                reload: true
            } );
        };
        $scope.upgrade = function() {
            DownloadFileService.Download( ENV.website + '/WMS.apk', 'application/vnd.android.package-archive', null, onError, onError );
        };
    } ] );

appControllers.controller( 'MainCtrl', [ '$scope', '$state',
    function( $scope, $state ) {
        $scope.func_GR = function() {
            $state.go( 'grList', {}, {
                reload: true
            } );
        };
        $scope.func_Putaway = function() {
            $state.go( 'grList', {}, {
                reload: true
            } );
        };
        $scope.func_GT = function() {
            $state.go( 'grList', {}, {
                reload: true
            } );
        };
        $scope.func_Vgin = function() {
            $state.go( 'vginList', {}, {
                reload: true
            } );
        };
        $scope.func_Picking = function() {
            $state.go( 'grList', {}, {
                reload: true
            } );
        };
    } ] );
