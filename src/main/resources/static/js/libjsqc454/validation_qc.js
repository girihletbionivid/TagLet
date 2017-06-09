function validateOldDivElements()
{
	if(		validateSampleName() &&
			validateExtraTextFile() &&
			validateInputFilesQC()
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
			validateSampleName() &&
			validateExtraTextFile() &&
			validateInputFilesQC() &&
			validatehomoPolyLen() &&
			validateCPUInfo() &&
			validateCutOffReadLen4HQ() &&
			validatecutOffQualScore() &&
			validatehomoPolyLen() &&
			validateminLen() &&
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

function validateSampleName()
{
	if (document.getElementById("idSampleName454Qc").value == "")
	{
		warningForEmptyField("idSampleName454Qc", "idSampleNm");
		return false;
	}
	else
	{
		return true;
	}
}
function validateExtraTextFile()
{
	if (document.getElementById("idAdaptorLibrariesValue").value == "file")
	{
		if (document.getElementById("idSingleFileSelect").innerHTML == "No file selected")
		{
			var element = document.getElementById("idForAdapterFileDiv");
			element.onblur = warningForFileOrFolders("idSingleFileSelect", "idForAdapterFileDiv", "No file selected");
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

function validateInputFilesQC() 
{
	if(document.getElementById("idInputReadTypeQCIllumina").value == "Single")
	{
		var idFastaFileSelect = document.getElementById("idFastaFileSelect").innerHTML;
		var idQualityFileSelect = document.getElementById("idQualityFileSelect").innerHTML;

		if (idFastaFileSelect == "No file selected")
		{
			var element = document.getElementById("idForInputFileDiv");
			element.onblur = warningForFileOrFolders("idFastaFileSelect", "idForInputFileDiv", "No file selected");

			return false;
		} 
		else
		{
			removeAddedClass("idForInputFileDiv");
			
			if (idQualityFileSelect == "No file selected") 
			{
				var element = document.getElementById("idForQualityFileDiv");
				element.onblur = warningForFileOrFolders("idQualityFileSelect", "idForQualityFileDiv", "No file selected");

				return false;
			}
			else 
			{
				removeAddedClass("idForQualityFileDiv");
				return true
			}
		}
	}
	else
	{
		var idFirstFastaFileSelect = document.getElementById("idFirstFastaFileSelect").innerHTML;
		var idFirstQualityFileSelect = document.getElementById("idFirstQualityFileSelect").innerHTML;
		var idSecondFastaFileSelect = document.getElementById("idSecondFastaFileSelect").innerHTML;
		var idSecondQualityFileSelect = document.getElementById("idSecondQualityFileSelect").innerHTML;
		
		if(idFirstFastaFileSelect == "No file selected" || idFirstQualityFileSelect == "No file selected")
		{
			if (idFirstFastaFileSelect == "No file selected")
			{
				var element = document.getElementById("idForFirstInputFileDiv");
				element.onblur = warningForFileOrFolders("idFirstFastaFileSelect", "idForFirstInputFileDiv", "No file selected");

				return false;
			} 
			else
			{
				removeAddedClass("idForFirstInputFileDiv");
				
				if (idFirstQualityFileSelect == "No file selected") 
				{
					var element = document.getElementById("idForFirstQualityFileDiv");
					element.onblur = warningForFileOrFolders("idFirstQualityFileSelect", "idForFirstQualityFileDiv", "No file selected");

					return false;
				}
				else 
				{
					removeAddedClass("idForFirstQualityFileDiv");
					return true
				}
			}
		}
		else
		{
			removeAddedClass("idForFirstQualityFileDiv");
			
			if (idSecondFastaFileSelect == "No file selected")
			{
				var element = document.getElementById("idForSecondInputFileDiv");
				element.onblur = warningForFileOrFolders("idSecondFastaFileSelect", "idForSecondInputFileDiv", "No file selected");

				return false;
			} 
			else
			{
				removeAddedClass("idForSecondInputFileDiv");
				
				if (idSecondQualityFileSelect == "No file selected") 
				{
					var element = document.getElementById("idForSecondQualityFileDiv");
					element.onblur = warningForFileOrFolders("idSecondQualityFileSelect", "idForSecondQualityFileDiv", "No file selected");

					return false;
				}
				else 
				{
					removeAddedClass("idForSecondQualityFileDiv");
					return true
				}
			}
		}
	}
}

function validateOutputFolder() 
{
	var idFastaFileSelect = document.getElementById("idOutputDirSelect").innerHTML;
	
	if (document.getElementById("idOutputDirSelect").innerHTML == "No folder selected") 
	{
		var element = document.getElementById("idForOutputFolderDiv");
		element.onblur = warningForFileOrFolders("idOutputDirSelect", "idForOutputFolderDiv", "No folder selected");

		return false;
	}
	else if(!idFastaFileSelect)
	{
		var element = document.getElementById("idForOutputFolderDiv");
		element.onblur = warningForFileOrFolders("idOutputDirSelect", "idForOutputFolderDiv", "No folder selected");

		return false;
	}
	else
	{
		removeAddedClass("idForOutputFolderDiv");
		return true;
	}
}

function validateCutOffReadLen4HQ()
{
	var inputVal = document.getElementById("idl").value;
	var myDivClasses = document.getElementById("idl").classList;
	
	if(!inputVal)
	{
		myDivClasses.add("myErrorBorder");
		
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForEmptyField( "parentDiv1");
		$( '#childDiv' ).show();
		
		return false;
	}
	else if(inputVal > 100)
	{
		myDivClasses.add("myErrorBorder");
			
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDiv(100, "parentDiv1", 70);
		$( '#childDiv' ).show();
		
//		formData.append("l", "70");
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
//		formData.append("l", document.getElementById("idl").value);
		return true;
	}
}

function validatecutOffQualScore()
{
	var inputVal = document.getElementById("ids").value;
	var myDivClasses = document.getElementById("ids").classList;
	
	if(!inputVal)
	{
		myDivClasses.add("myErrorBorder");
		
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
		myDivClasses.add("myErrorBorder");
			
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDiv(40, "parentDiv2", 20);
		$( '#childDiv' ).show();
//		formData.append("s", "20");
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
//		formData.append("s", document.getElementById("ids").value);
		return true;
	}
}

function validatehomoPolyLen()
{
	var myDivClasses = document.getElementById("idn").classList;
	
	if(flagForNSelectionChanged == true)
	{
		var inputVal = document.getElementById("idn").value;
		
		if(!inputVal)
		{
			myDivClasses.add("myErrorBorder");
			
			if(document.getElementById("childDiv") != null)
			{
				var element = document.getElementById("childDiv");
				element.parentNode.removeChild(element);
			}
			
			creatNewDivForEmptyField( "parentDiv3");
			$( '#childDiv' ).show();
			return false;
		}
		else if(inputVal < 1)
		{
			myDivClasses.add("myErrorBorder");
			
			if(document.getElementById("childDiv") != null)
			{
				var element = document.getElementById("childDiv");
				element.parentNode.removeChild(element);
			}
			
			creatNewDivForMinVal(1, "parentDiv3", 1);
			$( '#childDiv' ).show();
			
//			formData.append("n", "1");
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
//			formData.append("n", document.getElementById("idn").value);
			return true;
		}
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
		
//		formData.append("n", "0");
		return true;
	}
}

function validateminLen()
{
	var myDivClasses = document.getElementById("idm").classList;
	
	if(flagForFSelectionChanged == true)
	{	
		var inputVal = document.getElementById("idm").value;
		
		if(!inputVal)
		{
			myDivClasses.add("myErrorBorder");
			
			if(document.getElementById("childDiv") != null)
			{
				var element = document.getElementById("childDiv");
				element.parentNode.removeChild(element);
			}
			
			creatNewDivForEmptyField( "parentDiv4");
			$( '#childDiv' ).show();
			return false;
		}
		else if(inputVal < 1)
		{
			myDivClasses.add("myErrorBorder");
			
			if(document.getElementById("childDiv") != null)
			{
				var element = document.getElementById("childDiv");
				element.parentNode.removeChild(element);
			}
			
			creatNewDivForMinVal(50, "parentDiv4", 100);
			$( '#childDiv' ).show();
			
//			formData.append("m", "100");
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
//			formData.append("m", document.getElementById("idm").value);
			return true;
		}
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
//		formData.append("m", "0");
		return true;
	}
}

function validateCPUInfo()
{
	var myDivClasses = document.getElementById("idCPU").classList;
	var inputVal = document.getElementById("idCPU").value;
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
		
		blurFunctionForMaxAndMinLimitForCPU('idCPU', 'parentDiv5', 'idCPUFromServer', 1, 1)
		$( '#childDiv' ).show();
		
//		formData.append("cpu", "1");
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
//		formData.append("cpu", document.getElementById("idCPU").value);
		
		return true;
	}
}














