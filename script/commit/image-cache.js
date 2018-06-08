
//缓存图片
function iCache(url, id, fileId) {
    var perfix = url.substring(url.lastIndexOf('.') + 1); //文件后缀名
    var path = api.cacheDir + "/pic/" + fileId + '.' + perfix;
    var obj = api.require('fs');
    obj.exist({
        path: path
    }, function(ret, err) {
        //msg(ret);
        if (ret.exist) {
            if (ret.directory) {
            } else {
                //selector.eq(data).src=path;
                $api.attr($api.byId(id), 'src', path);
                //console.log(selector.eq(data).attr("src"));
            }
        } else {
            $api.attr($api.byId(id), 'src', url);
            imageDownload(url, id, fileId);
        }
    });
};

/** 图片下载*/
function imageDownload(url, id, fileId) {
    var perfix = url.substring(url.lastIndexOf('.') + 1); //文件后缀名
    // console.log('perfix-->' + perfix);
    var path = api.cacheDir + "/pic/" + fileId + '.' + perfix;
    // console.log(consultFileDownload + '?userId=' + getStorage('userId') + '&time=' + new Date().getTime() + '&deviceId=' + api.deviceId + '&fileId=' + fileId);
    api.download({
        url: consultFileDownload + '?userId=' + getStorage('userId') + '&time=' + new Date().getTime() + '&deviceId=' + api.deviceId + '&fileId=' + fileId,
        savePath: path,
        report: true,
        cache: false,
        allowResume: true
    }, function(ret, err) {
        if (ret.state == 1) {
          console.log('sure')
        }
        if(err){
          console.log(JSON.stringify(err))
        }
    });
}

/** 图片缓存*/
function imageCache(url, id){
    api.imageCache({
        url: url
    }, function(ret, err){
        if( ret ){
          if (ret.status) {
            $api.attr($api.byId(id), 'src', ret.url);
          }else{
            $api.attr($api.byId(id), 'src', url);
          }
        }else{
          $api.attr($api.byId(id), 'src', url);
        }
    });

}
