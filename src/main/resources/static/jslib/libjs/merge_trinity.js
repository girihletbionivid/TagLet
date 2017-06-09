var index = 0;
var inputUserR1 = [];
var inputUserR2 = [];
/*var inputUserTreatedR1 = [];
var inputUserTreatedR2 = [];*/
var inputUserSingleMerge = [];
/*var inputUserSingleMergeTreated = [];*/
function submitFormMergePaired() {
	if (validateProjectName()&&validatedPairedMerge()) {
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
				if (xhr.status == 200) {/*
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
				*/
					$("#myModal").modal('hide');
					alert(response.message);
					} else {
					$("#myModal").modal('hide');
					alert(response.message);
				}
			}
		};

	}
}
function submitFormMergeSingle() {
	if (validateProjectName()&&validatedPairedMergeSingle()) {
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
				/*	alert("You have=>" + xhr.responseText);
					$("#myModal").modal('hide');

					$("#454QcForm").fadeOut('slow');
					$("#qcCmdQutput").fadeIn('slow');

					var objDiv = document.getElementById("454QcCmdOutput");
					objDiv.innerHTML = response.message;

					$("#454QcCmd").animate({
						scrollTop : $('#454QcCmd')[0].scrollHeight
					}, 1000);*/
					$("#myModal").modal('hide');
					alert(response.message);
				} else {
					$("#myModal").modal('hide');
					alert(response.message);
				}
			}
		};

	}
}
function showMergeForm(){

	inputUserR1= [];
	inputUserR2= [];
	inputUserSingleMerge= [];
	document.getElementById("constrolSelectedR2").innerHTML="";
	document.getElementById("constrolSelectedR1").innerHTML="";
	document.getElementById("selectedSingleMergeControlFiles").innerHTML="";
	
	document.getElementById("idControlFileR1Select").innerHTML="No file selected";
	document.getElementById("idControlFileR2Select").innerHTML="No file selected";
	document.getElementById("idMergeSingleControlFileSelect").innerHTML="No file selected";
	document.getElementById("idMergeOutputSelect").innerHTML="No folder selected";
}
function validatedPairedMergeSingle(){

	if (inputUserSingleMerge.length < 1) {
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
function validateProjectName(){
	if (document.getElementById("idProcesseName").value == "") {
		alert("please provide project name..");
		return false;
	} else {
		return true;
	}
}
function validatedPairedMerge() {
	if ((inputUserR1.length < 1)
			&& (inputUserR2.length < 1)
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

function getFormDataMerge() {
	var formData = new FormData();
	
	formData.append("processName", document.getElementById("idProcesseName").value);
	formData.append("query1", getQueryFirst());
	formData.append("query2", getQuerySecond());
	formData.append("userId", localStorage.userId);
	formData.append("output", jarray[document.getElementById("idMergeOutputSelect").innerHTML]);
	return formData;
}
function getFormDataMergeSingle() {
	var formData = new FormData();
	formData.append("processName", document.getElementById("idProcesseName").value);
	formData.append("query1", getQuery());
	formData.append("userId", localStorage.userId);
	formData.append("output",  jarray[document.getElementById("idMergeOutputSelect").innerHTML]);
	return formData;
}
function getQuery(){
	var query = " ";
	var delimiter = " ";
	for (var i = 0; i < inputUserSingleMerge.length; i++) {
		query = query+delimiter + jarray[inputUserSingleMerge[i]];
		delimiter=","
	}
	/*for (var i = 0; i < inputUserSingleMergeTreated.length; i++) {
		query = query + jarray[inputUserSingleMergeTreated[i]] + delimiter;
	}*/
	return query;
	// alert("query1==>cat "+query);
}
function getQueryFirst() {
	var query = " ";
	var delimiter = " ";
	for (var i = 0; i < inputUserR1.length; i++) {
		query = query + delimiter +jarray[inputUserR1[i]] ;
		delimiter=","
	}
	/*for (var i = 0; i < inputUserTreatedR1.length; i++) {
		query = query + jarray[inputUserTreatedR1[i]] + delimiter;
	}*/
	return query;
	// alert("query1==>cat "+query);
}
function getQuerySecond() {
	var query = " ";
	var delimiter = " ";
	for (var i = 0; i < inputUserR2.length; i++) {
		query = query +  delimiter +jarray[inputUserR2[i]];
		delimiter=","
	}
	/*for (var i = 0; i < inputUserTreatedR2.length; i++) {
		query = query + jarray[inputUserTreatedR2[i]] + delimiter;
	}*/
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
/*function addTreatedSelectedR1() {
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

}*/
function addSelectedR1() {
	var temp = document.getElementById("idControlFileR1Select").innerHTML;
	if (temp != "No file selected") {
		inputUserR1.push(temp);

		showFilesDivSingle(temp, " R1", "closeDivR1", document
				.getElementById("constrolSelectedR1"));

	} else {
		alert("select file");
	}
}
function addSelectedR2() {
	var temp = document.getElementById("idControlFileR2Select").innerHTML;
	if (temp != "No file selected") {
		inputUserR2.push(temp);
		showFilesDivSingle(temp, " R2", "closeDivR2", document
				.getElementById("constrolSelectedR2"));
	} else {
		alert("select file");
	}
}

//=========================================
/*function addSingleTreatedMergeSelected() {
	var temp = document.getElementById("idMergeSingleTreatedFileSelect").innerHTML;
	if (temp != "No file selected") {
		inputUserSingleMerge.push(temp);
		showFilesDivSingle(temp, "control R2", "closeDivSingleMergeTreated", document
				.getElementById("selectedSingleMergeTreatedFiles"));
	} else {
		alert("select file");
	}
}*/
function addSingleMergeSelected() {
	var temp = document.getElementById("idMergeSingleControlFileSelect").innerHTML;
	if (temp != "No file selected") {
		inputUserSingleMerge.push(temp);
		showFilesDivSingle(temp, "input ", "closeDivSingleMerge", document
				.getElementById("selectedSingleMergeControlFiles"));
	} else {
		alert("select file");
	}
}
function showFilesDivSingle(selectedFile, stringVar, arrayUser,
		divSelectedFiles, index) {
	// var divSelectedFiles = document.getElementById("constrolSelectedR1");
	// var index=inputUserR1.indexOf(temp);
	
	var closeDiv = document.createElement("div");
	closeDiv.setAttribute("class", "col-sm-6 classSelectedFilesDiv");
	closeDiv.innerHTML = "<span id='close' class='col-sm-1 btn btn-default' onclick=\""
			+ arrayUser + "(this,'" + selectedFile + "');\">x</span>";

	var fromGroupDiv = document.createElement("div");
	fromGroupDiv.setAttribute("class", "form-group col-sm-6");

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
	fromGroupDiv.appendChild(colSm6);
	//fromGroupDiv.appendChild(colSm4);
	
	closeDiv.appendChild(fromGroupDiv);
	divSelectedFiles.appendChild(closeDiv);

}
function closeDivR1(selection, input) {
	selection.parentNode.parentNode.removeChild(selection.parentNode);
	var index = inputUserR1.indexOf(input);
	inputUserR1.splice(index, 1);
	// alert("after sub inputUserR1==>" + inputUserR1);
}
function closeDivR2(selection, input) {
	// alert("b sub==>" + inputOfUser);
	selection.parentNode.parentNode.removeChild(selection.parentNode);
	var index = inputUserR2.indexOf(input);
	inputUserR2.splice(index, 1);
	// alert("after sub inputUserR2==>" + inputUserR2);
}
/*function closeDivTreatedR1(selection, input) {
	selection.parentNode.parentNode.removeChild(selection.parentNode);
	var index = inputUserTreatedR1.indexOf(input);
	inputUserTreatedR1.splice(index, 1);
}*/
/*function closeDivTreatedR2(selection, input) {
	selection.parentNode.parentNode.removeChild(selection.parentNode);
	var index = inputUserTreatedR2.indexOf(input);
	inputUserTreatedR2.splice(index, 1);
}*/
function closeDivSingleMerge(selection, input) {
	// alert("b sub==>" + inputOfUser);
	selection.parentNode.parentNode.removeChild(selection.parentNode);
	var index = inputUserR2.indexOf(input);
	inputUserR2.splice(index, 1);
	// alert("after sub inputUserTreatedR2==>" +inputUserTreatedR2);
}
/*function closeDivSingleMergeTreated(selection, input) {
	selection.parentNode.parentNode.removeChild(selection.parentNode);
	var index = inputUserSingleMergeTreated.indexOf(input);
	inputUserTreatedR2.splice(index, 1);
}*/