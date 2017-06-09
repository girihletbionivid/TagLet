$(document).ready(function() 
{
	localStorage.setItem("userId", document.getElementById("userId").innerHTML);
	localStorage.setItem("userName", document.getElementById("userName").innerHTML);
	localStorage.setItem("userDir", document.getElementById("userDir").innerHTML);
	localStorage.setItem("userEmail", document.getElementById("userEmail").innerHTML);
	localStorage.setItem("server", document.getElementById("myio").innerHTML);
	
	document.getElementById("idHrefqc454").setAttribute("href","../qc454?userid="+localStorage.userId);
	document.getElementById("idHrefIllumina").setAttribute("href","../qcillumina?userid="+localStorage.userId);
	
	document.getElementById("idHrefQCReport").setAttribute("href","../qcreport?userid="+localStorage.userId);
	
	document.getElementById("idHrefInstances").setAttribute("href","../ResultSummary?userid="+localStorage.userId);
//	document.getElementById("idHrefReports").setAttribute("href","../reports?userid="+localStorage.userId);
	
	document.getElementById("hRefRunModule1").setAttribute("href","../TagLet?userid="+localStorage.userId);
	
});

$('#idForSideMenuDiv').mouseover( function(){
	
	var myDivClasses = document.getElementById("idAppContainerDiv").classList;
	myDivClasses.remove("expanded");
	myDivClasses.add("expanded");
});

$('#idForSideMenuDiv').mouseout( function(){
	var myDivClasses = document.getElementById("idAppContainerDiv").classList;
	myDivClasses.remove("expanded");
});


$("#function").onmouseover = function() {
	document.getElementById('popup').style.display = 'block';
}
$("#function").onmouseout = function() {
	document.getElementById('popup').style.display = 'none';
}

