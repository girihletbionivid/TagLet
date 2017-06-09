var inputOfUserAssembly = [];
var flagForMultiFilesAssembly = [];
var outputFolderNames = [];
var intexAssembly = 0;
function wsAligmentAndEstimate() {
	if (validateSampleName() && validateClusteringOutput()
			&& validateProjectNameAssembly() && validateTranscriptFile()
			&& validateFilesAssebly() && validateOutputDirectory()) {
		addNewUploadAssemblyWithoutShow();
		var xhr = new XMLHttpRequest();
		var formData = getFormDataAssembly();
		xhr.open('POST', URL_ASSEMBLY_VALIDATION, true);
		xhr.onload = function(e) {
		};
		f = true;
		xhr.send(formData);
		$("#myModal").modal('show');
		xhr.onreadystatechange = function() {
			var response = eval("(" + xhr.responseText + ")");
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					// alert("You have=>" + xhr.responseText);
					$("#myModal").modal('hide');
					// alert("You haveTTTT=>" + xhr.responseText);
					$("#aligmentAndEstimateDiv").fadeOut('slow');
					$("#assemblyCmd").fadeIn('slow');
					document.getElementById("assemblyCmdOutput").innerHTML = response.message;
					$("#assemblyCmd").animate({
						scrollTop : $('#assemblyCmd')[0].scrollHeight
					}, 1000);

					// resetAssemblyValidationForm();
				} else {
					$("#myModal").modal('hide');
					alert(response.message);
				}
			}
		};
	}
}
function addNewUploadAssemblyWithoutShow() {

	flagForMultiFilesAssembly = true;
	var filesSelectedPaired = [];
	var filesSelectedSingle = [];
	if (validateFilesAssebly()) {
		var idInputReadTypeAligmentAndEstimate = document
				.getElementById("idInputReadTypeAligmentAndEstimate").value;
		if (idInputReadTypeAligmentAndEstimate == "paired") {
			var idLeftFileSelect = document
					.getElementById("idLeftFileAligmentSelect").innerHTML;
			var idRightFileSelect = document
					.getElementById("idRightFileAligmentSelect").innerHTML;
			var idOutPutFolderName = document
					.getElementById("idOutPutFolderName").value;

			filesSelectedPaired.push(jarray[idLeftFileSelect]);
			filesSelectedPaired.push(jarray[idRightFileSelect]);
			outputFolderNames.push(idOutPutFolderName);

			inputOfUserAssembly.push(filesSelectedPaired);
			inputOfUserAssembly.push(outputFolderNames);

		} else {

			var idSingleFileSelect = document
					.getElementById("idSingleFileAligmentSelect").innerHTML;

			var idOutPutFolderName = document
					.getElementById("idOutPutFolderName").value;

			filesSelectedPaired.push(jarray[idSingleFileSelect]);
			outputFolderNames.push(idOutPutFolderName);

			inputOfUserAssembly.push(filesSelectedPaired);
			inputOfUserAssembly.push(outputFolderNames);

		}

	}

}
function addNewUploadAssembly() {

	flagForMultiFilesAssembly = true;
	var filesSelectedPaired = [];
	var outputFolderArray = [];
	if (validateFilesAssebly()) {
		var idInputReadTypeAligmentAndEstimate = document
				.getElementById("idInputReadTypeAligmentAndEstimate").value;
		if (idInputReadTypeAligmentAndEstimate == "paired") {
			var idLeftFileSelect = document
					.getElementById("idLeftFileAligmentSelect").innerHTML;
			var idRightFileSelect = document
					.getElementById("idRightFileAligmentSelect").innerHTML;
			var idOutPutFolderName = document
					.getElementById("idOutPutFolderName").value;
			var pairedFiles = [];
			pairedFiles[0] = idLeftFileSelect;
			pairedFiles[1] = idRightFileSelect;

			
			filesSelectedPaired.push(jarray[idLeftFileSelect]);
			filesSelectedPaired.push(jarray[idRightFileSelect]);
			outputFolderArray.push(idOutPutFolderName);

			document.getElementById("idLeftFileAligmentSelect").innerHTML = "No file selected";
			document.getElementById("idRightFileAligmentSelect").innerHTML = "No file selected";
			document.getElementById("idOutPutFolderName").value = "";

			inputOfUserAssembly.push(filesSelectedPaired);
			inputOfUserAssembly.push(outputFolderArray);
			showFilesDivPairedAssem(pairedFiles, outputFolderArray,
					intexAssembly);
			// alert("my her" + inputOfUserQc);
			intexAssembly = intexAssembly + 1;

		} else {

			var idSingleFileSelect = document
					.getElementById("idSingleFileAligmentSelect").innerHTML;

			var idOutPutFolderName = document
					.getElementById("idOutPutFolderName").value;
			var pairedFiles = [];
			pairedFiles[0] = idSingleFileSelect;

			filesSelectedPaired.push(jarray[idSingleFileSelect]);
			outputFolderArray.push(idOutPutFolderName);
			document.getElementById("idSingleFileAligmentSelect").innerHTML = "No file selected";
			document.getElementById("idOutPutFolderName").value = "";

			inputOfUserAssembly.push(filesSelectedPaired);
			inputOfUserAssembly.push(outputFolderArray);
			showFilesDivSingleAssem(pairedFiles, outputFolderArray,
					intexAssembly);
			// alert("my her" + inputOfUserQc);
			intexAssembly = intexAssembly + 1;

		}

	}

}
function showFilesDivSingleAssem(pairedFiles, filesSelectedSingle, indexQc) {
	var divSelectedFiles = document.getElementById("selectedSamplesAssem");

	var closeDiv = document.createElement("div");
	closeDiv.setAttribute("class", "col-sm-12 classSelectedFilesDiv");
	closeDiv.innerHTML = "<span id='close' class='col-sm-1 btn btn-default' onclick='closeDivQC(this,"
			+ indexQc + ");'>x</span>";
	var nameOfFile = "Single";
	var fromGroupDiv = document.createElement("div");
	fromGroupDiv.setAttribute("class", "form-group col-sm-11");

	var colSm4 = document.createElement("div");
	colSm4.setAttribute("class", "col-sm-6");

	var labelFile = document.createElement("label");
	labelFile.setAttribute("class", "control-label col-sm-10 textClass");
	labelFile.innerHTML = "Selected " + nameOfFile + " file";
	var colSm6 = document.createElement("div");
	colSm6.setAttribute("class", "col-sm-4");

	var labelFileName = document.createElement("label");
	labelFileName.setAttribute("class", "control-label col-sm-4 textClass");
	labelFileName.innerHTML = pairedFiles[0];

	colSm4.appendChild(labelFile);
	colSm6.appendChild(labelFileName);

	fromGroupDiv.appendChild(colSm4);
	fromGroupDiv.appendChild(colSm6);
	closeDiv.appendChild(fromGroupDiv);
	divSelectedFiles.appendChild(closeDiv);

	var fromGroupDiv = document.createElement("div");
	fromGroupDiv.setAttribute("class", "form-group col-sm-11");

	var colSm4 = document.createElement("div");
	colSm4.setAttribute("class", "col-sm-6");

	var labelFile = document.createElement("label");
	labelFile.setAttribute("class", "control-label col-sm-10 textClass");
	labelFile.innerHTML = "Output Folder ";
	var colSm6 = document.createElement("div");
	colSm6.setAttribute("class", "col-sm-4");
	var labelFileName = document.createElement("label");
	labelFileName.setAttribute("class", "control-label col-sm-4 textClass");

	labelFileName.innerHTML = filesSelectedSingle[0];
	colSm4.appendChild(labelFile);
	colSm6.appendChild(labelFileName);

	fromGroupDiv.appendChild(colSm4);
	fromGroupDiv.appendChild(colSm6);
	closeDiv.appendChild(fromGroupDiv);
	divSelectedFiles.appendChild(closeDiv);

}
function showFilesDivPairedAssem(pairedFiles, filesSelectedSingle, indexQc) {
	var divSelectedFiles = document.getElementById("selectedSamplesAssem");

	var closeDiv = document.createElement("div");
	closeDiv.setAttribute("class", "col-sm-12 classSelectedFilesDiv");
	closeDiv.innerHTML = "<span id='close' class='col-sm-1 btn btn-default' onclick='closeDivQC(this,"
			+ indexQc + ");'>x</span>";
	var nameOfFile = "Left";
	for (j = 0; j < pairedFiles.length; j++) {
		var fromGroupDiv = document.createElement("div");
		fromGroupDiv.setAttribute("class", "form-group col-sm-11");

		var colSm4 = document.createElement("div");
		colSm4.setAttribute("class", "col-sm-6");

		var labelFile = document.createElement("label");
		labelFile.setAttribute("class", "control-label col-sm-10 textClass");
		labelFile.innerHTML = "Selected " + nameOfFile + " file";
		var colSm6 = document.createElement("div");
		colSm6.setAttribute("class", "col-sm-4");

		var labelFileName = document.createElement("label");
		labelFileName.setAttribute("class", "control-label col-sm-4 textClass");
		labelFileName.innerHTML = pairedFiles[j];

		colSm4.appendChild(labelFile);
		colSm6.appendChild(labelFileName);

		fromGroupDiv.appendChild(colSm4);
		fromGroupDiv.appendChild(colSm6);
		closeDiv.appendChild(fromGroupDiv);
		divSelectedFiles.appendChild(closeDiv);
		nameOfFile = "Right";
	}

	var fromGroupDiv = document.createElement("div");
	fromGroupDiv.setAttribute("class", "form-group col-sm-11");

	var colSm4 = document.createElement("div");
	colSm4.setAttribute("class", "col-sm-6");

	var labelFile = document.createElement("label");
	labelFile.setAttribute("class", "control-label col-sm-10 textClass");
	labelFile.innerHTML = "Output Folder ";
	var colSm6 = document.createElement("div");
	colSm6.setAttribute("class", "col-sm-4");
	var labelFileName = document.createElement("label");
	labelFileName.setAttribute("class", "control-label col-sm-4 textClass");

	labelFileName.innerHTML = filesSelectedSingle[0];
	colSm4.appendChild(labelFile);
	colSm6.appendChild(labelFileName);

	fromGroupDiv.appendChild(colSm4);
	fromGroupDiv.appendChild(colSm6);
	closeDiv.appendChild(fromGroupDiv);
	divSelectedFiles.appendChild(closeDiv);

}
function resetAssemblyValidationForm() {
	$("#aligmentAndEstimateForm").trigger('reset');
	document.getElementById("idTranscriptFastaFileSelect").innerHTML = "No file selected";
	document.getElementById("idRightFileAligmentSelect").innerHTML = "No file selected";
	document.getElementById("idLeftFileAligmentSelect").innerHTML = "No file selected";
	document.getElementById("idOutDirectoryAligmentSelect").innerHTML = "No directory selected";
	document.getElementById("assemblyCmdOutput").innerHTML = "";
}
function getFormDataAssembly() {
	var formData = new FormData();
	formData.append("inputOfUserAssembly", inputOfUserAssembly);
/*	formData.append("leftFiles", jarray[$("#idLeftFileAligmentSelect").html()]);
	formData.append("rightFiles",
			jarray[$("#idRightFileAligmentSelect").html()]);
	formData.append("singleFiles", jarray[$("#idSingleFileAligmentSelect")
			.html()]);*/
	formData.append("seqType", $("#idSequenceTypeAligmentAndEstimate").val());
	formData.append("est_method", $("#idEstimateMethodTypeAligmentAndEstimate")
			.val());
	formData.append("aln_method",
			$("#idAlignmentMethodTypeAligmentAndEstimate").val());
	formData.append("SS_lib_type", $("#idSSLibTypeAligmentAndEstimate").val());
	formData.append("thread_count", $("#idAlignmentThreadCount").val());
	formData.append("assemblyType", $("#idInputReadTypeAligmentAndEstimate")
			.val());
	formData.append("inputTrinityFile",
			jarray[$("#idTranscriptFastaFileSelect").html()]);
	formData.append("outputFolder", jarray[$("#idOutDirectoryAligmentSelect")
			.html()]);
	formData.append("sampleName", $("#idAlignmentSampleName").val());
	formData.append("readDepth", $("#idAlignmentReadDepth").val());
	formData.append("coverage", $("#idAlignmentCoverage").val());
	formData.append("clustering", getClusteringData());
	formData.append("userId", localStorage.userId);
	formData.append("projectName", $("#idProjectNameAssembly").val());
	formData.append("clusteringOutputFileName",
			$("#idClusteringOutPutFileName").val());
	return formData;
}
function getFormDataAssemblyx() {
	var formData = new FormData();
	formData.append("commanString", getAssemblyCommanStringx());
	formData.append("inputTrinityFile",
			jarray[$("#idTranscriptFastaFileSelect").html()]);
	formData.append("outputFolder", jarray[$("#idOutDirectoryAligmentSelect")
			.html()]);
	formData.append("sampleName", $("#idAlignmentSampleName").val());
	formData.append("readDepth", $("#idAlignmentReadDepth").val());
	formData.append("coverage", $("#idAlignmentCoverage").val());
	formData.append("clustering", getClusteringData());
	formData.append("clusteringOutputFileName", jarray[$(
			"#idClusteringOutPutFileName").val()]);
	return formData;
}
function getClusteringData() {
	return " -c " + $("#idClusteringSeqThreshold").val() + " -s  "
			+ $("#idClusteringLengthDiffCut").val() + " -M "
			+ $("#idClusteringMemLimit").val() + " -d "
			+ $("#idClusteringLengthOfDes").val() + " -T "
			+ $("#idClusteringSeqThreshold").val();
}
function getAssemblyCommanString() {
	var outputString;
	if ($("#idInputReadTypeAligmentAndEstimate").val() == "paired") {
		outputString = " --seqType "
				+ $("#idSequenceTypeAligmentAndEstimate").val() + " --left "
				+ jarray[$("#idLeftFileAligmentSelect").html()] + " --right "
				+ jarray[$("#idRightFileAligmentSelect").html()]
				+ " --est_method "
				+ $("#idEstimateMethodTypeAligmentAndEstimate").val()
				+ " --aln_method "
				+ $("#idAlignmentMethodTypeAligmentAndEstimate").val()
				+ "  --SS_lib_type "
				+ $("#idSSLibTypeAligmentAndEstimate").val()
				+ " --thread_count " + $("#idAlignmentThreadCount").val()

		;
	} else {
		outputString = jarray[$("#idTranscriptFastaFileSelect").html()] + " "
				+ " --seqType " + $("#idSequenceTypeAligmentAndEstimate").val()
				+ " --single "
				+ jarray[$("#idSingleFileAligmentSelect").html()]
				+ " --est_method "
				+ $("#idEstimateMethodTypeAligmentAndEstimate").val()
				+ " --aln_method "
				+ $("#idAlignmentMethodTypeAligmentAndEstimate").val()
				+ "  --SS_lib_type "
				+ $("#idSSLibTypeAligmentAndEstimate").val()
				+ " --thread_count " + $("#idAlignmentThreadCount").val()

		;
	}
	return outputString;
}
