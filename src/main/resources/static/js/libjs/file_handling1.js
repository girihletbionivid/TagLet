var responseJson;
var globleElementId;
var myflag = false;
var createdFileNameSelection="";
var k = 0;
var jarray = {};
var jarrayLoad = {};
var globleExtention;
var currentDirr;
function getAllDirectory(elementId, extension) {
	var elementThis = document.getElementById("aTagHomeId");
	while (elementThis.nextElementSibling != null) {
		elementThis.nextElementSibling.remove();
	}
	var createFolderBtn = document.getElementById("createFolderBtn");
	createFolderBtn.setAttribute("onclick", "createFolder('"
			+ localStorage.userDir + "');");
	document.getElementById("aTagHomeId").setAttribute("onclick",
			"getAllDirectory('" + elementId + "','" + extension + "');");
	/*
	 * var x = document.getElementsByClassName("changedColorClass");
	 * $(x[0]).toggleClass("changedColorClass");
	 */
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
				// alert("You haveTTTT=>" + xhr.responseText);
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
				// showOnlyDirectoryDseq(responseJson, "md", null);
			} else {
				alert("" + response.message);
			}
		}
	};
}

function getAllDirectoryNew(directory, elementId, flagForNav, elementThis) {

	var createFolderBtn = document.getElementById("createFolderBtn");
	createFolderBtn.setAttribute("onclick", "createFolder('" + directory
			+ "');");
	// elementbe.setAttribute("ondblclick", "");
	var x = document.getElementsByClassName("changedColorClass");
	$(x[0]).toggleClass("changedColorClass");
	var y = document.getElementsByClassName("changedFontClass");
	$(y[0]).toggleClass("changedFontClass");
	// $(elementbe).toggleClass("changedFontClass");
	// currentDirr = elementbe;
	// document.getElementById("valueSelectedDseq").value = "";

	var xhr = new XMLHttpRequest();
	xhr.open('POST', URL_GET_SUB_DIRECTORY, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onload = function(e) {
	};
	var data = "extensions=" + globleExtention + "&" + "userName=" + directory;
	xhr.send(data);
	xhr.onreadystatechange = function() {
		JSON.stringify(xhr.responseText)
		var response = eval("(" + xhr.responseText + ")");
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				if (flagForNav == false) {
					// alert("dram="+directory+"dram="+elementId
					// +"dram="+flagForNav);
					document.getElementById("headerNavigatorId").innerHTML = document
							.getElementById("headerNavigatorId").innerHTML
							+ "<span  onclick=\"getAllDirectoryNew('"
							+ directory
							+ "','"
							+ elementId
							+ "','"
							+ flagForNav
							+ "',this);\"><a href='#'>"
							+ directory.replace(/^.*(\\|\/|\:)/, '')
							+ "</a>"
							+ "<span class='glyphicon glyphicon-chevron-right'></span>"
							+ "</div></span>";
				} else {
					while (elementThis.nextElementSibling != null) {
						elementThis.nextElementSibling.remove();
					}
				}

				// alert("You haveTTTT=>" + xhr.responseText);
				var list = "" + response.list[0];
				var j = 0;
				responseJson = toEval(list);
				document.getElementById("openBtnDialog")
						.setAttribute("onclick",
								"setSelectedValue(" + globleElementId + ");")
				// document.getElementById("divSubCategorydmd").innerHTML="";
				if (globleExtention != "diretory")
					showDirectory(responseJson, "md", null, false);
				else
					showDirectory(responseJson, "md", null, true);
				// showOnlyDirectoryDseq(responseJson, directory, null);
			} else {
				alert("" + response.message);
			}
		}
	};
}
function showDirectory(json, elementId, elementbe, flag) {
	jarrayLoad = {};
	document.getElementById("divSubCategoryd" + elementId).innerHTML = "";
	var element = document.getElementById("divSubCategoryd" + elementId);
	element.setAttribute("onclick", "");
	if (elementbe != null) {
		elementbe.setAttribute("onclick", "toggleFileSelect(" + elementId
				+ ",this);");
		$(elementbe).toggleClass(
				"glyphicon glyphicon-folder-close changedColorClass");
		$(elementbe).toggleClass(
				"glyphicon glyphicon-folder-open changedColorClass");
	}

	// alert("=====>"+json.file["pagefile.sys"]);

	var jsonFile = json.file;
	var jsonFolder = json.folder;

	if (jsonFolder != undefined) {
		var keyFolders = Object.keys(jsonFolder);
		for (var i = 0; i < keyFolders.length; i++) {
			/* if (isDir(json["" + keyFolders[i]])) { */

			addMainCategory(keyFolders[i], jsonFolder["" + keyFolders[i]],
					element, flag);
			jarrayLoad[keyFolders[i]] = jsonFolder["" + keyFolders[i]];

			/* } */
		}
	}
	if (jsonFile != undefined) {
		var keyFiles = Object.keys(jsonFile);
		for (var i = 0; i < keyFiles.length; i++) {
			/* if (isFile(json["" + keys[i]])) { */
			var pathvalue = toString("" + jsonFile["" + keyFiles[i]]);
			addSubCategory(keyFiles[i], pathvalue, element);

			jarrayLoad[keyFiles[i]] = jsonFile["" + keyFiles[i]];
			/* } */
		}
	}
	if(createdFileNameSelection!="")
	document.getElementById(createdFileNameSelection).scrollIntoView();
}

function showDirectoryFalse(json, elementId, elementbe, value) {
	jarrayLoad = {};
	document.getElementById("divSubCategoryd" + elementId).innerHTML = "";
	var element = document.getElementById("divSubCategoryd" + elementId);
	element.setAttribute("onclick", "");
	if (elementbe != null) {
		elementbe.setAttribute("onclick", "toggleFileSelect(" + elementId
				+ ",this);");
		$(elementbe).toggleClass(
				"glyphicon glyphicon-folder-close changedColorClass");
		$(elementbe).toggleClass(
				"glyphicon glyphicon-folder-open changedColorClass");
	}

	// alert("=====>"+json.file["pagefile.sys"]);
	var classColor="classWhiteColor";
	var jsonFile = json.file;
	var jsonFolder = json.folder;

	if (jsonFolder != undefined) {
		var keyFolders = Object.keys(jsonFolder);
		for (var i = 0; i < keyFolders.length; i++) {
			/* if (isDir(json["" + keyFolders[i]])) { */

			addMainCategoryFalse(keyFolders[i], jsonFolder["" + keyFolders[i]],
					element, value,classColor);
			jarrayLoad[keyFolders[i]] = jsonFolder["" + keyFolders[i]];

			/* } */
		}
	}
	if (jsonFile != undefined) {
		var keyFiles = Object.keys(jsonFile);
		for (var i = 0; i < keyFiles.length; i++) {
			/* if (isFile(json["" + keys[i]])) { */
			var pathvalue = toString("" + jsonFile["" + keyFiles[i]]);
			addSubCategory(keyFiles[i], pathvalue, element);

			jarrayLoad[keyFiles[i]] = jsonFile["" + keyFiles[i]];
			/* } */
		}
	}
	if(createdFileNameSelection!="")
	document.getElementById(createdFileNameSelection).scrollIntoView();
}



function showDirectoryTrue(json, elementId, elementbe, value) {
	jarrayLoad = {};
	document.getElementById("divSubCategoryd" + elementId).innerHTML = "";
	var element = document.getElementById("divSubCategoryd" + elementId);
	element.setAttribute("onclick", "");
	if (elementbe != null) {
		elementbe.setAttribute("onclick", "toggleFileSelect(" + elementId
				+ ",this);");
		$(elementbe).toggleClass(
				"glyphicon glyphicon-folder-close changedColorClass");
		$(elementbe).toggleClass(
				"glyphicon glyphicon-folder-open changedColorClass");
	}

	// alert("=====>"+json.file["pagefile.sys"]);

	var jsonFile = json.file;
	var jsonFolder = json.folder;
var classColor="classBlackColor";
	if (jsonFolder != undefined) {
		var keyFolders = Object.keys(jsonFolder);
		for (var i = 0; i < keyFolders.length; i++) {
			/* if (isDir(json["" + keyFolders[i]])) { */
if(classColor=="classWhiteColor"){//classBlackColor
	addMainCategoryTrue(keyFolders[i], jsonFolder["" + keyFolders[i]],
			element, value,classColor);
	classColor="classWhiteColor";
}else{
	addMainCategoryTrue(keyFolders[i], jsonFolder["" + keyFolders[i]],
			element, value,classColor);
	classColor="classWhiteColor";
}
			/*addMainCategoryTrue(keyFolders[i], jsonFolder["" + keyFolders[i]],
					element, value);*/
			
			jarrayLoad[keyFolders[i]] = jsonFolder["" + keyFolders[i]];

			/* } */
		}
	}
	if (jsonFile != undefined) {
		var keyFiles = Object.keys(jsonFile);
		for (var i = 0; i < keyFiles.length; i++) {
			/* if (isFile(json["" + keys[i]])) { */
			var pathvalue = toString("" + jsonFile["" + keyFiles[i]]);
			addSubCategory(keyFiles[i], pathvalue, element);

			jarrayLoad[keyFiles[i]] = jsonFile["" + keyFiles[i]];
			/* } */
		}
	}
	
	document.getElementById(createdFileNameSelection).scrollIntoView();
	
}
function isFile(pathname) {
	return pathname.toString().split('/').pop().split('.').length > 1;
}

function isDir(pathname) {
	return !isFile(pathname);
}

function toggleFileSelect(elementId, element) {
	/*
	 * var x=document.getElementsByClassName("changedColorClass");
	 * $(x[0]).toggleClass("changedColorClass");
	 * $(element).parent().toggleClass("changedColorClass");
	 */
	var y = document.getElementsByClassName("changedFontClass");
	$(y[0]).toggleClass("changedFontClass");
	$(element).toggleClass("changedFontClass");

	// getAllDirectoryNew(elementId,"fastq",directory);
	$("#divSubCategoryd" + elementId).slideToggle();
	$(element).toggleClass("glyphicon glyphicon-folder-close");
	$(element).toggleClass("glyphicon glyphicon-folder-open");
}
function addMainCategoryFalse(mainCategory, jsonMain, element, value,colorClass) {
	if (value==""+mainCategory) {
		element.innerHTML = element.innerHTML
				+ "<div class=' "
				+ k
				+ "'><div class='col-sm-1'></div><div class=' col-sm-11   classWhiteColor '> "
				+ "<a href='#' class=' glyphicon glyphicon glyphicon-folder-close iconSmallClass colorTextFile' id='spanSubCategory"
				+ k + "' onClick='selectedFile(" + toString(mainCategory)
				+ ",this);' ondblClick='getAllDirectoryNew("
				+ toString(jsonMain) + "," + k + ",false,this);' value='" + k
				+ "'> " + mainCategory + "</a><div id='divSubCategoryd" + k
				+ "' ></div></div>";
		createdFileNameSelection="spanSubCategory"+ k;
		document.getElementById("valueSelectedDseq").value=""+mainCategory;
	/*	document.getElementById("valueSelectedDseq").value=""+mainCategory;
		var farmElement=document.getElementById("divSubCategorydmd");
		farmElement.getElementById("spanSubCategory"+ k).scrollIntoView();*/
	} else {
		element.innerHTML = element.innerHTML
		+ "<div class=' "
		+ k
		+ "'><div class='col-sm-1'></div><div class=' col-sm-11   classWhiteColor  '> "
		+ "<a href='#' class=' glyphicon glyphicon glyphicon-folder-close iconSmallClass colorTextFile' id='spanSubCategory"
		+ k + "' onClick='selectedFile(" + toString(mainCategory)
		+ ",this);' ondblClick='getAllDirectoryNew("
		+ toString(jsonMain) + "," + k + ",false,this);' value='" + k
		+ "'> " + mainCategory + "</a><div id='divSubCategoryd" + k
		+ "' ></div></div>";
	}

	k++;
}
function addMainCategoryTrue(mainCategory, jsonMain, element, value,colorClass) {
	if (value==""+mainCategory) {
		element.innerHTML = element.innerHTML
				+ "<div class=' "
				+ k
				+ "'><div class='col-sm-1'></div><div class=' col-sm-11  classWhiteColor '> "
				+ "<a href='#' class=' glyphicon glyphicon glyphicon-folder-close iconSmallClass colorTextFile' id='spanSubCategory"
				+ k + "' onClick='selectedFile(" + toString(mainCategory)
				+ ",this);' ondblClick='getAllDirectoryNew("
				+ toString(jsonMain) + "," + k + ",false,this);' value='" + k
				+ "'> " + mainCategory + "</a><div id='divSubCategoryd" + k
				+ "' ></div></div>";
		createdFileNameSelection="spanSubCategory"+ k;
		document.getElementById("valueSelectedDseq").value=""+mainCategory;
	/*	document.getElementById("valueSelectedDseq").value=""+mainCategory;
		var farmElement=document.getElementById("divSubCategorydmd");
		farmElement.getElementById("spanSubCategory"+ k).scrollIntoView();*/
	} else {
		element.innerHTML = element.innerHTML
		+ "<div class=' "
		+ k
		+ "'><div class='col-sm-1'></div><div class=' col-sm-11  classWhiteColor '> "
		+ "<a href='#' class=' glyphicon glyphicon glyphicon-folder-close iconSmallClass colorTextFile' id='spanSubCategory"
		+ k + "' onClick='selectedFile(" + toString(mainCategory)
		+ ",this);' ondblClick='getAllDirectoryNew("
		+ toString(jsonMain) + "," + k + ",false,this);' value='" + k
		+ "'> " + mainCategory + "</a><div id='divSubCategoryd" + k
		+ "' ></div></div>";
	}

	k++;
}
function addMainCategory(mainCategory, jsonMain, element, flag) {
	if (flag) {
		element.innerHTML = element.innerHTML
				+ "<div class=' "
				+ k
				+ "'><div class='col-sm-1'></div><div class=' col-sm-11  classWhiteColor '> "
				+ "<a href='#' class=' glyphicon glyphicon glyphicon-folder-close iconSmallClass colorTextFile' id='spanSubCategory"
				+ k + "' onClick='selectedFile(" + toString(mainCategory)
				+ ",this);' ondblClick='getAllDirectoryNew("
				+ toString(jsonMain) + "," + k + ",false,this);' value='" + k
				+ "'> " + mainCategory + "</a><div id='divSubCategoryd" + k
				+ "' ></div></div>";
	} else {
		element.innerHTML = element.innerHTML
				+ "<div class=' "
				+ k
				+ "'><div class='col-sm-1'></div><div class=' col-sm-11  classWhiteColor '> "
				+ "<a href='#' class=' glyphicon glyphicon glyphicon-folder-close iconSmallClass colorTextFile' id='spanSubCategory"
				+ k + "'  onClick='getAllDirectoryNew(" + toString(jsonMain)
				+ "," + k + ",false,this);' value='" + k + "'>  "
				+ mainCategory + "</a><div id='divSubCategoryd" + k
				+ "' ></div></div>";
	}

	k++;
}
function addSubCategory(subCategory, pathValue, element) {
	element.innerHTML = element.innerHTML
			+ "<div class=' "
			+ k
			+ "' ><div class='col-sm-1'></div><div class=' col-sm-11  classWhiteColor '> "
			+ "<a href='#' class='glyphicon glyphicon-file iconSmallClass colorTextFile' onClick='selectedFile("
			+ toString(subCategory) + ",this);' >" + subCategory
			+ "</a></div>";

}
function selectedFile(subCategory, element) {
	/*
	 * if(!$()element.hasClass("changedColorClass")){
	 * element.setAttribute("class","control-label col-sm-10 textClassFile
	 * colorTextFile onHoverChangeColorClass changedColorClass");
	 * 
	 * }else{ element.setAttribute("class","control-label col-sm-10
	 * textClassFile colorTextFile onHoverChangeColorClass"); }
	 */
	/*
	 * var y=document.getElementsByClassName("changedFontClass");
	 * $(y[0]).toggleClass("changedFontClass");
	 * $(element).parent().parent().parent().toggleClass("changedFontClass");
	 * var y=document.getElementsByClassName("changedFontClass");
	 */
	/*
	 * $(element).parent().parent().toggleClass("glyphicon
	 * glyphicon-folder-open");
	 */

	var x = document.getElementsByClassName("changedColorClass");
	$(x[0]).toggleClass("changedColorClass");
	$(element).parent().toggleClass("changedColorClass");
	// $("#selectFile").modal('hide');
	// document.getElementById(globleElementId).innerHTML = subCategory;
	jarray["" + subCategory] = jarrayLoad[subCategory];
	document.getElementById("valueSelectedDseq").value = "" + subCategory;

}
/*
 * function selectedFile(subCategory) { $("#selectFile").modal('hide');
 * document.getElementById(globleElementId).innerHTML = subCategory; }
 */

function setSelectedValue(element) {
	if (document.getElementById("valueSelectedDseq").value != "") {
		jarray["" + document.getElementById("valueSelectedDseq").value] = jarrayLoad[document.getElementById("valueSelectedDseq").value];
		element.innerHTML = ""
				+ document.getElementById("valueSelectedDseq").value;
		document.getElementById("closeFileModel").click();

		if (element.id == "idPrefixFileTophatSelect") {
			document.getElementById("idPrefixNameTophat").value = ""
					+ document.getElementById("valueSelectedDseq").value;
		} else if (element.id == "idDatabaseFileSelect") {
			var y = document.getElementById("valueSelectedDseq").value.replace(
					/^.*(\\|\/|\:)/, '');
			document.getElementById("idDatabaseName").value = ""
					+ y.substr(0, y.lastIndexOf('.'));
		}
	} else {
		alert("Please select file");
	}

}
function toggleClassfiles(element) {
	$(element).toggleClass("glyphicon glyphicon-folder-open");
	$(element).toggleClass("glyphicon glyphicon-folder-close");

	$("#bowtie1OutputFormDiv").slideToggle("slow");
}
function createFolder(thisDirectory) {
	// alert("hey ya====."+jarray.length);
	/* var x = document.getElementsByClassName("changedFontClass"); */
	if (document.getElementById("inputTextDiv") != undefined) {
		document.getElementById("inputTextDiv").parentNode.parentNode.remove();
	}
	// alert(x[0].id.replace ( /[^\d.]/g, ''
	// )+":D==m>"+x[0].innerHTML+":D"+jarray[x[0].innerHTML]);
	// alert("vlu--"+vlu);
	var mainDiv;
	/* if (x[0] == undefined) { */

	mainDiv = document.getElementById("divSubCategorydmd");
	var tempDiv = document.createElement("div");
	tempDiv.setAttribute("class", "form-group 1");
	tempDiv.innerHTML = ""
			+ "<div class='col-sm-1'></div>"
			+ "<label class='control-label col-sm-11 col-lg-11 textClassFile colorTextFile '>"
			+ "<input type='text' class='col-lg-11' placeholder='new_folder' id='inputTextDiv'  onkeydown='return validateKey(event);'  onkeypress='myOnkeyPressEventMain(\""
			+ localStorage.userName + "\",this,\"" + thisDirectory
			+ "\",event);'  onblur='myOnkeyPressEventMain2(\""
			+ localStorage.userName + "\",this,\"" + thisDirectory
			+ "\",event);' " +
					"/>" + "<div id='divSubCategoryd" + k + "'></div>"
			+ "</label>";
	if (document.getElementById("inputTextDiv") == undefined) {
		mainDiv.appendChild(tempDiv);
		document.getElementById("inputTextDiv").focus();
	}
	/*
	 * } else { var vlu = x[0].id.replace(/[^\d.]/g, ''); mainDiv =
	 * document.getElementById("divSubCategoryd" + vlu); var tempDiv =
	 * document.createElement("div"); tempDiv.setAttribute("class", "form-group
	 * 1"); tempDiv.innerHTML = "" + "<div class='col-sm-1'></div>" + "<label
	 * class='control-label col-sm-11 col-lg-11 textClassFile colorTextFile '>" + "<input
	 * type='text' class='col-lg-11' placeholder='new_folder' id='inputTextDiv'
	 * onkeypress='myOnkeyPressEvent(\"" + jarrayLoad[x[0].innerHTML.trim()] +
	 * "\",this,\"" + thisDirectory + "\",event);'/>" + "<div
	 * id='divSubCategoryd" + k + "'></div>" + "</label>"; if
	 * (document.getElementById("inputTextDiv") == undefined) {
	 * mainDiv.appendChild(tempDiv);
	 * document.getElementById("inputTextDiv").focus(); } }
	 */
	// var mainDiv = document.getElementById("divSubCategoryd" + vlu);
}
function myOnkeyPressEventMain(userName, thisElement, element, event) {

	if (event.keyCode == 13) {
		//wsCreateFile(userName, thisElement, element);
		thisElement.blur();
	} else {
		return false;
	}
}
function myOnkeyPressEventMain2(userName, thisElement, element, event) {
		wsCreateFile(userName, thisElement, element);
		
		
}
function validateKey(event) {
	if (event.keyCode === 32) {
		return false;
	}
}
function myOnkeyPressEvent(userName, thisElement, element, event) {

	if (event.keyCode == 13) {
		wsCreateFile(userName, thisElement, element);
	} else {
		return false;
	}
}

$(document).keypress(function(e) {
	if (e.keyCode == 13) {
		// alert("D");
		return false;
	}
});
$('#selectFile').on('show.bs.modal', function() {
	$('#selectFile').toggleClass('blur');
})

$('#selectFile').on('hide.bs.modal', function() {
	$('#selectFile').toggleClass('blur');
})

function wsCreateFileMain(value, element, elementId) {
	// alert(element.value+"my my"+value);
	if (element.value != "") {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', URL_CREATE_SUB_MAIN_DIRECTORY, true);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type",
				"application/x-www-form-urlencoded");
		xhr.onload = function(e) {
		};
		var data = "extensions=" + globleExtention + "&" + "userName=" + value
				+ "&" + "fileName=" + elementId + "/" + element.value;
		xhr.send(data);
		xhr.onreadystatechange = function() {
			JSON.stringify(xhr.responseText)
			var response = eval("(" + xhr.responseText + ")");
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					// alert("You haveTTTT=>" + xhr.responseText);
					var list = "" + response.list[0];
					var j = 0;
					responseJson = toEval(list);

					/*
					 * document.getElementById("openBtnDialog").setAttribute(
					 * "onclick", "setSelectedValue(" + $(element).parent().id +
					 * ");")
					 */

					document.getElementById("divSubCategorydmd").innerHTML = "";
					if (globleExtention != "diretory")
						showDirectory(responseJson, "md", null, false);
					else
						showDirectory(responseJson, "md", null, true);
					// showOnlyDirectoryDseq(responseJson, "md", null);
				} else {
					alert("" + response.message);
				}
			}
		};
	} else {
		window.setTimeout(function() {
			document.getElementById("inputTextDiv").focus();
			alert("Please provide file Name");
		}, 0);

	}
}
function wsCreateFile(value, element, elementId) {
	// alert(element.value+"my my"+value);
	if (element.value != "") {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', URL_CREATE_SUB_DIRECTORY, true);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type",
				"application/x-www-form-urlencoded");
		xhr.onload = function(e) {
		};
		var data = "extensions=" + globleExtention + "&" + "userName=" + value
				+ "&" + "fileName=" + elementId + "/" + element.value;
		xhr.send(data);
		xhr.onreadystatechange = function() {
			JSON.stringify(xhr.responseText)
			var response = eval("(" + xhr.responseText + ")");
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					// alert("You haveTTTT=>" + xhr.responseText);
					var list = "" + response.list[0];
					var j = 0;
					responseJson = toEval(list);
					/*
					 * document.getElementById("openBtnDialog").setAttribute(
					 * "onclick", "setSelectedValue(" + $(element).parent().id +
					 * ");")
					 */
					document.getElementById("divSubCategorydmd").innerHTML = "";
				
					if (globleExtention != "diretory"){
						showDirectoryFalse(responseJson, "md", null, element.value);
						
					}else{
				showDirectoryTrue(responseJson, "md", null, element.value);}
					// showOnlyDirectoryDseq(responseJson, "md", null);
				} else {
					alert("" + response.message);
				}
			}
		};
	} else {

		document.getElementById("inputTextDiv").focus();
		alert("Please provide file Name");

	}
}

//Changes made by Nitin

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
	/*
	 * var x = document.getElementsByClassName("changedColorClass");
	 * $(x[0]).toggleClass("changedColorClass");
	 */
	
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
				// alert("You haveTTTT=>" + xhr.responseText);
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
				// showOnlyDirectoryDseq(responseJson, "md", null);
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
	/*
	 * var x = document.getElementsByClassName("changedColorClass");
	 * $(x[0]).toggleClass("changedColorClass");
	 */
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
				// alert("You haveTTTT=>" + xhr.responseText);
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
				// showOnlyDirectoryDseq(responseJson, "md", null);
			} else {
				alert("" + response.message);
			}
		}
	};
}

