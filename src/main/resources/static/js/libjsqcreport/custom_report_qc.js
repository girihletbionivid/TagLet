var flagForSeqApplication = false;
var listOfFile = "";
var arrOfFileList = [];
var formData;
var sentData;

function wsGenerateServerSideReport() 
{
	formData = new FormData();
	document.getElementById("iframeCustomReport").setAttribute("src", "");
	
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
		getFilesForNewCreatedDiv();
		arrOfFileList[ arrIndex ] = listOfFile;
		
		sentData = arrOfFileList.join("###");
//		formData.append("listOfSamples", sentData);
	}
	else
	{
		if(!validateOldDivElementsOnSubmitButton())
		{
			alert("Missing some mandatory information...!!");
			return false;
		}
		
		getFilesForSingleSample();
		arrOfFileList[arrIndex] = listOfFile;
		
		sentData = arrOfFileList.join("###");
//		formData.append("listOfSamples", sentData);
	}
	
	formData.append("listOfSamples", sentData);
	getQcReportData();
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', URL_GENERATE_REPORT, true);
	xhr.onload = function(e) {};
	xhr.send(formData);
	$("#myModal").modal('show');
	
	xhr.onreadystatechange = function() 
	{
		var response = eval("(" + xhr.responseText + ")");
		if (xhr.readyState == 4)
		{
			if (xhr.status == 200)
			{
				$("#myModal").modal('hide');
				showPdfCustomQc(response.message);
				localStorage.removeItem('typeOfQc');
			}
			else 
			{
				$("#myModal").modal('hide');
				alert(response.message);
			}
		}
	};
}

function getQcReportData()
{
	formData.append("projectName", document.getElementById("idProjectNameQC").value);
	formData.append("organismName", document.getElementById("idOrganismName").value);
	
	if(document.getElementById("idTypeOfInputSelect").value == "Other")
	{
		formData.append("SeqApplication", document.getElementById("idForOtherSeqApp").value);
	}
	else
	{
		formData.append("SeqApplication", document.getElementById("idTypeOfInputSelect").value);
	}
	
	formData.append("scientistName", document.getElementById("idScientistName").value);
	formData.append("specialization", document.getElementById("idSpecialization").value);
	formData.append("address", document.getElementById("idAddress").value);
	formData.append("sequencingType", document.getElementById("idSequencingType").value);
	formData.append("plateform", document.getElementById("idPlateform").value);
	
	formData.append("userId", localStorage.userId);
}

function getFilesForSingleSample()
{
	if(document.getElementById("idSequencingType").value == "illumina")
	{
		listOfFile = document.getElementById("idSampleName454Qc").value + ";";
		listOfFile = listOfFile + document.getElementById("idTypeOfOutputSelectIllumina").value + ";";
		listOfFile = listOfFile + jarray[document.getElementById("idOutputDirctorySelectIllumina").innerHTML];
	}
	else
	{
		listOfFile = document.getElementById("idSampleName454Qc").value + ";";
		listOfFile = listOfFile + jarray[document.getElementById("idOutputDirctorySelectIllumina").innerHTML];
	}
}

function getFilesForNewCreatedDiv()
{
	for (var j = arrIndex - 1; j < arrayForDiv.length; j++) 
	{
		if(document.getElementById("idSequencingType").value == "illumina")
		{
			listOfFile = document.getElementById("idSampleName454Qc" + arrayForDiv[j]).value + ";";
			listOfFile = listOfFile +  document.getElementById("idTypeOfOutputSelectIllumina" + arrayForDiv[j]).value + ";";
			listOfFile = listOfFile + jarray[document.getElementById("idOutputDirctorySelectIllumina" + arrayForDiv[j]).innerHTML];
		}
		else
		{
			listOfFile = document.getElementById("idSampleName454Qc" + arrayForDiv[j]).value + ";";
			listOfFile = listOfFile + jarray[document.getElementById("idOutputDirctorySelectIllumina" + arrayForDiv[j]).innerHTML];
		}
	}
}

function getFilesForNewCreatedDivOnRecall(varDivNumber)
{
	if( varDivNumber != 0 )
	{
		if(document.getElementById("idSequencingType").value == "illumina")
		{
			listOfFile = document.getElementById("idSampleName454Qc" + varDivNumber).value + ";";
			listOfFile = listOfFile + document.getElementById("idTypeOfOutputSelectIllumina" + varDivNumber).value + ";";
			listOfFile = listOfFile + jarray[document.getElementById("idOutputDirctorySelectIllumina" + varDivNumber).innerHTML];
		}
		else
		{
			listOfFile = document.getElementById("idSampleName454Qc" + varDivNumber).value + ";";
			listOfFile = listOfFile + jarray[document.getElementById("idOutputDirctorySelectIllumina" + varDivNumber).innerHTML];
		}
	}
	else
	{
		if(document.getElementById("idSequencingType").value == "illumina")
		{
			listOfFile = document.getElementById("idSampleName454Qc").value + ";";
			listOfFile = listOfFile + document.getElementById("idTypeOfOutputSelectIllumina").value + ";";
			listOfFile = listOfFile + jarray[document.getElementById("idOutputDirctorySelectIllumina").innerHTML];
		}
		else
		{
			listOfFile = document.getElementById("idSampleName454Qc").value + ";";
			listOfFile = listOfFile + jarray[document.getElementById("idOutputDirctorySelectIllumina").innerHTML];
		}
		arrOfFileList[varDivNumber] = listOfFile;
	}
}


function onchangeSeqApplication(thisElement)
{
	if(thisElement.value == "Other")
	{
		$("#parentDivForOtherSeqApp").fadeIn('slow');
		flagForSeqApplication = true;
	}
	else
	{
		$("#parentDivForOtherSeqApp").fadeOut('slow');
		flagForSeqApplication = false;
	}
}

function onSelectInputTypeQCReport(element) 
{
	if (element.value == "fourFiveFour") 
	{
		$("#endSelectionDiv").hide('slow');
		removeAllNewlyCreatedDiv();
	} 
	else 
	{
		$("#endSelectionDiv").show('slow');
		removeAllNewlyCreatedDiv();
	}
}

function changeLayoutOptions( element, divNumber, indexOfElement )
{
	if( arrOfFileList.length > 0 )
	{
		getFilesForNewCreatedDivOnRecall( divNumber );
		arrOfFileList[ divNumber ] = listOfFileForIllumina;
	}
}

function showPdfCustomQc(path) {
	document.getElementById("iframeCustomReport").setAttribute("src", path);
	$("#customReportforms").fadeOut('slow');
	$("#divShowCustomReportPdf").fadeIn('slow');
	setHeightToThis(document.getElementById("iframeCustomReport"));
}

function showCustomReportForm() {
	$("#endSelectionDiv").show();
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
function generateReport454QcForm() 
{
	// $("#reportGenerationForm").fadeIn('slow');
	// $("#bowtieForms").fadeOut('slow');
}

