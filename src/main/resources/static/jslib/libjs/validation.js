function validateCustomReportProjectName() {
	var organismName = document.getElementById("projectNameTrinity").value;
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
		alert("please fill organism name..");
	} else {
		return true;
	}

	return false;
}
function validateMinContigLength() {
	var minContigLength = document.getElementById("idMinContigLength").value;
	if (minContigLength == "") {
		alert("please fill min contig length");
	} else {
		return true;
	}

	return false;
}
function validateMinKmerCov(){

	var minContigLength = document.getElementById("idMinKmerCov").value;
	if (minContigLength == "") {
		alert("please fill min kmer cov");
	} else {
		return true;
	}

	return false;

}
function validateCpu() {
	var cpu = document.getElementById("idCPU").value;
	if (cpu == "") {
		alert("please fill CPU");
	} else {
		return true;
	}

	return false;
}
function validateMaxMemory() {
	var maxMemory = document.getElementById("idMaxMemory").valu;
	if (maxMemory == "") {
		alert("please fill Max memory");
	} else {
		return true;
	}

	return false;
}
function isNumber(evt, selection, number) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31
			&& (charCode < 48 || charCode > 57 || selection.value.length > (number - 1))) {
		return false;
	}
	/*
	 * if (selection.value.length > number) { return false; }
	 */
	return true;
}
function validateFiles() {
	var idInputReadType = document.getElementById("idInputReadType").value;
	if (idInputReadType == "Paired") {
		if (document.getElementById("idRightFileSelect").value == "") {
			alert("Please select right file");
		} else {
			if (document.getElementById("idLeftFileSelect").value == "") {
				alert("Please select left file");
			} else {
				return true;
			}
		}

	} else {
		if (document.getElementById("idSingleFileSelect").value == "") {
			alert("Please select single file");
		} else {
			return true;
		}
	}

}
// ---------------------------------------------------------------------------

function validateCustomReportOrganismName() {
	var organismName = document.getElementById("idCustomReportOrganismName").value;
	if (organismName == "") {
		alert("please fill organism name..");
	} else {
		return true;
	}

	return false;
}
function validateCustomReportScientistName() {
	var scientistName = document.getElementById("idCustomReportScientistName").value;

	if (scientistName == "") {
		alert("please fill Scientist name..");
	} else {
		return true;
	}

	return false;
}
function validateCustomReportNameOfSample() {

	var nameOfSample = document.getElementById("idCustomReportNameOfSample").value;

	if (nameOfSample == "") {
		alert("please fill sample name..");
	} else {
		return true;
	}

	return false;
}
function validateCustomReportAddress() {
	var address = document.getElementById("idCustomReportAddress").value;
	if (address == "") {
		alert("please fill address..");
	} else {
		return true;
	}

	return false;
}
function validateCustomReportSpecialization() {
	var specialization = document
			.getElementById("idCustomReportSpecialization").value;
	if (specialization == "") {
		alert("please fill organism name..");
	} else {
		return true;
	}

	return false;
}
function validateCustomReportMinContigLength() {
	var minContigLength = document
			.getElementById("idCustomReportMinContigLength").value;
	if (minContigLength == "") {
		alert("please fill Min contig length");
	} else {
		return true;
	}

	return false;
}
function validateCustomReportCpu() {
	var cpu = document.getElementById("idCustomReportCPU").value;
	if (cpu == "") {
		alert("please fill CPU");
	} else {
		return true;
	}

	return false;
}
function validateCustomReportMaxMemory() {
	var maxMemory = document.getElementById("idCustomReportMaxMemory").valu;
	if (maxMemory == "") {
		alert("please fill Max memory");
	} else {
		return true;
	}

	return false;
}

function validateCustomClusterReportFiles() {

	if (document.getElementById("idCustomReportOutputClusterFileSelect").innerHTML == "No file selected") {
		alert("Please select input cluster file");
	} else {
		return true;
	}

}
function validateCustomReportFiles() {

	if (document.getElementById("idCustomReportOutputFileSelect").innerHTML == "No file selected") {
		alert("Please select input trinity file");
	} else {
		return true;
	}

}
function validateOptionalFiles() {
	if (hybridTrinity()) {
		if (document.getElementById("idOptionalSelectFile1").value == "") {
			alert("please select long read file");
			return false;

		} else if(refferenceTrinity()) {
			if (document.getElementById("idrbtnWithFA").checked) {
				var flag = (validateFiles() && validateGenomeGuidedFiles());
				return flag;
			} else {
				return validateGenomeGuidedFiles();
			}
		}else if(validateFiles()){
			return true;
		}
	} else if (refferenceTrinity()) {
		if (document.getElementById("idrbtnWithFA").checked) {
			var flag = (validateFiles() && validateGenomeGuidedFiles());
			return flag;
		} else {
			return validateGenomeGuidedFiles();
		}
	}else{
		return validateFiles();
	}
}
function validateProjectNameTrinity(){
	
	if (document.getElementById("idProjectName").value == "") {
		alert("Please give project Name");
		return false;
	} else {
		return true;
	}
}
function validateOutputTrinity(){
	if (document.getElementById("idTrinityOutputDir").innerHTML == "No folder selected") {
		alert("Please select output folder");
		return false;
	} else {
		return true;
	}
}
function hybridTrinity() {
	return document.getElementById("idOptionalSelect1").checked;
}
function refferenceTrinity() {
	
	var flag = (document.getElementById("idOptionalSelect2").checked);
	return flag;
}

function refferenceAndHybridTrinity() {
	var flag = (refferenceTrinity() && hybridTrinity()&& document.getElementById("idrbtnWithFA").checked);
	return flag;
}
function validateGenomeGuidedFiles() {
	if (document.getElementById("idOptionalSelectFile2").value == "") {
		alert("Please select the Genome Guided file.");
		return false;
	} else {
		if (document.getElementById("idMaxIntron").value == "") {
			alert("Please insert the max intron.");
			return false;
		} else {
			return true;
		}
	}
	// return true;
}
