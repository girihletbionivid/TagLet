function validateOldDivElements()
{
	if(		validateNameOfSample() &&
			validateOutputFolder()
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
	if(		validateProjectName() &&
			validateOrganismName() &&
			validateSeqApplication() &&
			validateScientistName() &&
			validateSpecialization() &&
			validateAddress() &&
			validatePlatform() &&
			validateNameOfSample() &&
			validateOutputFolder()
		)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function validateOutputFolder() 
{
	var outputFolderVal = document.getElementById("idOutputDirctorySelectIllumina").innerHTML;
	
	if (document.getElementById("idOutputDirctorySelectIllumina").innerHTML == "No folder selected") 
	{
		var element = document.getElementById("idSelectOutputFolderDiv");
		element.onblur = warningForFileOrFolders("idOutputDirctorySelectIllumina", "idSelectOutputFolderDiv", "No folder selected");

		return false;
	}
	else if(!outputFolderVal)
	{
		var element = document.getElementById("idSelectOutputFolderDiv");
		element.onblur = warningForFileOrFolders("idOutputDirctorySelectIllumina", "idSelectOutputFolderDiv", "No folder selected");

		return false;
	}
	else 
	{
		removeAddedClass("idSelectOutputFolderDiv");
		return true;
	}
}
function validateProjectName()
{
	if (document.getElementById("idProjectNameQC").value == "")
	{
		warningForEmptyField("idProjectNameQC", "idPrjNm");
		return false;
	}
	else
	{
		return true;
	}
}

function validateOrganismName() 
{
	var organismName = document.getElementById("idOrganismName").value;
	if (organismName == "") 
	{
		warningForEmptyField("idOrganismName", "orgName");
		return false;
	}
	else 
	{
		removeAddedClass("orgName");
		return true;
	}

	return false;
}

function validateSeqApplication()
{
	if(document.getElementById("idTypeOfInputSelect").value == "Other")
	{
		var seqApplication = document.getElementById("idForOtherSeqApp").value;
		if(!seqApplication)
		{
			warningForEmptyField("idForOtherSeqApp", "otherDiv");
			return false;
		}
		else
		{
			removeAddedClass("otherDiv");
			return true;
		}
	}
	else
	{
		return true;
	}
}

function validateScientistName()
{
	var scientistName = document.getElementById("idScientistName").value;

	if (scientistName == "") 
	{
		warningForEmptyField("idScientistName", "sciName");
		return false;
	} 
	else 
	{
		removeAddedClass("sciName");
		return true;
	}

	return false;
}

function validateNameOfSample() 
{

	var nameOfSample = document.getElementById("idSampleName454Qc").value;

	if (nameOfSample == "") 
	{
		warningForEmptyField("idSampleName454Qc", "idSampleNm");
		return false;
	} 
	else 
	{
		removeAddedClass("idSampleNm");
		return true;
	}

	return false;
}

function validateAddress() 
{
	var address = document.getElementById("idAddress").value;
	if (address == "") 
	{
		warningForEmptyField("idAddress", "address");
		return false;
	} 
	else 
	{
		removeAddedClass("address");
		return true;
	}

	return false;
}

function validateSpecialization() 
{
	var specialization = document.getElementById("idSpecialization").value;
	if (specialization == "") 
	{
		warningForEmptyField("idSpecialization", "affiliation");
		return false;
	} 
	else 
	{
		removeAddedClass("affiliation");
		return true;
	}

	return false;
}
function validatePlatform()
{
	var specialization = document.getElementById("idPlateform").value;
	if (specialization == "") 
	{
		warningForEmptyField("idPlateform", "platForm");
		return false;
	} 
	else 
	{
		removeAddedClass("platForm");
		return true;
	}

	return false;
}