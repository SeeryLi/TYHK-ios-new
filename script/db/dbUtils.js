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
function openDatabase() {
    if (typeof(db) == "undefined") {
        db = api.require('db');
    }
    var ret = db.openDatabase({
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
function closeDatabase() {
    if (typeof(db) == "undefined") {
        db = api.require('db');
    }
    var ret = db.closeDatabase({
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
function beginTransaction() {
    if (typeof(db) == "undefined") {
        db = api.require('db');
    }
    var ret = db.transaction({
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
function commitTransaction() {
    if (typeof(db) == "undefined") {
        db = api.require('db');
    }
    var ret = db.transaction({
        name: dbName,
        operation: 'commit'
    });
    console.log("commitTransaction-->" + JSON.stringify(ret));
    if (!ret.status) {
        //defaultToast(ret.msg);
    }
    return ret.status;
}

/**
 * 回滚事务 (同步)
 */
function rollbackTransaction() {
    if (typeof(db) == "undefined") {
        db = api.require('db');
    }

    var ret = db.transaction({
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
function executeSql(sql) {
    if (typeof(db) == "undefined") {
        db = api.require('db');
    }
    console.log("executeSqlSync-->" + sql);
    //开启事务
    beginTransaction();
    var ret = db.executeSql({
        name: dbName,
        sql: sql
    });
    console.log("executeSql-->" + JSON.stringify(ret));
    if (!ret.status) {
        //alert(ret.msg);
        //defaultToast(ret.msg);
        //回滚事务
        rollbackTransaction();
    } else {
        //提交事务
        commitTransaction();
    }
    return ret.status;
}

/**
 * 同步执行查询语句 返回数组
 * @param {Object} sql
 */
function selectSql(sql) {
    console.log("selectSql sql-->" + JSON.stringify(sql));
    if (typeof(db) == "undefined") {
        db = api.require('db');
    }
    var ret = db.selectSql({
        name: dbName,
        sql: sql
    });
    console.log("selectSql-->" + JSON.stringify(ret));
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
        "PRIMARY KEY (id));";

    if (openDatabase()) {
        //数据库打开成功
        //执行sql语句
        executeSql(createConsultChatMsgSql);
        executeSql(createConsultFileSql);
    }
}
