function validateInputQCFileReport() {
	var idFastaFileSelect = document
			.getElementById("idOutputDirctorySelectIllumina").innerHTML;
	if (idFastaFileSelect == "No folder selected") {
		alert("please select output directory");
		return false;
	} else {
		return true;
	}

}
function validateProjectName() {
	var organismName = document.getElementById("idProjectNameQC").value;
	if (organismName == "") {
		alert("please fill project name..");
	} else {
		return true;
	}

	return false;
}
function validateOrganismName() {
	var organismName = document.getElementById("idOrganismName").value;
	if (organismName == "") {
		alert("please fill organism name..");
	} else {
		return true;
	}

	return false;
}
function validateScientistName() {
	var scientistName = document.getElementById("idScientistName").value;

	if (scientistName == "") {
		alert("please fill Scientist name..");
	} else {
		return true;
	}

	return false;
}
function validateNameOfSample() {

	var nameOfSample = document.getElementById("idNameOfSample").value;

	if (nameOfSample == "") {
		alert("please fill sample name..");
	} else {
		return true;
	}

	return false;
}
function validateAddress() {
	var address = document.getElementById("idAddress").value;
	if (address == "") {
		alert("please fill address..");
	} else {
		return true;
	}

	return false;
}
function validateSpecialization() {
	var specialization = document.getElementById("idSpecialization").value;
	if (specialization == "") {
		alert("please fill specialization..");
	} else {
		return true;
	}

	return false;
}
// report validation====================================>

function validateInputfolderNameQC() {
	var idInputfolderName = document.getElementById("idInputfolderName").value;
	if (idInputfolderName == "") {
		document.getElementById("idInputfolderName").value = "454QC_Filtered_files";
	}
	return true;
}
function validateInputProjectName() {
	var idProjectNameIllumina = document
			.getElementById("idProjectNameIllumina").value;
	if (idProjectNameIllumina == "") {
		alert("please enter the project name");
		return false;
	} else {
		return true;
	}

}
function validateInputfolderNameQCIllumina() {
	var idInputfolderNameIllumina = document
			.getElementById("idInputfolderNameIllumina").value;
	if (idInputfolderNameIllumina == "") {
		document.getElementById("idInputfolderNameIllumina").value = "IlluQC_Filtered_files";
	}
	return true;
}
function validateInputFilesQC() {
	var idFastaFileSelect = document.getElementById("idFastaFileSelect").innerHTML;
	var idQualityFileSelect = document.getElementById("idQualityFileSelect").innerHTML;
	if (idFastaFileSelect == "No file selected") {
		alert("please select fasta file");
		return false;
	} else {
		if (idQualityFileSelect == "No file selected") {
			alert("please select Quality file");
			return false;
		} else {
			return true
		}
	}

}
function validateExtraTextFile() {

	if (document.getElementById("idAdaptorLibrariesValue").value == "file") {
		// alert("Dvsco"+document.getElementById("idAdaptorLibrariesValue").value);
		if (document.getElementById("idSingleFileSelect").innerHTML == "No file selected") {
			alert("Please select single file");
			return false;
		} else {
			return true;
		}
	} else {
		return true;
	}
}
function validateFilesQc() {
	if (inputOfUserQc.length > 0) {
		return true;
	} else {
		if(validateInputFilesQC()){
			return true;
		}
		
	}
}
function validateProjectNameFolder() {
	if (document.getElementById("idProjectName454Qc").value == "") {
		alert("Please fill project name");
		return false;
	} else {
		return true;
	}
}
function validateOutputFolder() {
	if (document.getElementById("idOutputDirSelect").innerHTML == "No folder selected") {
		alert("Please select output folder");
		return false;
	} else {
		return true;
	}
}
function validateOutputIlluminaFolder() {
	if (document.getElementById("idOutputDirIlluminaSelect").innerHTML == "No folder selected") {
		alert("Please select output folder");
		return false;
	} else {
		return true;
	}
}
function validateFilesQcIllumina() {
	if (inputOfUser.length > 0) {
		return true;
	} else {
		if (validateInputFilesQCIllumina()) {
			return true;
		} 

	}
}
function validateExtraTextFileIllumina() {

	if (document.getElementById("idAdaptorLibrariesValueIllumina").value == "file") {
		// alert("Dvsco"+document.getElementById("idAdaptorLibrariesValue").value);
		if (document.getElementById("idSingleFileSelectIllumina").innerHTML == "No file selected") {
			alert("Please select single file");
			return false;
		} else {
			return true;
		}
	} else {
		return true;
	}
}
function validateInputFilesQCIllumina() {
	if (document.getElementById("idInputReadTypeQCIllumina").value == "Paired") {
		var idFastaFileSelect = document
				.getElementById("idFirstFileSelectIllumina").innerHTML;
		var idQualityFileSelect = document
				.getElementById("idSecondFileSelectIllumina").innerHTML;
		if (idFastaFileSelect == "No file selected") {
			alert("please select first file");
			return false;
		} else {
			if (idQualityFileSelect == "No file selected") {
				alert("please select second file");
				return false;
			} else {
				if (document.getElementById("idAdaptorLibrariesValueIllumina").value == "file") {
					if (document
							.getElementById("idSingleFileAdaptorSelectIllumina").innerHTML == "No file selected") {
						alert("Please select single adaptor file");
						return false;
					} else {
						return true;
					}
				} else {
					return true;
				}
			}
		}

	} else {
		var idSingleFileSelectIllumina = document
				.getElementById("idSingleFileSelectIllumina").innerHTML;
		if (idSingleFileSelectIllumina == "No file selected") {
			alert("please select single file");
			return false;
		} else {

			if (document.getElementById("idAdaptorLibrariesValueIllumina").value == "file") {
				if (document
						.getElementById("idSingleFileAdaptorSelectIllumina").innerHTML == "No file selected") {
					alert("Please select single adaptor file");
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
		}
	}

}
