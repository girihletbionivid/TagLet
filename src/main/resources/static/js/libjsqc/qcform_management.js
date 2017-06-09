function onChangeAdaptorLibrariesValue(element) {
	if (element.value == "file") {
		$("#selectSingleFileFormGroup").fadeIn('slow');
	} else {
		$("#selectSingleFileFormGroup").fadeOut('slow');
	}
}
$(function() {
	$('a, button').click(function() {
		$(this).toggleClass('active');
	});
});

$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
	onloadFunctionLoadData();
});
function onloadFunctionLoadData() {
	if (localStorage.tagName == "illumina_report"  ) {
		wsGetCommandAttributeByPid(localStorage.pid,localStorage.tagName);
	} 	if (localStorage.tagName == "FourFiveFourQcReport" ) {
		wsGetCommandAttributeByPid(localStorage.pid,localStorage.tagName);
	} 
}
function onChangeAdaptorLibrariesValueIllumina(element) {
	if (element.value == "file") {
		$("#selectSingleFileAdaptorFormGroupIllumina").fadeIn('slow');
	} else {
		$("#selectSingleFileAdaptorFormGroupIllumina").fadeOut('slow');
	}
}
function onMSelectionChanged(element) {
	if (element.checked) {
		$("#idm").fadeIn('slow');
	} else {
		$("#idm").fadeOut('slow');
	}
}
function onNSelectionChanged(element) {
	if (element.checked) {
		$("#idn").fadeIn('slow');
	} else {
		$("#idn").fadeOut('slow');
	}

}
function showQCForm() {
	inputOfUserQc = [];
	indexQc = 0;
	document.getElementById("454QcCmdOutput").innerHTML = "";
	$("#454QcForm").trigger('reset');
	$("#454QcSection").fadeIn('slow');
	$("#qcCmdQutput").fadeOut('slow');
	document.getElementById("divSelectedFiles").innerHTML = "";
	resetAll();

}
function resetAll() {
	
	$("#idm").fadeOut('slow');
	$("#idn").fadeOut('slow');
	$("#qcCmd").fadeOut('slow');
	$("#divShowCustomReportPdf").fadeOut('slow');
	$("#454QcForm").trigger('reset');
	$("#reportForm").fadeIn('slow');
	$("#illuminaQcForm").trigger('reset');
	$("#selectSingleFileFormGroupIllumina").fadeOut('slow');
	$("#selectSingleFileFormGroup").fadeOut('slow');
	$("#selectSingleFileAdaptorFormGroupIllumina").fadeOut('slow');
	document.getElementById("idInputfolderName").value=""+getNameByCurrentDateTime();
	document.getElementById("idInputfolderNameIllumina").value=""+getNameByCurrentDateTime();
	
}
function showIlluminaForm() {
	inputOfUser = [];
	 flagForMultiFiles = false;
	  flagForMultiFiles454QC = false; 
	index = 0;
	$("#illuminaQcForm").trigger('reset');
	$("#illuminaQcSection").fadeIn('slow');
	$("#illuminaQcCmd").fadeOut('slow');
	document.getElementById("idOutputDirIlluminaSelect").innerHTML="No folder selected";
	document.getElementById("illuminaQcCmdOutput").innerHTML = "No folder selected";
	document.getElementById("divSelectedFilesIllumina").innerHTML = "";
	$("#selectSingleFileFormGroupIllumina").fadeOut('slow');
	$("#selectSecondFileFormGroupIllumina").fadeIn('slow');
	$("#selectFirstFileFormGroupIllumina").fadeIn('slow');
	resetAll();
}
$(document).ready(function() {
	resetAll();
	 showCustomReportForm() ;
	 $("#qcCmdQutput").fadeOut('slow');
	 $("#lluminaQcCmd").fadeOut('slow');
	 
	$("#454QCInputFormDiv").slideToggle("slow");
	$("#454QCInputDivSpan").toggleClass("glyphicon-collapse-up");
	$("#454QCInputDivSpan").toggleClass("glyphicon-collapse-down");
	$("#454QCInputDivSpan").toggleClass("colorCollapseClass");

	$("#idQCOptionsDiv").slideToggle("slow");
	$("#idQCOptionsDivSpan").toggleClass("glyphicon-collapse-up");
	$("#idQCOptionsDivSpan").toggleClass("glyphicon-collapse-down");
	$("#idQCOptionsDivSpan").toggleClass("colorCollapseClass");

	$("#qcOutputFormDiv").slideToggle("slow");
	$("#qcOutputDivSpan").toggleClass("glyphicon-collapse-up");
	$("#qcOutputDivSpan").toggleClass("glyphicon-collapse-down");
	$("#qcOutputDivSpan").toggleClass("colorCollapseClass");

	$("#qcProcessingFormDiv").slideToggle("slow");
	$("#qcProcessingDivSpan").toggleClass("glyphicon-collapse-up");
	$("#qcProcessingDivSpan").toggleClass("glyphicon-collapse-down");
	$("#qcProcessingDivSpan").toggleClass("colorCollapseClass");

	$("#454QCInputDiv").click(function() {
		$("#454QCInputFormDiv").slideToggle("slow");
		$("#454QCInputDivSpan").toggleClass("glyphicon-collapse-up");
		$("#454QCInputDivSpan").toggleClass("glyphicon-collapse-down");
		$("#454QCInputDivSpan").toggleClass("colorCollapseClass");

	});
	$("#idQCOptionsLable").click(function() {
		$("#idQCOptionsDiv").slideToggle("slow");
		$("#idQCOptionsDivSpan").toggleClass("glyphicon-collapse-up");
		$("#idQCOptionsDivSpan").toggleClass("glyphicon-collapse-down");
		$("#idQCOptionsDivSpan").toggleClass("colorCollapseClass");

	});
	$("#qcOutputDivLable").click(function() {
		$("#qcOutputFormDiv").slideToggle("slow");
		$("#qcOutputDivSpan").toggleClass("glyphicon-collapse-up");
		$("#qcOutputDivSpan").toggleClass("glyphicon-collapse-down");
		$("#qcOutputDivSpan").toggleClass("colorCollapseClass");

	});
	$("#qcProcessingDivLable").click(function() {
		$("#qcProcessingFormDiv").slideToggle("slow");
		$("#qcProcessingDivSpan").toggleClass("glyphicon-collapse-up");
		$("#qcProcessingDivSpan").toggleClass("glyphicon-collapse-down");
		$("#qcProcessingDivSpan").toggleClass("colorCollapseClass");

	});
});
$(document)
		.ready(
				function() {
					$("#illuminaInputFormDiv").slideToggle("slow");
					$("#illuminaInputDivSpan").toggleClass(
							"glyphicon-collapse-up");
					$("#illuminaInputDivSpan").toggleClass(
							"glyphicon-collapse-down");
					$("#illuminaInputDivSpan")
							.toggleClass("colorCollapseClass");

					$("#idIlluminaOptionsDiv").slideToggle("slow");
					$("#idIlluminaOptionsDivSpan").toggleClass(
							"glyphicon-collapse-up");
					$("#idIlluminaOptionsDivSpan").toggleClass(
							"glyphicon-collapse-down");
					$("#idIlluminaOptionsDivSpan").toggleClass(
							"colorCollapseClass");

					$("#illuminaOutputFormDiv").slideToggle("slow");
					$("#illuminaOutputDivSpan").toggleClass(
							"glyphicon-collapse-up");
					$("#illuminaOutputDivSpan").toggleClass(
							"glyphicon-collapse-down");
					$("#illuminaOutputDivSpan").toggleClass(
							"colorCollapseClass");

					$("#qcProcessingFormDivIllumina").slideToggle("slow");
					$("#qcProcessingDivSpanIllumina").toggleClass(
							"glyphicon-collapse-up");
					$("#qcProcessingDivSpanIllumina").toggleClass(
							"glyphicon-collapse-down");
					$("#qcProcessingDivSpanIllumina").toggleClass(
							"colorCollapseClass");

					$("#illuminaInputDiv").click(
							function() {
								$("#illuminaInputFormDiv").slideToggle("slow");
								$("#illuminaInputDivSpan").toggleClass(
										"glyphicon-collapse-up");
								$("#illuminaInputDivSpan").toggleClass(
										"glyphicon-collapse-down");
								$("#illuminaInputDivSpan").toggleClass(
										"colorCollapseClass");

							});
					$("#idIlluminaOptionsLable").click(
							function() {
								$("#idIlluminaOptionsDiv").slideToggle("slow");
								$("#idIlluminaOptionsDivSpan").toggleClass(
										"glyphicon-collapse-up");
								$("#idIlluminaOptionsDivSpan").toggleClass(
										"glyphicon-collapse-down");
								$("#idIlluminaOptionsDivSpan").toggleClass(
										"colorCollapseClass");

							});

					$("#illuminaOutputDivLable")
							.click(
									function() {
										$("#illuminaOutputFormDiv")
												.slideToggle("slow");
										$("#illuminaOutputDivSpan")
												.toggleClass(
														"glyphicon-collapse-up");
										$("#illuminaOutputDivSpan")
												.toggleClass(
														"glyphicon-collapse-down");
										$("#illuminaOutputDivSpan")
												.toggleClass(
														"colorCollapseClass");

									});

					$("#qcProcessingDivLableIllumina").click(
							function() {
								$("#qcProcessingFormDivIllumina").slideToggle(
										"slow");
								$("#qcProcessingDivSpanIllumina").toggleClass(
										"glyphicon-collapse-up");
								$("#qcProcessingDivSpanIllumina").toggleClass(
										"glyphicon-collapse-down");
								$("#qcProcessingDivSpanIllumina").toggleClass(
										"colorCollapseClass");
							});

				});