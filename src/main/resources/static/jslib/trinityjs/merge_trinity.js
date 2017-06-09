var index = 0;
var inputUserControlledR1 = [];
var inputUserControlledR2 = [];
var inputUserTreatedR1 = [];
var inputUserTreatedR2 = [];
var inputUserSingleMergeControl = [];
var inputUserSingleMergeTreated = [];
function submitFormMergePaired() {
	if (validatedPairedMerge()) {
		var xhr = new XMLHttpRequest();
		var formData = getFormDataMerge();
		xhr.open('POST', URL_MERGE_FILES_PAIRED, true);
		xhr.onload = function(e) {
		};
		xhr.send(formData);
		$("#myModal").modal('show');
		xhr.onreadystatechange = function() {
			var response = eval("(" + xhr.responseText + ")");
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					alert("You have=>" + xhr.responseText);
					$("#myModal").modal('hide');

					$("#454QcForm").fadeOut('slow');
					$("#qcCmdQutput").fadeIn('slow');

					var objDiv = document.getElementById("454QcCmdOutput");
					objDiv.innerHTML="";
					objDiv.innerHTML = response.message;

					$("#454QcCmd").animate({
						scrollTop : $('#454QcCmd')[0].scrollHeight
					}, 1000);
				} else {
					$("#myModal").modal('hide');
					alert(response.message);
				}
			}
		};

	}
}
function submitFormMergeSingle() {
	if (validatedPairedMergeSingle()) {
		var xhr = new XMLHttpRequest();
		var formData = getFormDataMergeSingle();
		xhr.open('POST', URL_MERGE_FILES_SINGLE, true);
		xhr.onload = function(e) {
		};
		xhr.send(formData);
		$("#myModal").modal('show');
		xhr.onreadystatechange = function() {
			var response = eval("(" + xhr.responseText + ")");
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					alert("You have=>" + xhr.responseText);
					$("#myModal").modal('hide');

					$("#454QcForm").fadeOut('slow');
					$("#qcCmdQutput").fadeIn('slow');

					var objDiv = document.getElementById("454QcCmdOutput");
					objDiv.innerHTML = response.message;

					$("#454QcCmd").animate({
						scrollTop : $('#454QcCmd')[0].scrollHeight
					}, 1000);
				} else {
					$("#myModal").modal('hide');
					alert(response.message);
				}
			}
		};

	}
}
function validatedPairedMergeSingle(){

	if ((inputUserSingleMergeTreated.length < 1) && (inputUserSingleMergeControl.length < 1)
			) {
		alert("select proper files");
		return false;
	} else {
		if (document.getElementById("idMergeOutputSelect").innerHTML == "No folder selected") {
			alert("select output folder");
			return false;
		} else {
			return true;
		}
	}

}
function validatedPairedMerge() {
	if ((inputUserControlledR1.length < 1) && (inputUserTreatedR1.length < 1)
			&& (inputUserControlledR2.length < 1)
			&& (inputUserTreatedR2.length < 1)) {
		alert("select proper files");
		return false;
	} else {
		if (document.getElementById("idMergeOutputSelect").innerHTML == "No folder selected") {
			alert("select output folder");
			return false;
		} else {
			return true;
		}
	}
}
function getFormDataMerge() {
	var formData = new FormData();
	formData.append("query1", getQueryFirst());
	formData.append("query2", getQuerySecond());
	formData.append("output", document.getElementById("idMergeOutputSelect").innerHTML);
	return formData;
}
function getFormDataMergeSingle() {
	var formData = new FormData();
	formData.append("query1", getQuery());
	formData.append("output", document.getElementById("idMergeOutputSelect").innerHTML);
	return formData;
}
function getQuery(){
	var query = " ";
	var delimiter = " ";
	for (var i = 0; i < inputUserSingleMergeControl.length; i++) {
		query = query + jarray[inputUserSingleMergeControl[i]] + delimiter;
	}
	for (var i = 0; i < inputUserSingleMergeTreated.length; i++) {
		query = query + jarray[inputUserSingleMergeTreated[i]] + delimiter;
	}
	return query;
	// alert("query1==>cat "+query);
}
function getQueryFirst() {
	var query = " ";
	var delimiter = " ";
	for (var i = 0; i < inputUserControlledR1.length; i++) {
		query = query + jarray[inputUserControlledR1[i]] + delimiter;
	}
	for (var i = 0; i < inputUserTreatedR1.length; i++) {
		query = query + jarray[inputUserTreatedR1[i]] + delimiter;
	}
	return query;
	// alert("query1==>cat "+query);
}
function getQuerySecond() {
	var query = " ";
	var delimiter = " ";
	for (var i = 0; i < inputUserControlledR2.length; i++) {
		query = query + jarray[inputUserControlledR2[i]] + delimiter;
	}
	for (var i = 0; i < inputUserTreatedR2.length; i++) {
		query = query + jarray[inputUserTreatedR2[i]] + delimiter;
	}
	return query;
	// alert("query12=>cat "+query);
}
function changeMergeOption(element) {
	if (element.value == "Paired") {
		$("#mergePaired").fadeIn('slow');
		$("#mergeSingle").fadeOut('slow');
		$("#btnRunMerge").attr("onclick","submitFormMergePaired();");
	} else {
		$("#mergePaired").fadeOut('slow');
		$("#mergeSingle").fadeIn('slow');
		$("#btnRunMerge").attr("onclick","submitFormMergeSingle();");
	}
}
function changeInputFileOptionChangeMerge(element) {
	if (element.value == "Fasta") {
		$("#idControlFileR1Browse").attr("onclick",
				"getAllDirectory('idControlFileR1Select','fasta');");
		$("#idControlFileR2Browse").attr("onclick",
				"getAllDirectory('idControlFileR2Select','fasta');");

		$("#idTreatedFileR2Browse").attr("onclick",
				"getAllDirectory('idTreatedFileR1Select','fasta');");
		$("#idTreatedFileR1Browse").attr("onclick",
				"getAllDirectory('idTreatedFileR2Select','fasta');");
		$("#idMergeSingleControlFileBrowse").attr("onclick",
		"getAllDirectory('idMergeSingleControlFileSelect','fasta');");
		$("#idMergeSingleTreatedFileBrowse").attr("onclick",
		"getAllDirectory('idMergeSingleTreatedFileSelect','fasta');");
		
		
	} else {
		$("#idControlFileR1Browse").attr("onclick",
				"getAllDirectory('idControlFileR1Select','fastq');");
		$("#idControlFileR2Browse").attr("onclick",
				"getAllDirectory('idControlFileR2Select','fastq');");

		$("#idTreatedFileR2Browse").attr("onclick",
				"getAllDirectory('idTreatedFileR2Select','fastq');");
		$("#idTreatedFileR1Browse").attr("onclick",
				"getAllDirectory('idTreatedFileR1Select','fastq');");
		$("#idMergeSingleControlFileBrowse").attr("onclick",
		"getAllDirectory('idMergeSingleControlFileSelect','fastq');");
		$("#idMergeSingleTreatedFileBrowse").attr("onclick",
		"getAllDirectory('idMergeSingleTreatedFileSelect','fastq');");
	}

}
function validateMergeForm() {
}
function addTreatedSelectedR1() {
	var temp = document.getElementById("idTreatedFileR1Select").innerHTML;
	if (temp != "No file selected") {
		inputUserTreatedR1.push(temp);
		showFilesDivSingle(temp, "treated R1", "closeDivTreatedR1", document
				.getElementById("treatedSelectedR1"));

	}

	else {
		alert("select file");
	}

}
function addTreatedSelectedR2() {
	var temp = document.getElementById("idTreatedFileR2Select").innerHTML;
	if (temp != "No file selected") {
		inputUserTreatedR2.push(temp);
		showFilesDivSingle(temp, "treated R2", "closeDivTreatedR2", document
				.getElementById("treatedSelectedR2"));

	}

	else {
		alert("select file");
	}

}
function addControlSelectedR1() {
	var temp = document.getElementById("idControlFileR1Select").innerHTML;
	if (temp != "No file selected") {
		inputUserControlledR1.push(temp);

		showFilesDivSingle(temp, "control R1", "closeDivControlledR1", document
				.getElementById("constrolSelectedR1"));

	} else {
		alert("select file");
	}
}
function addControlSelectedR2() {
	var temp = document.getElementById("idControlFileR2Select").innerHTML;
	if (temp != "No file selected") {
		inputUserControlledR2.push(temp);
		showFilesDivSingle(temp, "control R2", "closeDivControlledR2", document
				.getElementById("constrolSelectedR2"));
	} else {
		alert("select file");
	}
}

//=========================================
function addSingleTreatedMergeSelected() {
	var temp = document.getElementById("idMergeSingleTreatedFileSelect").innerHTML;
	if (temp != "No file selected") {
		inputUserSingleMergeControl.push(temp);
		showFilesDivSingle(temp, "control R2", "closeDivSingleMergeTreated", document
				.getElementById("selectedSingleMergeTreatedFiles"));
	} else {
		alert("select file");
	}
}
function addSingleControlMergeSelected() {
	var temp = document.getElementById("idMergeSingleControlFileSelect").innerHTML;
	if (temp != "No file selected") {
		inputUserSingleMergeTreated.push(temp);
		showFilesDivSingle(temp, "control ", "closeDivSingleMergeControl", document
				.getElementById("selectedSingleMergeControlFiles"));
	} else {
		alert("select file");
	}
}
function showFilesDivSingle(selectedFile, stringVar, arrayUser,
		divSelectedFiles, index) {
	// var divSelectedFiles = document.getElementById("constrolSelectedR1");
	// var index=inputUserControlledR1.indexOf(temp);
	var closeDiv = document.createElement("div");
	closeDiv.setAttribute("class", "col-sm-12 classSelectedFilesDiv");
	closeDiv.innerHTML = "<span id='close' class='col-sm-1 btn btn-default' onclick=\""
			+ arrayUser + "(this,'" + selectedFile + "');\">x</span>";

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
	labelFileName.innerHTML = selectedFile;

	colSm4.appendChild(labelFile);
	colSm6.appendChild(labelFileName);

	fromGroupDiv.appendChild(colSm4);
	fromGroupDiv.appendChild(colSm6);
	closeDiv.appendChild(fromGroupDiv);
	divSelectedFiles.appendChild(closeDiv);

}
function closeDivControlledR1(selection, input) {
	selection.parentNode.parentNode.removeChild(selection.parentNode);
	var index = inputUserControlledR1.indexOf(input);
	inputUserControlledR1.splice(index, 1);
	// alert("after sub inputUserControlledR1==>" + inputUserControlledR1);
}
function closeDivControlledR2(selection, input) {
	// alert("b sub==>" + inputOfUser);
	selection.parentNode.parentNode.removeChild(selection.parentNode);
	var index = inputUserControlledR2.indexOf(input);
	inputUserControlledR2.splice(index, 1);
	// alert("after sub inputUserControlledR2==>" + inputUserControlledR2);
}
function closeDivTreatedR1(selection, input) {
	// alert("b sub==>" + inputOfUser);
	selection.parentNode.parentNode.removeChild(selection.parentNode);
	var index = inputUserTreatedR1.indexOf(input);
	inputUserTreatedR1.splice(index, 1);
	// alert("after sub inputUserTreatedR1==>" + inputUserTreatedR1);
}
function closeDivTreatedR2(selection, input) {
	// alert("b sub==>" + inputOfUser);
	selection.parentNode.parentNode.removeChild(selection.parentNode);
	var index = inputUserTreatedR2.indexOf(input);
	inputUserTreatedR2.splice(index, 1);
	// alert("after sub inputUserTreatedR2==>" +inputUserTreatedR2);
}
function closeDivSingleMergeControl(selection, input) {
	// alert("b sub==>" + inputOfUser);
	selection.parentNode.parentNode.removeChild(selection.parentNode);
	var index = inputUserTreatedR2.indexOf(input);
	inputUserTreatedR2.splice(index, 1);
	// alert("after sub inputUserTreatedR2==>" +inputUserTreatedR2);
}
function closeDivSingleMergeTreated(selection, input) {
	// alert("b sub==>" + inputOfUser);
	selection.parentNode.parentNode.removeChild(selection.parentNode);
	var index = inputUserSingleMergeTreated.indexOf(input);
	inputUserTreatedR2.splice(index, 1);
	// alert("after sub inputUserTreatedR2==>" +inputUserTreatedR2);
}