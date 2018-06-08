/** 提醒的数据库操作工具类*/

/** 日历操作模块*/
var calendarMemo;

/** 添加提醒 先添加到日历，成功后加入数据库*/
function addRemind(remindBean) {

    if (typeof(calendarMemo) == 'undefined') {
        calendarMemo = api.require('calendarMemo');
    }
    calendarMemo.addEvent({
        title: remindBean.eventTitle,
        description: remindBean.eventContent,
        startTime: remindBean.eventTime,
        endTime: remindBean.eventTime
    }, function(ret) {
      //console.log(JSON.stringify(ret));
        if (ret) {
            remindBean.eventId = ret.eventId;
            var insertSql = "insert into user_medicines_remind(id,drug_id,status,event_title,event_id,prescription_id,event_content,event_time,user_id) " +
                "values('" + remindBean.id + "','" + remindBean.drugId + "','" + remindBean.status + "','" + remindBean.eventTitle + "','" + remindBean.eventId +
                "','" + remindBean.prescriptionId + "','" + remindBean.eventContent + "','" + remindBean.eventTime + "','" + remindBean.userId + "')";
            var status = executeSqlSync(insertSql);
        }
    });
}

/** 推送的数据进行封装添加*/
function addRemindFuc(data) {
    var dataObj = data;
    var userId = dataObj.extra.userId;
    if (userId == getStorage('userId')) {
        closeRemind(userId);//关闭当前提醒
        removeEventFromCalendar();//移除日历中的通知
        var title = dataObj.extra.title;
        var takeDrugId = dataObj.extra.takeDrugId;
        var content = dataObj.extra.records;
        var contentArr = content.split(';');
        //contentArr.splice(0,1);
        for(var i = 0;i < contentArr.length;i++){//循环添加提醒数据
          var remindBean = new Object();
          remindBean.id = getUUID();
          remindBean.drugId = takeDrugId;
          remindBean.status = 1;
          remindBean.eventTitle = title;
          remindBean.prescriptionId = takeDrugId;
          remindBean.eventTime = contentArr[i];
          remindBean.eventContent = contentArr[++i];
          remindBean.userId = userId;
          addRemind(remindBean);
        }
    }
}

/** 打开提醒*/
function openRemind(userId) {
    var openRemindSql = "update user_medicines_remind set status='1' where user_id = '" + userId + "'";
    executeSqlSync(openRemindSql);
}

/** 关闭提醒*/
function closeRemind(userId) {
    var closeRemindSql = "update user_medicines_remind set status = '0' where user_id = '" + userId + "'";
    executeSqlSync(closeRemindSql);
}

/** 移除提醒*/
function removeRemind(id) {
    var deleteSql = "delete from user_medicines_remind where id = '" + id + "'";
    executeSqlSync(deleteSql);
}

/** 获取提醒列表*/
function selectRemindList() {
    var selectRemind = "select * from user_medicines_remind where status = '1' ";
    if (typeof(calendarMemo) == 'undefined') {
        calendarMemo = api.require('calendarMemo');
    }
    calendarMemo.getAllEvent(function(ret) {
        if (ret) {
            var eventArr = ret.result;
            //console.log('getAllEvent-->' + JSON.stringify(ret));
        }
    });
    return selectSqlSync(selectRemind);
}

/** 获取提醒信息*/
function selectRemindById(id) {
    var selectSql = "select * from user_medicines_remind where id = '" + id + "'";
    return selectSqlSync(selectSql);
}

/** 获取当前用户的所有提醒数据*/
function selectUserAllRemind(userId) {
    var selectSql = "select * from user_medicines_remind where user_id = '" + userId + "'";
    return selectSqlSync(selectSql);
}

/** 移除日历中的提醒*/
function removeEventFromCalendar() {
    if (typeof(calendarMemo) == 'undefined') {
        calendarMemo = api.require('calendarMemo');
    }
    calendarMemo.getAllEvent(function(ret) {
        if (ret) {
            //console.log(JSON.stringify(ret));
            var eventArr = ret.result;
            for (var i = 0; i < eventArr.length;i++) {
                console.log(JSON.stringify(eventArr[i].eventId));
                calendarMemo.removeEvent({
                    eventId: eventArr[i].eventId
                }, function(ret) {
                  //console.log(JSON.stringify(ret));
                });
            }
        }
    });
}

/**　处方相关数据保存*/
function addPrescription(prescription) {
    var insertSql = "insert into user_prescription(prescription_flag,prescription_id) " +
        "values('" + prescription.prescriptionFlag + "','" + prescription.prescriptionId + "')";
    executeSqlSync(insertSql);
}

/**更新处方数据*/
function updatePrescription(prescriptionId, prescriptionFlag) {
    var updateSql = "update user_prescription set prescription_flag = " + prescriptionFlag + "where prescription_id = " + prescriptionId;
    executeSqlSync(updateSql);
}

/** 根据处方id查询数据*/
function selectPrescription(prescriptionId) {
    var selectSql = "select * from user_prescription where prescription_id = " + prescriptionId;
    return selectSqlSync(selectSql);
}
