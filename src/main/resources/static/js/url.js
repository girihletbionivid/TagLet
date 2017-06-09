
//var server = "cloud.bionivid.com";
//var port = "";
//var server = "localhost";
//var server = "10.0.0.23";

var protocol = "http://";
var appName = "genomewebserver";
var port = "8081";
var folder="webpage";
var server=document.getElementById("myio").innerHTML;

var basicUrl = protocol + server + ":" + port + /*"/"+appName+*/"/" ;

var linkUrl=protocol + server + ":" + port + "/"+folder + "/";
var URL_GET_DIRECTORY=basicUrl+"get/user/directory";
var URL_GET_SUB_DIRECTORY=basicUrl+"get/sub/directory";
var URL_CREATE_SUB_DIRECTORY=basicUrl+"create/sub/directory";
var URL_CREATE_SUB_MAIN_DIRECTORY=basicUrl+"create/user/sub/directory";

//===========================registration admin======================
	
var URL_USER_REGISTRATION = basicUrl + "user/register";
var URL_USER_LOGIN = basicUrl + "user/login";
var URL_GET_USER_PROCESSES = basicUrl +"user/get/process";
var URL_RESUME_PROCESSES = basicUrl +"processes/resume";

var URL_GET_ATTRI_PROCESSES = basicUrl +"processes/get/attributes";
var URL_CLOSE_PROCESSES = basicUrl +"user/close/process";
var URL_REMOVE_PROCESSES = basicUrl +"user/remove/process";
var URL_GET_PROCESSES_OUTPUT = basicUrl +"user/output/process";
var URL_GET_USER_PASSWORD = basicUrl +"user/get/password";
var URL_CHANGE_PASSWORD = basicUrl +"user/change/password";
var URL_DELETE_REPORTS=basicUrl+"user/delete/report";
var URL_GET_REPORTS=basicUrl+"user/get/reports";
var URL_RE_RUN_FORMATEDB=basicUrl+"run/formatdb";
	
var URL_DASHBOARD=basicUrl+"introduction";
var URL_HOME=basicUrl+"index"

//===========================Processing JS======================
	
var URL_FOR_RUNNING_1ST_PROGRAM = basicUrl + "/TagLet";

//=================================qc====================================

var URL_QC_REPORT=basicUrl+"qcreport";
var URL_GENERATE_REPORT=basicUrl+"generate/report/qc";

var URL_LOG_QC=basicUrl+"run/qc/log";
var URL_RUN_QC=basicUrl+"run/qc";

var URL_LOG_QC_ILLUMINA=basicUrl+"run/qc/log";
var URL_RUN_QC_ILLUMINA=basicUrl+"run/illuminax";
