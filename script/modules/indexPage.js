
/**
 * 初始化加载app的监听事件
 */
function initEventListener() {
    //返回事件监听
    api.addEventListener({
        name: 'keyback'
    }, function(ret, err) {
        //用户按返回键则系统退到后台运行
        api.toLauncher();
    });

    //Window 显示到屏幕的事件
    api.addEventListener({
        name: 'viewappear'
    }, function(ret, err) {

    });

    //应用从后台回到前台事件
    api.addEventListener({
        name: 'resume'
    }, function(ret, err) {


    });

    //监听app从新登录
    api.addEventListener({
        name: 'againLogin'
    }, function(ret, err) {
        api.openWin({
            name: 'login',
            url: 'html/login.html'
        });
    });
}

/**
 * 打开分组窗口--医生
 */
function funIniGroupDoctor() {
    var eHeaderLis = $api.domAll('header li');
    var eHeaderLis = $api.domAll('header li');
    var doctorFrames = [];

    //咨询中
    doctorFrames.push({
        name: 'doctor_consult',
        url: './html/doctor/doctor_consult.html',
        bgColor: 'rgba(239,242,247,1)',
        bounces: false
    });
    //咨询库
    // doctorFrames.push({
    //     name: 'doctor_consult_lib',
    //     url: './html/doctor/doctor_consult_lib.html',
    //     bgColor: 'rgba(0,0,0,.2)',
    //     bounces: false
    // });
    //消息
    doctorFrames.push({
        name: 'doctor_message',
        url: './html/doctor/doctor_message.html',
        bgColor: 'rgba(0,0,0,.2)',
        bounces: false
    });
    //我的
    doctorFrames.push({
        name: 'doctor_main',
        url: './html/doctor/doctor_main.html',
        bgColor: 'rgba(0,0,0,.2)',
        bounces: false
    });

    api.closeFrameGroup({
        name: 'group'
    });
    api.openFrameGroup({
        name: 'groupDoctor',
        scrollEnabled: false,
        rect: {
            x: 0,
            y: $api.dom('header').offsetHeight,
            w: api.winWidth,
            h: $api.dom('#main').offsetHeight
        },
        index: 0,
        frames: doctorFrames
    }, function(ret, err) {
      var eFootLis = $api.domAll('#footer-doctor li'),
          eHeaderLis = $api.domAll('#home-doctor-title li'),
          index = ret.index;
          for (var i = 0, len = eFootLis.length; i < len; i++) {
                $api.removeCls(eFootLis[i], 'active');
                $api.removeCls(eHeaderLis[i], 'active');
          }
          $api.addCls(eFootLis[index], 'active');
          $api.addCls(eHeaderLis[index], 'active');
    });
}

/**
 * 打开分组窗口--患者
 */
function funIniGroup() {
    var eHeaderLis = $api.domAll('header li');
    var eHeaderLis = $api.domAll('header li');
    var frames = [];

    //首页
    frames.push({
        name: 'home_page_win',
        url: './html/home_page_win.html',
        bgColor: 'rgba(239,242,247,1)',
        bounces: false
    });
    //发现页
    frames.push({
        name: 'repository_list_frm',
        url: './html/repository/repository_list_frm.html',
        bgColor: 'rgba(0,0,0,.2)',
        bounces: false
    });
    //咨询页
    // frames.push({
    //     name: 'consult',
    //     url: './html/consult.html',
    //     bgColor: 'rgba(0,0,0,.2)',
    //     bounces: false
    // });

    //圈子
    // frames.push({
    //     name: 'community_frm',
    //     url: './html/community/community_frm.html',
    //     bgColor: 'rgba(0,0,0,.2)',
    //     bounces: false
    // });
    //我页
    frames.push({
        name: 'userMain',
        url: './html/userMain.html',
        bgColor: 'rgba(0,0,0,.2)',
        bounces: false
    });

    api.closeFrameGroup({
        name: 'groupDoctor'
    });
    api.openFrameGroup({
        name: 'group',
        scrollEnabled: false,
        rect: {
            x: 0,
            y: $api.dom('header').offsetHeight,
            w: api.winWidth,
            h: $api.dom('#main').offsetHeight
        },
        index: 0,
        frames: frames
    }, function(ret, err) {
        if (ret) {
          var eFootLis = $api.domAll('#footer li'),
              eHeaderLis = $api.domAll('#home-normal-title li'),
              index = ret.index;
              for (var i = 0, len = eFootLis.length; i < len; i++) {
                    $api.removeCls(eFootLis[i], 'active');
                    $api.removeCls(eHeaderLis[i], 'active');
              }
              $api.addCls(eFootLis[index], 'active');
              $api.addCls(eHeaderLis[index], 'active');
        }
    });
}

// 随意切换按钮--患者
function randomSwitchBtn(tag,inner) {
    if (tag == $api.dom('#footer li.active')) return;
    var eFootLis = $api.domAll('#footer li'),
        eHeaderLis = $api.domAll('#home-normal-title li'),
        index = 0;
    for (var i = 0, len = eFootLis.length; i < len; i++) {
        if (tag == eFootLis[i]) {
            index = i;
        } else {
            $api.removeCls(eFootLis[i], 'active');
            $api.removeCls(eHeaderLis[i], 'active');
        }
    }
    $api.addCls(eFootLis[index], 'active');
    $api.addCls(eHeaderLis[index], 'active');
    if(inner == 0){
        api.sendEvent({
          name : 'refershUserHomePage'
        })
    }
    if(inner == 3){
      api.sendEvent({
        name : 'refershUserInfo'
      })
    }
      api.setFrameGroupIndex({
          name: 'group',
          index: index
      });
}

/** 医生--随意切换按钮*/
function randomSwitchBtnDoctor(tag,inner) {
    if (tag == $api.dom('#footer-doctor li.active')) return;
    var eFootLis = $api.domAll('#footer-doctor li'),
        eHeaderLis = $api.domAll('#home-doctor-title li'),
        index = 0;
    for (var i = 0, len = eFootLis.length; i < len; i++) {
        if (tag == eFootLis[i]) {
            index = i;
        } else {
            $api.removeCls(eFootLis[i], 'active');
            $api.removeCls(eHeaderLis[i], 'active');
        }
    }
    $api.addCls(eFootLis[index], 'active');
    $api.addCls(eHeaderLis[index], 'active');
    if(inner == 0){
      api.sendEvent({
        name : 'refershDocRequest'
      })
    }
    if(inner == 2)(
      api.sendEvent({
        name : 'refershDocMessage'
      })
    )
    if(inner == 3)(
      api.sendEvent({
        name : 'refershDocInfo'
      })
    )
    api.setFrameGroupIndex({
        name: 'groupDoctor',
        index: index
    });
}
