var illuminaOutput = "";
var tempOutputIllumina = "Running...";
var intervarFlag = false;
var flagForMultiFiles = false;

var listOfFileForIllumina = "";
var arrOfFileList = [];
var formDataForIlliminaQC;

function submitQCIllumina()
{
	formDataForIlliminaQC = new FormData();
	
	if(arrayForDiv.length > 0)
	{
		for(var i = 0; i < arrayForDiv.length; i++)
		{
			if(!validateNewCreatedDivElementsOnSubmitButton(arrayForDiv[i]))
			{
				alert("Missing some mandatory information...!!");
				return false;
			}
		}
		getIlluminaInputFiles();
		arrOfFileList[arrIndex] = listOfFileForIllumina;
		
		var sentData = arrOfFileList.join("###");
		formDataForIlliminaQC.append("listOfSamples", sentData);
	}
	else
	{
		if(!validateOldDivElementsOnSubmitButton())
		{
			alert("Missing some mandatory information...!!");
			return false;
		}
		getIlluInputFilesForOld();
		arrOfFileList[arrIndex] = listOfFileForIllumina;
		
		var sentData = arrOfFileList.join("###");
		formDataForIlliminaQC.append("listOfSamples", sentData);
	}
	
	getIlluminaQCData();
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', URL_RUN_QC_ILLUMINA, true);
	xhr.onload = function(e) {};
	intervarFlag = true;
	xhr.send(formDataForIlliminaQC);
	
	$("#myModal").modal('show');
	xhr.onreadystatechange = function() 
	{
		var response = eval("(" + xhr.responseText + ")");
		var illuminaOutput = "";
		
		if (xhr.readyState == 4) 
		{
			if (xhr.status == 200) 
			{
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
			} 
			else 
			{
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
				inputOfUser.pop();inputOfUser.pop();	
				index=index-1;
			}
		}
	};
}

function getIlluminaQCData()
{
	formDataForIlliminaQC.append("projectName", document.getElementById("idProjectNameIllumina").value);
	
	formDataForIlliminaQC.append("onlyStat", getProcessingOptionStringIlluminax());
	formDataForIlliminaQC.append("t", document.getElementById("idTTypeIllumina").value);
	formDataForIlliminaQC.append("z", document.getElementById("idZTypeIllumina").value);
	
	var inputValForL = document.getElementById("idlIllumina").value;
	var inputValForS = document.getElementById("idsIllumina").value;
	
	var inputValForCPU = document.getElementById("idCPUIllumina").value;
	var MinValForCPU = 1;
	var MaxValForCPU = parseInt( document.getElementById("idCPUFromServer").innerHTML );
	
//	L option
	
	if(inputValForL > 100)
	{
		formDataForIlliminaQC.append("l", "70");
	}
	else
	{
		formDataForIlliminaQC.append("l", document.getElementById("idlIllumina").value);
	}
	
//	S option
	
	if(inputValForS > 40)
	{
		formData.append("s", "20");
	}
	else
	{
		formDataForIlliminaQC.append("s", document.getElementById("idsIllumina").value);
	}
	
//	CPU Info
	
	if((inputValForCPU < MinValForCPU) || (inputValForCPU > MaxValForCPU))
	{
		formDataForIlliminaQC.append("cpu","1");
	}
	else
	{
		formDataForIlliminaQC.append("cpu", document.getElementById("idCPUIllumina").value);
	}

	formDataForIlliminaQC.append("outputFolder", jarray[document.getElementById("idOutputDirIlluminaSelect").innerHTML]);
	formDataForIlliminaQC.append("userId", localStorage.userId);
}

function getIlluInputFilesForOld()
{
	listOfFileForIllumina = document.getElementById("idSampleNameIlluminaQc").value + ";"
							+ document.getElementById("idInputReadTypeQCIllumina").value + ";";

	if(document.getElementById("idInputReadTypeQCIllumina").value == "Paired")
	{
		listOfFileForIllumina = listOfFileForIllumina 
								+  jarray[document.getElementById("idFirstFileSelectIllumina").innerHTML] + ";"
								+  jarray[document.getElementById("idSecondFileSelectIllumina").innerHTML] + ";";
	}
	else
	{
		listOfFileForIllumina = listOfFileForIllumina +  jarray[document.getElementById("idSingleFileSelectIllumina").innerHTML] + ";";
	}
	
	if(document.getElementById("idAdaptorLibrariesValueIllumina").value == "file")
	{
		listOfFileForIllumina = listOfFileForIllumina + jarray[document.getElementById("idSingleFileAdaptorSelectIllumina").innerHTML] + ";";
	}
	else
	{
		listOfFileForIllumina = listOfFileForIllumina +  document.getElementById("idAdaptorLibrariesValueIllumina").value + ";";
	}
	
	listOfFileForIllumina = listOfFileForIllumina +  document.getElementById("idAdaptorLibrariesValueIlluminaFastaVarient").value;
}

function getIlluminaInputFiles()
{
	for (var j = arrIndex - 1 ; j < arrayForDiv.length; j++) 
	{
		listOfFileForIllumina = document.getElementById("idSampleNameIlluminaQc" + arrayForDiv[j]).value + ";"
								 + document.getElementById("idInputReadTypeQCIllumina" + arrayForDiv[j]).value + ";";
		
		if(document.getElementById("idInputReadTypeQCIllumina" + arrayForDiv[j]).value == "Paired")
		{
			listOfFileForIllumina = listOfFileForIllumina 
									+  jarray[document.getElementById("idFirstFileSelectIllumina" + arrayForDiv[j]).innerHTML] + ";"
									+  jarray[document.getElementById("idSecondFileSelectIllumina" + arrayForDiv[j]).innerHTML] + ";";
		}
		else
		{
			listOfFileForIllumina = listOfFileForIllumina +  jarray[document.getElementById("idSingleFileSelectIllumina" + arrayForDiv[j]).innerHTML] + ";";
		}
		
		if(document.getElementById("idAdaptorLibrariesValueIllumina" + arrayForDiv[j]).value == "file")
		{
			listOfFileForIllumina = listOfFileForIllumina + jarray[document.getElementById("idSingleFileAdaptorSelectIllumina" + arrayForDiv[j]).innerHTML] + ";";
		}
		else
		{
			listOfFileForIllumina = listOfFileForIllumina +  document.getElementById("idAdaptorLibrariesValueIllumina" + arrayForDiv[j]).value + ";";
		}
		
		listOfFileForIllumina = listOfFileForIllumina +  document.getElementById("idAdaptorLibrariesValueIlluminaFastaVarient" + arrayForDiv[j]).value;
	}
}

function getIlluminaInputFilesOnRecall(divNumberValue)
{
	if(divNumberValue != 0)
	{
		listOfFileForIllumina = document.getElementById("idSampleNameIlluminaQc" + divNumberValue).value + ";"
								+ document.getElementById("idInputReadTypeQCIllumina" + divNumberValue).value + ";";
		
		if(document.getElementById("idInputReadTypeQCIllumina" + divNumberValue).value == "Paired")
		{
			listOfFileForIllumina = listOfFileForIllumina 
					+  jarray[document.getElementById("idFirstFileSelectIllumina" + divNumberValue).innerHTML] + ";"
					+  jarray[document.getElementById("idSecondFileSelectIllumina" + divNumberValue).innerHTML] + ";";
		}
		else
		{
			listOfFileForIllumina = listOfFileForIllumina +  jarray[document.getElementById("idSingleFileSelectIllumina" + divNumberValue).innerHTML] + ";";
		}
		
		if(document.getElementById("idAdaptorLibrariesValueIllumina" + divNumberValue).value == "file")
		{
			listOfFileForIllumina = listOfFileForIllumina + jarray[document.getElementById("idSingleFileAdaptorSelectIllumina" + divNumberValue).innerHTML] + ";";
		}
		else
		{
			listOfFileForIllumina = listOfFileForIllumina +  document.getElementById("idAdaptorLibrariesValueIllumina" + divNumberValue).value + ";";
		}
		
		listOfFileForIllumina = listOfFileForIllumina +  document.getElementById("idAdaptorLibrariesValueIlluminaFastaVarient" + divNumberValue).value;
	}
	else
	{
		listOfFileForIllumina = document.getElementById("idSampleNameIlluminaQc").value + ";"
								+ document.getElementById("idInputReadTypeQCIllumina").value + ";";
		
		if(document.getElementById("idInputReadTypeQCIllumina").value == "Paired")
		{
			listOfFileForIllumina = listOfFileForIllumina 
									+  jarray[document.getElementById("idFirstFileSelectIllumina").innerHTML] + ";"
									+  jarray[document.getElementById("idSecondFileSelectIllumina").innerHTML] + ";";
		}
		else
		{
			listOfFileForIllumina = listOfFileForIllumina +  jarray[document.getElementById("idSingleFileSelectIllumina").innerHTML] + ";";
		}
		
		if(document.getElementById("idAdaptorLibrariesValueIllumina").value == "file")
		{
			listOfFileForIllumina = listOfFileForIllumina + jarray[document.getElementById("idSingleFileAdaptorSelectIllumina").innerHTML] + ";";
		}
		else
		{
			listOfFileForIllumina = listOfFileForIllumina +  document.getElementById("idAdaptorLibrariesValueIllumina").value + ";";
		}
		
		listOfFileForIllumina = listOfFileForIllumina +  document.getElementById("idAdaptorLibrariesValueIlluminaFastaVarient").value;
	}
}

function resetQCIlluminaFormz()
{
	document.getElementById("idFirstFileSelectIllumina").innerHTML = "No file selected";
	document.getElementById("idSecondFileSelectIllumina").innerHTML = "No file selected";
	document.getElementById("idSingleFileAdaptorSelectIllumina").innerHTML = "No file selected";
	index = 0;
	illuminaOutput = "";
	tempOutputIllumina = "Running...";
	intervarFlag = false;
	flagForMultiFiles = false;
	inputOfUser=[];
	
	arrOfFileList = [];
	arrIndex = 0;
	callCounter = 1;
}

function getFormDataQCIlluminaw() 
{
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
	formData.append("projectName", document.getElementById("idProjectNameIllumina").value);
	formData.append("query1", query1);
	formData.append("sequenceType", document.getElementById("idInputReadTypeQCIllumina").value);
	formData.append("query2", query2);
	formData.append("l", document.getElementById("idlIllumina").value);
	formData.append("s", document.getElementById("idsIllumina").value);

	formData.append("onlyStat", getProcessingOptionStringIlluminax());
	formData.append("t", document.getElementById("idTTypeIllumina").value);
	formData.append("z", document.getElementById("idZTypeIllumina").value);

	formData.append("cpu", document.getElementById("idCPUIllumina").value);
	formData.append("outputFolder", jarray[document.getElementById("idOutputDirIlluminaSelect").innerHTML]);
	
	formData.append("sequenceFileType", document
	                           			.getElementById("idSequenceType").value);
	                           	
	
	formData.append("userId", localStorage.userId);
	return formData;
}

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
