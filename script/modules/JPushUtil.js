// 极光推送对象
var jpush = null;

// 判断对象是否为空
function isEmptyObject(obj) {
    if (obj == "{}") {
        return true;
    }
    for (var name in obj) {
        return false;
    }
    return true;
}

function jpushFun() {
    // 实例化极光推送对象
    jpush = api.require('ajpush');
    // 初始化推送服务，只Android有效，ios上会自动初始化
    jpush.init(function(ret) {
        var userId = getStorage('userId', '');
        if (userId) {
            if (ret && ret.status) {
                //success
                var param = {
                    alias: userId,
                    tags: []
                };
                jpush.bindAliasAndTags(param, function(ret) {
                    var statusCode = ret.statusCode;
                    if (statusCode == 0) {
                        setPushListener();
                    }
                });
            }
        }
    });

    // 监听通知被点击(Android)
    api.addEventListener({
        name: 'appintent'
    }, function(ret, err) {
        console.log('appintent-->' + JSON.stringify(ret));
        if (ret && ret.appParam.ajpush) {
            // 通知被点击后处理
            executeNotice(ret, "appintent");
        }
    });
    // 监听通知被点击(iOS应用处于后台)
    api.addEventListener({
        name: 'noticeclicked'
    }, function(ret, err) {
        console.log('noticeclicked-->' + JSON.stringify(ret));
        if (ret && ret.value) {
            // 通知被点击后处理
            executeNotice(ret, "noticeclicked");
        }
    });
}

// 监听到的消息转为状态栏通知
function notification(t, c, e) {
    api.notification({
        vibrate: [300, 500], //震动时间节奏
        sound: 'default', //系统默认提示音
        light: false, //是否亮灯，需设备支持
        notify: { //状态栏通知
            title: t, //标题，默认值为应用名称，只Android有效
            content: c, //内容，默认值为'有新消息'
            extra: e, //传递给通知的数据，在通知被点击后，该数据将通过监听函数回调给网页
            updateCurrent: false //是否覆盖更新已有的通知，取值范围true|false。只Android有效
        }
    }, function(ret, err) {
        //if(ret){
        //api.alert(ret.id);//id为通知ID，可用于取消通知
        //}
    });
}

// 通知被点击后处理
function executeNotice(ret, type) {
    var ajpush; // 信息对象
    var extra; // 附加字段
    if (type == "appintent") { //监听通知被点击(Android)
        ajpush = ret.appParam.ajpush;
        if (!isEmptyObject(ajpush)) {
            if (!isEmptyObject(ajpush.extra)) {
                extra = ajpush.extra;
            }
        }
    } else if (type == "noticeclicked") { //iOS应用处于后台
        ajpush_obj = ret.value;
        if (!isEmptyObject(ajpush_obj)) {
            c = ajpush_obj.content;
            // 转为json字符串
            ajpush_obj = JSON.stringify(ajpush_obj);
            // 再转为json对象
            ajpush_obj = $.parseJSON(ajpush_obj);
            // 判断附加参数是否为空
            if (!isEmptyObject(ajpush_obj.extra)) {
                //extra = $.parseJSON(ajpush_obj.extra);
                extra = ajpush_obj.extra;
            }
        }
    }
    // 附加字段不为空
    if (!isEmptyObject(extra)) {
        if (extra.pushType == '3') { //某患者发起专业咨询
            api.openWin({
                name: 'consult_profession_chat_win',
                url: 'html/consult/consult_profession_chat_win.html',
                pageParam: {
                    name: 'jPush',
                    consultId: extra.consultId,
                    consultStatus: '1',
                    consultType: extra.consultType
                },
            });
        } else if (extra.pushType == '4') { //医生绑定某快速咨询
            api.openWin({
                name: 'consult_profession_chat_win',
                url: 'html/consult/consult_profession_chat_win.html',
                pageParam: {
                    name: 'jPush',
                    consultId: extra.consultId,
                    consultStatus: extra.consultStatus,
                    consultType: extra.consultType
                },
            });
        } else if (extra.pushType == '5') { //医生结束某咨询
            api.openWin({
                name: 'consult_profession_chat_win',
                url: 'html/consult/consult_profession_chat_win.html',
                pageParam: {
                    name: 'jPush',
                    consultId: extra.consultId,
                    consultStatus: extra.consultStatus,
                    consultType: extra.consultType
                },
            });
        } else if (extra.pushType == '6') { //患者评价某咨询
            api.openWin({
                name: 'consult_profession_chat_win',
                url: 'html/consult/consult_profession_chat_win.html',
                pageParam: {
                    name: 'jPush',
                    consultId: extra.consultId,
                    consultStatus: extra.consultStatus,
                    consultType: extra.consultType
                },
            });
        }
    }
}

/** 设置推送监听*/
function setPushListener() {
    if (typeof(jpush) == 'undefined' || jpush == null) {
        jpush = api.require('ajpush');
    }

    api.addEventListener({
        name: 'pause'
    }, function(ret, err) {
        onPause(); //监听应用进入后台，通知jpush暂停事件
    });

    api.addEventListener({
        name: 'resume'
    }, function(ret, err) {
        onResume(); //监听应用恢复到前台，通知jpush恢复事件
    });

    jpush.setListener(
        function(ret) {
            if (ret.extra.pushType == '1') {
              api.sendEvent({
                  name: 'refreshHomeResult',
              });
            }else if (ret.extra.pushType == '2') {
                api.sendEvent({
                    name: 'refreshDoctorConsultLib',
                });
            }else if (ret.extra.pushType == '3') {//某患者发起专业咨询
              api.sendEvent({
                  name: 'refreshDoctorConsult',
              });
              api.sendEvent({
                  name: 'refreshConsultRecord',
              });
            }else if (ret.extra.pushType == '4') {//医生绑定某快速咨询
              api.sendEvent({
                  name: 'refreshConsultRecord',
              });
            }else if (ret.extra.pushType == '5') {//医生结束某咨询
              api.sendEvent({
                  name: 'refreshConsultRecord',
              });
              api.sendEvent({
                  name: 'refreshConsultInfo',
              });
              api.sendEvent({
                  name: 'refreshDoctorConsult',
              });
            }else if (ret.extra.pushType == '6') {//患者评价某咨询
              api.sendEvent({
                  name: 'refreshConsultRecord',
              });
              api.sendEvent({
                  name: 'refreshDoctorConsult',
              });
            }else if (ret.extra.pushType == '7') {//服药消息提醒
              addRemindFuc(ret);
            }
        });
}

/**统计-app恢复*/
function onResume() {
    if (typeof(ajpush) == "undefined") {
        ajpush = api.require('ajpush');
    }
    jpush.onResume();
    console.log('JPush onResume');
}

/**统计-app暂停*/
function onPause() {
    if (typeof(selList) == "undefined") {
        ajpush = api.require('ajpush');
    }
    jpush.onPause();
    console.log('JPush onPause');
}
