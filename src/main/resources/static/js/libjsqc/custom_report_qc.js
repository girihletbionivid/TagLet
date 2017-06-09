function wsGenerateServerSideReport() {

	document.getElementById("iframeCustomReport").setAttribute("src", "");

	if (validateProjectName()&&validateOrganismName() && validateScientistName()
			&& validateSpecialization() && validateNameOfSample()
			&& validateAddress()&&validateInputQCFileReport()) {

		var organismName = document.getElementById("idOrganismName").value;
		var scientistName = document.getElementById("idScientistName").value;
		var specialization = document.getElementById("idSpecialization").value;
		var plateform = document.getElementById("idPlateform").value;
		var nameOfSample = document.getElementById("idNameOfSample").value;
		var address = document.getElementById("idAddress").value;
		var outputDir = jarray[document
				.getElementById("idOutputDirctorySelectIllumina").innerHTML];
		var sequencingLayout = document.getElementById("idSequencingLayout").value;
		var formData = new FormData();

		formData.append("organismName", organismName);
		formData.append("sequencingLayout", sequencingLayout);
		formData.append("scientistName", scientistName);
		formData.append("specialization", specialization);
		formData.append("plateform", plateform);
		formData.append("nameOfSample", nameOfSample);
		formData.append("address", address);
		formData.append("outputDir", outputDir);
		formData.append("userId", localStorage.userId);
		formData.append("projectName", document.getElementById("idProjectNameQC").value);
		formData.append("typeOfQc", document.getElementById("idTypeOfInputSelect").value);
		formData.append("typeOfOutput", document
				.getElementById("idTypeOfOutputSelectIllumina").value);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', URL_GENERATE_REPORT, true);
		xhr.onload = function(e) {
		};
		xhr.send(formData);
		$("#myModal").modal('show');
		xhr.onreadystatechange = function() {
			var response = eval("(" + xhr.responseText + ")");
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					// alert("You report have=>" + xhr.responseText);
					$("#myModal").modal('hide');
					showPdfCustomQc(response.message);
					localStorage.removeItem('typeOfQc');
					// showPdfFile(response.message);
				} else {
					$("#myModal").modal('hide');
					alert(response.message);
				}
			}
		};
	}

}
function onSelectInputTypeQCReport(element) {
	//alert("kd" + element.value);
	if (element.value == "fourFiveFour") {
		$("#endSelectionDiv").hide('slow');
	} else {
		$("#endSelectionDiv").show('slow');
	}
}
function showPdfCustomQc(path) {
	document.getElementById("iframeCustomReport").setAttribute("src", path);
	$("#customReportforms").fadeOut('slow');
	$("#divShowCustomReportPdf").fadeIn('slow');
}

function showCustomReportForm() {
	$("#endSelectionDiv").hide('slow');
	$("#idTypeOfOutputSelectIllumina").show();
	$("#reportForm").trigger('reset');
	$("#customReportforms").fadeIn('slow');
	$("#reportForm").fadeIn('slow');
	document.getElementById("iframeCustomReport").setAttribute("src", "");
	$("#divShowCustomReportPdf").fadeOut('slow');
	document.getElementById("idOutputDirctorySelectIllumina").innerHTML="No folder selected";

}
function showPdfFileCustomReport(pdfFilePath) {

	var forms = document.getElementById("customReportforms");
	forms.style.display = "none";
	var embedShowCustomReportPdf = document
			.getElementById("embedShowCustomReportPdf");

	embedShowCustomReportPdf.setAttribute("src", pdfFilePath);
	embedShowCustomReportPdf.style.display = "block";
}
function generateReport454QcForm() {
	// $("#reportGenerationForm").fadeIn('slow');
	// $("#bowtieForms").fadeOut('slow');
}