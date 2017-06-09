function validateNewCreatedDivElementsFor454(element)
{
	if(validateSampleNameNewCreatedDiv(element) &&
	validateAdaptorFileNewCreatedDiv(element) &&
	validateInputFilesNewCreatedDiv(element)
	)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function validateNewCreatedDivElementsFor454OnSubmitButton(element)
{
	if(		validateProjectName() &&
			validateSampleName() &&
			validateExtraTextFile() &&
			validateInputFilesQC() &&
			validateCPUInfo() &&
			validateCutOffReadLen4HQ() &&
			validatecutOffQualScore() &&
			validatehomoPolyLen() &&
			validateminLen() &&
			validateOutputFolder() &&
			validateSampleNameNewCreatedDiv(element) &&
			validateAdaptorFileNewCreatedDiv(element) &&
			validateInputFilesNewCreatedDiv(element)
	)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function validateProjectName()
{
	if (document.getElementById("idProjectName454Qc").value == "")
	{
		warningForEmptyField("idProjectName454Qc", "idPrjNm");
		return false;
	}
	else
	{
		return true;
	}
}

function validateInputFilesNewCreatedDiv(varValue) 
{
	if(document.getElementById("idInputReadTypeQCIllumina").value == "Single")
	{
		var idFastaFileSelect = document.getElementById("idFastaFileSelect" + varValue).innerHTML;
		var idQualityFileSelect = document.getElementById("idQualityFileSelect" + varValue).innerHTML;
		
		if (idFastaFileSelect == "No file selected")
		{
			var element = document.getElementById("idForInputFileDiv" + varValue);
			element.onblur = warningForFileOrFolders("idFastaFileSelect" + varValue, "idForInputFileDiv" + varValue, "No file selected");

			return false;
		} 
		else
		{
			removeAddedClass("idForInputFileDiv" + varValue);
			
			if (idQualityFileSelect == "No file selected") 
			{
				var element = document.getElementById("idForQualityFileDiv" + varValue);
				element.onblur = warningForFileOrFolders("idQualityFileSelect" + varValue, "idForQualityFileDiv" + varValue, "No file selected");

				return false;
			}
			else 
			{
				removeAddedClass("idForQualityFileDiv" + varValue);
				return true
			}
		}
	}
	else
	{
		var idFirstFastaFileSelect = document.getElementById("idFirstFastaFileSelect" + varValue).innerHTML;
		var idFirstQualityFileSelect = document.getElementById("idFirstQualityFileSelect" + varValue).innerHTML;
		var idSecondFastaFileSelect = document.getElementById("idSecondFastaFileSelect" + varValue).innerHTML;
		var idSecondQualityFileSelect = document.getElementById("idSecondQualityFileSelect" + varValue).innerHTML;
		
		if(idFirstFastaFileSelect == "No file selected" || idFirstQualityFileSelect == "No file selected")
		{
			if (idFirstFastaFileSelect == "No file selected")
			{
				var element = document.getElementById("idForFirstInputFileDiv" + varValue);
				element.onblur = warningForFileOrFolders("idFirstFastaFileSelect" + varValue, "idForFirstInputFileDiv" + varValue, "No file selected");

				return false;
			} 
			else
			{
				removeAddedClass("idForFirstInputFileDiv" + varValue);
				
				if (idFirstQualityFileSelect == "No file selected") 
				{
					var element = document.getElementById("idForFirstQualityFileDiv" + varValue);
					element.onblur = warningForFileOrFolders("idFirstQualityFileSelect" + varValue, "idForFirstQualityFileDiv" + varValue, "No file selected");

					return false;
				}
				else 
				{
					removeAddedClass("idForFirstQualityFileDiv" + varValue);
					return true
				}
			}
		}
		else
		{
			removeAddedClass("idForFirstQualityFileDiv" + varValue);
			
			if (idSecondFastaFileSelect == "No file selected")
			{
				var element = document.getElementById("idForSecondInputFileDiv" + varValue);
				element.onblur = warningForFileOrFolders("idSecondFastaFileSelect" + varValue, "idForSecondInputFileDiv" + varValue, "No file selected");

				return false;
			} 
			else
			{
				removeAddedClass("idForSecondInputFileDiv" + varValue);
				
				if (idSecondQualityFileSelect == "No file selected") 
				{
					var element = document.getElementById("idForSecondQualityFileDiv" + varValue);
					element.onblur = warningForFileOrFolders("idSecondQualityFileSelect" + varValue, "idForSecondQualityFileDiv" + varValue, "No file selected");

					return false;
				}
				else 
				{
					removeAddedClass("idForSecondQualityFileDiv" + varValue);
					return true
				}
			}
		}
	}
}

function validateQulityFileNewCreatedDiv(varValue)
{
	var idQualityFileSelect = document.getElementById("idQualityFileSelect" + varValue).innerHTML;
	
	if (idQualityFileSelect == "No file selected") 
	{
		var element = document.getElementById("idForQualityFileDiv" + varValue);
		element.onblur = warningForFileOrFolders("idQualityFileSelect" + varValue, "idForQualityFileDiv" + varValue, "No file selected");

		return false;
	}
	else 
	{
		removeAddedClass("idForQualityFileDiv" + varValue);
		return true
	}
}

function validateSampleNameNewCreatedDiv(varValue)
{
	if (document.getElementById("idSampleName454Qc" + varValue).value == "")
	{
		warningForEmptyField("idSampleName454Qc" + varValue, "idSampleNm" + varValue);
		return false;
	}
	else
	{
		return true;
	}
}

function validateAdaptorFileNewCreatedDiv(varValue)
{
	if (document.getElementById("idAdaptorLibrariesValue" + varValue).value == "file")
	{
		if (document.getElementById("idSingleFileSelect" + varValue).innerHTML == "No file selected")
		{
			var element = document.getElementById("idForAdapterFileDiv" + varValue);
			element.onblur = warningForFileOrFolders("idSingleFileSelect" + varValue, "idForAdapterFileDiv" + varValue, "No file selected");
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
	var idFastaFileSelect = document.getElementById("idOutputDirSelect" + varValue).innerHTML;
	
	if (document.getElementById("idOutputDirSelect" + varValue).innerHTML == "No folder selected") 
	{
		var element = document.getElementById("idForOutputFolderDiv" + varValue);
		element.onblur = warningForFileOrFolders("idOutputDirSelect" + varValue, "idForOutputFolderDiv" + varValue, "No folder selected");

		return false;
	}
	else
	{
		removeAddedClass("idForOutputFolderDiv" + varValue);
		return true;
	}
}*/


