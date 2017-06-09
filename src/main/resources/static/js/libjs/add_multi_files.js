var indexOfLeftAndRightFiles = 0;
var jsonArrayForIndexLocation = {};
var indexOfReplacement;
var typeOfReplacemnent;
function addMultipleFilesTrinity() {

	if (validateFiles()) {
		var idInputReadType = document.getElementById("idInputReadType").value;
		var listFile = {};
		var arrayOfFiles = [];
		if (idInputReadType == "Paired") {

			var rightFileValue = document.getElementById("idRightFileSelect").innerHTML;
			document.getElementById("idRightFileSelect").innerHTML = "No file selected";
			var leftFileValue = document.getElementById("idLeftFileSelect").innerHTML;
			document.getElementById("idLeftFileSelect").innerHTML = "No file selected";

			document.getElementById("divClassDivTrinityMulti").innerHTML = document
					.getElementById("divClassDivTrinityMulti").innerHTML
					+ "<div class='fragment classPairedFile' id='outerDivIdTrinity"
					+ indexOfLeftAndRightFiles
					+ "'>"
					+ "<span class='bgColorForCloseButton' onclick='deleteDivAndData(this,"
					+ indexOfLeftAndRightFiles
					+ ")'>CLOSE</span>"
					
					+ "<div class='form-group' id='selectLeftFileFormGroup'>"
					+ "<label class='control-label col-sm-4  col-lg-4 textClass required' "
					+ "for='pwd' id='idlableLeftRead'>Select left / R1 file:</label>"
					+ "<div class='col-sm-6 col-lg-6'>"
					+ "<input type='button' class='col-sm-4  col-lg-4  btn-file '"
					+ "data-toggle='modal' data-target='#selectFile'"
					+ "placeholder='Select right file' id='idLeftFileBrowse'"
					+ "onclick=\"replaceMiddleElementPairedLeft('left','"
					+ indexOfLeftAndRightFiles
					+ "','idLeftFileSelect"
					+ indexOfLeftAndRightFiles
					+ "','fasta,fasta_filtered');\""
					+ "accept='.fa' value='BROWSE...'></input>"
					+ "<div id='idLeftFileSelect"
					+ indexOfLeftAndRightFiles
					+ "' "
					+ "class='col-sm-6 col-lg-6 text-left'>"
					+ leftFileValue + "</div>" + "</div></div>" 
					
					+ "<div class='form-group' id='selectRightFileFormGroup'>"
					+ "<label class='control-label col-sm-4  col-lg-4 textClass required'"
					+ "for='pwd' id='lableRightFileSelect'>Select right / R2 file</label>"
					+ "<div class='col-sm-6 col-lg-6'>"
					+ "<input type='button' class='col-sm-4  col-lg-4  btn-file '"
					+ "data-toggle='modal' data-target='#selectFile'"
					+ "placeholder='Select right file' id='idRightFileBrowse'"
					+ "onclick=\"replaceMiddleElementPairedRight('right','"
					+ indexOfLeftAndRightFiles
					+ "','idRightFileSelect"
					+ indexOfLeftAndRightFiles
					+ "','fasta,fasta_filtered');\""
					+ "accept='.fa' value='BROWSE...'></input>"
					+ "<div id='idRightFileSelect"
					+ indexOfLeftAndRightFiles
					+ "' class='col-sm-6 col-lg-6 text-left'>"
					+ rightFileValue
					+ "</div>"
					+ "</div>"
					+ "</div>"+
							"<br/>";
			listFile["right"] = jarray[rightFileValue];
			listFile["left"] = jarray[leftFileValue];
			arrayOfFiles.push(listFile);
			jsonArrayForIndexLocation[indexOfLeftAndRightFiles] = arrayOfFiles;
		} else {
			var singleFileValue = document.getElementById("idSingleFileSelect").innerHTML;
			document.getElementById("idSingleFileSelect").innerHTML = "No file selected";
			document.getElementById("divClassDivTrinityMulti").innerHTML = document
					.getElementById("divClassDivTrinityMulti").innerHTML
					+ "<div class='fragment classSingleFile ' id='outerDivIdTrinity"
					+ indexOfLeftAndRightFiles
					+ "'>"
					+ "<span  class='bgColorForCloseButton' onclick='deleteDivAndData(this,"
					+ indexOfLeftAndRightFiles
					+ ")'>CLOSE</span>"
					+

					"<div class='form-group' id='selectSingleFileFormGroup"+indexOfLeftAndRightFiles+"'>"
					+ "<label class='control-label col-sm-4  col-lg-4 textClass required' "
					+ "for='pwd' id='lableSingleFileSelect'>Select single file</label>"
					+ "<div class='col-sm-6 col-lg-6'>"
					+ "<input type='button' class='col-sm-4  col-lg-4  btn-file '"
					+ "data-toggle='modal' data-target='#selectFile'"
					+ "placeholder='Select single file' id='idSingleFileBrowse'"
					+ "onclick=\"replaceMiddleElementSingle('single','idSingleFileSelect"
					+ indexOfLeftAndRightFiles
					+ "','fasta,fasta_filtered');\""
					+ "accept='.fa' value='BROWSE...'></input>"
					+ "<div id='idSingleFileSelect"
					+ indexOfLeftAndRightFiles
					+ "' "
					+ "class='col-sm-6 col-lg-6 text-left'>"
					+ singleFileValue + "</div>" + "</div>" + "</div><br/>";
			listFile["single"] = jarray[singleFileValue];
			arrayOfFiles.push(listFile);
			jsonArrayForIndexLocation[indexOfLeftAndRightFiles] = arrayOfFiles;
		}

		indexOfLeftAndRightFiles++;
	}
}
function deleteDivAndData(elementToDelete, indexOfDivToDelete) {
	elementToDelete.parentNode.parentNode
			.removeChild(elementToDelete.parentNode);
	delete jsonArrayForIndexLocation[indexOfDivToDelete];
}
function replaceMiddleElementPairedLeft(typeOfReplacemnentFiles,
		indexOfLeftAndRightFiles, elementId, extension) {
	getAllDirectory(elementId, extension);
	indexOfReplacement = indexOfLeftAndRightFiles;
	typeOfReplacemnent = typeOfReplacemnentFiles
}
function replaceMiddleElementPairedRight(typeOfReplacemnentFiles,
		indexOfLeftAndRightFiles, elementId, extension) {
	getAllDirectory(elementId, extension);
	indexOfReplacement = indexOfLeftAndRightFiles;
	typeOfReplacemnent = typeOfReplacemnentFiles
}
function replaceMiddleElementSingle(typeOfReplacemnentFiles,
		indexOfLeftAndRightFiles, elementId, extension) {
	getAllDirectory(elementId, extension);
	indexOfReplacement = indexOfLeftAndRightFiles;
	typeOfReplacemnent = typeOfReplacemnentFiles
}
