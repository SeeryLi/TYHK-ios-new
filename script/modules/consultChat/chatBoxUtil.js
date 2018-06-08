/** 咨询聊天注入框工具类*/

var UIChatBox;
apiready = function() {
    UIChatBox = api.require('UIChatBox');
    openBox();
};

/** 关闭输入框*/
function closeBox(el) {
    UIChatBox.close();
}

/** 显示输入框*/
function showBox(el) {
    UIChatBox.show();
}

/** 隐藏输入框*/
function hideBox(el) {
    UIChatBox.hide();
}

/** 显示扩展内容*/
function popupBoard(el) {
    UIChatBox.popupBoard({
        target: 'extras'
    });
}

/** 设置、获取输入框的值*/
function valueSetBox(el){
    if( el.innerHTML === '设置' ){
        UIChatBox.value({
            msg: '使用 value 设置新值'
        });
    }else{
        UIChatBox.value(function(ret, err){
            if( ret ){
                console.log("fnValue-->" + JSON.stringify(ret));
            }else{
                console.log("fnValue-->" + JSON.stringify(ret));
            }
        });
    }
}

/**在输入框的最后插入值*/
function insertValueBox( el){
    UIChatBox.insertValue({
        msg: '使用 insertValue 插入的新值'
    });
}

/** 监听按钮*/
function fnAddEventListener( el){
    if( el.innerHTML === '监听 recordBtn 按钮' ){
        UIChatBox.addEventListener({
            target: 'recordBtn',
            name: 'press'
        }, function( ret, err ){
            if( ret ){
                console.log("recordBtn-->" + JSON.stringify(ret));
            }else{
                console.log("recordBtn-->" + JSON.stringify(ret));
            }
        });
    }else{
       UIChatBox.addEventListener({
            target: 'inputBar',
            name: 'move'
        }, function( ret, err ){
            if( ret ){
                console.log("inputBar-->" + JSON.stringify(ret));
            }else{
                console.log("inputBar-->" + JSON.stringify(ret));
            }
        });
    }
}

function fnSetPlaceholder( el){
    UIChatBox.setPlaceholder({
        placeholder: '修改了占位提示内容'
    });
}

/** 打开输入框*/
function openBox( el ){
    UIChatBox.open({
        placeholder: '输入发送内容',
        autoFocus: true,
        emotionPath: 'widget://image/emotion',
        styles: {
            extrasBtn: {
                normalImg: 'widget://image/add1.png'
            },
            speechBtn: {
                normalImg: 'widget://image/cam1.png'
            },
            indicator: {
                target: 'extrasPanel',
                color: '#c4c4c4',
                activeColor: '#9e9e9e'
            },
            sendBtn: {
                titleColor: '#4cc518',
                bg: '#999999' ,
                activeBg: '#46a91e',
                titleSize: 14
            }
        },
        extras: {
            titleSize: 10,
            titleColor: '#a3a3a3',
            btns: [{
                title: '图片',
                normalImg: 'widget://image/album1.png',
                activeImg: 'widget://image/album2.png'
            },{
                title: '发送地址',
                normalImg: 'widget://image/loc1.png',
                activeImg: 'widget://image/loc2.png'
            },{
                title: '图片',
                normalImg: 'widget://image/album1.png',
                activeImg: 'widget://image/album2.png'
            },{
                title: '发送地址',
                normalImg: 'widget://image/loc1.png',
                activeImg: 'widget://image/loc2.png'
            },{
                title: '图片',
                normalImg: 'widget://image/album1.png',
                activeImg: 'widget://image/album2.png'
            },{
                title: '发送地址',
                normalImg: 'widget://image/loc1.png',
                activeImg: 'widget://image/loc2.png'
            },{
                title: '图片',
                normalImg: 'widget://image/album1.png',
                activeImg: 'widget://image/album2.png'
            },{
                title: '发送地址',
                normalImg: 'widget://image/loc1.png',
                activeImg: 'widget://image/loc2.png'
            },{
                title: '图片',
                normalImg: 'widget://image/album1.png',
                activeImg: 'widget://image/album2.png'
            },{
                title: '发送地址',
                normalImg: 'widget://image/loc1.png',
                activeImg: 'widget://image/loc2.png'
            },{
                title: '图片',
                normalImg: 'widget://image/album1.png',
                activeImg: 'widget://image/album2.png'
            },{
                title: '发送地址',
                normalImg: 'widget://image/loc1.png',
                activeImg: 'widget://image/loc2.png'
            }]
        }
    }, function( ret, err ){
        if( ret ){
            console.log("open-->" + JSON.stringify(ret));
        }else{
            console.log("open-->" + JSON.stringify(err));
        }
    });
}
