var lastImg;
var lastFileId;

// 语音播放状态切换
function plyM(id, path, voiceFileId) {
    var divimg = $("#" + id);
    event.preventDefault();
    event.stopPropagation();
    if (divimg.attr("alt") == "ply") {
        divimg.attr("src", "../../image/home_form_play.png");
        divimg.attr("alt", "gb");
    } else {
        divimg.attr("src", "../../image/home_form_sus.png");
        divimg.attr("alt", "ply");
        api.stopPlay();
        return;
    }
    var pathArrs = path.split("/");
    var url = 'fs://' + voiceFileId + '.aac';
    if (typeof(lastFileId) != 'undefined' && lastFileId != voiceFileId ) {
        api.stopPlay();
        if (typeof(lastImg) != 'undefined' && lastImg.attr('alt') == 'gb') {
            lastImg.attr("src", "../../image/home_form_sus.png");
            lastImg.attr("alt", "ply");
        }
        lastImg = divimg;
    }
    if (typeof(lastImg) == 'undefined') {
      lastImg = divimg;
    }
    lastFileId = voiceFileId;
    api.startPlay({
        path: url
    }, function(ret, err) {
        divimg.attr("src", "../../image/home_form_sus.png");
        divimg.attr("alt", "ply");
        if (ret) {} else {
            fileDownload(id, path, voiceFileId);
            console.log(JSON.stringify(err));
        }
    });
}

/** 停止播放*/
function stopPlayVoice() {
    api.stopPlay();
    if (typeof(lastImg) != 'undefined') {
        lastImg.attr("src", "../../image/home_form_sus.png");
        lastImg.attr("alt", "ply");
    }
}

/** 播放录音*/
function funcGoto(ret) {
    console.log('fungo-->' + JSON.stringify(ret));
    var divimg = $("#" + ret.value.id);
    api.stopPlay();
    if (typeof(lastImg) != 'undefined' && lastImg.attr('alt') == 'gb') {
        lastImg.attr("src", "../../image/home_form_sus.png");
        lastImg.attr("alt", "ply");
    }
    divimg.attr("src", "../../image/home_form_play.png");
    divimg.attr("alt", "gb");
    lastImg = divimg;
    lastFileId = ret.value.fileId;
    api.startPlay({
        path: ret.value.url
    }, function(ret, err) {
        divimg.attr("src", "../../image/home_form_sus.png");
        divimg.attr("alt", "ply");
    });
}
