/**
 * db模块
 * 同步
 *
 */
var db;
var dbName = "cdhncy_TYHK";
/**
 * 打开数据库 (同步)
 * 返回数据库打开状态
 */
function openDatabaseSync() {
    if (typeof(db) == "undefined") {
        db = api.require('db');
    }
    var ret = db.openDatabaseSync({
        name: dbName
    });
    if (!ret.status) {
        defaultToast(ret.msg);
    }
    return ret.status;
}

/**
 * 关闭数据 (同步)
 */
function closeDatabaseSync() {
    if (typeof(db) == "undefined") {
        db = api.require('db');
    }
    var ret = db.closeDatabaseSync({
        name: dbName
    });
    if (!ret.status) {
        //defaultToast(ret.msg);
    }
    return ret.status;
}

/**
 * 开始事务 (同步)
 */
function beginTransactionSync() {
    if (typeof(db) == "undefined") {
        db = api.require('db');
    }
    var ret = db.transactionSync({
        name: dbName,
        operation: 'begin'
    });

    if (!ret.status) {
        //defaultToast(ret.msg);
    }
    return ret.status;
}

/**
 * 提交事务 (同步)
 */
function commitTransactionSync() {
    if (typeof(db) == "undefined") {
        db = api.require('db');
    }
    var ret = db.transactionSync({
        name: dbName,
        operation: 'commit'
    });
    console.log("commitTransactionSync-->" + JSON.stringify(ret));
    if (!ret.status) {
        //defaultToast(ret.msg);
    }
    return ret.status;
}

/**
 * 回滚事务 (同步)
 */
function rollbackTransactionSync() {
    if (typeof(db) == "undefined") {
        db = api.require('db');
    }

    var ret = db.transactionSync({
        name: dbName,
        operation: 'rollback'
    });
    if (!ret.status) {
        //defaultToast(ret.msg);
    }
    return ret.status;
}

/**
 * 同步执行创建、添加、删除、修改表等 sql语句
 * @param {Object} sql
 */
function executeSqlSync(sql) {
    if (typeof(db) == "undefined") {
        db = api.require('db');
    }
    console.log("executeSqlSync-->" + sql);
    //开启事务
    beginTransactionSync();
    var ret = db.executeSqlSync({
        name: dbName,
        sql: sql
    });
    console.log("executeSqlSync-->" + JSON.stringify(ret));
    if (!ret.status) {
        //alert(ret.msg);
        //defaultToast(ret.msg);
        //回滚事务
        rollbackTransactionSync();
    } else {
        //提交事务
        commitTransactionSync();
    }
    return ret.status;
}

/**
 * 同步执行查询语句 返回数组
 * @param {Object} sql
 */
function selectSqlSync(sql) {
    console.log("selectSqlSync sql-->" + JSON.stringify(sql));
    if (typeof(db) == "undefined") {
        db = api.require('db');
    }
    var ret = db.selectSqlSync({
        name: dbName,
        sql: sql
    });
    console.log("selectSqlSync-->" + JSON.stringify(ret));
    if (!ret.status) {
        //defaultToast(ret.msg);
        return "";
    }
    return ret.data;
}

/**
 * 初始化db数据库 包括剪标
 */
function initDB() {
    //专业咨询聊天内容表
    var createConsultChatMsgSql = "CREATE TABLE consult_chat_message (" +
        "id varchar(32) ," +
        "patient_question_id varchar(32) ," +
        "message varchar(256) ," +
        "status varchar(32) ," +
        "tm_message varchar(32) ," +
        "tm_status varchar(32) ," +
        "tm_data varchar(32) ," +
        "message_type varchar(32) ," +
        "from_user_id varchar(32) ," +
        "to_user_id varchar(32) ," +
        "PRIMARY KEY (id));";

    //绑定咨询附件
    var createConsultFileSql = "CREATE TABLE consult_bound_file (" +
        "id varchar(32) ," +
        "requestId varchar(32) ," +
        "file_type varchar(32) ," +
        "file_path varchar(256) ," +
        "upload_time int ," +
        "file_size int ," +
        "file_name varchar(32) ," +
        "PRIMARY KEY (id));";

    //吃药提醒 status 0:打开 1:关闭 id为处方提醒id
    var createMedicinesRemindSql = "CREATE TABLE user_medicines_remind (" +
        "id varchar(32) NOT NULL ," +
        "status int ," +
        "drug_id varchar(32) ," +
        "event_title varchar(32) ," +
        "prescription_id varchar(256) ," +
        "event_id varchar(256) ," +
        "event_content varchar(256) ," +
        "event_time varchar(256) ," +
        "user_id varchar(32) ," +
        "PRIMARY KEY (id));";

    //处方的相关数据保存
    var prescriptionSql = "CREATE TABLE user_prescription (" +
        "id varchar(32) NOT NULL AUTO_INCREMENT ," +
        "prescription_flag varchar(32) ," +
        "prescription_id varchar(32) ," +
        "PRIMARY KEY (id));";

    if (openDatabaseSync()) {
        //数据库打开成功
        //执行sql语句
        executeSqlSync(createConsultChatMsgSql);
        executeSqlSync(createConsultFileSql);
        executeSqlSync(createMedicinesRemindSql);
        executeSqlSync(prescriptionSql);
    }
}
