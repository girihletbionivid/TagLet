//var server = "cloud.bionivid.com";
//var port = "";
var server = "10";
var protocol = "http://";
var appName = "genomewebserver";
var port = "81";
var basicUrl = protocol + server + ":" + port + "/" + appName + "/";

///var URL_USER_REGISTER = basicUrl + "user/register";
///var URL_USER_LOGIN = basicUrl + "user/login";

var URL_GET_DIRECTORY=basicUrl+"get/user/directory";

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
	var URL_GET_DIRECTORY=basicUrl+"get/user/directory/";

	var URL_GENERATE_REPORT=basicUrl+"generate/report/qc";


	var URL_LOG_QC=basicUrl+"run/qc/log";
	var URL_RUN_QC=basicUrl+"run/qc";

	var URL_LOG_QC_ILLUMINA=basicUrl+"run/qc/log";
	var URL_RUN_QC_ILLUMINA=basicUrl+"/run/illumina";
	var URL_GET_DIRECTORY=basicUrl+"get/user/directory/";
//===============================dseq==================================
	//var URL_LOG_DSEQ=basicUrl+"run/dseq/log";
	var URL_RUN_DSEQ=basicUrl+"run/dseq";

	var URL_GET_DIRECTORY=basicUrl+"get/user/directory/";

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

	var URL_GET_DIRECTORY=basicUrl+"get/user/directory/";
	var URL_GET_CUSTOM_RP=basicUrl+"get/custom/report/trinity";

	