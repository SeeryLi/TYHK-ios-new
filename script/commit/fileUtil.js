var fs;
/** 删除文件*/
function deleteFile(path) {
    if (typeof(fs) == 'undefined') {
        fs = api.require('fs');
    }
    fs.remove({
        path: path
    }, function(ret, err) {

    });
}

/** 判断文件是否存在*/
function isFileExist(recordVoicePath) {
    if (typeof(fs) == 'undefined') {
        fs = api.require('fs');
    }
    fs.exist({
        path: recordVoicePath
    }, function(ret, err) {
        if (ret.exist) {
            return 1;
        } else {
            return 0;
        }
    });
}

var imageFilter;
/** 图片压缩*/
function compressFile(filePath,successCallback, errorCallback) {

    if (typeof(imageFilter) == 'undefined') {
        imageFilter = api.require('imageFilter');
    }
    var perfix = filePath.substring(filePath.lastIndexOf('.') + 1); //文件后缀名
    var fileName = filePath.lastIndexOf('/') + 1;
    var savePath = 'fs://' + filePath.substring();
    console.log(perfix  + ',' + savePath);
    imageFilter.compress({
        img: filePath,
        quality: 0.5,
        save:{
          imgPath:savePath,//压缩图片保存地址
          imgName:perfix
        }
    }, function(ret, err) {
        if (ret.status) {
           console.log(JSON.stringify(ret));
            successCallback && successCallback(ret,savePath);
        } else {
           console.log(JSON.stringify(err));
           errorCallback && errorCallback(err);
        }
    });
}
