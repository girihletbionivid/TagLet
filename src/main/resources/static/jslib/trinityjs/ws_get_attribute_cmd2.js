function wsGetCommandAttributeByPid(processesId, processType) {
	// alert("dp");
	var url = URL_GET_ATTRI_PROCESSES;
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("processesId=" + processesId + "&&processType=" + processType);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				// alert("d"+localStorage.tagName);

				var response = eval('(' + xhr.responseText + ')');
				if (localStorage.tagName == "trinity_assembly") {
					showTrinityToAssembly(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				} else if (localStorage.tagName == "trinity_report") {
					showTrinityToReport(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				} else if (localStorage.tagName == "illumina_report") {
					showIlluminaToReport(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				} else if (localStorage.tagName == "FourFiveFourQcReport") {

					showFourFiveFourToReport(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				} else if (localStorage.tagName == "Merge") {
					showReadPrepToMerge(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				} else if (localStorage.tagName == "Derep") {
					showMergeToDerep(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
					OTU_Table
				} else if (localStorage.tagName == "clustering") {
					showDrepToClustering(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				} else if (localStorage.tagName == "OTU_Table") {
					showClusteringToOTU(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				} else if (localStorage.tagName == "Taxonomy") {
					showOTUToTaxonomy(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				} else if (localStorage.tagName == "UparseReport") {
					showTaxonomyToReport(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				} else if (processType == "MergeTrinity") {
					showMergeTrinityToReport(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				} else if (processType == "AssemblyTrinity") {
					showAssemblyToReport(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				} else if (processType == "Reseq_db") {
					showReseqDbToTophat(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				} else if (localStorage.tagName == "ReseqCuffling") {
					showReseqTophatToCufflink(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');

				} else if (localStorage.tagName == "ReseqResume") {
					// alert("bus"+localStorage.tagName);
					wsResumeTophat(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				} else if (processType == "Reseq_cufflink") {
					showCufflinkToCuffmerge(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				} else if (processType == "Reseq_cuffmerge") {
					showCuffmergeToCuffdiff(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				}
			} else {
				// alert("error " + xhr.responseText);
			}
		}
	};

}
function showCuffmergeToCuffdiff(data) {
	document.getElementById("idProjectNameCuffDiff").value = data.projectName;
	document.getElementById("idRefFastaCuffDiffFileSelect").innerHTML = data.inputPrefixFile
	.replace(/^.*(\\|\/|\:)/, '');
	jarray[data.inputPrefixFile.replace(/^.*(\\|\/|\:)/, '')] = data.inputPrefixFile;
	document.getElementById("idGTFFileCuffDiffSelect").innerHTML = "merged.gtf";
	jarray["merged.gtf"] = data.output+"/merged.gtf";
	
}
function showCufflinkToCuffmerge(data) {
	document.getElementById("idProjectNameCuffMerge").value = data.projectName;
	
	
	document.getElementById("idRefFastaFileCuffDiffSelect").innerHTML = data.tophatBamFile
	.replace(/^.*(\\|\/|\:)/, '');
jarray[data.tophatBamFile.replace(/^.*(\\|\/|\:)/, '')] = data.tophatBamFile;


document.getElementById("idGTFFileCuffMergeSelect").innerHTML = data.gftFile
.replace(/^.*(\\|\/|\:)/, '');
jarray[data.gftFile.replace(/^.*(\\|\/|\:)/, '')] = data.gftFile;

}
function showReseqTophatToCufflink(data) {
	// alert("Ddv"+data.prefixInputDbFile);

	document.getElementById("idGTFFileCuffLingSelect").innerHTML = data.gTFFile
			.replace(/^.*(\\|\/|\:)/, '');
	jarray[data.gTFFile.replace(/^.*(\\|\/|\:)/, '')] = data.gTFFile;
	if (data.prefixInputDbFile != "") {
		document.getElementById("idBamFileCuffLingSelect").innerHTML = data.prefixInputDbFile
				.replace(/^.*(\\|\/|\:)/, '');
		jarray[data.prefixInputDbFile.replace(/^.*(\\|\/|\:)/, '')] = data.prefixInputDbFile;
	}

	document.getElementById("idTophatFileSelect").innerHTML = "accepted_hits.bam";
	jarray["accepted_hits.bam"] = data.outPut + "/accepted_hits.bam";
	document.getElementById("idProjectNameCuffLing").value = data.projectName;
}
function showReseqDbToTophat(data) {
	
	document.getElementById("idProjectName454Qc").value = data.projectName;
	document.getElementById("idPrefixNameTophat").value = data.dbName;
	document.getElementById("idPrefixFileTophatSelect").innerHTML = data.dbOutput
			.replace(/^.*(\\|\/|\:)/, '');
	jarray[data.dbOutput.replace(/^.*(\\|\/|\:)/, '')] = data.dbOutput;
	document.getElementById("idTagInputHiddenIndexPrefixFile").value = ""
			+ data.inputPrefixFile;

}
function showAssemblyToReport(data) {

	document.getElementById("idCustomReportOutputClusterFileSelect").innerHTML = "ameliated_trinity.fasta";
	jarray["ameliated_trinity.fasta"] = data.outputFolder.trim()
			+ "/ameliated_trinity.fasta";

	document.getElementById("idCustomReportOutputFileSelect").innerHTML = data.inputTrinityFile
			.replace(/^.*(\\|\/|\:)/, '');
	jarray[data.inputTrinityFile.replace(/^.*(\\|\/|\:)/, '')] = data.inputTrinityFile;
}
function showMergeTrinityToReport(data) {
	if (data.rightOutputFile != null) {
		document.getElementById("idRightFileSelect").innerHTML = data.rightOutputFile
				.replace(/^.*(\\|\/|\:)/, '');
		jarray[data.rightOutputFile.replace(/^.*(\\|\/|\:)/, '')] = data.rightOutputFile;
		document.getElementById("idLeftFileSelect").innerHTML = data.leftOutputFile
				.replace(/^.*(\\|\/|\:)/, '');
		jarray[data.leftOutputFile.replace(/^.*(\\|\/|\:)/, '')] = data.leftOutputFile;
	} else {
		document.getElementById("idInputReadType").value = "single";
		document.getElementById("idSingleFileSelect").innerHTML = data.singleOutputFile
				.replace(/^.*(\\|\/|\:)/, '');
		jarray[data.singleOutputFile.replace(/^.*(\\|\/|\:)/, '')] = data.singleOutputFile;
	}

}
function showTaxonomyToReport(data) {
	var mystring = data.otuLablefile.substring(0, data.alnout.lastIndexOf("/"));
	// alert("doj"+mystring);
	document.getElementById("idOutputDirctorySelectUparse").innerHTML = mystring
			.replace(/^.*(\\|\/|\:)/, '');

	jarray[mystring.replace(/^.*(\\|\/|\:)/, '')] = mystring;
}
function showOTUToTaxonomy(data) {
	document.getElementById("idTaxonomytonFileInputSelect").innerHTML = data.inputFileDb
			.replace(/^.*(\\|\/|\:)/, '');
	jarray[data.inputFileDb.replace(/^.*(\\|\/|\:)/, '')] = data.inputFileDb;
	document.getElementById("idProjectNameTax").value = data.projectName;
	var mystring = data.outputFile.substring(0, data.outputFile
			.lastIndexOf("/"));
	document.getElementById("idTaxonomyOutputSelect").innerHTML = mystring
			.replace(/^.*(\\|\/|\:)/, '');

	jarray[mystring.replace(/^.*(\\|\/|\:)/, '')] = mystring;
}
function showClusteringToOTU(data) {

	document.getElementById("idOtuTableDBFileInputSelect").innerHTML = data.outputFile
			.replace(/^.*(\\|\/|\:)/, '');
	jarray[data.outputFile.replace(/^.*(\\|\/|\:)/, '')] = data.outputFile;
	document.getElementById("idProjectNameOTUTable").value = data.projectName;

	var mystring = data.outputFile.substring(0, data.outputFile
			.lastIndexOf("/"));
	document.getElementById("idOTUTableOutputSelect").innerHTML = mystring
			.replace(/^.*(\\|\/|\:)/, '');

	jarray[mystring.replace(/^.*(\\|\/|\:)/, '')] = mystring;

}
function showDrepToClustering(data) {
	document.getElementById("idFilteredSingletonFileInputSelect").innerHTML = data.outputFileName
			.replace(/^.*(\\|\/|\:)/, '');
	jarray[data.outputFileName.replace(/^.*(\\|\/|\:)/, '')] = data.outputFileName;
	document.getElementById("idProjectNameClustering").value = data.projectName;

	document.getElementById("idClusteringOutputSelect").innerHTML = data.outputFolder
			.replace(/^.*(\\|\/|\:)/, '');
	jarray[data.outputFolder.replace(/^.*(\\|\/|\:)/, '')] = data.outputFolder;
}

function showMergeToDerep(data) {
	document.getElementById("idFileInputSelect").innerHTML = data.outputFile
			.replace(/^.*(\\|\/|\:)/, '');
	jarray[data.outputFile.replace(/^.*(\\|\/|\:)/, '')] = data.outputFile;
	document.getElementById("idProjectNameDerep").value = data.projectName;
}
function showReadPrepToMerge(data) {
	document.getElementById("idMergeInputSelect").innerHTML = data.outputFolder
			.replace(/^.*(\\|\/|\:)/, '');
	jarray[data.outputFolder.replace(/^.*(\\|\/|\:)/, '')] = data.outputFolder;
	document.getElementById("idProjectNameMerge").value = data.projectName;
}
function showFourFiveFourToReport(data) {
	localStorage.typeOfQc = "fourFiveFour";
	document.getElementById("idOutputDirctorySelectIllumina").innerHTML = data.o
			.replace(/^.*(\\|\/|\:)/, '');
	jarray[data.o.replace(/^.*(\\|\/|\:)/, '')] = data.o;
	$("#idTypeOfOutputSelectIllumina").hide();
}
function showTrinityToAssembly(data) {
	document.getElementById("idSequenceTypeAligmentAndEstimate").value = data.seqType;
	if (data.hasOwnProperty("leftFile")) {
		document.getElementById("idInputReadTypeAligmentAndEstimate").value = "paired";
		$("#idLeftFileAligmentSelect").html(
				"" + data.leftFile.replace(/^.*(\\|\/|\:)/, ''));
		$("#idRightFileAligmentSelect").html(
				"" + data.rightFile.replace(/^.*(\\|\/|\:)/, ''));
		$("#idTranscriptFastaFileSelect").html("Trinity.fasta");
		jarray[data.leftFile.replace(/^.*(\\|\/|\:)/, '')] = data.leftFile;
		jarray[data.rightFile.replace(/^.*(\\|\/|\:)/, '')] = data.rightFile;
		jarray["Trinity.fasta"] = data.output+"/Trinity.fasta";
		document.getElementById("idProjectNameAssembly").value=""+data.projectName;
	} else {

	}
}
function showIlluminaToReport(data) {
	localStorage.typeOfQc = "illumina";
	$("#idTypeOfOutputSelectIllumina").show();
	document.getElementById("idOutputDirctorySelectIllumina").innerHTML = data.outputFolder
			.replace(/^.*(\\|\/|\:)/, '');
	jarray[data.outputFolder.replace(/^.*(\\|\/|\:)/, '')] = data.outputFolder;
	document.getElementById("idTypeOfInputSelect").value = "illumina";
	$("#endSelectionDiv").show("slow");
	document.getElementById("idTypeOfOutputSelectIllumina").value = data.sequenceType;

}
function showTrinityToReport(data) {

	document.getElementById("idCustomReportOutputFileSelect").innerHTML = "Trinity.fasta";
	jarray["Trinity.fasta"] = data.output.trim() + "/Trinity.fasta";
}
function toggleLogOutDiv() {

}