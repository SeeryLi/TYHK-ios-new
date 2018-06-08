/** 咨询聊天注入框工具类*/

var mUIChatBox;
var voiceTime = 0;
var recordTimer;

function initChatBox(UIChatBox) {
    mUIChatBox = api.require('UIChatBox');
    var userType = getStorage('userAppType');
    if (userType == '4') {
        openBox(mUIChatBox);
    } else {
        openBoxNormal(mUIChatBox);
    }
    fnAddEventListener(mUIChatBox);
}

/** 关闭输入框*/
function closeBox() {
    if (typeof(mUIChatBox) == 'undefined') {
        mUIChatBox = api.require('UIChatBox');
    }
    mUIChatBox.close();
}

/** 显示输入框*/
function showBox(el) {
    if (typeof(mUIChatBox) == 'undefined') {
        mUIChatBox = api.require('UIChatBox');
    }
    mUIChatBox.show();
}

/** 隐藏输入框*/
function hideBox() {
    if (typeof(mUIChatBox) == 'undefined') {
        mUIChatBox = api.require('UIChatBox');
    }
    mUIChatBox.hide();
}

/** 显示扩展内容*/
function popupBoard(el) {
    mUIChatBox.popupBoard({
        target: 'extras'
    });
}

/** 收起键盘*/
function closeKeyboard(el) {
    if (typeof(mUIChatBox) == 'undefined') {
        mUIChatBox = api.require('UIChatBox');
    }
    mUIChatBox.closeKeyboard();
}

/** 设置、获取输入框的值*/
function valueSetBox(el) {
    if (el.innerHTML === '设置') {
        mUIChatBox.value({
            msg: '使用 value 设置新值'
        });
    } else {
        mUIChatBox.value(function(ret, err) {
            if (ret) {
            } else {
                console.log("fnValue-->" + JSON.stringify(err));
            }
        });
    }
}

/**在输入框的最后插入值*/
function insertValueBox(el) {
    mUIChatBox.insertValue({
        msg: '使用 insertValue 插入的新值'
    });
}

/** 监听按钮*/
function fnAddEventListener(el) {
    mUIChatBox.addEventListener({
        target: 'recordBtn',
        name: 'press'
    }, function(ret, err) {
        if (ret) {
            recordVoice();
        } else {
            console.log("recordBtn-->" + JSON.stringify(ret));
        }
    });

    mUIChatBox.addEventListener({
        target: 'recordBtn',
        name: 'press_cancel'
    }, function(ret, err) {
        if (ret) {
            api.stopRecord(function(ret, err) {
                if (ret) {
                    recordVoicePath = ret.path;
                    if (voiceDuration > 60) {
                        defaultToast("录音超时了");
                        return;
                    }
                }
                api.execScript({
                    name: 'consult_profession_chat_win',
                    frameName: 'consult_profession_chat_frm',
                    script: 'recordDownT();'
                });
            });
            recordTimeOver(); //结束计时
            setTimeout(function() {
                boundObj(recordVoicePath, 'voice');
            }, 100)
        } else {
            alert(JSON.stringify(err));
        }
    });
    mUIChatBox.addEventListener({
        target: 'recordBtn',
        name: 'move_out'
    }, function(ret, err) {
        if (ret) {
            api.execScript({
                name: 'consult_profession_chat_win',
                frameName: 'consult_profession_chat_frm',
                script: 'recordUp();'
            });
            recordTimeOver();
            voiceDuration = 0;
        } else {
            alert(JSON.stringify(err));
        }
    });

    mUIChatBox.addEventListener({
        target: 'recordBtn',
        name: 'move_out_cancel'
    }, function(ret, err) {
        if (ret) {
            api.execScript({
                name: 'consult_profession_chat_win',
                frameName: 'consult_profession_chat_frm',
                script: 'recordUpT();'
            });
            recordTimeOver();
            voiceDuration = 0;
        } else {
            alert(JSON.stringify(err));
        }
    });
    mUIChatBox.addEventListener({
        target: 'recordBtn',
        name: 'move_in'
    }, function(ret, err) {
        if (ret) {
            recordVoice();
            api.execScript({
                name: 'consult_profession_chat_win',
                frameName: 'consult_profession_chat_frm',
                script: 'recordUpTd();'
            });
        } else {
            alert(JSON.stringify(err));
        }
    });


}

function fnSetPlaceholder(el) {
    mUIChatBox.setPlaceholder({
        placeholder: '修改了占位提示内容'
    });
}

/** 打开输入框*/
function openBox(el) {
    mUIChatBox.open({
        placeholder: '输入发送内容',
        autoFocus: false,
        //emotionPath: 'widget://image/emotion',
        styles: {
            inputBar: {
                borderColor: '#FFF',
                bgColor: '#FFF',
            },
            inputBox: {
                borderColor: '#EFF2F7',
                bgColor: '#EFF2F7',
                boardBgColor: '#EFF2F7'
            },
            extrasBtn: {
                normalImg: 'widget://image/consult_chat/consult_chat_more.png'
            },
            speechBtn: {
                normalImg: 'widget://image/consult_chat/consult_chat_voice.png'
            },
            recordBtn: {
                normalBg: '#EFF2F7',
                activeBg: '#EFF2F7',
                color: '#555',
                size: 14
            },
            indicator: {
                target: 'extrasPanel',
                color: '#c4c4c4',
                activeColor: '#9e9e9e'
            },
            sendBtn: {
                titleColor: '#ffffff',
                bg: '#3FC190',
                activeBg: '#3FC190',
                titleSize: 15
            }
        },
        extras: {
            titleSize: 10,
            titleColor: '#555555',
            btns: [{
                title: '服药单',
                normalImg: 'widget://image/remind/con_chat_fyd.png',
                activeImg: 'widget://image/remind/con_chat_fyd.png'
            }, {
                title: '图片',
                normalImg: 'widget://image/consult_chat/consult_chat_pic.png',
                activeImg: 'widget://image/consult_chat/consult_chat_pic.png'
            }, {
                title: '拍照',
                normalImg: 'widget://image/consult_chat/consult_chat_take.png',
                activeImg: 'widget://image/consult_chat/consult_chat_take.png'
            }, {
                title: '结束咨询',
                normalImg: 'widget://image/consult_chat/consult_chat_end.png',
                activeImg: 'widget://image/consult_chat/consult_chat_end.png'
            }]
        }
    }, function(ret, err) {
        if (ret) {
            if(ret.msg){
              ret.msg = $api.trimAll(ret.msg);
            }
            if (ret.eventType == 'send') { //发送信息
                if(ret.msg == '' ||ret.msg.length == 0){return};
                sendChatMessage(ret.msg, '0', '');
            } else if (ret.eventType == 'clickExtras') {
                if (ret.index == 0) { //选择新药品
                    api.execScript({
                        name: 'consult_profession_chat_win',
                        script: 'jumpToMedicinal();'
                    });
                } else if (ret.index == '1') { //选择图片
                    getPicture('album');
                } else if (ret.index == '2') { //拍照
                    getPicture('camera');
                } else if (ret.index == '3') { //关闭咨询
                    closeConfirm();
                }
            }
        } else {
            console.log("open-->" + JSON.stringify(err));
        }
    });
}

// 确认咨询confirm
function closeConfirm()  {
  api.confirm({
    title: '结束咨询',
    msg: '结束后将无法继续会话,是否结束聊天咨询？',
    buttons: ['确定', '取消']
  }, function(ret, err) {
      var index = ret.buttonIndex;
      if(ret.buttonIndex == 1){
        closeConsult();
      }
  });
}


/** 打开输入框*/
function openBoxNormal(el) {
    mUIChatBox.open({
        placeholder: '输入发送内容',
        autoFocus: false,
        styles: {
            inputBar: {
                borderColor: '#FFF',
                bgColor: '#FFF',
            },
            inputBox: {
                borderColor: '#EFF2F7',
                bgColor: '#EFF2F7',
                boardBgColor: '#EFF2F7'
            },
            extrasBtn: {
                normalImg: 'widget://image/consult_chat/consult_chat_more.png'
            },
            speechBtn: {
                normalImg: 'widget://image/consult_chat/consult_chat_voice.png'
            },
            recordBtn: {
                normalBg: '#EFF2F7',
                activeBg: '#EFF2F7',
                color: '#555',
                size: 14
            },
            indicator: {
                target: 'extrasPanel',
                color: '#c4c4c4',
                activeColor: '#9e9e9e'
            },
            sendBtn: {
                titleColor: '#ffffff',
                bg: '#3FC190',
                activeBg: '#3FC190',
                titleSize: 15
            }
        },
        extras: {
            titleSize: 10,
            titleColor: '#555555',
            btns: [{
                title: '图片',
                normalImg: 'widget://image/consult_chat/consult_chat_pic.png',
                activeImg: 'widget://image/consult_chat/consult_chat_pic.png'
            }, {
                title: '拍照',
                normalImg: 'widget://image/consult_chat/consult_chat_take.png',
                activeImg: 'widget://image/consult_chat/consult_chat_take.png'
            }]
        }
    }, function(ret, err) {
        if (ret) {
            if(ret.msg){
              ret.msg = $api.trimAll(ret.msg);
            }
            if (ret.eventType == 'send') { //发送信息
                if(ret.msg == '' ||ret.msg.length == 0){return};
                sendChatMessage(ret.msg, '0', '');
            } else if (ret.eventType == 'clickExtras') {
                if (ret.index == 0) { //选择图片
                    getPicture('album');
                } else if (ret.index == 1) { //拍照
                    getPicture('camera');
                }
            }
        } else {
            console.log("open-->" + JSON.stringify(err));
        }
    });
}

/** 医生关闭咨询*/
function closeConsult() {
    var userId = getStorage("userId");
    if (userId) {
        api.ajax({
            url: doctorCloseConsultSer,
            method: 'post',
            data: {
                values: {
                    "userId": userId,
                    "consultId": api.pageParam.consultId,
                    "deviceId": api.deviceId,
                    "time": new Date().getTime(),
                    "sign": ""
                },
            }
        }, function(ret, err) {
            if (ret) {
                if (ret.success) {
                    api.sendEvent({
                        name: 'refreshDoctorConsult',
                    });
                    api.sendEvent({
                        name: 'endDoctorConsult',
                    });
                } else {
                    defaultToast(ret.message);
                }
            } else {
                defaultToast(err.message);
            }
        });

    } else {
        defaultToast("关闭失败，将重新登录");
        pageJump('login', '../login.html', 'consult_profrssion_chat');
    }
}

/**发送聊天消息 0:文字 1:图片 2:音频*/
function sendChatMessage(message, type, requestId) {
    var userId = getStorage("userId");

    if (userId) {
        api.ajax({
            url: consultChatSendNewMessageSer,
            method: 'post',
            data: {
                values: {
                    "userId": userId,
                    "consultId": api.pageParam.consultId,
                    "deviceId": api.deviceId,
                    "sendWords": message,
                    "messageType": type,
                    "requestId": requestId, //附件id
                    "time": new Date().getTime(),
                    "sign": ""
                },
            }
        }, function(ret, err) {
            closeKeyboard();
            if (ret) {
            } else {
                console.log("chat err-->" + JSON.stringify(err));
            }
        });

    } else {
        defaultToast("请求失败，将重新登录");
        pageJump('login', '../login.html', 'consult_profrssion_chat');
    }
}

var recordVoicePath;
var voiceDuration = 0;
/** 录音*/
function recordVoice() {
    recordTimeOut(); //计时
    recordVoicePath = 'fs://' + new Date().getTime() + '.aac';
    api.startRecord({
        path: recordVoicePath
    });
}

/** 停止录音*/
function stopRecordVoice() {
    api.stopRecord(function(ret, err) {
        if (ret) {
            recordVoicePath = ret.path;
            if (voiceDuration > 60) {
                defaultToast("录音超时了");
                return;
            }
        }
    });
    recordTimeOver(); //结束计时
}

/** 获取图片*/
function getPicture(source) {
    api.getPicture({
        sourceType: source,
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'url',
        quality: 50,
        saveToPhotoAlbum: false
    }, function(ret, err) {
        if (ret) {
            boundObj(ret.data, "image");
        }
    })
}

/** 获取上传对象对象*/
function boundObj(path, type) {
    var fs = api.require('fs');
    var pathArr = path.split("/");
    var fileSize = 0;
    if (type == "image") {
        fs.getAttribute({
            path: path
        }, function(ret, err) {
            if (ret.status) {
                fileSize = ret.attribute.size;
            } else {
                console.log(JSON.stringify(err));
            }
        });
    } else {
        fileSize = voiceDuration;
        voiceDuration = 0;
    }

    var fileBean = new Object();
    fileBean.filePath = path;
    fileBean.id = getUUID();
    fileBean.fileSize = fileSize;
    fileBean.fileName = pathArr[pathArr.length - 1];
    fileBean.requestId = api.pageParam.consultId;
    fileBean.fileType = type;
    uploadFile(fileBean);
}

/** 文件上传*/
function uploadFile(consultBean) {
    //if (consultBean.fileType == "image") {
    // compressFile(consultBean.filePath,function(ret,savePath){
    //   if (ret.status) {
    //     consultBean.filePath = savePath;
    //   }
    //   fileMsgUpload(consultBean);
    // },function(err){
    //  fileMsgUpload(consultBean);
    // });
    //  }else {
    fileMsgUpload(consultBean);
    //  }
}

/**文件上传*/
function fileMsgUpload(consultBean) {
    var userId = getStorage('userId');
    api.ajax({
        url: chatFileUpload,
        method: 'post',
        data: {
            values: {
                "userId": userId,
                "requestId": consultBean.id,
                "deviceId": api.deviceId,
                "fileName": consultBean.fileName,
                "time": new Date().getTime(),
                "fileType": consultBean.fileType,
                "fileSize": consultBean.fileSize + '',
                "sign": ""
            },
            files: {
                "file": consultBean.filePath
            }
        }
    }, function(ret, err) {
        if (ret) {
            if (consultBean.fileType == "image") {
                sendChatMessage('', '1', consultBean.id);
            } else {
                sendChatMessage('', '2', consultBean.id);
            }
        } else {
            console.log(JSON.stringify(err));
        }
    });
}

/** 录音计时*/
function recordTimeOut() {
    voiceDuration = voiceDuration + 1;
    api.execScript({
        name: 'consult_profession_chat_win',
        frameName: 'consult_profession_chat_frm',
        script: 'recordDown("' + voiceDuration + '");'
    });
    recordTimer = setTimeout("recordTimeOut()", 1000);

    if (voiceDuration >= 60) {}
}

function demo3() {
    api.execScript({
        name: 'consult_profession_chat_win',
        frameName: 'consult_profession_chat_frm',
        script: 'recordTimer("' + voiceDuration + '");'
    });
}

/** 停止计时*/
function recordTimeOver() {
    clearTimeout(recordTimer);
}

/**录音播放*/
function playVoice(path) {
    var pathArrs = path.split("/");
    var url = 'fs://' + pathArrs[pathArrs.length - 1];
    api.stopPlay();
    api.startPlay({
        path: url
    }, function(ret, err) {
        if (ret) {} else {
            fileDownloadNormal(path);
            //alert(JSON.stringify(err));
        }
    });
}

/** 咨询聊天记录录音播放*/
function playConsultVoice(location, id, path, fileId) {
    var pathArrs = path.split("/");
    var url = 'fs://' + fileId + '.aac';
    api.stopPlay();
    api.startPlay({
        path: url
    }, function(ret, err) {
        $(".right_par").find(".right_ico_2").eq(0).removeClass("right_ico_2");
        $(".right_par").find(".right_par>div").eq(0).addClass("right_ico");
        $(".left_par").find(".left_ico_2").eq(0).removeClass("left_ico_2");
        $(".left_par").find(".left_par>div").eq(0).addClass("left_ico");
        if (ret) {} else {
            consultChatVoiceDownload(location, id, path, fileId);
            console.log('playConsultVoice-->' + JSON.stringify(err));
            //alert(JSON.stringify(err));
        }
    });
}
