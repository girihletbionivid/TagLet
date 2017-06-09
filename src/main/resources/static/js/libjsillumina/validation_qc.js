function validateOldDivElements()
{
	if(		validateSampleName() &&
			validateAdaptorFile() &&
			validateInputFilesForIlluminaQC()
	)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function validateOldDivElementsOnSubmitButton()
{
	if(		validateInputProjectName() &&
			validateCutOffReadLen4HQ() &&
			validatecutOffQualScore() &&
			validateSampleName() &&
			validateCPUInfo() &&
			validateAdaptorFile() &&
			validateInputFilesForIlluminaQC() &&
			validateInputFolderForIlluminaQC()
	)
	{
		return true;
	}
	else
	{
		return false;
	}
}
function validateInputProjectName()
{
	if (document.getElementById("idProjectNameIllumina").value == "")
	{
		warningForEmptyField("idProjectNameIllumina", "idPrjNm");
		return false;
	}
	else
	{
		return true;
	}
}

function validateSampleName()
{
	if (document.getElementById("idSampleNameIlluminaQc").value == "")
	{
		warningForEmptyField("idSampleNameIlluminaQc", "idSampleNm");
		return false;
	}
	else
	{
		return true;
	}
}

function validateAdaptorFile()
{
	if (document.getElementById("idAdaptorLibrariesValueIllumina").value == "file")
	{
		if (document.getElementById("idSingleFileAdaptorSelectIllumina").innerHTML == "No file selected")
		{
			var element = document.getElementById("idForAdapterFileDiv");
			element.onblur = warningForFileOrFolders("idSingleFileAdaptorSelectIllumina", "idForAdapterFileDiv", "No file selected");
			return false;
		}
		else 
		{
			removeAddedClass("idForAdapterFileDiv");
			return true;
		}
	} 
	else 
	{
		return true;
	}
}

function validateInputFilesForIlluminaQC()
{
	if (document.getElementById("idInputReadTypeQCIllumina").value == "Paired") 
	{
		var idFirstFileSelect = document.getElementById("idFirstFileSelectIllumina").innerHTML;
		var idSecondFileSelect = document.getElementById("idSecondFileSelectIllumina").innerHTML;
		
		if (idFirstFileSelect == "No file selected" || idSecondFileSelect == "No file selected")
		{
			if(idFirstFileSelect == "No file selected")
			{
				var element = document.getElementById("idFirstFileSelectIlluminaDiv");
				element.onblur = warningForFileOrFolders("idFirstFileSelectIllumina", "idFirstFileSelectIlluminaDiv", "No file selected");

				return false;
			}
			else
			{
				removeAddedClass("idFirstFileSelectIlluminaDiv");
			}
			
			if (idSecondFileSelect == "No file selected")
			{
				var element = document.getElementById("idSecondFileSelectIlluminaDiv");
				element.onblur = warningForFileOrFolders("idSecondFileSelectIllumina", "idSecondFileSelectIlluminaDiv", "No file selected");

				return false;
			}
			else
			{
				removeAddedClass("idSecondFileSelectIlluminaDiv");
			}
		}
		else
		{
			removeAddedClass("idFirstFileSelectIlluminaDiv");
			removeAddedClass("idSecondFileSelectIlluminaDiv");
			
			return true;
		}
	}
	else 
	{
		var idSingleFileSelectIllumina = document.getElementById("idSingleFileSelectIllumina").innerHTML;
		
		if (idSingleFileSelectIllumina == "No file selected") 
		{
			var element = document.getElementById("idSingleFileSelectIlluminaDiv");
			element.onblur = warningForFileOrFolders("idSingleFileSelectIllumina", "idSingleFileSelectIlluminaDiv", "No file selected");
			
			return false;
		}
		else
		{
			removeAddedClass("idSingleFileSelectIlluminaDiv");
			return true;
		}
	}
}

function validateInputFolderForIlluminaQC()
{
	var outputFolderVal = document.getElementById("idOutputDirIlluminaSelect").innerHTML;
	
	if (document.getElementById("idOutputDirIlluminaSelect").innerHTML == "No folder selected") 
	{
		var element = document.getElementById("idOutputDirIlluminaSelectDiv");
		element.onblur = warningForFileOrFolders("idOutputDirIlluminaSelect", "idOutputDirIlluminaSelectDiv", "No folder selected");

		return false;
	}
	else if(!outputFolderVal)
	{
		var element = document.getElementById("idOutputDirIlluminaSelectDiv");
		element.onblur = warningForFileOrFolders("idOutputDirIlluminaSelect", "idOutputDirIlluminaSelectDiv", "No folder selected");

		return false;
	}
	else
	{
		removeAddedClass("idOutputDirIlluminaSelectDiv");
		return true;
	}
}


function validateCutOffReadLen4HQ()
{
	var inputVal = document.getElementById("idlIllumina").value;
	var myDivClasses = document.getElementById("idlIllumina").classList;
	
	if(!inputVal)
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForEmptyField("parentDiv1");
		$( '#childDiv' ).show();
		
		return false;
	}
	else if(inputVal > 100)
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDiv(100, "parentDiv1", 70);
		$( '#childDiv' ).show();
		
		return true;
	}
	else
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		if (myDivClasses.contains("myErrorBorder")) 
		{
			myDivClasses.remove("myErrorBorder");
		}

		return true;
	}
}

function validatecutOffQualScore()
{
	var inputVal = document.getElementById("idsIllumina").value;
	var myDivClasses = document.getElementById("idsIllumina").classList;
	
	if(!inputVal)
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForEmptyField( "parentDiv2");
		$( '#childDiv' ).show();
		
		return false;
	}
	else if(inputVal > 40)
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDiv(40, "parentDiv2", 20);
		$( '#childDiv' ).show();
		
		return true;
	}
	else
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		if (myDivClasses.contains("myErrorBorder")) 
		{
			myDivClasses.remove("myErrorBorder");
		}
		return true;
	}
}

function validateCPUInfo()
{
	var myDivClasses = document.getElementById("parentDiv5").classList;
	var inputVal = document.getElementById("idCPUIllumina").value;
	var MinVal = 1;
	var MaxVal = parseInt( document.getElementById("idCPUFromServer").innerHTML );
	
	if(!inputVal)
	{
		myDivClasses.add("myErrorBorder");
		
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForEmptyField( "parentDiv5");
		$( '#childDiv' ).show();
		return false;
	}
	else if((inputVal < MinVal) || (inputVal > MaxVal))
	{
		myDivClasses.add("myErrorBorder");
		
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		blurFunctionForMaxAndMinLimitForCPU('idCPUIllumina', 'parentDiv5', 'idCPUFromServer', 1, 1)
		$( '#childDiv' ).show();
		
		return true;
	}
	else
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		if (myDivClasses.contains("myErrorBorder")) 
		{
			myDivClasses.remove("myErrorBorder");
		}
		
		return true;
	}
}
