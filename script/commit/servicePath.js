/** 服务器请求接口地址*/
var title = "http";

var port = "8080";

//test-environment
// var environment = "119.27.189.175";
//real-environment
var environment = "139.199.108.19";

var servicePath = title + '://' + environment + ':' + port;

/** 图片拼接地址*/
var imagePath = servicePath + '/sunflower';

/** 服务器请求地址*/
var servicePathSer = servicePath + "/sunflower/api";

/**咨询文件下载*/
var consultFileDownload = servicePathSer + '/consult/download';

/** 验证更新*/
var verifyUpgradeSer = servicePathSer + '/verifyUpgrade';

/** 登录*/
var loginSer = servicePathSer + "/login";

/** 注销*/
var loginOutSer = servicePathSer + "/logout";

/** 获取当前用户信息*/
var getUserInfoSer = servicePathSer + "/getMyBaseInfo";

/** 获取指定医生的详细信息1*/
var getDoctorInfoSer = servicePathSer + "/getDoctorInfo";

/** 修改用户信息 flag 1:姓名 2:性别 3:年龄 4:学历*/
var changeUserInfoSer = servicePathSer + "/updateUserInfo";

/** 获取收货地址 */
var getAddress = servicePathSer + "/getAddress";

/** 修改收货地址 */
var updateAddress = servicePathSer + "/updateAddress";

/** 请求验证码*/
var getVerificationCodeSer = servicePathSer + "/getVerificationCode";

/** 忘记密码,重置密码*/
var passwordForget = servicePathSer + "/forgetPasswordAndResetPassword";

/** 注册*/
var registerSer = servicePathSer + "/registerUser";

/** 反馈*/
var feedbackSer = servicePathSer + "/commitFeedBack";

/** 短信验证码 -- 用于注册、忘记密码修改密码、提现*/
var sendMessageSer = servicePathSer + "/sendSMS";

/**用户--获取任务列表*/
var getUserTaskSer = servicePathSer + "/getMyTask";

/** 用户--获取我的交易明细*/
var getUserMoneyInfoSer = servicePathSer + "/getMyTransactionDetail";

/**用户--获取剩余的币*/
var getMyCurrencySer = servicePathSer + "/getMyCurrency";

/** 用户--提现*/
var withdrawDepositSer = servicePathSer + '/withdrawDeposit';

/** 用户--我的消息记录*/
var getMyNoticesSer = servicePathSer + '/getNotices';

/** 用户--获取二维码*/
var getQRCodeSer = servicePathSer + '/getMyQRCode';

/**用户认证*/
var patientIdentificationSer = servicePathSer + '/patientIdentification';

/** 用户--忘记密码短信发送*/
var sendUpdateSMSser = servicePathSer + '/sendUpdateSMS';

/** 医生--通知信息*/
var getDoctorNoticesSer = servicePathSer + '/getDoctorNotices';

/** 医生--修改医生的咨询费用*/
var editDoctorConsultPriceSer = servicePathSer + '/editDoctorConsultPrice';

/** 医生--获取咨询费用和咨询状态*/
var getDoctorConsultMoneySer = servicePathSer + '/getDoctorConsultMoney';

/** 医生--获取医生的金币余额*/
var getDoctorCurrencySer = servicePathSer + '/getDoctorCurrency';

/** 医生--获取消费明细*/
var getDoctorTransactionDetailSer = servicePathSer + '/getDoctorTransactionDetail';

/** 医生--获取消息*/
var getDoctorNotices = servicePathSer + '/getDoctorNotices'

/** 咨询--文件上传*/
var fileUplod = servicePathSer + "/consult/uploadFiles";

/** 专业咨询--聊天文件上传*/
var chatFileUpload = servicePathSer + '/message/uploadFiles';

/** 咨询--获取医生列表，适用于 咨询医生列表，推荐医生，关注医生列表等*/
var consultDocSer = servicePathSer + "/getDoctorList";

/** 咨询--新建咨询，患者提交咨询1*/
var consultAddSer = servicePathSer + "/addConsult";

/** 咨询--获取患者发起的咨询
（用于自己查询自己的咨询，家属查看患者咨询，医生查看患者咨询（如果有权限））1*/
var patientConsultRecordsSer = servicePathSer + "/getPatientConsultRecords";

/** 咨询--获取医生的解答记录1*/
var doctorAnswerRecordsSer = servicePathSer + "/getDoctorAnswerRecords";

/** 咨询--医生关闭咨询*/
var doctorCloseConsultSer = servicePathSer + "/doctorCloseConsult";

/** 咨询--发送聊天消息*/
var consultChatSendNewMessageSer = servicePathSer + "/consultChatSendNewMessage";

/**咨询--获取咨询聊天列表*/
var consultChatHistoryRecordsSer = servicePathSer + "/getConsultChatHistoryRecords";

/** 咨询--患者评星(患者可对医生已经关闭的咨询进行评星，也可直接评星，直接评星则说明患者不需要再咨询该问题)*/
var consultRatingSer = servicePathSer + "/consultRating";

/** 咨询--获取医生的可咨询状态*/
var getDoctorConsultStatSer = servicePathSer + "/getDoctorConsultState";

/** 咨询--医生取消打开的公海咨询（医生没有回复的情况下可以取消公海中打开的咨询，这样其它医生就可再来锁定这个咨询）（公海锁定的咨询将受到上限限制)*/
var doctorCancelConsultSer = servicePathSer + '/doctorCancelConsult';

/** 咨询--获取医院列表*/
var getHospitalsSer = servicePathSer + "/getHospitals";

/** 咨询--获取医生等级费用*/
var getDoctorRankMoney = servicePathSer + '/getDoctorRankMoney';

/**咨询--获取医生评论列表*/
var getDoctorCommentsSer = servicePathSer + '/getDoctorComments';

/** 咨询获取评论内容*/
var getConsultCommentAndRatingSer = servicePathSer + '/getConsultCommentAndRating';

/** 咨询--医生--获取医生历史咨询记录*/
var doctorConsultRecordsSer = servicePathSer + '/getDoctorConsultRecords';

/** 咨询--医生--获取医生正在咨询*/
var doctorConsultSer = servicePathSer + '/getDoctorConsultIng';

/** 咨询--医生--获取咨询库*/
var fastConsultWaitingForReplySer = servicePathSer + '/getFastConsultWaitingForReply';

/** 咨询--医生--绑定快速咨询*/
var doctorOpenConsultSer = servicePathSer + '/doctorOpenConsult';

/** 咨询--获取咨询详情*/
var getConsultChatInfoSer = servicePathSer + '/getConsultChatInfo';

/** 咨询--医生--关闭咨询*/
var doctorCloseConsultSer = servicePathSer + '/doctorCloseConsult';

/**咨询--医生--修改医生的咨询状态*/
var editDoctorConsultStatusSer = servicePathSer + '/editDoctorConsultStatus';

/** 测试--获取测试试题列表*/
var getTestQuestionsSer = servicePathSer + "/selftest/tyhTestDirectory/list";

/** 测试--提交测试结果*/
var commitTestResult = servicePathSer + "/selftest/tyhTestDirectory/resultAnalysis";

/** 测试--获取某测试题测试目录*/
var getTestCatalogueSer = servicePathSer + '/selftest/tyhTestQuestions/list';

/** 测试--查看测试记录列表
（用户可查看自己的测试记录、医生可查看患者的测试记录）*/
var getTestRecordSer = servicePathSer + '/getTestRecords';

/** 测试--回显测试明细
（查看某次测试的明细内容）*/
var getTestDetailSer = servicePathSer + '/getTestDetail';

/** 测试--扣金币*/
var testConsume = servicePathSer + '/selftest/tyhTestDirectory/consumeAndchooseDirectoryById';

/** 测试--获取用户的测试结果*/
var userTestResult = servicePathSer + '/selftest/tyhTestDirectory/personTestResult';

/** 测试--获取测试结果*/
var getUserTestResult = servicePathSer + '/selftest/tyhTestDirectory/findResultByRecord';

/**知识库--获取知识库列表*/
var getRepositorySer = servicePathSer + '/getRepositoryBase ';

/** 知识库--获取推荐知识(接口根据lastReadRepositoryId
或者lastReadRepositoryFlags获得该用户最后阅读的相关类型的推荐，加上最热的数据和最新的数据一共返回手机端最多1.5amount条推荐数据)*/
var getRepositorysSer = servicePathSer + '/getRepository';

/** 知识库--获得知识库详情
（再购买后由APP再次调用该接口以获取完整的内容和购买状态等）*/
var getRepositoryInfoSer = servicePathSer + '/getRepositoryInfo';

/**知识库--购买*/
var purchaseRepositorySer = servicePathSer + '/ratingRepository';

/** 知识库--获取知识库类别*/
var getPaperTypeSer = servicePathSer + '/getPaperType';

/** 服药提醒--获取未确认的服药列表数据*/
var getMedicinesNoticesSer = servicePathSer + '/getMedicinesNotices';

/**服药提醒--服药确认*/
var confirmTakeDrugSer = servicePathSer + '/confirmTakeDrug';

/** 服药提醒--获取药品列表*/
var getMedicinesSer = servicePathSer + '/getMedicines';

/**修改提醒时间*/
var updateUserSendTimeSer = servicePathSer + '/updateUserSendTime';

/** 服药提醒--获取用户服药单*/
var getUserTakeDrugSer = servicePathSer + '/getUserTakeDrug';

/** 服药提醒--医生开药*/
var addNewDrugSer = servicePathSer + '/addNewDrugMould';

/** 病人支付*/
var payNewDrugSer = servicePathSer + '/addNewDrug';

/** 获取新开药品*/
var getNewDrugSer = servicePathSer + '/getNewDrugMould';

/** 服药提醒--医生修改服药单界面数据接口*/
var getUserTakeDrugRecordSer = servicePathSer + '/getUserTakeDrugRecord';

/** 服药提醒--医生修改服药单*/
var updateTakeDrugSer = servicePathSer + '/updateTakeDrug';

/** 服药提醒--服药记录*/
var getUsersAllTakeDrugSer = servicePathSer + '/getUserAllTakeDrug';

/** 服药提醒--处方验证*/
var prescriptionVerifySer = servicePathSer + '/prescriptionVerify';

/** 服药提醒--未服药提醒*/
var getNotEatTakeDrugNewsSer = servicePathSer + '/getNoEatTakeDrugNews';

/**  用户确认是否吃完药*/
var updateIsEatSer = servicePathSer + '/updateIsEat';

/** 进入首页我的医生*/

var enterPhysicianSer = servicePathSer + '/enterPhysician';

/**新开咨询*/
var newMessageWithPhysicianSer = servicePathSer + '/newMessageWithPhysician';

/**获取服药单确认消息*/
var getConfirmTakeDrugSer = servicePathSer + '/getConfirmTakeDrug';

/**上传生活照和个人病例*/
var insertIndividualCaseSer = servicePathSer + '/insertIndividualCase';

/** 医生查看患者头像*/
var getPatientDataByUserIdSer = servicePathSer + '/getPatientDataByUserId';

/** wxpay获取订单号*/
var wxPayPrepaySer = servicePathSer + '/tenpay/prepay';

/** 用户协议内容*/
var getUserProtocolSer = servicePathSer + '/getUserProtocol';

/** 复诊报告*/
var returnReportDisplaySer = servicePathSer + '/returnReport/returnReportDisplay';

/** 查看与当前医生是否有咨询*/
var findConsultWithDoctorSer = servicePathSer + '/findConsultWithDoctor';

//用户自己操作绑定医生
var setVoidTakeDrugSer = servicePathSer + '/setVoidTakeDrug';

//医生聊天框点击进入查看修改的服药单新接口
var getUpdateTakeDrugSer = servicePathSer + '/getUpdateTakeDrug';

//IOS轮询查看是否已付款
var getIsPaySer = servicePathSer + '/getIsPay';
