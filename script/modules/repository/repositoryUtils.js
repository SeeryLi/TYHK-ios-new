/** 跳转知识库详情*/
function jumpRepositoryInfo(repositoryId, price) {
    if (price > 0) {
        if (getStorage('userId')) {
            var userType = getStorage('userType');
            var userAppType = getStorage('userAppType');
            if (userAppType == '2') {
              if (userType == '1' || userType == '2' || userType == '4') {
                showDialog(userType);
                return;
              }
            }
            api.openWin({
                name: 'repository_detail_win',
                url: './repository_detail_win.html',
                pageParam: {
                    repositoryId: repositoryId,
                    price: price
                }
            });
        } else {
            pageJump('login', '../login.html', 'repository_list_frm');
        }
    } else {
        api.openWin({
            name: 'repository_detail_win',
            url: './repository_detail_win.html',
            pageParam: {
                repositoryId: repositoryId,
                price: price
            }
        });
    }
}

// 审核弹窗
function showDialog(userType,indentificationUrl,imgUrl) {
    var dialog = new auiDialog();
    if (userType == "4") { //判断条件使用时修改
        dialog.alert({
            title: "<img src='../../image/user/dialog_a.png'>",
            msg: '<p style="color:#222;font-weight:bold;font-size:0.85rem;">审核未通过</p><p style="color:#999;font-size:0.75rem;">当等待运营人员完成审核后使用该功能</p>',
            buttons: ['', '重新认证']
        }, function(ret) {
            if (ret) {
                api.openWin({
                    name: 'user_indentification_win',
                    url: indentificationUrl,
                    pageParam: {
                        name: '../../html/user/user_indentification_win.html'
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
    }else if (userType == "1"){
      dialog.alert({
          title: "<img src='../../image/user/dialog_a.png'>",
          msg: '<p style="color:#222;font-weight:bold;font-size:0.85rem;">未审核</p><p style="color:#999;font-size:0.75rem;">当等待运营人员完成审核后使用该功能</p>',
          buttons: ['', '进行审核']
      }, function(ret) {
          if (ret) {
              api.openWin({
                  name: 'user_indentification_win',
                  url: '../../html/user/user_indentification_win.html',
                  pageParam: {
                      name: 'user_indentification_win'
                  }
              });
          }
      });
    }
}
