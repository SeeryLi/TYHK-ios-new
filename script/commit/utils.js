//消息数据本地存放的路径
var msgFilePath = "fs://optima_msg.txt";
/**
 *返回异步时需要的头文件属性
 */
function getHeaders() {
    var headers = {};
    var session = $api.getStorage("session");
    headers.Accept = "application/json";
    if (null != session && "" != session) {
        headers.Cookie = "JSESSIONID=" + session;
    }
    return headers;
}

/*default toast 提示*/
function defaultToast(msg) {
    api.toast({
        msg: msg,
        duration: 2000,
        location: 'bottom'
    });
}

var dialog = new auiDialog();
/*default alert 弹窗提示*/
function defaultDialog(msg) {
    dialog.alert({
        title: "提示",
        msg: msg,
        buttons: ['取消', '确定']
    }, function(ret) {});
}

/* 设置偏好数据 */
function setPrefs(key, val) {
    api.setPrefs({
        key: key,
        value: val
    });
}

/* 获取偏好数据 */
function getPrefs(key) {
    var val = api.getPrefs({
        sync: true,
        key: key
    });
    return val;
}

/* 移除偏好数据 */
function removePrefs(key) {
    api.removePrefs({
        key: key
    });
}

/* 设置localStorage数据 */
function setStorage(key, val) {
    $api.setStorage(key, val);
    if (key == "appBadgeNum") {
        showAppBadge();
    }
}

/* 获取localStorage数据 */
function getStorage(key, defaultVal) {
    var val = $api.getStorage(key);
    if (typeof(val) == "undefined") {
        return defaultVal;
    }
    return val;
}

/* 移除localStorage数据 */
function rmStorage(key) {
    $api.rmStorage(key)
}

var toast = new auiToast();

function showToast(type) {
    switch (type) {
        case "success":
            toast.success({
                title: "提交成功",
                duration: 2000
            });
            break;
        case "loginSuccess":
            toast.success({
                title: "登录成功",
                duration: 2000
            });
            break;
        case "loginFail":
            toast.fail({
                title: "登录失败",
                duration: 2000
            });
            break;
        case "fail":
            toast.fail({
                title: "提交失败",
                duration: 2000
            });
            break;
        case "custom":
            toast.custom({
                title: "提交成功",
                html: '<i class="aui-iconfont aui-icon-laud"></i>',
                duration: 2000
            });
            break;
        case "loading":
            toast.loading({
                title: "加载中",
                duration: 2000
            }, function(ret) {

            });
            break;
        case "loadFailed":
            toast.loading({
                title: "加载失败",
                duration: 2000
            }, function(ret) {

            });
            break;
        case "submit":
            toast.loading({
                title: "提交中",
                duration: 2000
            }, function(ret) {

            });
            break;
        case "login":
            toast.loading({
                title: "登录中",
                duration: 2000
            }, function(ret) {

            });
            break;
        case "register":
            toast.loading({
                title: "注册中",
                duration: 2000
            }, function(ret) {

            });
            break;
        case "resetPwd":
            toast.loading({
                title: "密码重置中",
                duration: 2000
            }, function(ret) {});
            break;
        default:
            toast.loading({
                title: "请求中",
                duration: 2000
            }, function(ret) {});
            break;
        case "loadingFy":
            toast.loading({
                title: "数据生成中",
                duration: 2000
            }, function(ret) {

            });
            break;
    }
}

function showProgress(title, text) {

    api.showProgress({
        title: title,
        text: text,
        modal: true
    });
}

function hideProgress() {
    api.hideProgress();
}

/**
 * 写数据到文件中
 * path fs://a.txt
 * append true false
 */
function writeFile(filePath, data, append) {
    var isAppend = false;
    if (typeof(append) != "undefined") {
        isAppend = append;
    }
    api.writeFile({
        path: filePath,
        data: data,
        append: isAppend
    }, function(ret, err) {
        if (ret.status) {
            //成功
            //defaultToast("数据写入成功");
        } else {
            defaultToast("数据写入失败");
        }
    });
}

/**
 * 读取文件
 * @param {Object} filePath fs://a.txt
 */
function readFile(filePath) {
    var data = api.readFile({
        sync: true,
        path: filePath
    });
    return data;
}

/**
 * 显示应用图标右上角的数字
 */
function showAppBadge() {
    var appBadgeNum = getStorage("appBadgeNum", 0);
    api.setAppIconBadge({
        badge: 0
    });
}

function refreshAppBadge(num) {
    var appBadgeNum = getStorage("appBadgeNum", 0);
    appBadgeNum = parseInt(appBadgeNum) + parseInt(num);
    setStorage("appBadgeNum", appBadgeNum);
}

Date.prototype.Format = function(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 时间格式的字符串转化为今天 昨天 星期几  几号等表示时间的字符
 */
function dateFormatStr(obj) {
    if (api.systemType == "android") {
        var dateStr = obj.replace(/-/g, "/");
        var date = new Date(dateStr);
        var nowDate = new Date();

        if (date.Format("yyyy-MM-dd") == nowDate.Format("yyyy-MM-dd")) { //今天  则显示时分
            return date.Format("HH:mm");
        } else if (date.Format("yyyy-MM-dd") == getYesterday()) { //昨天

            return "昨天";
        } else { //  显示星期几或者几号
            return getWeekDay(date);
        }
    } else { //ios
        var objYYYYMMdd = obj.substring(0, 10);
        var nowDate = new Date();
        var nowDateStr = nowDate.Format("yyyy-MM-dd");
        if (objYYYYMMdd == nowDateStr) { //今天
            return obj.substring(10, 16);
        } else if (objYYYYMMdd == getYesterday()) { //昨天
            return "昨天";
        } else {
            return objYYYYMMdd;
        }
    }
}

/**************************************时间格式化处理************************************/
function dateFtt(fmt, date) { //author: meizz
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function getWeekDay(date) {
    var weekFirstDayStr = getWeekFirstDay() + " 00:00:00";
    weekFirstDayStr = weekFirstDayStr.replace(/-/g, "/");
    var weekFirstDay = new Date(weekFirstDayStr);
    if (date.getTime() > weekFirstDay.getTime()) {
        return getWeekDayStr(date);
    } else {
        return date.Format("MM-dd");
    }
}

/**
 * 获取明天的时间  返回 yyyy-MM-dd
 */
function getTomorrow() {
    var tom = new Date();
    tom.setDate(tom.getDate() + 1);
    M = Number(tom.getMonth()) + 1;
    return tom.getFullYear() + "-" + M + "-" + tom.getDate();
}

/**
 * 获取昨天的日期 返回 yyyy-MM-dd
 */
function getYesterday() {
    var tom = new Date();
    tom.setDate(tom.getDate() - 1);
    M = Number(tom.getMonth()) + 1;
    return tom.getFullYear() + "-" + M + "-" + tom.getDate();
}

/**
 * 获取本周第一天时间   返回 yyyy-MM-dd
 */
function getWeekFirstDay() {
    var Nowdate = new Date();
    var WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
    M = Number(WeekFirstDay.getMonth()) + 1;
    return WeekFirstDay.getFullYear() + "-" + M + "-" + WeekFirstDay.getDate();
}

/**
 * 获取某天是星期几
 * @param {Object} date
 */
function getWeekDayStr(date) {
    var day = date.getDay();
    if (day == 0) {
        return "星期天";
    } else if (day == 1) {
        return "星期一";
    } else if (day == 2) {
        return "星期二";
    } else if (day == 3) {
        return "星期三";
    } else if (day == 4) {
        return "星期四";
    } else if (day == 5) {
        return "星期五";
    } else if (day == 6) {
        return "星期六";
    }
    return "";
}

/**
 * 返回
 */
function goBack() {
    api.closeWin();
}

function dealAjaxErr(err) {
    if (typeof(err) == "undefined" || typeof(err.code) == "undefined") {
        return;
    }
    var code = err.code;
    var msg = err.msg;
    if (code == 0 || code == 2 || code == 3) { //连接错误
        var serverPath = getStorage("serverPath", "");
        api.ajax({
            url: serverPath + "/optima/logout",
            method: 'post'
        }, function(ret, err) {
            //发送事件跳转到登录界面
            api.sendEvent({
                name: 'againLogin'
            });
        });

    } else if (code == 1) { //超时
        defaultToast(msg);
    }
    /*else if(code == 2){//授权错误
    	defaultToast(msg);
    }else if(code == 3){//数据类型错误
    	defaultToast(msg);
    }*/
}


/**
 *获取当前网络类型
 */
function connectionType() {
    var connectionType = api.connectionType;
    if (connectionType == "unknown" || connectionType == "none" || connectionType == "ethernet") {
        defaultToast("网络连接失败!");
        return false;
    }
    return true;
}

/**
 * 	服务器端日期格式化成字符串
 * @param {Object} obj java.util.Date
 */
function parseDateToStr(obj) {
    var dateObj = eval(obj);
    var time = dateObj.time;
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

function getRadioBoxValue(radioName) {
    var obj = document.getElementsByName(radioName);
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
            return obj[i].value;
        }
    }
    return "undefined";
}

/**
 * 发消息
 */
function sendMsg(num, msgTxt) {
    api.sms({
        numbers: [num],
        text: msgTxt,
        silent: false
    }, function(ret, err) {
        if (ret && ret.status) {
            //已发送
        } else {
            //发送失败
        }
    });
}

/**
 * 打电话
 */
function telPhone(num) {
    var systemType = api.systemType;

    if (systemType == "android") {
        //android
        api.call({
            type: 'tel_prompt',
            number: num
        });
    } else {
        //ios
        api.call({
            type: 'tel_prompt',
            number: num
        });
    }
}

/**
 * 复制
 */
function copyTxt(obj) {
    var clipBoard = api.require('clipBoard');
    clipBoard.set({
        value: obj
    }, function(ret, err) {
        if (ret) {
            defaultToast("复制到剪切板成功");
        }
    });
}

/**
 * 获取访问服务器附件标准路径
 */
function getServerFilePath() {
    var path = "http://" + api.loadSecureValue({
        sync: true,
        key: 'IP'
    }) + ":" + api.loadSecureValue({
        sync: true,
        key: 'PORT'
    });
    return path;
}

/**
 * 打开doc类型文件  只支持本地文件路径
 * @param {Object} filePath
 */
function openDocFile(filePath) {
    var docReader = api.require('docReader');
    docReader.open({
        path: filePath,
        autorotation: false
    }, function(ret, err) {
        if (!ret.status) {
            alert(JSON.stringify(err));
        }
    });
}

/**
 * 打开pdf格式的文件  支持本地和网络两种打开
 * @param {Object} filePath
 */
function openPDFFile(filePath) {
    var pdfReader = api.require('pdfReader');
    pdfReader.open({
        path: filePath,
        hidden: {
            print: true,
            export: true,
            bookmark: true,
            email: true
        }
    });
}

/**
 * 减法运算
 */
function numSub(num1, num2) {
    var baseNum, baseNum1, baseNum2;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    var precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
}

/**
 *加法运算
 * @param {Object} num1
 * @param {Object} num2
 */
function numAdd(num1, num2) {
    var baseNum, baseNum1, baseNum2;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    var precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2; //精度
    return ((num1 * baseNum + num2 * baseNum) / baseNum).toFixed(precision);;
}

/**获取uuid*/
function getUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

/** 界面跳转*/
function pageJump(name, url, nameParam) {
    api.openWin({
        name: name,
        url: url,
        pageParam: {
            name: nameParam
        },
        bounces: false,
        bgColor: 'rgba(239,242,247,1)',
        vScrollBarEnabled: false,
        hScrollBarEnabled: false
    });
}

/** 界面跳转判断是否登录*/
function pageJumpCheckLogin(name, url, loginUrl, nameParam) {
    var userId = getStorage("userId");
    if (userId) {
        api.openWin({
            name: name,
            url: url,
            pageParam: {
                name: nameParam
            },
            pageParam: {
                name: 'test'
            },
            bounces: false,
            bgColor: 'rgba(239,242,247,1)',
            vScrollBarEnabled: false,
            hScrollBarEnabled: false
        });

    } else {
        api.openWin({
            name: 'login',
            url: loginUrl,
            pageParam: {
                name: nameParam
            },
            pageParam: {
                name: 'test'
            },
            bounces: false,
            bgColor: 'rgba(239,242,247,1)',
            vScrollBarEnabled: false,
            hScrollBarEnabled: false
        });
    }
}

/** 验证用户审核状态*/
function pageJumpCheckStatus(name, url, loginUrl, nameParam, indentificationUrl) {
    var userId = getStorage("userId");
    var userType = getStorage('userType');
    var userAppType = getStorage('userAppType');
    if (userId) {
        if (userAppType == '1' && (userType == '1' || userType == '2' || userType == '4')) {
            showDialog(userType, indentificationUrl);
            return;
        }
        api.openWin({
            name: name,
            url: url,
            pageParam: {
                name: nameParam
            },
            bounces: false,
            bgColor: 'rgba(239,242,247,1)',
            vScrollBarEnabled: false,
            hScrollBarEnabled: false
        });
    } else {
        api.openWin({
            name: 'login',
            url: loginUrl,
            pageParam: {
                name: nameParam
            },
            bounces: false,
            bgColor: 'rgba(239,242,247,1)',
            vScrollBarEnabled: false,
            hScrollBarEnabled: false
        });
    }
}

// 审核弹窗
function showDialog(userType, indentificationUrl) {
    var dialog = new auiDialog();

    if (userType == "4") { //判断条件使用时修改
        dialog.alert({
            title: "<img src = '../../image/user/dialog_a.png'>",
            msg: '<p style="color:#222;font-weight:bold;font-size:0.85rem;">审核未通过</p><p style="color:#999;font-size:0.75rem;">当等待运营人员完成审核后使用该功能</p>',
            buttons: ['', '重新认证']
        }, function(ret) {
            if (ret) {
                api.openWin({
                    name: 'user_indentification_win',
                    url: indentificationUrl,
                    pageParam: {
                        name: 'user_indentification_win'
                    }
                });
            }
        });
    } else if (userType == "2") {
        dialog.alert({
            title: "<img src='../../image/user/dialog_a.png'>",
            msg: '<p style="color:#222;font-weight:bold;font-size:0.85rem;">正在审核中</p><p style="color:#999;font-size:0.75rem;">当等待运营人员完成审核后使用该功能</p>',
            buttons: ['', '确认']
        }, function(ret) {
            console.log(ret);
        });
    } else if (userType == "1") {
        dialog.alert({
            title: "<img src='../../image/user/dialog_a.png'>",
            msg: '<p style="color:#222;font-weight:bold;font-size:0.85rem;">未审核</p><p style="color:#999;font-size:0.75rem;">当等待运营人员完成审核后使用该功能</p>',
            buttons: ['', '进行审核']
        }, function(ret) {
            if (ret) {
                api.openWin({
                    name: 'user_indentification_win',
                    url: indentificationUrl,
                    pageParam: {
                        name: 'user_indentification_win'
                    }
                });
            }
        });
    }
}
