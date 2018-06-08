/** 文件下载工具类*/

/** 文件下载*/
function fileDownloadNormal(url) {
    console.log('fileDownloadNormal-->' + url);
    var pathArr = url.split('/');
    var path = 'fs://' + pathArr[pathArr.lengh - 1];
    api.download({
        url: url,
        savePath: path,
        report: true,
        cache: true,
        allowResume: true
    }, function(ret, err) {
        if (ret.state == 1) {

        } else {

        }
    });
}

/** 咨询语音文件下载*/
function fileDownload(id, url, fileId) {
    var perfix = url.substring(url.lastIndexOf('.') + 1); //文件后缀名
    var path = 'fs://' + fileId + '.' + perfix;
    console.log(consultFileDownload + '?userId=' + getStorage('userId') + '&time=' + new Date().getTime() + '&deviceId=' + api.deviceId + '&fileId=' + fileId);
    api.download({
        url: consultFileDownload + '?userId=' + getStorage('userId') + '&time=' + new Date().getTime() + '&deviceId=' + api.deviceId + '&fileId=' + fileId,
        savePath: path,
        report: true,
        cache: true,
        allowResume: true
    }, function(ret, err) {
        if (ret.state == 1) {
            console.log('fileDownload-->' + JSON.stringify(ret));
            api.sendEvent({
                name: 'voicePlay',
                extra: {
                    fileId: fileId,
                    url: ret.savePath,
                    id: id
                }
            });
        }
    });
}

/** 专业咨询语音下载*/
function consultChatVoiceDownload(location,id, url, fileId){
  var perfix = url.substring(url.lastIndexOf('.') + 1); //文件后缀名
  var path = 'fs://' + fileId + '.' + perfix;
  console.log(consultFileDownload + '?userId=' + getStorage('userId') + '&time=' + new Date().getTime() + '&deviceId=' + api.deviceId + '&fileId=' + fileId);
  api.download({
      url: consultFileDownload + '?userId=' + getStorage('userId') + '&time=' + new Date().getTime() + '&deviceId=' + api.deviceId + '&fileId=' + fileId,
      savePath: path,
      report: true,
      cache: true,
      allowResume: true
  }, function(ret, err) {
      if (ret.state == 1) {
          console.log('fileDownload-->' + JSON.stringify(ret));
          api.sendEvent({
              name: 'consultVoicePlay',
              extra: {
                  fileId: fileId,
                  url: ret.savePath,
                  id: id,
                  location:location
              }
          });
      }
  });
}
