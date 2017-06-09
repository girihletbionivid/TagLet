package com.jaxlayer.webreflector.resti.utils;

import com.jaxlayer.webreflector.rest.user.controller.CheckAuthorization;

public interface Utils 
{
//	String server = "202.83.16.29";
	
	String server = "" + CheckAuthorization.getIpAddress();
	String protocol = "http://";
	String appName = "genomewebserver";
	String port = "8081";
	String PATH_SERVER_URL = protocol + server + ":" + port + "/webpage/";
	String EXTENSION_IMAGE = ".jpeg";
	String CURRENT_WORKING_DIR = System.getProperty("user.dir");
	String EXTENSION_PDF = ".pdf";
	String PLATEFORM_DIR = CURRENT_WORKING_DIR+"/";

	String PDF_FILE_PATH = PLATEFORM_DIR + "utils/resultSummary/";
	
	String EXTRACT_DIRECTORY = PLATEFORM_DIR;
	String IMAGE_DIRECTORY = PLATEFORM_DIR + "images/";
	String SCRIPT_DIRECTORY_BIN = PLATEFORM_DIR + "bin/";
	String SCRIPT_DIRECTORY_LOG = PLATEFORM_DIR + "log/";
	String SCRIPT_DIRECTORY_UTILS = PLATEFORM_DIR + "utils/";
	String SCRIPT_DIRECTORY_SYS = PLATEFORM_DIR + "sys/";
	String GENOME_INDEX_FOLDER=SCRIPT_DIRECTORY_SYS+"GenomeDb/";
	
	String ADD_TEMP = SCRIPT_DIRECTORY_BIN + "uparse/temp_merge";
	String TEST_FILE_FORMAT = ""+SCRIPT_DIRECTORY_UTILS + "filecheck";
	String TEST_FILE_FORMAT_UPARSE = ""+SCRIPT_DIRECTORY_UTILS + "FileCheckForUparse";
	
	// ===================================MODULE 1========================================	
	
	String RUN_SCRIPT_FOR_PROGRAM = "perl " + SCRIPT_DIRECTORY_BIN + "module1/nextseq_gzip_mrg_v_1.0.pl ";
	String RUN_BAR_CHART = SCRIPT_DIRECTORY_BIN + "module1/barChart.R";
	String RUN_R_SCRIPT_FOR_TAG_GRAPH = "Rscript " + SCRIPT_DIRECTORY_UTILS + "pieChart.R ";
	
	// ===================================qc========================================

	String QC_INSTALLATION_PATH = "perl " + SCRIPT_DIRECTORY_BIN + "qc/NGSQCToolkit_v2.3.3/QC/454QC.pl ";
	String QC_ILLUMINA_INSTALLATION_PATH = "perl " + SCRIPT_DIRECTORY_BIN + "qc/NGSQCToolkit_v2.3.3/QC/IlluQC_PRLL.pl ";
	String QC_STAT_PAIRED_END_PERL_FILE = SCRIPT_DIRECTORY_BIN + "qc/pass_QC_file_paired ";
	String QC_STAT_SINGLE_END_PERL_FILE = SCRIPT_DIRECTORY_BIN + "qc/pass_QC_file ";
	String QC_STAT_454_PERL_FILE = SCRIPT_DIRECTORY_BIN + "qc/pass_QC454_file ";
	String SORT_SAMPLEWISE_ILLUMINA_FILES = "perl " + SCRIPT_DIRECTORY_BIN + "qc/sortFilesForIllumina.pl ";
	String SORT_SAMPLEWISE_454_FILES = "perl " + SCRIPT_DIRECTORY_BIN + "qc/sortFilesFor454.pl ";
	
//	String SORT_SAMPLEWISE_ILLUMINA_FILES = "perl " + SCRIPT_DIRECTORY_BIN + "qc/sortFilesForIllumina.pl ";
//	String SORT_SAMPLEWISE_454_FILES = "perl " + SCRIPT_DIRECTORY_BIN + "qc/sortFilesFor454.pl ";

	String PARSE_CUTOFF_FOR_QC = "perl " + SCRIPT_DIRECTORY_BIN + "qc/parsQCFileForRequiredFields.pl ";
}
