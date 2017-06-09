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
