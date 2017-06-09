$(document).ready(function() {
	resetAll();
	showCustomReportForm();
	$('[data-toggle="tooltip"]').tooltip();
	$("#divShowCustomReportPdf").fadeOut('slow');
	/*$("#parentDivForOtherSeqApp").fadeOut('slow');*/
	
	document.getElementById("idScientistName").value = "";
	document.getElementById("idSpecialization").value= "";
	document.getElementById("idAddress").value = "";
	document.getElementById("idInstituteName").value= "";
	
	if(document.getElementById("myuserName").innerHTML != "")
		document.getElementById("idScientistName").value = document.getElementById("myuserName").innerHTML;
	if(document.getElementById("mydesignation").innerHTML != "")
		document.getElementById("idSpecialization").value = document.getElementById("mydesignation").innerHTML;
	if(document.getElementById("myaddress").innerHTML != "")	
		document.getElementById("idAddress").value = document.getElementById("myaddress").innerHTML;
	if(document.getElementById("myinstitute").innerHTML != "")
		document.getElementById("idInstituteName").value = document.getElementById("myinstitute").innerHTML;

	onloadFunctionLoadData();
	arrOfFileList = [];
});
function onloadFunctionLoadData() {
	if (localStorage.tagName == "illumina_report") {
		//document.getElementById("aTagQCReport").click();
		wsGetCommandAttributeByPid(localStorage.pid, localStorage.tagName);
	}
	if (localStorage.tagName == "FourFiveFourQcReport") {
		//document.getElementById("aTagQCReport").click();
		wsGetCommandAttributeByPid(localStorage.pid, localStorage.tagName);
	}
}

function showQCForm() {
	inputOfUserQc = [];
	arrOfFileList = [];
	indexQc = 0;
	resetAll();
}
function resetAll() 
{
	$("#divShowCustomReportPdf").fadeOut('slow');
	$("#reportForm").fadeIn('slow');
}


