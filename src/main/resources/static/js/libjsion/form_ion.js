function changeInputFileOptionChangeIon(element) {
	if (element.value == "Fastq") {
		$("#fastaFileSelectionDiv").fadeOut('slow');
		$("#idInputFileFastqIonSelectFromGroup").fadeIn('slow');
		
	} else {
		$("#fastaFileSelectionDiv").fadeIn('slow');
		$("#idInputFileFastqIonSelectFromGroup").fadeOut('slow');
	}
}
function changeInputRangeOptionChangeIon(element) {
	if (element.value == "-range_len") {
		var idLength = document.getElementById("idLength");
		idLength.setAttribute("value", "50-100,250-300");
	} else {
		var idLength = document.getElementById("idLength");
		idLength.setAttribute("value", "Integer");
	}
}
function isNumberOrNot(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}
function isNumberAndCommaAndDash(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 44 || charCode > 57)) {
		return false;
	} else if (charCode == 46 || charCode == 47) {
		return false;
	}
	return true;
}
$(document).ready(function() {
	$("#idIonForm").trigger('reset');
	$("#idInputFileFastqIonSelectFromGroup").fadeOut('slow');
	
	$("#advanceOptionIon").slideToggle("slow");
	$("#idIonOptionsDivSpan").toggleClass("glyphicon-collapse-up");
	$("#idIonOptionsDivSpan").toggleClass("glyphicon-collapse-down");
	$("#idIonOptionsDivSpan").toggleClass("colorCollapseClass");
	

	$("#idIonOptionsLable").click(function() {
		$("#advanceOptionIon").slideToggle("slow");
		$("#idIonOptionsDivSpan").toggleClass("glyphicon-collapse-up");
		$("#idIonOptionsDivSpan").toggleClass("glyphicon-collapse-down");
		$("#idIonOptionsDivSpan").toggleClass("colorCollapseClass");

	});
});