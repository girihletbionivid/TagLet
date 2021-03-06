/**
 * 
 */

var f = false;
var url_log;
var trinityOutput;
var assemblyType;
var myVar = setInterval(function() {
	sentRequestToServer();
}, 5000);
function sentRequestToServer() {
	var xhr = new XMLHttpRequest();

	xhr.open('GET', url_log, true);
	xhr.onload = function(e) {
	};
	if (f)
		//xhr.send();
	xhr.onreadystatechange = function() {
		var response = eval("(" + xhr.responseText + ")");
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				// alert("You haveTTTT=>" + xhr.responseText);
				trinityOutput = trinityOutput + "<br/>" + response.message;
				$("#trinityForm").fadeOut('slow');
				// document.getElementById("trinityForm").style.display =
				// "none";
				$("#trinityCmd").fadeIn('slow');
				// document.getElementById("trinityCmd").style.display =
				// "block";

				var objDiv = document.getElementById("trinityCmdOutput");
				objDiv.innerHTML = trinityOutput;
				$("#trinityCmdOutput").animate({
					scrollTop : $('#trinityCmdOutput')[0].scrollHeight
				}, 1000);
				// objDiv.scrollBottom =
				// document.getElementById("trinityCmd").scrollHeight;
			} else {

			}
		}
	};

}
function onloadfunction(){
	document.getElementById("ddnn").click();
}
function submitFormTrinity() {
	// generateReportForm()

	trinityOutput = "";

	var idInputReadType = document.getElementById("idInputReadType").value;
	if (idInputReadType == "Paired") {
		var sequenceType = document.getElementById("idSequenceType").value;
		var inputReadTypeAllowed = document.getElementById("idInputReadType").value;
		var maxMemory = document.getElementById("idMaxMemory").value;
		var minConigLength = document.getElementById("idMinContigLength").value;
		var cpu = document.getElementById("idCPU").value;
		var sSLibType = document.getElementById("idSSLibType").value;

		if (validateCpu() && validateMinContigLength() && validateMaxMemory()
				&& validateOptionalFiles()) {
			// $("#myModal").modal('show');
			var formData = new FormData();
			var extention = "a";
			if (sequenceType == "Fasta")
				inputReadType = "fa";
			else
				inputReadType = "fq";

			var url;
			if (refferenceAndHybridTrinity()) {

				url = URL_RUN_HYBRID_AND_REFFERENCE_TRINITY_PAIRED;
				var optionalSelectFilesHybrid = document
						.getElementById("idOptionalSelectFile1").innerHTML;
				formData.append("hybridLongRead",
						jarray[optionalSelectFilesHybrid]);
				var optionalSelectFilesRefference = document
						.getElementById("idOptionalSelectFile2").innerHTML;
				formData.append("refferenceReadFile",
						jarray[optionalSelectFilesRefference]);

				var rightFile = document.getElementById("idRightFileSelect").innerHTML;
				var leftFile = document.getElementById("idLeftFileSelect").innerHTML;
				formData.append("rightReadFile", jarray[rightFile]);
				formData.append("leftReadFile", jarray[leftFile]);
				var maxIntron = document.getElementById("idMaxIntron").value;
				formData.append("maxIntron", maxIntron);
				assemblyType = "Hybrid and Refference Transcptome assemble";
			} else if (refferenceTrinity()) {
				if (document.getElementById("idrbtnWithFA").checked) {
					url = URL_RUN_REFFERENCE_TRINITY_PAIRED;
					var optionalSelectFilesRefference = document
							.getElementById("idOptionalSelectFile2").innerHTML;
					formData.append("refferenceReadFile",
							jarray[optionalSelectFilesRefference]);
					var rightFile = document
							.getElementById("idRightFileSelect").innerHTML;
					var leftFile = document.getElementById("idLeftFileSelect").innerHTML;
					formData.append("rightReadFile", jarray[rightFile]);
					formData.append("leftReadFile", jarray[leftFile]);
					var maxIntron = document.getElementById("idMaxIntron").value;
					formData.append("maxIntron", maxIntron);
					assemblyType = "Refference Transcptome assemble";
				} else {

					url = URL_RUN_HYBRID_AND_REFFERENCE_WITHOUT_FA;
					var optionalSelectFilesRefference = document
							.getElementById("idOptionalSelectFile2").innerHTML;
					formData.append("refferenceReadFile",
							jarray[optionalSelectFilesRefference]);
					var maxIntron = document.getElementById("idMaxIntron").value;
					formData.append("maxIntron", maxIntron);
					assemblyType = "Refference Transcptome assemble";
				}

			} else if (hybridTrinity()) {

				url = URL_RUN_HYBRID_TRINITY_PAIRED;
				var optionalSelectFilesHybrid = document
						.getElementById("idOptionalSelectFile1").innerHTML;
				formData.append("hybridLongRead",
						jarray[optionalSelectFilesHybrid]);
				var rightFile = document.getElementById("idRightFileSelect").innerHTML;
				var leftFile = document.getElementById("idLeftFileSelect").innerHTML;
				formData.append("rightReadFile", jarray[rightFile]);
				formData.append("leftReadFile", jarray[leftFile]);
				assemblyType = "Hybrid Transcptome assemble";
			} else {
				url = URL_RUN_STANDART_TRINITY_PAIRED;
				var rightFile = document.getElementById("idRightFileSelect").innerHTML;
				var leftFile = document.getElementById("idLeftFileSelect").innerHTML;
				formData.append("rightReadFile", jarray[rightFile]);
				formData.append("leftReadFile", jarray[leftFile]);
				alert("DVD"+localStorage.userId);
				formData.append("userId", localStorage.userId);
				assemblyType = "Denovo Transcriptome Assembly";
			}

			formData.append("inputReadType", inputReadType);
			formData.append("maxMemory", maxMemory);
			formData.append("minConigLength", minConigLength);
			formData.append("cpu", cpu);
			formData.append("sSLibType", sSLibType);

			var xhr = new XMLHttpRequest();
			xhr.open('POST', url, true);
			xhr.onload = function(e) {
			};
			// alert(url);
			xhr.send(formData);
			url_log = URL_LOG_PAIRED;
			f = true;

			$("#myModal").modal('show');
			xhr.onreadystatechange = function() {
				var response = eval("(" + xhr.responseText + ")");
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						// alert("You have=>" + xhr.responseText);
						$("#myModal").modal('hide');
						f = false;

						// alert("You haveTTTT=>" + xhr.responseText);
						trinityOutput = trinityOutput + "<br/>"
								+ response.message;
						var objDiv = document
								.getElementById("trinityCmdOutput");
						objDiv.innerHTML = trinityOutput;
						objDiv.scrollBottom = document
								.getElementById("trinityCmd").scrollHeight;
						$("#generateReportBtn").fadeIn('slow');
						// document.getElementById("generateReportBtn").style.display
						// = "block";

					} else {
						$("#myModal").modal('hide');
						alert(response.message);
					}
				}
			};
		}
	} else {
		var sequenceType = document.getElementById("idSequenceType").value;
		var inputReadTypeAllowed = document.getElementById("idInputReadType").value;
		var maxMemory = document.getElementById("idMaxMemory").value;
		var minConigLength = document.getElementById("idMinContigLength").value;
		var cpu = document.getElementById("idCPU").value;
		var sSLibType = document.getElementById("idSSLibType").value;

		// var leftFile = document.getElementById("idLeftFileSelect").files;

		if (validateCpu() && validateMinContigLength() && validateMaxMemory()
				&& validateOptionalFiles()) {
			// $("#myModal").modal('show');
			var formData = new FormData();
			var extention = "a";
			if (sequenceType == "Fasta")
				inputReadType = "fa";
			else
				inputReadType = "fq";

			var url;
			if (refferenceAndHybridTrinity()) {

				url = URL_RUN_HYBRID_AND_REFFERENCE_TRINITY_SINGLE;
				var optionalSelectFilesHybrid = document
						.getElementById("idOptionalSelectFile1").innerHTML;
				formData.append("hybridLongRead", jarray[optionalSelectFilesHybrid]);
				var optionalSelectFilesRefference = document
						.getElementById("idOptionalSelectFile2").innerHTML;
				formData.append("refferenceReadFile",
						 jarray[optionalSelectFilesRefference]);

				var singleFile = document.getElementById("idSingleFileSelect").innerHTML;
				formData.append("singleReadFile",  jarray[singleFile]);

				var maxIntron = document.getElementById("idMaxIntron").value;
				formData.append("maxIntron", maxIntron);
				assemblyType = "Hybrid and Refference Transcptome assemble"
			} else if (refferenceTrinity()) {
				if (document.getElementById("idrbtnWithFA").checked) {
					url = URL_RUN_REFFERENCE_TRINITY_SINGLE;
					var optionalSelectFilesRefference = document
							.getElementById("idOptionalSelectFile2").innerHTML;
					formData.append("refferenceReadFile",
							 jarray[optionalSelectFilesRefference]);
					var singleFile = document
							.getElementById("idSingleFileSelect").innerHTML;
					formData.append("singleReadFile",  jarray[singleFile]);
					var maxIntron = document.getElementById("idMaxIntron").value;
					formData.append("maxIntron", maxIntron);
					assemblyType = "Refference Transcptome assemble";
				} else {

					url = URL_RUN_HYBRID_AND_REFFERENCE_WITHOUT_FA;
					var optionalSelectFilesRefference = document
							.getElementById("idOptionalSelectFile2").innerHTML;
					formData.append("refferenceReadFile",
							 jarray[optionalSelectFilesRefference]);
					var maxIntron = document.getElementById("idMaxIntron").value;
					formData.append("maxIntron", maxIntron);
					assemblyType = "Refference Transcptome assemble";
				}

			} else if (hybridTrinity()) {

				url = URL_RUN_HYBRID_TRINITY_SINGLE;
				var optionalSelectFilesHybrid = document
						.getElementById("idOptionalSelectFile1").innerHTML;
				formData.append("hybridLongRead",  jarray[optionalSelectFilesHybrid]);
				var singleFile = document.getElementById("idSingleFileSelect").innerHTML;
				formData.append("singleReadFile",  jarray[singleFile]);
				assemblyType = "Hybrid Transcptome assemble";
			} else {
				url = URL_RUN_STANDART_TRINITY_SINGLE;
				var singleFile = document.getElementById("idSingleFileSelect").innerHTML;
				formData.append("singleReadFile",  jarray[singleFile]);
				assemblyType = "Denovo Transcriptome Assembly";
			}

			formData.append("inputReadType", inputReadType);
			formData.append("maxMemory", maxMemory);
			formData.append("minConigLength", minConigLength);
			formData.append("cpu", cpu);
			formData.append("sSLibType", sSLibType);

			var xhr = new XMLHttpRequest();
			xhr.open('POST', url, true);
			xhr.onload = function(e) {
			};
			// alert(url);
			xhr.send(formData);
			url_log = URL_LOG_SINGLE;
			f = true;
			// $("#myModal").modal('show');
			xhr.onreadystatechange = function() {
				var response = eval("(" + xhr.responseText + ")");
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						$("#myModal").modal('hide');
						f = false;

						// alert("You haveTTTT=>" + xhr.responseText);
						trinityOutput = trinityOutput + "<br/>"
								+ response.message;
						var objDiv = document
								.getElementById("trinityCmdOutput");
						objDiv.innerHTML = trinityOutput;
						objDiv.scrollBottom = document
								.getElementById("trinityCmd").scrollHeight;
						$("#generateReportBtn").fadeIn('slow');
						// document.getElementById("generateReportBtn").style.display
						// = "block";

					} else {
						$("#myModal").modal('hide');
						alert(response.message);
					}
				}
			};
		}

	}
	var objDiv = document.getElementById("trinityCmdOutput");
	objDiv.innerHTML = trinityOutput;
	$("#trinityCmdOutput").animate({
		scrollTop : $('#trinityCmdOutput')[0].scrollHeight
	}, 1000);
}
$(function() {
	$('a, button').click(function() {
		$(this).toggleClass('active');
	});
});
$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
});
function generateReportForm() {

	// var reportGenerationForm =
	// document.getElementById("reportGenerationForm");
	// reportGenerationForm.style.display = "block";
	$("#reportGenerationForm").fadeIn('slow');
	// var trinityForm = document.getElementById("trinityForm");
	// trinityForm.style.display = "none";
	$("#trinityForm").fadeOut('slow');
	// document.getElementById("trinityCmd").style.display = "none";
	$("#trinityCmd").fadeOut('slow');
}

function wsGenerateReport() {

	var embedShowPdf = document.getElementById("embedShowPdf");
	embedShowPdf.setAttribute("src", "");
	var organismName = document.getElementById("idOrganismName").value;
	var scientistName = document.getElementById("idScientistName").value;
	var specialization = document.getElementById("idSpecialization").value;
	var plateform = document.getElementById("idPlateform").value;
	var nameOfSample = document.getElementById("idNameOfSample").value;
	var address = document.getElementById("idAddress").value;
	var inputReadTypes = document.getElementById("idInputReadType").value;

	var sequenceType = document.getElementById("idSequenceType").value;
	var inputReadTypeAllowed = document.getElementById("idInputReadType").value;
	var maxMemory = document.getElementById("idMaxMemory").value;
	var minConigLength = document.getElementById("idMinContigLength").value;
	var cpu = document.getElementById("idCPU").value;
	var sSLibType = document.getElementById("idSSLibType").value;
	if (validateOrganismName() && validateScientistName()
			&& validateSpecialization() && validateNameOfSample()
			&& validateAddress()) {
		var formData = new FormData();
		var extention = "a";
		if (sequenceType == "Fasta")
			fileReadType = "fa";
		else
			fileReadType = "fq";

		formData.append("fileReadType", fileReadType);
		formData.append("maxMemory", maxMemory);
		formData.append("minConigLength", minConigLength);
		formData.append("cpu", cpu);
		formData.append("sSLibType", sSLibType);
		formData.append("inputReadTypes", inputReadTypes);

		formData.append("assemblyType", assemblyType);
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
						"http://localhost:8080/genomewebserver/generate/report/trinity",
						true);
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
					showPdfFile(response.message);
				} else {
					$("#myModal").modal('hide');
					alert(response.message);
				}
			}
		};
	}

}
function showTrinityForm() {
	// var forms = document.getElementById("forms");
	// forms.style.display = "block";
	$("#forms").fadeIn('slow');
	
	
	document.getElementById("idRightFileSelect").innerHTML="";
		document.getElementById("idLeftFileSelect").innerHTML="";
	// var trinityForm = document.getElementById("trinityForm");
	// trinityForm.style.display = "block";
	$("#trinityForm").fadeIn('slow');
	$("#trinityForm").trigger('reset');
	$("#selectSingleFileFormGroup").fadeOut('slow');
	// var reportGenerationForm =
	// document.getElementById("reportGenerationForm");
	// reportGenerationForm.style.display = "none";
	//$("#reportGenerationForm").fadeOut('slow');
	// var embedShowPdf = document.getElementById("embedShowPdf");
	// embedShowPdf.style.display = "none";
	// $("#embedShowPdf").fadeOut('slow');
	// document.getElementById("trinityCmd").style.display = "none";
	$("#trinityCmd").fadeOut('slow');
	var embedShowPdf = document.getElementById("embedShowPdf");

	// embedShowPdf.setAttribute("src", pdfFilePath);
	embedShowPdf.style.display = "none";

}

function showPdfFile(pdfFilePath) {

	var forms = document.getElementById("forms");
	forms.style.display = "none";
	// $("#forms").fadeOut('slow');
	// $("#forms").fadeOut('slow');
	var embedShowPdf = document.getElementById("embedShowPdf");

	embedShowPdf.setAttribute("src", pdfFilePath);
	embedShowPdf.style.display = "block";
	// $("#embedShowPdf").fadeIn('slow');
}

function changeOption(selection) {
	if (selection.value == "Paired") {
		$("#selectRightFileFormGroup").fadeIn('slow');
		$("#selectLeftFileFormGroup").fadeIn('slow');
		$("#selectSingleFileFormGroup").fadeOut('slow');
		var idSequenceType = document.getElementById("idSequenceType");
		if (idSequenceType.value == "Fasta") {
			document.getElementById("idRightFileBrowse").setAttribute("onclick",
					"getAllDirectory('idRightFileSelect','fasta');");
			document.getElementById("idLeftFileBrowse").setAttribute("onclick",
					"getAllDirectory('idLeftFileSelect','fasta');");
		} else {
			document.getElementById("idRightFileBrowse").setAttribute("onclick",
			"getAllDirectory('idRightFileSelect','fastq');");
	document.getElementById("idLeftFileBrowse").setAttribute("onclick",
			"getAllDirectory('idLeftFileSelect','fastq');");
		}
		var sSLibType = document.getElementById("idSSLibType").innerHTML = "<option value='RF' selected>RF</option><option value='FR'>FR</option>";
	} else {
		$("#selectRightFileFormGroup").fadeOut('slow');
		$("#selectLeftFileFormGroup").fadeOut('slow');
		$("#selectSingleFileFormGroup").fadeIn('slow');
		var idSequenceType = document.getElementById("idSequenceType").value;
		if (idSequenceType.value == "Fasta") {
			document.getElementById("idSingleFileBrowse").setAttribute(
					"onclick", "getAllDirectory('idSingleFileSelect','fasta');");
		} else {
			document.getElementById("idSingleFileBrowse").setAttribute(
					"onclick", "getAllDirectory('idSingleFileSelect','fastq');");
		}

	}
	var sSLibType = document.getElementById("idSSLibType").innerHTML = "<option value='R' selected>R</option><option value='F'>F</option>";

}
function changeInputFileOptionChange(inputFileSelection) {
	var idInputReadType = document.getElementById("idInputReadType").value;
	if (inputFileSelection.value == "Fasta") {
		if (idInputReadType == "Paired") {
			document.getElementById("idRightFileBrowse").setAttribute("onclick",
			"getAllDirectory('idRightFileSelect','fasta');");
	document.getElementById("idLeftFileBrowse").setAttribute("onclick",
			"getAllDirectory('idLeftFileSelect','fasta');");
		} else {
			document.getElementById("idSingleFileBrowse").setAttribute(
					"onclick", "getAllDirectory('idSingleFileSelect','fasta');");
		}
	} else {
		if (idInputReadType == "Paired") {
			document.getElementById("idRightFileBrowse").setAttribute("onclick",
			"getAllDirectory('idRightFileSelect','fastq');");
	document.getElementById("idLeftFileBrowse").setAttribute("onclick",
			"getAllDirectory('idLeftFileSelect','fastq');");
		} else {
			document.getElementById("idSingleFileBrowse").setAttribute(
					"onclick", "getAllDirectory('idSingleFileSelect','fastq');");
		}
	}
}
window.onload = function() {
	document.getElementById("trinityForm").reset();
	$("select").prop('selectedIndex', 0);
	$('select[name="roundType"]').prop('selectedIndex', 0);

	document.getElementById("customReportForm").reset();
	document.getElementById("reportForm").reset();
	$("#idOptionalSelect1").prop("disabled", false);

}
function onChangeHybridCheckBox(hybridCb) {
	if (hybridCb.checked) {
		if (!document.getElementById("idOptionalSelect2").checked) {
			$("#selectOptionalFormGroup2").fadeOut("show");
			$("#selectOptionalFormGroup3").fadeOut("show");
		}

		$("#selectOptionalFormGroup1").fadeIn("slow");

	} else {
		if (!document.getElementById("idOptionalSelect2").checked) {
			// $("#selectOptionalFormGroup1").fadeOut("show");
			$("#selectOptionalFormGroup2").fadeOut("slow");
			$("#selectOptionalFormGroup3").fadeOut("show");
		}
		$("#selectOptionalFormGroup1").fadeOut("show");
	}
}
function onChangeRefferenceCheckBox(refferenceCb) {
	if (refferenceCb.checked) {
		// $("#selectOptionalFormGroup1").fadeIn("slow");
		$("#selectOptionalFormGroup2").fadeIn("show");
		$("#selectOptionalFormGroup3").fadeIn("show");
		$("#divFAOptions").fadeIn("show");
		$("#idrbtnWithFA").prop('checked', true);
		$("#idrbtnWithoutFA").prop('checked', false);
		$("#idOptionalSelect1").prop("disabled", false);
		// $("#selectOptionalFormGroup1").fadeIn("show");
		// document.getElementById("idlableLongRead").innerHTML = "Select Long
		// file(Optional)";

	} else {
		if (!document.getElementById("idOptionalSelect1").checked) {
			$("#selectOptionalFormGroup1").fadeOut("show");

		} else {
			$("#selectOptionalFormGroup1").fadeIn("show");
		}
		$("#selectOptionalFormGroup2").fadeOut("slow");
		$("#selectOptionalFormGroup3").fadeOut("slow");
		$("#divFAOptions").fadeOut("show");

		// document.getElementById("idlableLongRead").innerHTML = "Select Long
		// file"
		$("#selectRightFileFormGroup").fadeIn("show");
		$("#selectLeftFileFormGroup").fadeIn("show");
		$("#idOptionalSelect1").prop("disabled", false);

	}
}
function rbtnWithFAChanged(rbtnWithFA) {
	$("#selectRightFileFormGroup").fadeIn("show");
	$("#selectLeftFileFormGroup").fadeIn("show");
	// $("#selectOptionalFormGroup1").fadeIn("show");
	$("#idOptionalSelect1").prop("disabled", false);
}
function rbtnWithoutFAChanged(rbtnWithoutFA) {
	$("#selectRightFileFormGroup").fadeOut("show");
	$("#selectLeftFileFormGroup").fadeOut("show");
	$("#selectOptionalFormGroup1").fadeOut("show");
	$("#idOptionalSelect1").attr('checked', false);
	$("#idOptionalSelect1").prop("disabled", true);

}