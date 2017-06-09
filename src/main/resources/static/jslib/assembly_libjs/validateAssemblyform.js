function validateFilesAssebly() {

	if ($("#idInputReadTypeAligmentAndEstimate").val() == "paired") {
		if ($("#idRightFileAligmentSelect").html() == "No file selected") {
			alert("Please select right file")
			return false;
		} else {
			if ($("#idLeftFileAligmentSelect").html() == "No file selected") {
				alert("Please select left file")
				return false;
			} else {
				return true;
			}
		}
	} else {
		if ($("#idSingleFileAligmentSelect").html() == "No file selected") {
			alert("Please select single file")
			return false;
		} else {
			return true;
		}
	}
}
function validateTranscriptFile() {
	if ($("#idTranscriptFastaFileSelect").html() == "No file selected") {
		alert("Please select transcipt file")
		return false;
	} else {
		return true;
	}

}
function validateOutputDirectory() {
	if ($("#idOutDirectoryAligmentSelect").html() == "No directory selected") {
		alert("Please select output directory")
		return false;
	} else {
		return true;
	}

}
function validateProjectNameAssembly(){
	if ( $("#idProjectNameAssembly").val() == "") {
		alert("Please provide project name")
		return false;
	} else {
		return true;
	}
}
function validateSampleName() {
	if ($("#idAlignmentSampleName").val() == "") {
		alert("Please provide sample name")
		return false;
	} else {
		return true;
	}

}
function validateClusteringOutput() {
	if ($("#idClusteringOutPutFileName").val() == "") {
		alert("Please provide cluster output file name")
		return false;
	} else {
		return true;
	}

}