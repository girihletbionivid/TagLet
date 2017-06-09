
function onChangeAdaptorLibrariesValueIllumina(element) 
{
	if (element.value == "file") 
	{
		$("#selectSingleFileAdaptorFormGroupIllumina").fadeIn('slow');
	} 
	else 
	{
		$("#selectSingleFileAdaptorFormGroupIllumina").fadeOut('slow');
	}
}

function onChangeAdaptorLibrariesValueIlluminaOnRecall(element, divNumber, indexOfElement) 
{
	if(divNumber != 0)
	{
		if (element.value == "file") 
		{
			$("#selectSingleFileAdaptorFormGroupIllumina" + divNumber).fadeIn('slow');
		} 
		else 
		{
			$("#selectSingleFileAdaptorFormGroupIllumina" + divNumber).fadeOut('slow');
		}
		getIlluminaInputFilesOnRecall(divNumber);
		arrOfFileList[divNumber] = listOfFileForIllumina;
	}
	else
	{
		if (element.value == "file") 
		{
			$("#selectSingleFileAdaptorFormGroupIllumina").fadeIn('slow');
		} 
		else 
		{
			$("#selectSingleFileAdaptorFormGroupIllumina").fadeOut('slow');
		}
		changeFunctionAttributesForStaticDiv();
		arrOfFileList[divNumber] = listOfFileForIllumina;
	}
}

function onChangeOptionForFastQVarOnRecall(element, divNumber, indexOfElement)
{
	if(arrOfFileList.length > 0) 
	{
		getIlluminaInputFilesOnRecall(divNumber);
		arrOfFileList[divNumber] = listOfFileForIllumina;
	}
}

function onChangeAdaptorLibrariesValueForNewDivForIllumina(element,targetId)
{
	if (element.value == "file")
	{
		$("#" + targetId.id).fadeIn('slow');
	}
	else
	{
		$("#" + targetId.id).fadeOut('slow');
	}
}

function changeOptionQCIllumina(element) 
{
	if (element.value == "Paired")
	{
		$("#selectSingleFileFormGroupIllumina").fadeOut('slow');
		$("#selectSecondFileFormGroupIllumina").fadeIn('slow');
		$("#selectFirstFileFormGroupIllumina").fadeIn('slow');
	}
	else 
	{
		$("#selectSecondFileFormGroupIllumina").fadeOut('slow');
		$("#selectFirstFileFormGroupIllumina").fadeOut('slow');
		$("#selectSingleFileFormGroupIllumina").fadeIn('slow');
	}
}

function changeOptionQCIlluminaOnRecall(element, divNumber, indexOfElement) 
{
	if(divNumber != 0)
	{
		if (element.value == "Paired")
		{
			$("#selectSingleFileFormGroupIllumina" + divNumber).fadeOut('slow');
			$("#idFirstFileSelectParentIlluminaDiv" + divNumber).fadeIn('slow');
			$("#idSecondFileParentSelectIlluminaDiv" + divNumber).fadeIn('slow');
			

			$("#idFirstFileBrowseIllumina" + divNumber).attr("onclick", "getAllDirectoryOnRecall('idFirstFileSelectIllumina" + divNumber + "','txt'," + divNumber + ",2);");
			$("#idSecondFileBrowseIllumina" + divNumber).attr("onclick", "getAllDirectoryOnRecall('idSecondFileSelectIllumina" + divNumber + "','txt'," + divNumber + ",3);");

			$("#idAdaptorLibrariesValueIllumina" + divNumber).attr("onchange", "onChangeAdaptorLibrariesValueIlluminaOnRecall(this," + divNumber + ",4);");
			$("#idBrowseIlluminaSingleFileAdaptor" + divNumber).attr("onclick", "getAllDirectoryOnRecall('idSingleFileAdaptorSelectIllumina" + divNumber + "','txt'," + divNumber + ",4);");
			$("#idAdaptorLibrariesValueIlluminaFastaVarient" + divNumber).attr("onchange", "onChangeOptionForFastQVarOnRecall(this," + divNumber + ",5)");
		}
		else 
		{
			$("#idFirstFileSelectParentIlluminaDiv" + divNumber).fadeOut('slow');
			$("#idSecondFileParentSelectIlluminaDiv" + divNumber).fadeOut('slow');
			$("#selectSingleFileFormGroupIllumina" + divNumber).fadeIn('slow');
			

			$("#idBrowseSingleEndIlluminaFile"+ divNumber).attr("onclick", "getAllDirectoryOnRecall('idSingleFileSelectIllumina" + divNumber + "','txt'," + divNumber + ",2);");
			$("#idAdaptorLibrariesValueIllumina" + divNumber).attr("onchange", "onChangeAdaptorLibrariesValueIlluminaOnRecall(this," + divNumber + ",3);");
			$("#idBrowseIlluminaSingleFileAdaptor" + divNumber).attr("onclick", "getAllDirectoryOnRecall('idSingleFileAdaptorSelectIllumina" + divNumber + "','txt'," + divNumber + ",3);");
			$("#idAdaptorLibrariesValueIlluminaFastaVarient" + divNumber).attr("onchange", "onChangeOptionForFastQVarOnRecall(this," + divNumber + ",4)");
		}
		getIlluminaInputFilesOnRecall(divNumber);
		arrOfFileList[divNumber] = listOfFileForIllumina;
	}
	else
	{
		if (element.value == "Paired")
		{
			$("#selectSingleFileFormGroupIllumina").fadeOut('slow');
			$("#selectSecondFileFormGroupIllumina").fadeIn('slow');
			$("#selectFirstFileFormGroupIllumina").fadeIn('slow');
			

			$("#idFirstFileBrowseIllumina").attr("onclick", "getAllDirectoryOnRecall('idFirstFileSelectIllumina','txt',0,2);");
			$("#idSecondFileBrowseIllumina").attr("onclick", "getAllDirectoryOnRecall('idSecondFileSelectIllumina','txt',0,3);");
			$("#idAdaptorLibrariesValueIllumina").attr("onchange", "onChangeAdaptorLibrariesValueIlluminaOnRecall(this,0,4);");
			$("#idBrowseIlluminaSingleFileAdaptor").attr("onclick", "getAllDirectoryOnRecall('idSingleFileAdaptorSelectIllumina','txt',0,4);");
			$("#idAdaptorLibrariesValueIlluminaFastaVarient").attr("onchange", "onChangeOptionForFastQVarOnRecall(this,0,5)");
		}
		else 
		{
			$("#selectSecondFileFormGroupIllumina").fadeOut('slow');
			$("#selectFirstFileFormGroupIllumina").fadeOut('slow');
			$("#selectSingleFileFormGroupIllumina").fadeIn('slow');
			

			$("#idBrowseSingleEndIlluminaFile").attr("onclick", "getAllDirectoryOnRecall('idSingleFileSelectIllumina','txt',0,2);");
			$("#idAdaptorLibrariesValueIllumina").attr("onchange", "onChangeAdaptorLibrariesValueIlluminaOnRecall(this,0,3);");
			$("#idBrowseIlluminaSingleFileAdaptor").attr("onclick", "getAllDirectoryOnRecall('idSingleFileAdaptorSelectIllumina','txt',0,3);");
			$("#idAdaptorLibrariesValueIlluminaFastaVarient").attr("onchange", "onChangeOptionForFastQVarOnRecall(this,0,4)");
		}
		getIlluminaInputFilesOnRecall(divNumber);
		arrOfFileList[divNumber] = listOfFileForIllumina;
	}
/*	
	if(arrOfFileList.length > 0) 
	{
		getIlluminaInputFilesOnRecall(divNumber);
		arrOfFileList[divNumber] = listOfFileForIllumina;
		
		var tempElementOfArrOfFileList = arrOfFileList[divNumber]; 
		var tempSplittedContents = tempElementOfArrOfFileList.split(";");
	
		tempSplittedContents[indexOfElement] = document.getElementById(element.id).value; 
		tempElementOfArrOfFileList = tempSplittedContents.join(";"); 
		arrOfFileList[divNumber] =tempElementOfArrOfFileList; 
	}
*/
}
function changeOptionQCIlluminaForNewDiv(element, count) 
{
	if (element.value == "Paired")
	{
		$("#selectSingleFileFormGroupIllumina" + count).fadeOut('slow');
		$("#idFirstFileSelectParentIlluminaDiv" + count).fadeIn('slow');
		$("#idSecondFileParentSelectIlluminaDiv" + count).fadeIn('slow');
	}
	else 
	{
		$("#idFirstFileSelectParentIlluminaDiv" + count).fadeOut('slow');
		$("#idSecondFileParentSelectIlluminaDiv" + count).fadeOut('slow');
		$("#selectSingleFileFormGroupIllumina" + count).fadeIn('slow');
	}
}

$(function() {
	$('a, button').click(function() {
		$(this).toggleClass('active');
	});
});

$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
	$("#illuminaQcCmd").hide();
	setHeightToThis(document.getElementById("illuminaQcCmdOutput"));
});

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
	$("#qcCmdQutput").fadeOut('slow');
	document.getElementById("divSelectedFiles").innerHTML = "";
	resetAll();

}
function resetAll() {
	$("#idm").fadeOut('slow');
	$("#idn").fadeOut('slow');
	$("#illuminaQcForm").trigger('reset');
	$("#selectSingleFileFormGroupIllumina").fadeOut('slow');
	$("#selectSingleFileAdaptorFormGroupIllumina").fadeOut('slow');
	$("#idForOnlyStat").fadeOut('slow');
	$("#illuminaOutputFormDiv").fadeOut('slow');
/*	document.getElementById("idInputfolderNameIllumina").value = ""
			+ getNameByCurrentDateTime();*/
}
function showIlluminaForm() {
	inputOfUser = [];
	flagForMultiFiles = false;
	flagForMultiFiles454QC = false;
	index = 0;
	$("#illuminaQcForm").trigger('reset');
	$("#illuminaForms").fadeIn('slow');
	$("#illuminaQcCmd").fadeOut('slow');
	document.getElementById("idOutputDirIlluminaSelect").innerHTML = "No folder selected";
	document.getElementById("illuminaQcCmdOutput").innerHTML = "No folder selected";
	document.getElementById("divSelectedFilesIllumina").innerHTML = "";
	$("#selectSingleFileFormGroupIllumina").fadeOut('slow');
	$("#selectSecondFileFormGroupIllumina").fadeIn('slow');
	$("#selectFirstFileFormGroupIllumina").fadeIn('slow');
	resetAll();
}
$(document).ready(function() {	
				resetAll();
					
					$("#lluminaQcCmd").fadeOut('slow');
//					$("#illuminaInputFormDiv").slideToggle("slow");
					$("#illuminaInputDivSpan").toggleClass(
							"glyphicon-collapse-up");
					$("#illuminaInputDivSpan").toggleClass(
							"glyphicon-collapse-down");
					$("#illuminaInputDivSpan")
							.toggleClass("colorCollapseClass");

					/*$("#idIlluminaOptionsDiv").slideToggle("slow");
					$("#idIlluminaOptionsDivSpan").toggleClass(
							"glyphicon-collapse-up");
					$("#idIlluminaOptionsDivSpan").toggleClass(
							"glyphicon-collapse-down");
					$("#idIlluminaOptionsDivSpan").toggleClass(
							"colorCollapseClass");*/

				/*	$("#illuminaOutputFormDiv").slideToggle("slow");
					$("#illuminaOutputDivSpan").toggleClass(
							"glyphicon-collapse-up");
					$("#illuminaOutputDivSpan").toggleClass(
							"glyphicon-collapse-down");
					$("#illuminaOutputDivSpan").toggleClass(
							"colorCollapseClass");*/

				/*	$("#qcProcessingFormDivIllumina").slideToggle("slow");
					$("#qcProcessingDivSpanIllumina").toggleClass(
							"glyphicon-collapse-up");
					$("#qcProcessingDivSpanIllumina").toggleClass(
							"glyphicon-collapse-down");
					$("#qcProcessingDivSpanIllumina").toggleClass(
							"colorCollapseClass");
*/
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