var illuminaOutput = "";
var tempOutputIllumina = "Running...";
var intervarFlag = false;
var flagForMultiFiles = false;
function submitQCIllumina() {
	
	if (validateInputProjectName() && validateInputfolderNameQCIllumina()
			&& validateInputFilesQCIllumina() && validateOutputIlluminaFolder()) {
		var xhr = new XMLHttpRequest();
		var formData = getFormDataQCIlluminaw();
		xhr.open('POST', URL_RUN_QC_ILLUMINA, true);
		xhr.onload = function(e) {
		};
		intervarFlag = true;
		//alert("S"+inputOfUser);
		xhr.send(formData);
		$("#myModal").modal('show');
		xhr.onreadystatechange = function() {
			var response = eval("(" + xhr.responseText + ")");
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					$("#myModal").modal('hide');
					$("#illuminaForms").fadeOut('slow');
					$("#illuminaQcCmd").fadeIn('slow');
					intervarFlag = false;
					illuminaOutput = response.message;
					var objDiv = document.getElementById("illuminaQcCmdOutput");
					objDiv.innerHTML = illuminaOutput;
					$("#illuminaQcCmd").animate({
						scrollTop : $('#illuminaQcCmd')[0].scrollHeight
					}, 1000);
					$("#generateReportBtn").fadeIn('slow');
					illuminaOutput = "";
					resetQCIlluminaFormz();
				} else {
					$("#myModal").modal('hide');
					alert(response.message);
					inputOfUser.pop();inputOfUser.pop();	
					//alert("S"+inputOfUser);
					index=index-1;
				}
			}
		};
	}
}
function resetQCIlluminaFormz() {
	document.getElementById("idFirstFileSelectIllumina").innerHTML = "No file selected";
	document.getElementById("idSecondFileSelectIllumina").innerHTML = "No file selected";
	document.getElementById("idSingleFileAdaptorSelectIllumina").innerHTML = "No file selected";
	index = 0;
	illuminaOutput = "";
	tempOutputIllumina = "Running...";
	intervarFlag = false;
	flagForMultiFiles = false;
	inputOfUser=[];
}
function getFormDataQCIlluminaw() {
	var formData = new FormData();

	var query1 = "";
	var query2 = "";
	var seperater1 = "";
	var seperater2 = "";

		var filesSelectedPairedIllumina = [];
		var filesSelectedPairedAdaptorIllumina = [];

		var filesSelectedSingleIllumina = [];
		var filesSelectedSingleAdaptorIllumina = [];
		if (validateInputFilesQCIllumina()) {
			if (document.getElementById("idInputReadTypeQCIllumina").value == "Paired") {
				var idFastaFileSelect = document
						.getElementById("idFirstFileSelectIllumina").innerHTML;
				var idQualityFileSelect = document
						.getElementById("idSecondFileSelectIllumina").innerHTML;
				var pairedFiles = [];
				var adaptorValues = [];
				pairedFiles[0] = idFastaFileSelect;
				pairedFiles[1] = idQualityFileSelect;
				filesSelectedPairedIllumina.push(jarray[idFastaFileSelect]);
				filesSelectedPairedIllumina.push(jarray[idQualityFileSelect]);
				if (document.getElementById("idAdaptorLibrariesValueIllumina").value == "file") {

					var idSingleFileSelect = document
							.getElementById("idSingleFileAdaptorSelectIllumina").innerHTML;
					adaptorValues[0] = idSingleFileSelect;
					filesSelectedPairedAdaptorIllumina
							.push(jarray[idSingleFileSelect]);

				} else {
					filesSelectedPairedAdaptorIllumina
							.push(document
									.getElementById("idAdaptorLibrariesValueIllumina").value);
					adaptorValues[0] = document
							.getElementById("idAdaptorLibrariesValueIllumina").value;
				}
				filesSelectedPairedAdaptorIllumina
						.push(document
								.getElementById("idAdaptorLibrariesValueIlluminaFastaVarient").value);
				adaptorValues[1] = document
						.getElementById("idAdaptorLibrariesValueIlluminaFastaVarient").value;
				inputOfUser.push(filesSelectedPairedIllumina);
				inputOfUser.push(filesSelectedPairedAdaptorIllumina);
				// alert("b d==>"+inputOfUser);
				// alert("==ff>" + filesSelectedAdaptorIllumina.toString());
				// showFilesDivPairedIllumina(pairedFiles, adaptorValues,
				// index);
				// showAdaptorIllumina(filesSelectedPairedAdaptorIllumina);
				/*
				 * document.getElementById("idFirstFileSelectIllumina").innerHTML =
				 * "No file selected";
				 * document.getElementById("idSecondFileSelectIllumina").innerHTML =
				 * "No file selected";
				 * document.getElementById("idSingleFileAdaptorSelectIllumina").innerHTML =
				 * "No file selected"; index = index + 1;
				 */
			} else {
				var idSingleFileSelectIllumina = document
						.getElementById("idSingleFileSelectIllumina").innerHTML;
				var idAdaptorLibrariesValueIllumina = document
						.getElementById("idAdaptorLibrariesValueIllumina").value;
				var idAdaptorLibrariesValueIlluminaFastaVarient = document
						.getElementById("idAdaptorLibrariesValueIlluminaFastaVarient").value;
				var adaptorValues = [];
				var singleFiles = [];
				singleFiles[0] = idSingleFileSelectIllumina;
				filesSelectedSingleIllumina
						.push(jarray[idSingleFileSelectIllumina]);
				if (idAdaptorLibrariesValueIllumina == "file") {

					var idSingleFileAdaptorSelectIllumina = document
							.getElementById("idSingleFileAdaptorSelectIllumina").innerHTML;
					adaptorValues[0] = idSingleFileAdaptorSelectIllumina;
					filesSelectedSingleAdaptorIllumina
							.push(jarray[idSingleFileAdaptorSelectIllumina]);
				} else {
					adaptorValues[0] = document
							.getElementById("idAdaptorLibrariesValueIllumina").value;
					filesSelectedSingleAdaptorIllumina
							.push(idAdaptorLibrariesValueIllumina);
				}
				adaptorValues[1] = document
						.getElementById("idAdaptorLibrariesValueIlluminaFastaVarient").value;
				filesSelectedSingleAdaptorIllumina
						.push(idAdaptorLibrariesValueIlluminaFastaVarient);

				inputOfUser.push(filesSelectedSingleIllumina);
				inputOfUser.push(filesSelectedSingleAdaptorIllumina);

				// showFilesDivSingleIllumina(singleFiles, adaptorValues,
				// index);
				document.getElementById("idSingleFileSelectIllumina").innerHTML = "No file selected";
				index = index + 1;
			}

		}
	
	if (document.getElementById("idInputReadTypeQCIllumina").value == "Paired") {
		var flag = true;

		for (var y = 0; y < inputOfUser.length; y++) {
			if (flag) {
				query1 = query1 + seperater1
						+ getInputFilePathQCIlluminaPaired(inputOfUser[y]);
				flag = false;
				seperater1 = ",";
			} else {

				query2 = query2
						+ seperater2
						+ getInputFilePathQCIlluminaPairedAdaptor(inputOfUser[y]);
				flag = true;
				seperater2 = ",";
			}
		}
	} else {
		var flag = true;
		for (var y = 0; y < inputOfUser.length; y++) {
			if (flag) {
				query1 = query1 + seperater1
						+ getInputFilePathQCIlluminaSingle(inputOfUser[y]);
				flag = false;
				seperater1 = ",";
			} else {
				query2 = query2
						+ seperater2
						+ getInputFilePathQCIlluminaAdaptorSingle(inputOfUser[y]);
				flag = true;
				seperater2 = ",";
			}
		}
	}
	// alert("query==>" + query);
	formData.append("projectName", document
			.getElementById("idProjectNameIllumina").value);
	formData.append("query1", query1);
	formData.append("sequenceType", document
			.getElementById("idInputReadTypeQCIllumina").value);
	formData.append("query2", query2);
	formData.append("l", document.getElementById("idlIllumina").value);
	formData.append("s", document.getElementById("idsIllumina").value);

	formData.append("onlyStat", getProcessingOptionStringIlluminax());
	formData.append("t", document.getElementById("idTTypeIllumina").value);
	formData.append("z", document.getElementById("idZTypeIllumina").value);

	formData.append("cpu", document.getElementById("idCPUIllumina").value);
	formData.append("outputFolder", jarray[document
			.getElementById("idOutputDirIlluminaSelect").innerHTML]);
	formData.append("userId", localStorage.userId);
	return formData;
}
/*
 * function getFormDataQCIllumina() { var formData = new FormData(); var query =
 * ""; if (document.getElementById("idInputReadTypeQCIllumina").value ==
 * "Paired") { var flag = true;
 * 
 * for (var y = 0; y < inputOfUser.length; y++) { if (flag) { query = query +
 * getInputFilePathQCIlluminaPaired(inputOfUser[y]); flag = false; } else {
 * 
 * query = query + getInputFilePathQCIlluminaPairedAdaptor(inputOfUser[y]); flag =
 * true; } } } else { var flag = true; for (var y = 0; y < inputOfUser.length;
 * y++) { if (flag) { query = query +
 * getInputFilePathQCIlluminaSingle(inputOfUser[y]); flag = false; } else {
 * query = query + getInputFilePathQCIlluminaAdaptorSingle(inputOfUser[y]); flag =
 * true; } } } //alert("query==>" + query); formData.append("query", query +
 * getCommanStringQCIllumina()); formData.append("cpu",
 * document.getElementById("idCPUIllumina").value);
 * formData.append("outputFolder",
 * jarray[document.getElementById("idOutputDirIlluminaSelect").innerHTML]);
 * formData.append("userId", localStorage.userId); return formData; }
 */
function getCommanStringQCIllumina() {
	return getQCOptionStringIllumina() + getProcessingOptionStringIllumina()
			+ getOutputOptionStringIllumina();
}
function getQCOptionStringIllumina() {
	var stringComposed = " -l " + document.getElementById("idlIllumina").value
			+ " -s " + document.getElementById("idsIllumina").value;
	return stringComposed;
}
function getProcessingOptionStringIllumina() {
	if (document.getElementById("idCheckBoxOnlyStatsIllumina").checked) {
		return " -onlyStat ";
	} else {
		return "";
	}
}
function getProcessingOptionStringIlluminax() {
	if (document.getElementById("idCheckBoxOnlyStatsIllumina").checked) {
		return "true";
	} else {
		return "false";
	}
}
function getOutputOptionStringIllumina() {
	return " -t " + document.getElementById("idTTypeIllumina").value + " -z "
			+ document.getElementById("idZTypeIllumina").value;

}

function getInputFilePathQCIlluminaPaired(filesSelectedPairedIllumina) {

	var inputFileString1 = "";

	var seperator = " -pe ";
	var flag = true;
	for (var i = 0; i < filesSelectedPairedIllumina.length; i++) {
		if (flag == true) {
			inputFileString1 = inputFileString1 + seperator
					+ filesSelectedPairedIllumina[i];
			flag = false;
		} else {
			inputFileString1 = inputFileString1 + " "
					+ filesSelectedPairedIllumina[i];
			flag = true;
		}

	}

	return inputFileString1;

}
function getInputFilePathQCIlluminaPairedAdaptor(filesSelectedAdaptorIllumina) {
	var inputFileString1;
	/*
	 * var flag123=false; for (var i = 0; i <
	 * filesSelectedAdaptorIllumina.length; i++) {
	 * 
	 * if(flag123){ inputFileString1 =inputFileString1+" " +
	 * filesSelectedAdaptorIllumina[i] + " " + document
	 * .getElementById("idAdaptorLibrariesValueIlluminaFastaVarient").value;
	 * 
	 * }else{ }
	 * alert(filesSelectedAdaptorIllumina[i]+"==9s0==>"+inputFileString1);
	 */

	inputFileString1 = " " + filesSelectedAdaptorIllumina[0] + " "
			+ filesSelectedAdaptorIllumina[1];

	return inputFileString1;
}
function getInputFilePathQCIlluminaSingle(filesSelectedSingleIllumina) {
	var seperator = " -se ";
	var inputFileString1 = "";
	for (var i = 0; i < filesSelectedSingleIllumina.length; i++) {
		inputFileString1 = inputFileString1 + seperator
				+ filesSelectedSingleIllumina[i];
	}
	return inputFileString1;
}
function getInputFilePathQCIlluminaAdaptorSingle(filesSelectedSingleIllumina) {
	var inputFileString1 = "";
	for (var i = 0; i < filesSelectedSingleIllumina.length; i++) {
		inputFileString1 = inputFileString1 + " "
				+ filesSelectedSingleIllumina[i];
	}
	return inputFileString1;
}
var inputOfUser = []
var index = 0;

function addNewUploadIllumina() {
	flagForMultiFiles = true;
	var filesSelectedPairedIllumina = [];
	var filesSelectedPairedAdaptorIllumina = [];

	var filesSelectedSingleIllumina = [];
	var filesSelectedSingleAdaptorIllumina = [];
	if (validateInputFilesQCIllumina()) {
		if (document.getElementById("idInputReadTypeQCIllumina").value == "Paired") {
			var idFastaFileSelect = document
					.getElementById("idFirstFileSelectIllumina").innerHTML;
			var idQualityFileSelect = document
					.getElementById("idSecondFileSelectIllumina").innerHTML;
			var pairedFiles = [];
			var adaptorValues = [];
			pairedFiles[0] = idFastaFileSelect;
			pairedFiles[1] = idQualityFileSelect;
			filesSelectedPairedIllumina.push(jarray[idFastaFileSelect]);
			filesSelectedPairedIllumina.push(jarray[idQualityFileSelect]);
			if (document.getElementById("idAdaptorLibrariesValueIllumina").value == "file") {

				var idSingleFileSelect = document
						.getElementById("idSingleFileAdaptorSelectIllumina").innerHTML;
				adaptorValues[0] = idSingleFileSelect;
				filesSelectedPairedAdaptorIllumina
						.push(jarray[idSingleFileSelect]);

			} else {
				filesSelectedPairedAdaptorIllumina
						.push(document
								.getElementById("idAdaptorLibrariesValueIllumina").value);
				adaptorValues[0] = document
						.getElementById("idAdaptorLibrariesValueIllumina").value;
			}
			filesSelectedPairedAdaptorIllumina
					.push(document
							.getElementById("idAdaptorLibrariesValueIlluminaFastaVarient").value);
			adaptorValues[1] = document
					.getElementById("idAdaptorLibrariesValueIlluminaFastaVarient").value;
			inputOfUser.push(filesSelectedPairedIllumina);
			inputOfUser.push(filesSelectedPairedAdaptorIllumina);
			// alert("b d==>"+inputOfUser);
			// alert("==ff>" + filesSelectedAdaptorIllumina.toString());
			showFilesDivPairedIllumina(pairedFiles, adaptorValues, index);
			// showAdaptorIllumina(filesSelectedPairedAdaptorIllumina);
			document.getElementById("idFirstFileSelectIllumina").innerHTML = "No file selected";
			document.getElementById("idSecondFileSelectIllumina").innerHTML = "No file selected";
			document.getElementById("idSingleFileAdaptorSelectIllumina").innerHTML = "No file selected";
			index = index + 1;
		} else {
			var idSingleFileSelectIllumina = document
					.getElementById("idSingleFileSelectIllumina").innerHTML;
			var idAdaptorLibrariesValueIllumina = document
					.getElementById("idAdaptorLibrariesValueIllumina").value;
			var idAdaptorLibrariesValueIlluminaFastaVarient = document
					.getElementById("idAdaptorLibrariesValueIlluminaFastaVarient").value;
			var adaptorValues = [];
			var singleFiles = [];
			singleFiles[0] = idSingleFileSelectIllumina;
			filesSelectedSingleIllumina
					.push(jarray[idSingleFileSelectIllumina]);
			if (idAdaptorLibrariesValueIllumina == "file") {

				var idSingleFileAdaptorSelectIllumina = document
						.getElementById("idSingleFileAdaptorSelectIllumina").innerHTML;
				adaptorValues[0] = idSingleFileAdaptorSelectIllumina;
				filesSelectedSingleAdaptorIllumina
						.push(jarray[idSingleFileAdaptorSelectIllumina]);
			} else {
				adaptorValues[0] = document
						.getElementById("idAdaptorLibrariesValueIllumina").value;
				filesSelectedSingleAdaptorIllumina
						.push(idAdaptorLibrariesValueIllumina);
			}
			adaptorValues[1] = document
					.getElementById("idAdaptorLibrariesValueIlluminaFastaVarient").value;
			filesSelectedSingleAdaptorIllumina
					.push(idAdaptorLibrariesValueIlluminaFastaVarient);

			inputOfUser.push(filesSelectedSingleIllumina);
			inputOfUser.push(filesSelectedSingleAdaptorIllumina);

			showFilesDivSingleIllumina(singleFiles, adaptorValues, index);
			document.getElementById("idSingleFileSelectIllumina").innerHTML = "No file selected";
			index = index + 1;
		}

	}
}

function showFilesDivSingleIllumina(pairedFiles, adaptorIllumina, index) {
	// alert("vve==>"+adaptorIllumina);
	var divSelectedFiles = document.getElementById("divSelectedFilesIllumina");
	var stringVar = "Single";
	var closeDiv = document.createElement("div");
	closeDiv.setAttribute("class", "col-sm-12 classSelectedFilesDiv");
	closeDiv.innerHTML = "<span id='close' class='col-sm-1 btn btn-default' onclick='closeDiv(this,"
			+ index + ");'>x</span>";
	for (j = 0; j < pairedFiles.length; j++) {
		var fromGroupDiv = document.createElement("div");
		fromGroupDiv.setAttribute("class", "form-group col-sm-11");

		var colSm4 = document.createElement("div");
		colSm4.setAttribute("class", "col-sm-6");

		var labelFile = document.createElement("label");
		labelFile.setAttribute("class", "control-label col-sm-10 textClass");
		labelFile.innerHTML = "Selected -" + stringVar + " file";
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
		stringVar = "Single Adaptor";
	}
	var adaptorString = "Adaptor libraries"
	for (var j = 0; j < adaptorIllumina.length; j++) {

		var fromGroupDiv = document.createElement("div");
		fromGroupDiv.setAttribute("class", "form-group col-sm-11");

		var colSm4 = document.createElement("div");
		colSm4.setAttribute("class", "col-sm-6");

		var labelFile = document.createElement("label");
		labelFile.setAttribute("class", "control-label col-sm-10 textClass");
		labelFile.innerHTML = adaptorString;
		var colSm6 = document.createElement("div");
		colSm6.setAttribute("class", "col-sm-4");

		var labelFileName = document.createElement("label");
		labelFileName.setAttribute("class", "control-label col-sm-4 textClass");
		labelFileName.innerHTML = adaptorIllumina[j];

		colSm4.appendChild(labelFile);
		colSm6.appendChild(labelFileName);

		fromGroupDiv.appendChild(colSm4);
		fromGroupDiv.appendChild(colSm6);
		closeDiv.appendChild(fromGroupDiv);
		adaptorString = "FASTQ variants";
	}

}
function closeDiv(selection, index) {
	// alert("b sub==>" + inputOfUser);
	selection.parentNode.parentNode.removeChild(selection.parentNode);
	inputOfUser.splice(index, 2);
	if (inputOfUser.length == 0) {
		flagForMultiFiles = false;
	}
	// alert("after sub==>" + inputOfUser);
}
function showFilesDivPairedIllumina(pairedFiles, adaptorIllumina, index) {
	var divSelectedFiles = document.getElementById("divSelectedFilesIllumina");

	var closeDiv = document.createElement("div");
	closeDiv.setAttribute("class", "col-sm-12 classSelectedFilesDiv");
	closeDiv.innerHTML = "<span id='close' class='col-sm-1 btn btn-default' onclick='closeDiv(this,"
			+ index + ");'>x</span>";
	for (var j = 0; j < pairedFiles.length; j++) {
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

	}
	var adaptorString = "Adaptor libraries"
	for (var j = 0; j < adaptorIllumina.length; j++) {

		var fromGroupDiv = document.createElement("div");
		fromGroupDiv.setAttribute("class", "form-group col-sm-11");

		var colSm4 = document.createElement("div");
		colSm4.setAttribute("class", "col-sm-6");

		var labelFile = document.createElement("label");
		labelFile.setAttribute("class", "control-label col-sm-10 textClass");
		labelFile.innerHTML = adaptorString;
		var colSm6 = document.createElement("div");
		colSm6.setAttribute("class", "col-sm-4");

		var labelFileName = document.createElement("label");
		labelFileName.setAttribute("class", "control-label col-sm-4 textClass");
		labelFileName.innerHTML = adaptorIllumina[j];

		colSm4.appendChild(labelFile);
		colSm6.appendChild(labelFileName);

		fromGroupDiv.appendChild(colSm4);
		fromGroupDiv.appendChild(colSm6);
		closeDiv.appendChild(fromGroupDiv);
		adaptorString = "FASTQ variants";
	}
	divSelectedFiles.appendChild(closeDiv);
}
function changeOptionQCIllumina(element) {
	if (element.value == "Paired") {

		$("#selectSingleFileFormGroupIllumina").fadeOut('slow');
		$("#selectSecondFileFormGroupIllumina").fadeIn('slow');
		$("#selectFirstFileFormGroupIllumina").fadeIn('slow');

	} else {
		$("#selectSingleFileFormGroupIllumina").fadeIn('slow');
		$("#selectSecondFileFormGroupIllumina").fadeOut('slow');
		$("#selectFirstFileFormGroupIllumina").fadeOut('slow');
	}
	inputOfUser = [];
	index = 0;
	document.getElementById("idOutputDirIlluminaSelect").innerHTML = "No folder selected";
	document.getElementById("illuminaQcCmdOutput").innerHTML = "";
	document.getElementById("divSelectedFilesIllumina").innerHTML = "";
	document.getElementById("idOutputDirIlluminaSelect").value = "N";
}