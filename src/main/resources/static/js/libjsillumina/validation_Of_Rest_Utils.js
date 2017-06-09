function validateNewCreatedDivElements(element)
{
	if(validateSampleNameNewCreatedDiv(element) &&
	validateAdaptorFileNewCreatedDiv(element) &&
	validateInputFilesForNewCreatedDiv(element))
	{
		return true;
	}
	else
	{
		return false;
	}
}
function validateNewCreatedDivElementsOnSubmitButton(element)
{
	if(		validateInputProjectName() &&
			validateCutOffReadLen4HQ() &&
			validatecutOffQualScore() &&
			validateCPUInfo() &&
			validateSampleNameNewCreatedDiv(element) &&
			validateAdaptorFileNewCreatedDiv(element) &&
			validateInputFilesForNewCreatedDiv(element)
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
function validateSampleNameNewCreatedDiv(varValue)
{
	if (document.getElementById("idSampleNameIlluminaQc" + varValue).value == "")
	{
		warningForEmptyField("idSampleNameIlluminaQc" + varValue, "idSampleNm" + varValue);
		return false;
	}
	else
	{
		return true;
	}
}

function validateAdaptorFileNewCreatedDiv(varValue)
{
	if (document.getElementById("idAdaptorLibrariesValueIllumina" + varValue).value == "file")
	{
		if (document.getElementById("idSingleFileAdaptorSelectIllumina" + varValue).innerHTML == "No file selected")
		{
			var element = document.getElementById("idForAdapterFileDiv" + varValue);
			element.onblur = warningForFileOrFolders("idSingleFileAdaptorSelectIllumina" + varValue, "idForAdapterFileDiv" + varValue, "No file selected");
			return false;
		}
		else 
		{
			removeAddedClass("idForAdapterFileDiv" + varValue);
			return true;
		}
	} 
	else 
	{
		return true;
	}
}

/*function validateOutputFolderNameNewCreatedDiv(varValue) 
{
	if (document.getElementById("idOutputDirIlluminaSelect" + varValue).innerHTML == "No folder selected") 
	{
		var element = document.getElementById("idOutputDirIlluminaSelectDiv" + varValue);
		element.onblur = warningForFileOrFolders("idOutputDirIlluminaSelect" + varValue, "idOutputDirIlluminaSelectDiv" + varValue, "No folder selected");

		return false;
	}
	else
	{
		removeAddedClass("idOutputDirIlluminaSelectDiv" + varValue);
		return true;
	}
}*/

function validateInputFilesForNewCreatedDiv(varValue)
{
	if (document.getElementById("idInputReadTypeQCIllumina" + varValue).value == "Paired") 
	{
		var idFirstFileSelect = document.getElementById("idFirstFileSelectIllumina" + varValue).innerHTML;
		var idSecondFileSelect = document.getElementById("idSecondFileSelectIllumina" + varValue).innerHTML;
		if (idFirstFileSelect == " No file selected" || idSecondFileSelect == "No file selected")
		{
			if(idFirstFileSelect == " No file selected")
			{
				var element = document.getElementById("idFirstFileSelectIlluminaDiv" + varValue);
				element.onblur = warningForFileOrFolders("idFirstFileSelectIllumina" + varValue, "idFirstFileSelectIlluminaDiv" + varValue, " No file selected");

				return false;
			}
			else
			{
				removeAddedClass("idFirstFileSelectIlluminaDiv" + varValue);
			}
			
			if (idSecondFileSelect == "No file selected")
			{
				var element = document.getElementById("idSecondFileSelectIlluminaDiv" + varValue);
				element.onblur = warningForFileOrFolders("idSecondFileSelectIllumina" + varValue, "idSecondFileSelectIlluminaDiv" + varValue, "No file selected");

				return false;
			}
			else
			{
				removeAddedClass("idSecondFileSelectIlluminaDiv" + varValue);
			}
		}
		else
		{
			removeAddedClass("idFirstFileSelectIlluminaDiv" + varValue);
			removeAddedClass("idSecondFileSelectIlluminaDiv" + varValue);
			
			return true;
		}
	}
	else 
	{
		if (document.getElementById("idSingleFileSelectIllumina" + varValue).innerHTML == "No file selected") 
		{
			var element = document.getElementById("idSingleFileSelectIlluminaDiv" + varValue);
			element.onblur = warningForFileOrFolders("idSingleFileSelectIllumina" + varValue, "idSingleFileSelectIlluminaDiv" + varValue, "No file selected");
			
			return false;
		}
		else
		{
			removeAddedClass("idSingleFileSelectIlluminaDiv" + varValue);
			return true;
		}
	}
}
