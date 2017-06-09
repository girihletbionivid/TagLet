var inputOfUserIon = [];
var indexIon = 0;
var outputFolderNames = [];
function wsSubmitIon() {
	if (validateProjectNameIon() && validateFilesIon()
			&& validateOutfolderPathIon()) {
		addNewUploadIonWithoutShow();
		var filesSelectedPaired = [];
		var filesSelectedSingle = [];
		var xhr = new XMLHttpRequest();
		var formData = getFormDataIon();
		xhr.open('POST', URL_RUN_ION_TORRENT, true);
		xhr.send(formData);
		$("#myModal").modal('show');
		xhr.onreadystatechange = function() {
			var response = eval("(" + xhr.responseText + ")");
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					$("#myModal").modal('hide');
					qcOutput = response.message;
					$("#ionSection").fadeOut('slow');
					$("#ionCmdQutput").fadeIn('slow');
					var objDiv = document.getElementById("ionCmdOutput");
					objDiv.innerHTML = qcOutput;
					$("#ionCmd").animate({
						scrollTop : $('#ionCmd')[0].scrollHeight
					}, 1000);
				} else {
					$("#myModal").modal('hide');
					alert(response.message);
				}
			}
		};
	}

}
function getFormDataIon() {
	var formData = new FormData();
	formData.append("sequenceType", document
			.getElementById("idSequenceTypeIon").value);
	formData
			.append("phred", document.getElementById("idCheckBoxPhred").checked);
	formData.append("aa", document.getElementById("idCheckBoxa").checked);
	formData.append("qual", document.getElementById("idCheckBoxQual").checked);

	formData.append("length", document.getElementById("ionLength").value + " "
			+ document.getElementById("idLength").value);
	formData.append("filterSequence", document
			.getElementById("idFilterSequenceMulti").value
			+ " " + document.getElementById("idFilterSequence").value);

	formData.append("inputOfUserIon", inputOfUserIon);

	formData.append("outputFolderNameArray", outputFolderNames);
	formData.append("outputDir", jarray[document
			.getElementById("idOutputFolderIonSelect").innerHTML]);

	formData.append("userId", localStorage.userId);
	formData.append("projectName",
			document.getElementById("idProjectNameIon").value);
	return formData;
}
function addNewUploadIonWithoutShow() {
	var filesSelectedPaired = [];
	var filesSelectedOutPut = [];
	// alert("Dd"+validateFilesIon());
	if (validateFilesIon()) {

		if (document.getElementById("idSequenceTypeIon").value == "Fasta") {

			var idFastaFileSelect = document
					.getElementById("idInputFileFastaIonSelect").innerHTML;
			var idQualityFileSelect = document
					.getElementById("idInputFileQualIonSelect").innerHTML;
			var idIonOutputfolderName = document
					.getElementById("idIonOutputfolderName").value;

			filesSelectedPaired.push(jarray[idFastaFileSelect]);
			filesSelectedPaired.push(jarray[idQualityFileSelect]);
			filesSelectedOutPut.push(idIonOutputfolderName);

			document.getElementById("idInputFileFastaIonSelect").innerHTML = "No file selected";
			document.getElementById("idInputFileQualIonSelect").innerHTML = "No file selected";
			document.getElementById("idIonOutputfolderName").value = "";

			inputOfUserIon.push(filesSelectedPaired);
			outputFolderNames.push(filesSelectedOutPut);
			// showFilesDivPairedIon(pairedFiles, filesSelectedOutPut,
			// indexIon);
			// alert("my her" + inputOfUserQc);
			indexIon = indexIon + 1;

		} else {

			var idInputFileFastqIonSelect = document
					.getElementById("idInputFileFastqIonSelect").innerHTML;

			var idIonOutputfolderName = document
					.getElementById("idIonOutputfolderName").value;

			filesSelectedPaired.push(jarray[idInputFileFastqIonSelect]);
			filesSelectedOutPut.push(idIonOutputfolderName);
			document.getElementById("idInputFileFastqIonSelect").innerHTML = "No file selected";
			document.getElementById("idIonOutputfolderName").value = "";

			inputOfUserIon.push(filesSelectedPaired);
			outputFolderNames.push(filesSelectedOutPut);
			// showFilesDivSingleIon(pairedFiles, filesSelectedOutPut,
			// indexIon);
			// alert("my her" + inputOfUserQc);
			indexIon = indexIon + 1;

		}
	}
}
function addNewUploadIon() {
	var filesSelectedPaired = [];
	var filesSelectedOutPut = [];
	// alert("Dd"+validateFilesIon());
	if (validateFilesIon()) {

		if (document.getElementById("idSequenceTypeIon").value == "Fasta") {

			var idFastaFileSelect = document
					.getElementById("idInputFileFastaIonSelect").innerHTML;
			var idQualityFileSelect = document
					.getElementById("idInputFileQualIonSelect").innerHTML;
			var idIonOutputfolderName = document
					.getElementById("idIonOutputfolderName").value;
			var pairedFiles = [];
			pairedFiles[0] = idFastaFileSelect;
			pairedFiles[1] = idQualityFileSelect;

			filesSelectedPaired.push(jarray[idFastaFileSelect]);
			filesSelectedPaired.push(jarray[idQualityFileSelect]);
			filesSelectedOutPut.push(idIonOutputfolderName);

			document.getElementById("idInputFileFastaIonSelect").innerHTML = "No file selected";
			document.getElementById("idInputFileQualIonSelect").innerHTML = "No file selected";
			document.getElementById("idIonOutputfolderName").value = "";

			inputOfUserIon.push(filesSelectedPaired);
			inputOfUserIon.push(filesSelectedOutPut);
			outputFolderNames.push(filesSelectedOutPut);
			showFilesDivPairedIon(pairedFiles, filesSelectedOutPut, indexIon);
			// alert("my her" + inputOfUserQc);
			indexIon = indexIon + 1;

		} else {

			var idInputFileFastqIonSelect = document
					.getElementById("idInputFileFastqIonSelect").innerHTML;

			var idIonOutputfolderName = document
					.getElementById("idIonOutputfolderName").value;
			var pairedFiles = [];
			pairedFiles[0] = idInputFileFastqIonSelect;

			filesSelectedPaired.push(jarray[idInputFileFastqIonSelect]);
			filesSelectedOutPut.push(idIonOutputfolderName);
			document.getElementById("idInputFileFastqIonSelect").innerHTML = "No file selected";
			document.getElementById("idIonOutputfolderName").value = "";

			inputOfUserIon.push(filesSelectedPaired);

			outputFolderNames.push(filesSelectedOutPut);
			showFilesDivSingleIon(pairedFiles, filesSelectedOutPut, indexIon);
			// alert("my her" + inputOfUserQc);
			indexIon = indexIon + 1;

		}
	}
}
function showFilesDivSingleIon(pairedFiles, filesSelectedSingle, indexQc) {
	var divSelectedFiles = document.getElementById("selectedFileIon");

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
function closeDivQC(selection, index) {
	// alert("b sub==>" + inputOfUser);
	selection.parentNode.parentNode.removeChild(selection.parentNode);
	if (document.getElementById("idSequenceTypeIon").value == "Fasta") {
		inputOfUserIon.splice(index, 2);
		outputFolderNames.splice(index, 1);
	} else {
		inputOfUserIon.splice(index, 1);
		outputFolderNames.splice(index, 1);
	}

	outputFolderNames.splice(index, 2);
	// alert("after sub==>" + inputOfUser);
}
function showFilesDivPairedIon(pairedFiles, filesSelectedSingle, indexQc) {
	var divSelectedFiles = document.getElementById("selectedFileIon");

	var closeDiv = document.createElement("div");
	closeDiv.setAttribute("class", "col-sm-12 classSelectedFilesDiv");
	closeDiv.innerHTML = "<span id='close' class='col-sm-1 btn btn-default' onclick='closeDivQC(this,"
			+ indexQc + ");'>x</span>";
	var valueLable = "fasta";
	for (j = 0; j < pairedFiles.length; j++) {
		var fromGroupDiv = document.createElement("div");
		fromGroupDiv.setAttribute("class", "form-group col-sm-11");

		var colSm4 = document.createElement("div");
		colSm4.setAttribute("class", "col-sm-6");

		var labelFile = document.createElement("label");
		labelFile.setAttribute("class", "control-label col-sm-10 textClass");
		labelFile.innerHTML = valueLable + " file";
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
		valueLable = "quality";
	}

	var fromGroupDiv = document.createElement("div");
	fromGroupDiv.setAttribute("class", "form-group col-sm-11");

	var colSm4 = document.createElement("div");
	colSm4.setAttribute("class", "col-sm-6");

	var labelFile = document.createElement("label");
	labelFile.setAttribute("class", "control-label col-sm-10 textClass");
	labelFile.innerHTML = "output folder name";
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