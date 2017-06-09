function wsGenerateCustomReport() {


	var embedShowCustomReportPdf = document
			.getElementById("embedShowCustomReportPdf");
	embedShowCustomReportPdf.setAttribute("src", "");
	var organismName = document.getElementById("idCustomReportOrganismName").value;
	var scientistName = document.getElementById("idCustomReportScientistName").value;
	var specialization = document
			.getElementById("idCustomReportSpecialization").value;
	var plateform = document.getElementById("idCustomReportPlateform").value;
	var nameOfSample = document.getElementById("idCustomReportNameOfSample").value;
	var address = document.getElementById("idCustomReportAddress").value;
	

	if (validateCustomReportProjectName()&&
			validateCustomReportOrganismName()
			&& validateCustomReportScientistName()
			&& validateCustomReportSpecialization()
			&& validateCustomReportNameOfSample()
			&& validateCustomReportAddress()&&validateCustomReportFiles()/*&&validateCustomClusterReportFiles()*/) {

		var outputFile = jarray[document.getElementById("idCustomReportOutputFileSelect").innerHTML];
		var outputClusterFile = jarray[document.getElementById("idCustomReportOutputClusterFileSelect").innerHTML];
				
		var formData = new FormData();

		formData.append("outputDir", outputFile);
		if(outputClusterFile!=undefined)
		formData.append("outputClusterFile", outputClusterFile);
		else
			formData.append("outputClusterFile", "notfound");
		formData.append("organismName", organismName);
		formData.append("scientistName", scientistName);
		formData.append("specialization", specialization);
		formData.append("plateform", plateform);
		formData.append("nameOfSample", nameOfSample);
		formData.append("address", address);
		formData.append("projectName", document.getElementById("projectNameTrinity").value);
		formData.append("userId", localStorage.userId);
		var xhr = new XMLHttpRequest();
		xhr
				.open(
						'POST',
						URL_CUSTOME_REPORT,
						true);
		xhr.onload = function(e) {
		};
		xhr.send(formData);
		$("#myModal").modal('show');
		xhr.onreadystatechange = function() {
			var response = eval("(" + xhr.responseText + ")");
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
			// alert("You have=>" + xhr.responseText);
					$("#myModal").modal('hide');
					showPdfFileCustomReport(response.message);
				} else {
					$("#myModal").modal('hide');
					alert(response.message);
				}
			}
		};
	}

}
function wsGenerateServerSideReport() {
	$("#myModal").modal('show');
	var embedShowPdf = document.getElementById("embedShowPdf");
	embedShowPdf.setAttribute("src", "");
	var organismName = document.getElementById("idOrganismName").value;
	var scientistName = document.getElementById("idScientistName").value;
	var specialization = document.getElementById("idSpecialization").value;
	var plateform = document.getElementById("idPlateform").value;
	var nameOfSample = document.getElementById("idNameOfSample").value;
	var address = document.getElementById("idAddress").value;

	if (validateOrganismName()
			&& validateScientistName() && validateSpecialization()
			&& validateNameOfSample() && validateAddress()) {
		var formData = new FormData();
		

		formData.append("organismName", organismName);
		formData.append("scientistName", scientistName);
		formData.append("specialization", specialization);
		formData.append("plateform", plateform);
		formData.append("nameOfSample", nameOfSample);
		formData.append("address", address);
		var xhr = new XMLHttpRequest();
		xhr
				.open(
						'POST',
						URL_CUSTOME_REPORT_SERVER,
						true);
		xhr.onload = function(e) {
		};
		xhr.send(formData);
		xhr.onreadystatechange = function() {
			var response = eval("(" + xhr.responseText + ")");
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					// alert("You report have=>" + xhr.responseText);
					$("#myModal").modal('hide');
					showPdfFile(response.message);
				} else {
					$("#myModal").modal('hide');
					alert(response.message);
				}
			}
		};
	}

}
function showCustomReportForm() {
document.getElementById("idCustomReportOutputFileSelect").innerHTML="No file selected";
	var forms = document.getElementById("customReportforms");
	document.getElementById("customReportForm").reset();
	forms.style.display = "block";
	var embedShowCustomReportPdf = document
			.getElementById("embedShowCustomReportPdf");

	//embedShowCustomReportPdf.setAttribute("src", pdfFilePath);
	embedShowCustomReportPdf.style.display = "none";
}
function showPdfFileCustomReport(pdfFilePath) {

	var forms = document.getElementById("customReportforms");
	forms.style.display = "none";
	var embedShowCustomReportPdf = document
			.getElementById("embedShowCustomReportPdf");

	embedShowCustomReportPdf.setAttribute("src", pdfFilePath);
	embedShowCustomReportPdf.style.display = "block";
}