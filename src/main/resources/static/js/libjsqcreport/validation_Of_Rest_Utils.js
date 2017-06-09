function  validateNewCreatedDivElements(element)
{
	if(		validateSampleNameForNewCreatedDiv(element) &&
			validateOutputFolderForNewCreatedDiv(element)
	)
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
	if(		validateProjectName() &&
			validateOrganismName() &&
			validateSeqApplication() &&
			validateScientistName() &&
			validateSpecialization() &&
			validateAddress() &&
			validatePlatform() &&
			validateNameOfSample() &&
			validateOutputFolder() &&
			validateSampleNameForNewCreatedDiv(element) &&
			validateOutputFolderForNewCreatedDiv(element)
	)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function validateOutputFolderForNewCreatedDiv(varForDiv) 
{
	if (document.getElementById("idOutputDirctorySelectIllumina" + varForDiv).innerHTML == "No folder selected") 
	{
		var element = document.getElementById("idSelectOutputFolderDiv" + varForDiv);
		element.onblur = warningForFileOrFolders("idOutputDirctorySelectIllumina" + varForDiv, "idSelectOutputFolderDiv" + varForDiv, "No folder selected");

		return false;
	}
	else 
	{
		removeAddedClass("idSelectOutputFolderDiv" + varForDiv);
		return true;
	}
}
function validateSampleNameForNewCreatedDiv(varForDiv) 
{

	var nameOfSample = document.getElementById("idSampleName454Qc" + varForDiv).value;

	if (nameOfSample == "") 
	{
		warningForEmptyField("idSampleName454Qc" + varForDiv, "idSampleNm" + varForDiv);
		return false;
	} 
	else 
	{
		removeAddedClass("idSampleNm" + varForDiv);
		return true;
	}
	return false;
}