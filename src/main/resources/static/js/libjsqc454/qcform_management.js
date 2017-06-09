function onChangeAdaptorLibrariesValue(element)
{
	if (element.value == "file")
	{
		$("#selectSingleFileFormGroup").fadeIn('slow');
	}
	else
	{
		$("#selectSingleFileFormGroup").fadeOut('slow');
	}
}

function onChangeAdaptorLibrariesValueRecall(element, divNumber, indexOfElement) 
{
	if(divNumber != 0)
	{
		if (element.value == "file") 
		{
			$("#selectSingleFileFormGroup" + divNumber).fadeIn('slow');
		} 
		else 
		{
			$("#selectSingleFileFormGroup" + divNumber).fadeOut('slow');
		}
		getFilesForNewCreatedDivOnRecall(divNumber);
		arrOfFileList[divNumber] = listOfFileForIllumina;
	}
	else
	{
		if (element.value == "file") 
		{
			$("#selectSingleFileFormGroup").fadeIn('slow');
		} 
		else 
		{
			$("#selectSingleFileFormGroup").fadeOut('slow');
		}
		getFilesForNewCreatedDivOnRecall(divNumber);
		arrOfFileList[divNumber] = listOfFileForIllumina;
	}
}

function onChangeAdaptorLibrariesValueForNewDiv(element,targetId)
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
$(function() {
	$('a, button').click(function() {
		$(this).toggleClass('active');
	});
});

//	Load HTML

$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
	setHeightToThis(document.getElementById("454QcCmdOutput"));
	$("#idForPairedEndLayout").fadeOut('slow');
	$("#selectSingleFileFormGroup").fadeOut('slow');
	$("#qcOutputFormDiv").fadeOut('slow');
	$("#idQCOptionsDiv").fadeIn('slow');
});

function onMSelectionChanged(element) {
	if (element.checked)
	{
		$("#idm").fadeIn('slow');
		flagForNSelectionChanged = true;
	}
	else 
	{
		$("#idm").fadeOut('slow');
		flagForNSelectionChanged = false;
	}
}
function onNSelectionChanged(element) {
	if (element.checked)
	{
		$("#idn").fadeIn('slow');
		flagForNSelectionChanged = true;
	} 
	else 
	{
		$("#idn").fadeOut('slow');
		flagForNSelectionChanged = false;
	}
}
function showQCForm() 
{
	inputOfUserQc = [];
	indexQc = 0;
	document.getElementById("454QcCmdOutput").innerHTML = "";
	$("#454QcForm").trigger('reset');
	$("#qcCmdQutput").fadeOut('slow');
	document.getElementById("divSelectedFiles").innerHTML = "";
	resetAll();
}

function resetAll() 
{
	$("#idn").fadeOut('slow');
	$("#qcCmd").fadeOut('slow');
	$("#idForPairedEndLayout").fadeOut('slow');
	$("#idSeqLayout").fadeOut('slow');
	
	$("#454QcForm").trigger('reset');
	$("#idForPairedEndLayout").fadeOut('slow');
	$("#selectSingleFileFormGroup").fadeOut('slow');
}

$(document).ready(function() {
	resetAll();
	$("#qcCmdQutput").fadeOut('slow');
	$("#idForAttributeWindow").fadeOut('slow');
	$("#selectSingleFileFormGroup").fadeOut('slow');
	
	$("#454QCInputFormDiv").slideToggle("slow");
	$("#454QCInputDivSpan").toggleClass("glyphicon-collapse-up");
	$("#454QCInputDivSpan").toggleClass("glyphicon-collapse-down");
	$("#454QCInputDivSpan").toggleClass("colorCollapseClass");

	/*$("#idQCOptionsDiv").slideToggle("slow");
	$("#idQCOptionsDivSpan").toggleClass("glyphicon-collapse-up");
	$("#idQCOptionsDivSpan").toggleClass("glyphicon-collapse-down");
	$("#idQCOptionsDivSpan").toggleClass("colorCollapseClass");*/

	$("#454QCInputDiv").click(function() {
		$("#454QCInputFormDiv").slideToggle("slow");
		$("#454QCInputDivSpan").toggleClass("glyphicon-collapse-up");
		$("#454QCInputDivSpan").toggleClass("glyphicon-collapse-down");
		$("#454QCInputDivSpan").toggleClass("colorCollapseClass");

	});

	/*$("#idQCOptionsLable").click(function() {
		$("#idQCOptionsDiv").slideToggle("slow");
		$("#idQCOptionsDivSpan").toggleClass("glyphicon-collapse-up");
		$("#idQCOptionsDivSpan").toggleClass("glyphicon-collapse-down");
		$("#idQCOptionsDivSpan").toggleClass("colorCollapseClass");

	});*/
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

/*
 * Changes made by 'Nitin'
 * 
*/

function changeLayoutOption(element)
{
	if(element.value == "Paired")
	{
		removeAllNewlyCreatedDiv();
		
		$("#idForSingleEndLayout").fadeOut('slow');
		$("#idForPairedEndLayout").fadeIn('slow');
	}
	else
	{
		removeAllNewlyCreatedDiv();
		
		$("#idForPairedEndLayout").fadeOut('slow');
		$("#idForSingleEndLayout").fadeIn('slow');
	}	
}
function changeOptionQC454OnRecall(element, divNumber, indexOfElement) 
{
	if(divNumber != 0)
	{
		if (element.value == "Paired")
		{
			$("#idForSingleEndLayout").fadeOut('slow');
			$("#idForPairedEndLayout").fadeIn('slow');
		}
		else 
		{
			$("#idForPairedEndLayout").fadeOut('slow');
			$("#idForSingleEndLayout").fadeIn('slow');
		}
		getFilesForNewCreatedDivOnRecall(divNumber);
		arrOfFileList[divNumber] = listOfFileForIllumina;
	}
	else
	{
		if (element.value == "Paired")
		{
			$("#idForPairedEndLayout").fadeOut('slow');
			$("#idForSingleEndLayout").fadeIn('slow');
		}
		else 
		{
			$("#idForPairedEndLayout").fadeOut('slow');
			$("#idForSingleEndLayout").fadeIn('slow');
		}
		getFilesForNewCreatedDivOnRecall(divNumber);
		arrOfFileList[divNumber] = listOfFileForIllumina;
	}
}	
function onChangeFoption(element)
{
	if(element.value == "Y")
	{
		$("#idForOptionMDiv").fadeIn('slow');
	}
	else
	{
		$("#idForOptionMDiv").fadeOut('slow');
	}
}
