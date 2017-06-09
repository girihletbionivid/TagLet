//var server = "cloud.bionivid.com";
//var port = "";
var server = "localhost";
var protocol = "http://";
var appName = "genomewebserver";
var port = "8080";
var folder="webpage";
var basicUrl = protocol + server + ":" + port + "/"+appName+"/" ;
var linkUrl=protocol + server + ":" + port + "/"+folder + "/";
///var URL_USER_REGISTER = basicUrl + "user/register";
///var URL_USER_LOGIN = basicUrl + "user/login";

var URL_GET_DIRECTORY=basicUrl+"get/user/directory";
var URL_GET_SUB_DIRECTORY=basicUrl+"get/sub/directory";
var URL_CREATE_SUB_DIRECTORY=basicUrl+"create/sub/directory";
var URL_CREATE_SUB_MAIN_DIRECTORY=basicUrl+"create/user/sub/directory";
//================================================================================

var URL_MERGE_FILES_PAIRED = basicUrl + "paired/merge/files";
var URL_MERGE_FILES_SINGLE = basicUrl + "single/merge/files";
var URL_RUN_STANDART_TRINITY_PAIRED = basicUrl + "run/trinity";
var URL_RUN_HYBRID_TRINITY_PAIRED = basicUrl + "run/hybrid/trinity";
var URL_RUN_REFFERENCE_TRINITY_PAIRED = basicUrl + "run/refference/trinity";
var URL_RUN_HYBRID_AND_REFFERENCE_TRINITY_PAIRED = basicUrl + "run/refference/hybrid/trinity";
var URL_RUN_HYBRID_AND_REFFERENCE_WITHOUT_FA = basicUrl + "run/refference/withoutfa/trinity";
var URL_LOG_PAIRED=basicUrl+"run/trinity/demo";

var URL_RUN_STANDART_TRINITY_SINGLE = basicUrl + "run/single/trinity";
var URL_RUN_HYBRID_TRINITY_SINGLE= basicUrl + "run/hybrid/single/trinity";
var URL_RUN_REFFERENCE_TRINITY_SINGLE = basicUrl + "run/refference/single/trinity";
var URL_RUN_HYBRID_AND_REFFERENCE_TRINITY_SINGLE = basicUrl + "run/refference/hybrid/single/trinity";
var URL_LOG_SINGLE=basicUrl+"run/single/trinity/demo";

var URL_CUSTOME_REPORT=basicUrl+"get/custom/report/trinity";
var URL_CUSTOME_REPORT123=basicUrl+"generate/report/trinity";
var URL_CUSTOME_REPORT_SERVER=basicUrl+"generate/report/serverside/trinity";

var URL_ASSEMBLY_VALIDATION=basicUrl+"run/assembly/validation";
//=================================qc====================================


	var URL_GENERATE_REPORT=basicUrl+"generate/report/qc";


	var URL_LOG_QC=basicUrl+"run/qc/log";
	var URL_RUN_QC=basicUrl+"run/qc";

	var URL_LOG_QC_ILLUMINA=basicUrl+"run/qc/log";
	var URL_RUN_QC_ILLUMINA=basicUrl+"run/illuminax";
	
//===============================dseq==================================
	//var URL_LOG_DSEQ=basicUrl+"run/dseq/log";
	var URL_RUN_DSEQ=basicUrl+"run/dseq";

	

	var URL_GENERATE_REPORT=basicUrl+"generate/report/qc";
//=============================bowtie================================
	var URL_RUN_STANDART_BOWTIE_PAIRED = basicUrl + "run/paired/bowtie";
	var URL_RUN_STANDART_BOWTIE_SINGLE = basicUrl + "run/single/bowtie";

	var URL_LOG_PAIRED=basicUrl+"run/bowtie/log";
	var URL_RUN_BOWTIE1=basicUrl+"run/bowtie1";
	var URL_RUN_BOWTIE2=basicUrl+"run/bowtie2";
	var URL_CREATE_DB_BOWTIE1=basicUrl+"create/bowtie1/db";
	var URL_CREATE_DB_BOWTIE2=basicUrl+"create/bowtie2/db";
	var URL_RUN_STANDART_BOWTIE_SINGLE = basicUrl + "run/single/bowtie";

	var URL_GET_BOWTIE1_DB=basicUrl+"get/bowtie1/db";
	var URL_GET_BOWTIE2_DB=basicUrl+"get/bowtie2/db";


	var URL_GET_CUSTOM_RP=basicUrl+"get/custom/report/trinity";
//====================================uparse=========================
	var URL_RUN_UPARSE_READ_PREP = basicUrl + "run/uparse/readprep";
	var URL_RUN_UPARSE_DEREP = basicUrl + "run/uparse/derep";
	var URL_RUN_UPARSE_TAXONOMY = basicUrl + "run/uparse/taxonomy";
	var URL_RUN_UPARSE_CLUSTERING = basicUrl + "run/uparse/clustering"
	var URL_RUN_UPARSE_OTU_TABLE = basicUrl + "run/uparse/otutable";
	var URL_RUN_UPARSE_REPORT = basicUrl + "run/uparse/report";
	var URL_RUN_UPARSE_MERGE = basicUrl + "run/uparse/merge";
//===========================registration admin======================	
	var URL_USER_REGISTRATION = basicUrl + "user/register";
	var URL_USER_LOGIN = basicUrl + "user/login";
	var URL_GET_USER_PROCESSES = basicUrl +"user/get/process";
	
	var URL_GET_ATTRI_PROCESSES = basicUrl +"processes/get/attributes";
	var URL_CLOSE_PROCESSES = basicUrl +"user/close/process";
	var URL_GET_USER_PASSWORD = basicUrl +"user/get/password";
	var URL_CHANGE_PASSWORD = basicUrl +"user/change/password";
//==============================blast=================================
	var URL_BLAST = basicUrl + "blast";
	
//=============================reseq==================================
	var URL_CREATE_DB_RESEQ=basicUrl+"create/reseq/db";
	var URL_RUN_TOPHAT=basicUrl+"run/tophat";
	var URL_RE_RUN_TOPHAT=basicUrl+"rerun/tophat";
	var URL_RUN_CUFFLINK=basicUrl+"run/cufflink";
	var URL_RUN_CUFFMERG=basicUrl+"run/cuffmerge";
	var URL_RUN_CUFFDIFF=basicUrl+"run/cuffdiff";
	var URL_DELETE_REPORTS=basicUrl+"user/delete/report";
	var URL_GET_REPORTS=basicUrl+"user/get/reports";
	
	var URL_RUN_TOPHAT_REPORT = basicUrl + "get/custom/report/tophat";
	
	var URL_RUN_ION_TORRENT = basicUrl + "run/ion";
	var URL_RE_RUN_BLAST=basicUrl+"run/blast";
	var URL_RE_RUN_FORMATEDB=basicUrl+"run/formatdb";