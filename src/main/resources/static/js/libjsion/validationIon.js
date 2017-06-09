function validateFastqFile(){
	if (document.getElementById("idInputFileFastqIonSelect").innerHTML == "No file selected") {
		alert("Please select fastq file");
		return false;
	} else {
		return validateOutputFolderNameIon();
	}
}
function validateFilesIon(){
	if(document.getElementById("idSequenceTypeIon").value=="Fasta"){
		return validateFastaFiles();
	}else{
	return	validateFastqFile();
	}
}
function validateFastaFiles(){
	if (document.getElementById("idInputFileFastaIonSelect").innerHTML == "No file selected") {
		alert("Please select fasta file");
		return false;
	} else {
		if (document.getElementById("idInputFileQualIonSelect").innerHTML == "No file selected") {
			alert("Please select qual file");
			return false;
		} else {
			return validateOutputFolderNameIon();
		}
	}
}

function validateOutputFolderNameIon(){
	if (document.getElementById("idIonOutputfolderName").value == "") {
		alert("Please give output folder name");
		return false;
	} else {
		return true;
	}
	
}
function validateOutfolderPathIon() {
	if (document.getElementById("idOutputFolderIonSelect").innerHTML == "No folder selected") {
		alert("Please select output folder");
		return false;
	} else {
		return true;
	}
}
function validateProjectNameIon(){
	if (document.getElementById("idProjectNameIon").value == "") {
		alert("Please fill project name");
		return false;
	} else {
		return true;
	}
}