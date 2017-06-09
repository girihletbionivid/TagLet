var qcOutput = "";
var tempOutput = "Running...";
var flagForNSelectionChanged = false;
var flagForFSelectionChanged = false;

var listOfFile = "";
var arrOfFileList = [];
var formData = new FormData();
var sentData;

function submitQC()
{
	formData = new FormData();

	if(arrayForDiv.length > 0)
	{
		for(var i = 0; i < arrayForDiv.length; i++)
		{
			if(!validateNewCreatedDivElementsFor454OnSubmitButton(arrayForDiv[i]))
			{
				alert("Missing some mandatory information...!!");
				return false;
			}
		}
		getFilesForNewCreatedDiv();
		arrOfFileList[arrIndex] = listOfFile;
		
		sentData = arrOfFileList.join("###");
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
	}
	
	formData.append("listOfSamples", sentData);
	
	getFormDataQC();
	
	/*
	if( !getAtrributeOfFormToConfirm() )
	{
		return false;
	}
	*/
	
	var xhr = new XMLHttpRequest();
		
	xhr.open('POST', URL_RUN_QC, true);
	xhr.onload = function(e) {};
	f = true;
	
	xhr.send(formData);
	$("#myModal").modal('show');
	
	xhr.onreadystatechange = function()
	{
		var response = eval("(" + xhr.responseText + ")");
		var qcOutput = "";
		if (xhr.readyState == 4)
		{
			if (xhr.status == 200)
			{
				$("#myModal").modal('hide');
				f = false;
				qcOutput = response.message;
				$("#454QcSection").fadeOut('slow');
				$("#qcCmdQutput").fadeIn('slow');
				var objDiv = document.getElementById("454QcCmdOutput");
				
				objDiv.innerHTML = qcOutput;
				$("#454QcCmd").animate({
					scrollTop : $('#454QcCmd')[0].scrollHeight
				}, 1000);
				$("#generateReportBtn").fadeIn('slow');
				qcOutput = "";
				tempOutput = "Running...";
			}
			else
			{
				$("#myModal").modal('hide');
				qcOutput = response.message;
				$("#454QcSection").fadeOut('slow');
				$("#qcCmdQutput").fadeIn('slow');
				var objDiv = document.getElementById("454QcCmdOutput");
				
				objDiv.innerHTML = qcOutput;
				$("#454QcCmd").animate({
					scrollTop : $('#454QcCmd')[0].scrollHeight
				}, 1000);
				$("#generateReportBtn").fadeIn('slow');
				inputOfUserQc.pop();inputOfUserQc.pop();
				index=index-1;
			}
		}
	};
}

function getFormDataQC()
{
	formData.append("projectName", document.getElementById("idProjectName454Qc").value);
	formData.append("f", document.getElementById("idFType").value);
	
	var inputValForL = document.getElementById("idl").value;
	var inputValForS = document.getElementById("ids").value;
	var inputValForCPU = document.getElementById("idCPU").value;
	
	var MinValForCPU = 1;
	var MaxValForCPU = parseInt( document.getElementById("idCPUFromServer").innerHTML );

//	CPU Info
	
	if((inputValForCPU < MinValForCPU) || (inputValForCPU > MaxValForCPU))
	{
		formData.append("cpu", "1");
	}
	else
	{
		formData.append("cpu", document.getElementById("idCPU").value);
	}
	
//	L option
	
	if(inputValForL > 100)
	{
		formData.append("l", "70");
	}
	else
	{
		formData.append("l", document.getElementById("idl").value);
	}

//	S option
	
	if(inputValForS > 40)
	{
		formData.append("s", "20");
	}
	else
	{
		formData.append("s", document.getElementById("ids").value);
	}
	
//	homoPolyLen
	
	if(flagForNSelectionChanged == true)
	{
		var inputValForHomoPolyLen = document.getElementById("idn").value;
		
		if(inputValForHomoPolyLen < 1)
		{
			formData.append("n", "1");
		}
		else
		{
			formData.append("n", document.getElementById("idn").value);
		}
	}
	else
	{
		formData.append("n", "0");
	}
	
//	minLen
	
	if(flagForFSelectionChanged == true)
	{
		if(inputVal < 1)
		{
			formData.append("m", "100");
		}
		else
		{
			formData.append("m", document.getElementById("idm").value);
		}
	}
	else
	{
		formData.append("m", "0");
	}
	
	formData.append("onlyStat", $("#idCheckBoxOnlyStatsIllumina").is(":checked"));
	formData.append("t", document.getElementById("idTType").value);
	formData.append("z", document.getElementById("idZType").value);
	formData.append("sequencingLayout", document.getElementById("idInputReadTypeQCIllumina").value);
	
	formData.append("userId", localStorage.userId);
	formData.append("ouputDir", jarray[document.getElementById("idOutputDirSelect").innerHTML]);
	
	return formData;
}

function getFilesForSingleSample()
{
	if(document.getElementById("idInputReadTypeQCIllumina").value == "Single")
	{
		listOfFile = document.getElementById("idSampleName454Qc").value + ";";
		
		if(document.getElementById("idAdaptorLibrariesValue").value == "file")
		{
			listOfFile = listOfFile + jarray[document.getElementById("idSingleFileSelect").innerHTML] + ";";
		}
		else
		{
			listOfFile = listOfFile +  document.getElementById("idAdaptorLibrariesValue").value + ";";
		}
		
		listOfFile = listOfFile + jarray[document.getElementById("idFastaFileSelect").innerHTML] + ";" 
					+ jarray[document.getElementById("idQualityFileSelect").innerHTML];
	}
	else
	{
		listOfFile = document.getElementById("idSampleName454Qc").value + ";";
		
		if(document.getElementById("idAdaptorLibrariesValue").value == "file")
		{
			listOfFile = listOfFile + jarray[document.getElementById("idSingleFileSelect").innerHTML] + ";";
		}
		else
		{
			listOfFile = listOfFile +  document.getElementById("idAdaptorLibrariesValue").value + ";";
		}
		
		listOfFile = listOfFile
					+ jarray[document.getElementById("idFirstFastaFileSelect").innerHTML] + ";"
					+ jarray[document.getElementById("idFirstQualityFileSelect").innerHTML] + ";"
					+ jarray[document.getElementById("idSecondFastaFileSelect").innerHTML] + ";"
					+ jarray[document.getElementById("idSecondQualityFileSelect").innerHTML];
	}
}

function getFilesForNewCreatedDiv()
{
	for (var j = arrIndex - 1; j < arrayForDiv.length; j++) 
	{
		if(document.getElementById("idInputReadTypeQCIllumina").value == "Single")
		{
			listOfFile = document.getElementById("idSampleName454Qc" + arrayForDiv[j]).value + ";";
			
			if(document.getElementById("idAdaptorLibrariesValue" + arrayForDiv[j]).value == "file")
			{
				listOfFile = listOfFile + jarray[document.getElementById("idSingleFileSelect" + arrayForDiv[j]).innerHTML] + ";";
			}
			else
			{
				listOfFile = listOfFile +  document.getElementById("idAdaptorLibrariesValue" + arrayForDiv[j]).value + ";";
			}
			listOfFile = listOfFile
						+ jarray[document.getElementById("idFastaFileSelect" + arrayForDiv[j]).innerHTML] + ";" 
						+ jarray[document.getElementById("idQualityFileSelect" + arrayForDiv[j]).innerHTML];
		}
		else
		{
			listOfFile = document.getElementById("idSampleName454Qc" + arrayForDiv[j]).value + ";";
			
			if(document.getElementById("idAdaptorLibrariesValue" + arrayForDiv[j]).value == "file")
			{
				listOfFile = listOfFile + jarray[document.getElementById("idSingleFileSelect" + arrayForDiv[j]).innerHTML] + ";";
			}
			else
			{
				listOfFile = listOfFile +  document.getElementById("idAdaptorLibrariesValue" + arrayForDiv[j]).value + ";";
			}
			
			listOfFile = listOfFile
						+ jarray[document.getElementById("idFirstFastaFileSelect" + arrayForDiv[j]).innerHTML] + ";" 
						+ jarray[document.getElementById("idFirstQualityFileSelect" + arrayForDiv[j]).innerHTML] + ";"
						+ jarray[document.getElementById("idSecondFastaFileSelect" + arrayForDiv[j]).innerHTML] + ";" 
						+ jarray[document.getElementById("idSecondQualityFileSelect" + arrayForDiv[j]).innerHTML];
		}
	}
}

function getFilesForNewCreatedDivOnRecall(varDivNumber)
{
	if(varDivNumber != 0)
	{
		alert(varDivNumber);
		
		if(document.getElementById("idInputReadTypeQCIllumina").value == "Single")
		{
			listOfFile = document.getElementById("idSampleName454Qc" + varDivNumber).value + ";";
			
			if(document.getElementById("idAdaptorLibrariesValue" + varDivNumber).value == "file")
			{
				listOfFile = listOfFile + jarray[document.getElementById("idSingleFileSelect" + varDivNumber).innerHTML] + ";";
			}
			else
			{
				listOfFile = listOfFile +  document.getElementById("idAdaptorLibrariesValue" + varDivNumber).value + ";";
			}
			listOfFile = listOfFile
						+ jarray[document.getElementById("idFastaFileSelect" + varDivNumber).innerHTML] + ";" 
						+ jarray[document.getElementById("idQualityFileSelect" + varDivNumber).innerHTML];
		}
		else
		{
			listOfFile = document.getElementById("idSampleName454Qc" + varDivNumber).value + ";";
			
			if(document.getElementById("idAdaptorLibrariesValue" + varDivNumber).value == "file")
			{
				listOfFile = listOfFile + jarray[document.getElementById("idSingleFileSelect" + varDivNumber).innerHTML] + ";";
			}
			else
			{
				listOfFile = listOfFile +  document.getElementById("idAdaptorLibrariesValue" + varDivNumber).value + ";";
			}
			
			listOfFile = listOfFile
						+ jarray[document.getElementById("idFirstFastaFileSelect" + varDivNumber).innerHTML] + ";" 
						+ jarray[document.getElementById("idFirstQualityFileSelect" + varDivNumber).innerHTML] + ";"
						+ jarray[document.getElementById("idSecondFastaFileSelect" + varDivNumber).innerHTML] + ";" 
						+ jarray[document.getElementById("idSecondQualityFileSelect" + varDivNumber).innerHTML];
		}	
	}
	else
	{
		if(document.getElementById("idInputReadTypeQCIllumina").value == "Single")
		{
			listOfFile = document.getElementById("idSampleName454Qc").value + ";";
			
			if(document.getElementById("idAdaptorLibrariesValue").value == "file")
			{
				listOfFile = listOfFile + jarray[document.getElementById("idSingleFileSelect").innerHTML] + ";";
			}
			else
			{
				listOfFile = listOfFile +  document.getElementById("idAdaptorLibrariesValue").value + ";";
			}
			
			listOfFile = listOfFile + jarray[document.getElementById("idFastaFileSelect").innerHTML] + ";" 
						+ jarray[document.getElementById("idQualityFileSelect").innerHTML];
		}
		else
		{
			listOfFile = document.getElementById("idSampleName454Qc").value + ";";
			
			if(document.getElementById("idAdaptorLibrariesValue").value == "file")
			{
				listOfFile = listOfFile + jarray[document.getElementById("idSingleFileSelect").innerHTML] + ";";
			}
			else
			{
				listOfFile = listOfFile +  document.getElementById("idAdaptorLibrariesValue").value + ";";
			}
			
			listOfFile = listOfFile
						+ jarray[document.getElementById("idFirstFastaFileSelect").innerHTML] + ";"
						+ jarray[document.getElementById("idFirstQualityFileSelect").innerHTML] + ";"
						+ jarray[document.getElementById("idSecondFastaFileSelect").innerHTML] + ";"
						+ jarray[document.getElementById("idSecondQualityFileSelect").innerHTML];
		}
	}
}

function getHomoPolymerLength()
{
	if(flagForNSelectionChanged == true)
	{
		formData.append("n", document.getElementById("idn").value);
	}
	else
	{
		formData.append("n", "0");
	}
}
function getminimumTrimLength()
{
	if(flagForFSelectionChanged == true)
	{
		formData.append("m", document.getElementById("idm").value);
	}
	else
	{
		formData.append("m", "0");
	}
}
function resetQC454Form()
{
	document.getElementById("idFastaFileSelect").innerHTML = "No file selected";
	document.getElementById("idQualityFileSelect").innerHTML = "No file selected";
	index = 0;
	inputOfUserQc=[];
	arrOfFileList=[];
}

function getAtrributeOfFormToConfirm()
{
	
}
