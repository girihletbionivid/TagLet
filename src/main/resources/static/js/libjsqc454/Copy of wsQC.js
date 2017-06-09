var qcOutput = "";
var inputOfUserQc = [];
var indexQc = 0;
var f = false;
var tempOutput = "Running...";
var flagForMultiFiles454QC = false;
function submitQC() {
	if (validateInputfolderNameQC() && validateFilesQc()
			&& validateProjectNameFolder() && validateOutputFolder()) {
		
	

			var filesSelectedPaired = [];
			var filesSelectedSingle = [];
			if (validateInputFilesQC()) {
				var idFastaFileSelect = document
						.getElementById("idFastaFileSelect").innerHTML;
				var idQualityFileSelect = document
						.getElementById("idQualityFileSelect").innerHTML;
				var idAdaptorLibrariesValue = document
						.getElementById("idAdaptorLibrariesValue").value;

				filesSelectedPaired.push(jarray[idFastaFileSelect]);
				filesSelectedPaired.push(jarray[idQualityFileSelect]);

				//document.getElementById("idFastaFileSelect").innerHTML = "No file selected";
				//document.getElementById("idQualityFileSelect").innerHTML = "No file selected";

				var idSingleFileSelect = document
						.getElementById("idSingleFileSelect").innerHTML;
				if (idAdaptorLibrariesValue == "file") {
					filesSelectedSingle.push(jarray[idSingleFileSelect]);
				} else {
					filesSelectedSingle.push(idAdaptorLibrariesValue);
				}
				inputOfUserQc.push(filesSelectedPaired);
				inputOfUserQc.push(filesSelectedSingle);
				indexQc = indexQc + 1;
				
				
				var xhr = new XMLHttpRequest();
				var formData = getFormDataQC();
				xhr.open('POST', URL_RUN_QC, true);
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
							f = false;

							// alert("You haveTTTT=>" + xhr.responseText);
							qcOutput = response.message;
							$("#454QcSection").fadeOut('slow');

							$("#qcCmdQutput").fadeIn('slow');
							var objDiv = document
									.getElementById("454QcCmdOutput");
							objDiv.innerHTML = qcOutput;
							$("#454QcCmd").animate({
								scrollTop : $('#454QcCmd')[0].scrollHeight
							}, 1000);
							$("#generateReportBtn").fadeIn('slow');
							qcOutput = "";
							tempOutput = "Running...";
						} else {
							$("#myModal").modal('hide');
							alert(response.message);
							inputOfUserQc.pop();inputOfUserQc.pop();	
						/*	alert("S"+inputOfUserQc);*/
							index=index-1;
						}
					}
				};
			}

		

	}
	
}
function resetQC454Form() {
	document.getElementById("idFastaFileSelect").innerHTML = "No file selected";
	document.getElementById("idQualityFileSelect").innerHTML = "No file selected";
	index = 0;
	inputOfUserQc=[];
}
function getFormDataQC() {
	var formData = new FormData();
	formData.append("l", document.getElementById("idl").value);
	formData.append("s", document.getElementById("ids").value);
	formData.append("n", document.getElementById("idn").value);
	formData.append("m", document.getElementById("idm").value);

	formData.append("f", document.getElementById("idFType").value);
	formData.append("onlyStat",
			document.getElementById("idCheckBoxOnlyStats").checked);

	formData.append("t", document.getElementById("idTType").value);
	formData.append("z", document.getElementById("idZType").value);

	formData.append("query", getInputFilePathQC() /* + getCommanStringQC() */);
	formData.append("cpu", document.getElementById("idCPU").value);
	formData.append("outputFolderName", jarray[document
			.getElementById("idOutputDirSelect").innerHTML]);
	formData.append("userId", localStorage.userId);
	formData.append("projectName", document
			.getElementById("idProjectName454Qc").value);
	return formData;
}
function getCommanStringQC() {
	return getQCOptionString() + getProcessingOptionString()
			+ getOutputOptionString();
}
function getQCOptionString() {
	var stringComposed = " -l " + document.getElementById("idl").value + " -s "
			+ document.getElementById("ids").value;
	if (document.getElementById("idCheckBoxn").checked == "true") {
		stringComposed = stringComposed + " "
				+ document.getElementById("idn").value;
	}
	if (document.getElementById("idCheckBoxm").checked == "true") {
		stringComposed = stringComposed + " "
				+ document.getElementById("idm").value;
	}
	stringComposed = stringComposed + " "
			+ document.getElementById("idFType").value;
	return stringComposed;
}
function getProcessingOptionString() {
	if (document.getElementById("idCheckBoxOnlyStats").checked) {
		return " -onlyStat ";
	} else {
		return "";
	}
}
function getOutputOptionString() {
	return " -t " + document.getElementById("idTType").value + " -z "
			+ document.getElementById("idZType").value;

}
function getInputFilePathQC() {

	var flag = true;
	var query = "";

	for (var i = 0; i < inputOfUserQc.length; i++) {
		if (flag == true) {
			query = query + getSequencingFileString(inputOfUserQc[i]);
			flag = false;
		} else {
			query = query + " " + inputOfUserQc[i];
			flag = true;
		}

	}

	return query;
}
function getSequencingFileString(filesSelectedPaired) {
	var seperator = " -i ";
	var inputFileString1 = "";
	var flag = true;
	for (var i = 0; i < filesSelectedPaired.length; i++) {
		if (flag == true) {
			inputFileString1 = inputFileString1 + seperator
					+ filesSelectedPaired[i];
			flag = false;
		} else {
			inputFileString1 = inputFileString1 + " " + filesSelectedPaired[i];
			flag = true;
		}

	}
	return inputFileString1;
}

function addNewUpload() {
	flagForMultiFiles454QC = true;
	var filesSelectedPaired = [];
	var filesSelectedSingle = [];
	if (validateInputFilesQC()) {
		var idFastaFileSelect = document.getElementById("idFastaFileSelect").innerHTML;
		var idQualityFileSelect = document
				.getElementById("idQualityFileSelect").innerHTML;
		var idAdaptorLibrariesValue = document
				.getElementById("idAdaptorLibrariesValue").value;
		var pairedFiles = [];
		pairedFiles[0] = idFastaFileSelect;
		pairedFiles[1] = idQualityFileSelect;

		var singleFiles = [];
		filesSelectedPaired.push(jarray[idFastaFileSelect]);
		filesSelectedPaired.push(jarray[idQualityFileSelect]);

		document.getElementById("idFastaFileSelect").innerHTML = "No file selected";
		document.getElementById("idQualityFileSelect").innerHTML = "No file selected";

		var idSingleFileSelect = document.getElementById("idSingleFileSelect").innerHTML;
		if (idAdaptorLibrariesValue == "file") {

			filesSelectedSingle.push(jarray[idSingleFileSelect]);
			singleFiles.push(idSingleFileSelect);
			// showFilesDivSingle(idSingleFileSelect);
		} else {

			filesSelectedSingle.push(idAdaptorLibrariesValue);
			singleFiles.push(idAdaptorLibrariesValue);
			// showFilesDivSingle(idAdaptorLibrariesValue);
		}
		inputOfUserQc.push(filesSelectedPaired);
		inputOfUserQc.push(filesSelectedSingle);
		showFilesDivPaired(pairedFiles, singleFiles, indexQc);
		// alert("my her" + inputOfUserQc);
		indexQc = indexQc + 1;
	}
}
function showFilesDivSingle(singleFiles) {
	var divSelectedFiles = document.getElementById("divSelectedFiles");

	var closeDiv = document.createElement("div");
	closeDiv.setAttribute("class", "col-sm-12 classSelectedFilesDiv");
	closeDiv.innerHTML = "<span id='close' class='col-sm-1 btn btn-default' onclick='closeDiv(this);'>x</span>";

	var fromGroupDiv = document.createElement("div");
	fromGroupDiv.setAttribute("class", "form-group col-sm-11");

	var colSm4 = document.createElement("div");
	colSm4.setAttribute("class", "col-sm-6");

	var labelFile = document.createElement("label");
	labelFile.setAttribute("class", "control-label col-sm-10 textClass");
	labelFile.innerHTML = "Selected adaptor file";
	var colSm6 = document.createElement("div");
	colSm6.setAttribute("class", "col-sm-4");
	var labelFileName = document.createElement("label");
	labelFileName.setAttribute("class", "control-label col-sm-4 textClass");

	labelFileName.innerHTML = singleFiles;
	colSm4.appendChild(labelFile);
	colSm6.appendChild(labelFileName);

	fromGroupDiv.appendChild(colSm4);
	fromGroupDiv.appendChild(colSm6);
	closeDiv.appendChild(fromGroupDiv);
	divSelectedFiles.appendChild(closeDiv);

}
function closeDivQC(selection, index) {
	// alert("b sub==>" + inputOfUser);
	selection.parentNode.parentNode.removeChild(selection.parentNode);
	inputOfUserQc.splice(index, 2);
	if (inputOfUserQc.length == 0) {
		flagForMultiFiles454QC = false;
	}
	// alert("after sub==>" + inputOfUser);
}
function showFilesDivPaired(pairedFiles, filesSelectedSingle, indexQc) {
	var divSelectedFiles = document.getElementById("divSelectedFiles");

	var closeDiv = document.createElement("div");
	closeDiv.setAttribute("class", "col-sm-12 classSelectedFilesDiv");
	closeDiv.innerHTML = "<span id='close' class='col-sm-1 btn btn-default' onclick='closeDivQC(this,"
			+ indexQc + ");'>x</span>";
	for (j = 0; j < pairedFiles.length; j++) {
		var fromGroupDiv = document.createElement("div");
		fromGroupDiv.setAttribute("class", "form-group col-sm-11");

		var colSm4 = document.createElement("div");
		colSm4.setAttribute("class", "col-sm-6");

		var labelFile = document.createElement("label");
		labelFile.setAttribute("class", "control-label col-sm-10 textClass");
		labelFile.innerHTML = "Selected -" + (j + 1) + " file";
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
	}

	var fromGroupDiv = document.createElement("div");
	fromGroupDiv.setAttribute("class", "form-group col-sm-11");

	var colSm4 = document.createElement("div");
	colSm4.setAttribute("class", "col-sm-6");

	var labelFile = document.createElement("label");
	labelFile.setAttribute("class", "control-label col-sm-10 textClass");
	labelFile.innerHTML = "Selected adaptor file";
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