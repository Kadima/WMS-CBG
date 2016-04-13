
var dbInfo = {
    dbName: "WmsDB",
    dbVersion: "1.0",
    dbDisplayName: "WMS Database",
    dbEstimatedSize: 10 * 11024 * 1024
};
var dbSql = "";
function dbError(tx, error) {
    console.log(error.message);
}
var dbWms = window.openDatabase(dbInfo.dbName, dbInfo.dbVersion, dbInfo.dbDisplayName, dbInfo.dbEstimatedSize);
if (dbWms) {
    dbWms.transaction(function (tx) {
        dbSql = 'DROP TABLE if exists Imgr2_Receipt';
        tx.executeSql(dbSql, [], null, dbError);
        dbSql = "CREATE TABLE Imgr2_Receipt (TrxNo INT, LineItemNo INT, ProductTrxNo INT, ProductCode TEXT, ProductDescription TEXT, SerialNoFlag TEXT, BarCode TEXT, DimensionFlag TEXT, PackingQty INT, WholeQty INT, LooseQty INT, ScanQty INT)";
        tx.executeSql(dbSql, [], null, dbError);

        dbSql = 'DROP TABLE if exists Imsn1_Receipt';
        tx.executeSql(dbSql, [], null, dbError);
        dbSql = "CREATE TABLE Imsn1_Receipt (ReceiptNoteNo TEXT, ReceiptLineItemNo INT, IssueNoteNo TEXT, IssueLineItemNo INT, SerialNo TEXT)";
        tx.executeSql(dbSql, [], null, dbError);

        dbSql = 'DROP TABLE if exists Imgi2';
        tx.executeSql(dbSql, [], null, dbError);
        dbSql = "CREATE TABLE Imgi2 (RowNum, TrxNo INT, LineItemNo INT, StoreNo TEXT, ProductTrxNo INT, ProductCode TEXT, DimensionFlag TEXT, ProductDescription TEXT, SerialNoFlag TEXT, BarCode TEXT, PackingQty INT, WholeQty INT, LooseQty INT, ScanQty INT)";
        tx.executeSql(dbSql, [], null, dbError);

        dbSql = 'DROP TABLE if exists Imgr2_Putaway';
        tx.executeSql(dbSql, [], null, dbError);
        dbSql = "CREATE TABLE Imgr2_Putaway (TrxNo INT, LineItemNo INT, StoreNo TEXT, StagingAreaFlag TEXT, ProductTrxNo INT, ProductCode TEXT, BarCode TEXT, DimensionFlag TEXT, PackingQty INT, WholeQty INT, LooseQty INT, ScanQty INT)";
        tx.executeSql(dbSql, [], null, dbError);

        dbSql = 'DROP TABLE if exists Imgr2_Transfer';
        tx.executeSql(dbSql, [], null, dbError);
        dbSql = "CREATE TABLE Imgr2_Transfer (TrxNo INT, LineItemNo INT, StoreNo TEXT, StoreNoFrom TEXT, StoreNoTo TEXT, ProductTrxNo INT, ProductCode TEXT, ProductDescription TEXT, SerialNoFlag TEXT, BarCode TEXT, ScanQtyFrom INT, ScanQtyTo INT)";
        tx.executeSql(dbSql, [], null, dbError);
    });
}
var db_del_Imgr2_Receipt = function (){
    if ( dbWms ) {
        dbWms.transaction( function( tx ) {
            dbSql = 'Delete from Imgr2_Receipt';
            tx.executeSql( dbSql, [], null, dbError )
        } );
    }
}
var db_add_Imgr2_Receipt = function( imgr2 ) {
    if ( dbWms ) {
        dbWms.transaction( function( tx ) {
            dbSql = 'INSERT INTO Imgr2_Receipt (TrxNo, LineItemNo, ProductTrxNo, ProductCode, ProductDescription, SerialNoFlag, BarCode, DimensionFlag, PackingQty, WholeQty, LooseQty, ScanQty) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            tx.executeSql( dbSql, [ imgr2.TrxNo, imgr2.LineItemNo, imgr2.ProductTrxNo, imgr2.ProductCode, imgr2.ProductDescription, imgr2.SerialNoFlag, imgr2.BarCode, imgr2.DimensionFlag, imgr2.PackingQty, imgr2.WholeQty, imgr2.LooseQty, 0], null, dbError );
        } );
    }
};
var db_update_Imgr2_Receipt = function( imgr2 ) {
    if ( dbWms ) {
        dbWms.transaction( function( tx ) {
            dbSql = 'Update Imgr2_Receipt set ScanQty=? Where TrxNo=? and LineItemNo=?';
            tx.executeSql( dbSql, [ imgr2.ScanQty, imgr2.TrxNo, imgr2.LineItemNo ], null, dbError );
        } );
    }
};
var db_del_Imsn1_Receipt = function (){
    if ( dbWms ) {
        dbWms.transaction( function( tx ) {
            dbSql = 'Delete from Imsn1_Receipt';
            tx.executeSql( dbSql, [], null, dbError )
        } );
    }
}
var db_del_Imgr2_Putaway = function (){
    if ( dbWms ) {
        dbWms.transaction( function( tx ) {
            dbSql = 'Delete from Imgr2_Putaway';
            tx.executeSql( dbSql, [], null, dbError )
        } );
    }
}
var db_add_Imgr2_Putaway = function( imgr2 ) {
    if ( dbWms ) {
        dbWms.transaction( function( tx ) {
            dbSql = 'INSERT INTO Imgr2_Putaway (TrxNo, LineItemNo, StoreNo, StagingAreaFlag, ProductTrxNo, ProductCode, BarCode, DimensionFlag, PackingQty, WholeQty, LooseQty, ScanQty) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            tx.executeSql( dbSql, [ imgr2.TrxNo, imgr2.LineItemNo, imgr2.StoreNo, imgr2.StagingAreaFlag, imgr2.ProductTrxNo, imgr2.ProductCode, imgr2.BarCode, imgr2.DimensionFlag, imgr2.PackingQty, imgr2.WholeQty, imgr2.LooseQty, 0], null, dbError );
        } );
    }
};
var db_update_Imgr2_Putaway = function( imgr2 ) {
    if ( dbWms ) {
        dbWms.transaction( function( tx ) {
            dbSql = 'Update Imgr2_Putaway set ScanQty=?,StoreNo=? Where TrxNo=? and LineItemNo=?';
            tx.executeSql( dbSql, [ imgr2.ScanQty, imgr2.StoreNo, imgr2.TrxNo, imgr2.LineItemNo ], null, dbError );
        } );
    }
};
var db_del_Imgr2_Transfer = function (){
    if ( dbWms ) {
        dbWms.transaction( function( tx ) {
            dbSql = 'Delete from Imgr2_Transfer';
            tx.executeSql( dbSql, [], null, dbError )
        } );
    }
}
var db_add_Imgr2_Transfer = function( imgr2 ) {
    if ( dbWms ) {
        dbWms.transaction( function( tx ) {
            dbSql = 'INSERT INTO Imgr2_Transfer (TrxNo, LineItemNo, StoreNo, StoreNoFrom, StoreNoTo, ProductTrxNo, ProductCode, ProductDescription, SerialNoFlag, BarCode, ScanQtyFrom, ScanQtyTo) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            tx.executeSql( dbSql, [ imgr2.TrxNo, imgr2.LineItemNo, imgr2.StoreNo, imgr2.StoreNoFrom, imgr2.StoreNoTo, imgr2.ProductTrxNo, imgr2.ProductCode, imgr2.ProductDescription, imgr2.SerialNoFlag, imgr2.BarCode, 0, 0], null, dbError );
        } );
    }
};
var db_update_Imgr2_Transfer = function( imgr2, type ) {
    if ( dbWms ) {
        if(is.equal(type,'from')){
            dbWms.transaction( function( tx ) {
                dbSql = 'Update Imgr2_Transfer set ScanQtyFrom=?,StoreNoFrom=? Where TrxNo=? and LineItemNo=?';
                tx.executeSql( dbSql, [ imgr2.ScanQtyFrom, imgr2.StoreNoFrom, imgr2.TrxNo, imgr2.LineItemNo ], null, dbError );
            } );
        }else if(is.equal(type,'to')){
            dbWms.transaction( function( tx ) {
                dbSql = 'Update Imgr2_Transfer set ScanQtyTo=?,StoreNoTo=? Where TrxNo=? and LineItemNo=?';
                tx.executeSql( dbSql, [ imgr2.ScanQtyTo, imgr2.StoreNoTo, imgr2.TrxNo, imgr2.LineItemNo ], null, dbError );
            } );
        }
    }
};

var insertImgi2s = function(imgi2) {
    if (dbWms) {
        dbWms.transaction(function(tx) {
            dbSql = 'INSERT INTO Imgi2 (RowNum, TrxNo, LineItemNo, StoreNo, ProductTrxNo, ProductCode, DimensionFlag, ProductDescription, SerialNoFlag, BarCode, PackingQty, WholeQty, LooseQty) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?)';
            tx.executeSql(dbSql, [imgi2.RowNum, imgi2.TrxNo, imgi2.LineItemNo, imgi2.StoreNo, imgi2.ProductTrxNo, imgi2.ProductCode, imgi2.DimensionFlag, imgi2.ProductDescription, imgi2.SerialNoFlag, imgi2.UserDefine01, imgi2.PackingQty, imgi2.WholeQty, imgi2.LooseQty], null, dbError);
        });
    }
};
var insertImsn1s = function(Imsn1) {
    if (dbWms) {
        dbWms.transaction(function(tx) {
            dbSql = 'INSERT INTO Imsn1 (IssueNoteNo, IssueLineItemNo, SerialNo) values(?, ?, ?)';
            tx.executeSql(dbSql, [Imsn1.IssueNoteNo, Imsn1.IssueLineItemNo, Imsn1.SerialNo], null, dbError);
        });
    }
};

var appendProtocol = function(url, blnSSL, portNo) {
    if (url.length > 0 && url.toUpperCase().indexOf('HTTPS://') < 0 && url.toUpperCase().indexOf('HTTP://') < 0) {
        if(blnSSL){
            url = 'https://' + url;
        }else{
            var aURL = url.split('/');
            if(aURL[0].indexOf(':') < 0){
                url = 'http://' + aURL[0] + ':' + portNo;
            }else{
                url = 'http://' + aURL[0];
            }
            for(var i=1; i<aURL.length; i++){
                url = url + '/' + aURL[i];
            }
        }
    }
    return url;
};
var rmProtocol = function(url) {
    if (url.length > 0) {
        var regex = /(https?:\/\/)?/gi;
        url = url.replace(regex, '');
    }
    return url;
};
