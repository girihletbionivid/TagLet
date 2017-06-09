
$(document).ready(function()
{
	$('[data-toggle="tooltip"]').tooltip();
	$('#firstProgForm').trigger("reset");

  	$("#idInputSelectFile").html("No file selected");
  	$("#outputPrefix").val("");
	$("#idProjectName").val("");
	$("#idScientistName").val("");
	$("#idSpecialization").val("");
	$("#idAddress").val("");
	
	/*$("#idProjectName").val() = "";*/
	/*$("#idSelectOutputFolder") .html() = "No folder selected;*/
	
	document.getElementById("idInputSelectFile").innerHTML  = "No file selected";
	document.getElementById("idSelectOutputFolder").innerHTML  = "No folder selected";
	
	$("#divShowCustomReportPdf").hide();
	$("#divHideBackgroundInfo").hide();
	$("#illuminaQcCmd").hide();
	
//	$("#idResultTable").hide();
//	$("#chartdiv").hide();
});

function onloadForBody()
{
	$('[data-toggle="tooltip"]').tooltip();
	$('#firstProgForm').trigger("reset");
	
	document.getElementById("idProjectName").value = "";
	document.getElementById("outputPrefix").value = "";
	
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
	
	document.getElementById("idInputSelectFile").innerHTML  = "No file selected";
	document.getElementById("idSelectOutputFolder").innerHTML  = "No folder selected";
	$("#divShowCustomReportPdf").hide();
	$("#divHideBackgroundInfo").hide();
	$("#illuminaQcCmd").hide();
	
//	$("#repeatSeqLengthDiv").hide();
}

function onChangeOptionRepeatFilteration(element)
{
	if($(element).val() == "1")
	{
		$('#repeatSeqLengthDiv').show();
	}
	else
	{
		$('#repeatSeqLengthDiv').hide();
	}
}

function drawPieChart(data)
{
	$("#chartdiv").show();
	
	var chart = AmCharts.makeChart( "chartdiv", {
		  "type": "pie",
		  "theme": "light",
		  "dataProvider": [ {
		    "field": "Percent Count A",
		    "count": (data[0] * 100)
		  }, {
			"field": "Percent Count T",
		    "count": (data[1] * 100)
		  }, {
			"field": "Percent Count G",
		    "count": (data[2] * 100)
		  }, {
			"field": "Percent Count C",
		    "count": (data[3] * 100)
		  }, {
			"field": "Percent Count N",
		    "count": (data[4] * 100)
		  }],
		  "valueField": "count",
		  "titleField": "field",
		   "balloon":{
		   "fixedPosition":true
		  },
		  "export": {
			    "enabled": true,
			    "menu": [{
			      "class": "export-main",
			      "format": "PRINT"
			    }]
			 }
		} );
}
function setVlueInTable(fieldNm, value)
{
	$("#firstProgDiv").hide();
	$("#divShowCustomReportPdf").hide();
	$("#idResultTable").show();
	
	document.getElementById("tableBodyResultSummary").innerHTML = "";

	for (var i = 0; i < fieldNm.length; i++) 
	{
		var fieldNameToPrint = fieldNm[i];
		var ValueToPrint = value[i];
		
		var tableBody = document.getElementById("tableBodyResultSummary");
		var trTable = document.createElement("tr");
		
		var tdTable = document.createElement("td");
		tdTable.setAttribute("style", "font-size: 18px;"); 
		tdTable.innerHTML = i + 1;
		trTable.appendChild(tdTable);
		
		var tdTable = document.createElement("td");
		tdTable.setAttribute("style", "font-size: 18px;"); 
		tdTable.innerHTML = "" + fieldNameToPrint;
		trTable.appendChild(tdTable);
		
		var tdTable = document.createElement("td");
		tdTable.setAttribute("style", "font-size: 18px;"); 
		tdTable.innerHTML = "" + ValueToPrint;
		trTable.appendChild(tdTable);
		
		tableBody.appendChild(trTable);
	}
	var varArg =  [ parseFloat(value[19]),parseFloat(value[20]),parseFloat(value[21]),parseFloat(value[22]),parseFloat(value[25])];
	drawPieChart(varArg);
}

function onchangeProcessMode(element)
{
	if($(element).val() == "mRNA")
	{
		$('#idForTruncationDiv').fadeOut();
	}
	else
	{
		$('#idForTruncationDiv').fadeIn();
	}
}

function validateProjectName() 
{
	if (document.getElementById("idProjectName").value == "") 
	{
		alert("Please Provide Process Name, Its Mandatory Field...!!");
//		warningForEmptyField("idProjectName");
		return false;
	} 
	else 
	{
		return true;
	}
}
function validateScientistName() 
{
	if (document.getElementById("idScientistName").value == "") 
	{
		alert("Please Provide Scientist Name, Its Mandatory Field...!!");
//		warningForEmptyField("idScientistName");
		return false;
	} 
	else 
	{
		return true;
	}
}
function validateSpecialization() 
{
	if (document.getElementById("idSpecialization").value == "") 
	{
		alert("Please Provide Specialization, Its Mandatory Field...!!");
//		warningForEmptyField("idSpecialization");
		return false;
	} 
	else 
	{
		return true;
	}
}
function validateAddress() 
{
	if (document.getElementById("idAddress").value == "") 
	{
		alert("Please Provide Address, Its Mandatory Field...!!");
//		warningForEmptyField("idAddress");
		return false;
	} 
	else 
	{
		return true;
	}
}
function validateOutputPrefix() 
{
	if (document.getElementById("outputPrefix").value == "") 
	{
		alert("Please Provide Output Prefix, Its Mandatory Field...!!");
//		warningForEmptyField("outputPrefix");
		return false;
	} 
	else 
	{
		return true;
	}
}

function validateInputFile() 
{
	if ($("#idInputSelectFile").html() == "No file selected") 
	{
		alert("Please Provide Input File, Its Mandatory Field...!!");
//		warningForFileOrFolders("idInputSelectFile");
		return false;
	} 
	else 
	{
		return true;
	}
}

function validateOutputFolder() 
{
	if ($("#idSelectOutputFolder").html() == "No Folder selected") 
	{
		alert("Please Provide Output Folder, Its Mandatory Field...!!");
//		warningForFileOrFolders("idInputSelectFile");
		return false;
	} 
	else 
	{
		return true;
	}
}

function validateRepeatLength()
{
	if((document.getElementById("repeatFilter").value == "1") && (document.getElementById("repeatLength").value == ""))
	{
		alert("Please Provide Repeat Sequence Length, Its Mandatory Field...!!");
//		warningForEmptyField("repeatLength");
		return false;
	}
	else
	{
		return true;
	}
}

function showPdfCustomQc(path) 
{
	document.getElementById("iframeCustomReport").setAttribute("src", path);
	$("#customReportforms").fadeOut('slow');
	$("#divShowCustomReportPdf").fadeIn('slow');
	setHeightToThis(document.getElementById("iframeCustomReport"));
}
