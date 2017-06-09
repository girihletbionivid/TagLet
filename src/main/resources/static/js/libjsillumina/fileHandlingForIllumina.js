var responseJson;
var globleElementId;
var myflag = false;
var createdFileNameSelection="";
var k = 0;
var jarray = {};
var jarrayLoad = {};
var globleExtention;
var currentDirr;

var numberOfDiv;
var idxOfElement;

function getAllDirectoryOnRecall(elementId, extension, divNumber, indexOfElement ) 
{
	getAllDirectory(elementId, extension);
	
	numberOfDiv = divNumber;
	idxOfElement = indexOfElement;
	/*getFilesForNewCreatedDivOnRecall( divNumber );
	arrOfFileList[ divNumber ] = listOfFile;
	*/
}

// Changes made by Nitin

function getAllDirectoryForDynamicDiv(elementId) 
{
	var extension = "txt";
	var elementThis = document.getElementById("aTagHomeId");
	
	while (elementThis.nextElementSibling != null)
	{
		elementThis.nextElementSibling.remove();
	}
	
	var createFolderBtn = document.getElementById("createFolderBtn");
	createFolderBtn.setAttribute("onclick", "createFolder('"
			+ localStorage.userDir + "');");
	document.getElementById("aTagHomeId").setAttribute("onclick",
			"getAllDirectory('" + elementId + "','" + extension + "');");
	document.getElementById("valueSelectedDseq").value = "";
	globleElementId = elementId;
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', URL_GET_DIRECTORY, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onload = function(e) {
	};
	globleExtention = extension;
	var data = "extensions=" + extension + "&" + "userName="
			+ localStorage.userName;
	xhr.send(data);
	xhr.onreadystatechange = function() {
		JSON.stringify(xhr.responseText)
		var response = eval("(" + xhr.responseText + ")");
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var list = "" + response.list[0];
				var j = 0;
				responseJson = toEval(list);
				document.getElementById("openBtnDialog").setAttribute(
						"onclick", "setSelectedValue(" + elementId + ");")
				document.getElementById("divSubCategorydmd").innerHTML = "";
				if (extension != "diretory")
					showDirectory(responseJson, "md", null, false);
				else
					showDirectory(responseJson, "md", null, true);
			} else {
				alert("" + response.message);
			}
		}
	};
}

function getOnlyDirectoryForDynamicDiv(elementId) 
{
	var extension = "diretory"
	
	var elementThis = document.getElementById("aTagHomeId");
	while (elementThis.nextElementSibling != null)
	{
		elementThis.nextElementSibling.remove();
	}
	
	var createFolderBtn = document.getElementById("createFolderBtn");
	createFolderBtn.setAttribute("onclick", "createFolder('"
			+ localStorage.userDir + "');");
	document.getElementById("aTagHomeId").setAttribute("onclick",
			"getAllDirectory('" + elementId + "','" + extension + "');");
	document.getElementById("valueSelectedDseq").value = "";
	globleElementId = elementId;
	var xhr = new XMLHttpRequest();
	xhr.open('POST', URL_GET_DIRECTORY, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onload = function(e) {
	};
	globleExtention = extension;
	var data = "extensions=" + extension + "&" + "userName="
			+ localStorage.userName;
	xhr.send(data);
	xhr.onreadystatechange = function() {
		JSON.stringify(xhr.responseText)
		var response = eval("(" + xhr.responseText + ")");
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var list = "" + response.list[0];
				var j = 0;
				responseJson = toEval(list);
				document.getElementById("openBtnDialog").setAttribute(
						"onclick", "setSelectedValue(" + elementId + ");")
				document.getElementById("divSubCategorydmd").innerHTML = "";
				if (extension != "diretory")
					showDirectory(responseJson, "md", null, false);
				else
					showDirectory(responseJson, "md", null, true);
			} else {
				alert("" + response.message);
			}
		}
	};
}
