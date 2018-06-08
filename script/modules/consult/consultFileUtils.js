var selList = new Array();
var fileLength = 0;
var uploadLengh = 0;
/** 解绑文件*/
function unboundFile(id) {
    var unboundSql = "delete from consult_bound_file where id = '" + id + "'";
    executeSqlSync(unboundSql);
}

/** 解绑咨询的所有文件 异步执行*/
function unboundConsult(consultId) {
    var sql = "delete from consult_bound_file where requestId = '" + consultId + "'";
    executeSqlSync(sql);
}

/** 绑定咨询*/
function bunodFile(fileBean) {

    var insertSql = "insert into consult_bound_file(id,requestId,file_path,file_type,upload_time,file_size,file_name) " +
        "values('" + fileBean.id + "','" + fileBean.requestId + "','" + fileBean.filePath + "','" +
        fileBean.fileType + "','" + 0 + "','" + fileBean.fileSize + "','" + fileBean.fileName +"')";
    executeSqlSync(insertSql);
}

/** 文件上传*/
function uoploadConsultFile(consultId) {
    uploadLengh = 0;
    var selectSqlStr = "select * from consult_bound_file where requestId = '" + consultId + "'";
    selList = selectSqlSync(selectSqlStr);
    if (typeof(selList) != "undefined" && selList.length > 0) { //存在绑定的文件
        fileLength = selList.length;
        uploadFile(selList[0],0);
    }
}

/** 执行下一下上传*/
function uploadNext() {
    //console.log('uploadNext-->' + JSON.stringify(selList));
    if (typeof(selList) != "undefined" && selList.length > 0) { //存在绑定的文件
        for (var i = 0; i < selList.length; i++) {
            var consultBean = selList[i];
            //console.log("for consultList-->" + JSON.stringify(consultBean));
            if (consultBean.upload_time == 0) {
                uploadFile(consultBean);
            }
        }
    } else {
        api.sendEvent({
            name: 'consultUploadSuccess',
        });
    }
}

/** 文件上传*/
function uploadFile(consultBean,index) {
    console.log('uploadFileuploadFileuploadFileuploadFileuploadFileuploadFile-->' + JSON.stringify(consultBean.file_name));
    var userId = getStorage('userId');
    api.ajax({
        url: fileUplod,
        method: 'post',
        data: {
            values: {
                "userId": userId,
                "requestId": consultBean.requestId,
                "deviceId": api.deviceId,
                "fileName": consultBean.file_name,
                "time": new Date().getTime(),
                "fileType": consultBean.file_type,
                "fileSize":consultBean.file_size,
                "sign": ""
            },
            files: {
                "file": consultBean.file_path
            }
        }
    }, function(ret, err) {
        uploadLengh ++;
        if (ret) {
            var updateSql = "update consult_bound_file set upload_time='" + new Date().getTime() + "' where id = '" + consultBean.id + "'";
            executeSqlSync(updateSql);
            if (typeof(selList) != "undefined" && selList.length > 0 && typeof(index) != "undefined") { //存在绑定的文件
                selList.splice(index,1);
                uploadNext();
            }

        }
        if (uploadLengh >= fileLength) {
          api.sendEvent({
              name: 'consultUploadSuccess',
          });
        }
    });
}
