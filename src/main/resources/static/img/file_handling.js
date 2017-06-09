var responseJson;
var globleElementId;
var myflag = false;
var k = 0;
var jarray = {};
var globleExtention;
var currentDirr;
function getAllDirectory(elementId, extension) {

	var x = document.getElementsByClassName("changedColorClass");
	$(x[0]).toggleClass("changedColorClass");
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
function createFolder(elementId) {
	// alert("hey ya====."+jarray.length);
	var x = document.getElementsByClassName("changedFontClass");
if(document.getElementById("inputTextDiv")!=undefined){
	document.getElementById("inputTextDiv").parentNode.parentNode.remove();	
}
	// alert(x[0].id.replace ( /[^\d.]/g, ''
	// )+":D==m>"+x[0].innerHTML+":D"+jarray[x[0].innerHTML]);
	// alert("vlu--"+vlu);
	var mainDiv;
	if (x[0] == undefined) {

		mainDiv = document.getElementById("divSubCategorydmd");
		var tempDiv = document.createElement("div");
		tempDiv.setAttribute("class", "form-group 1");
		tempDiv.innerHTML = ""
				+ "<div class='col-sm-1'></div>"
				+ "<label class='control-label col-sm-11 col-lg-11 textClassFile colorTextFile '>"
				+ "<input type='text' class='col-lg-11' placeholder='new_folder' id='inputTextDiv'   onblur='wsCreateFileMain(\"" + localStorage.userName
				+ "\",this,\"" + "md" + "\");'/>" + "<div id='divSubCategoryd"
				+ k + "'></div>" + "</label>";
		if (document.getElementById("inputTextDiv" + k) == undefined) {
			mainDiv.appendChild(tempDiv);
			document.getElementById("inputTextDiv" + k).focus();
		}
	} else {
		var vlu = x[0].id.replace(/[^\d.]/g, '');
		mainDiv = document.getElementById("divSubCategoryd" + vlu);
		var tempDiv = document.createElement("div");
		tempDiv.setAttribute("class", "form-group 1");
		tempDiv.innerHTML = ""
				+ "<div class='col-sm-1'></div>"
				+ "<label class='control-label col-sm-11 col-lg-11 textClassFile colorTextFile '>"
				+ "<input type='text' class='col-lg-11' placeholder='new_folder' id='inputTextDiv'   onblur='wsCreateFile(\"" + jarray[x[0].innerHTML.trim()]
				+ "\",this,\"" + elementId + "\");'/>"
				+ "<div id='divSubCategoryd" + k + "'></div>" + "</label>";
		if (document.getElementById("inputTextDiv") == undefined) {
			mainDiv.appendChild(tempDiv);
			document.getElementById("inputTextDiv").focus();
		}
	}
	// var mainDiv = document.getElementById("divSubCategoryd" + vlu);

}
$('#selectFile').on('show.bs.modal', function () {
	   $('#selectFile').toggleClass('blur');
	})

$('#selectFile').on('hide.bs.modal', function () {
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
				+ "&" + "fileName=" + value + "/" + element.value;
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

					document.getElementById("divSubCategoryd" + elementId).innerHTML = "";
					if (globleExtention != "diretory")
						showDirectory(responseJson, elementId, null, false);
					else
						showDirectory(responseJson, elementId, null, true);
					// showOnlyDirectoryDseq(responseJson, "md", null);
				} else {
					alert("" + response.message);
				}
			}
		};
	}else
	{	
		  window.setTimeout(function ()
				    {
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
				+ "&" + "fileName=" + value + "/" + element.value;
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
					document.getElementById("divSubCategoryd" + elementId).innerHTML = "";
					if (globleExtention != "diretory")
						showDirectory(responseJson, elementId, null, false);
					else
						showDirectory(responseJson, elementId, null, true);
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

function getAllDirectoryNew(directory, elementId, elementbe) {
	var createFolderBtn = document.getElementById("createFolderBtn");
	createFolderBtn.setAttribute("onclick", "createFolder(" + elementId + ");");
	elementbe.setAttribute("ondblclick", "");
	var x = document.getElementsByClassName("changedColorClass");
	$(x[0]).toggleClass("changedColorClass");
	var y = document.getElementsByClassName("changedFontClass");
	$(y[0]).toggleClass("changedFontClass");
	$(elementbe).toggleClass("changedFontClass");
	currentDirr = elementbe;
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
				// alert("You haveTTTT=>" + xhr.responseText);
				var list = "" + response.list[0];
				var j = 0;
				responseJson = toEval(list);
				document.getElementById("openBtnDialog")
						.setAttribute("onclick",
								"setSelectedValue(" + globleElementId + ");")
				// document.getElementById("divSubCategorydmd").innerHTML="";
				if (globleExtention != "diretory")
					showDirectory(responseJson, elementId, elementbe, false);
				else
					showDirectory(responseJson, elementId, elementbe, true);
				// showOnlyDirectoryDseq(responseJson, directory, null);
			} else {
				alert("" + response.message);
			}
		}
	};
}

/*
 * function showSubddDirectory(json, elementId, elementbe) { var element =
 * document.getElementById("divSubCategoryd" + elementId);
 * element.setAttribute("onclick", ""); if (elementbe != null) {
 * elementbe.setAttribute("onclick", "toggleFileSelect(" + elementId +
 * ",this);"); $(elementbe).toggleClass("glyphicon glyphicon-folder-close");
 * $(elementbe).toggleClass("glyphicon glyphicon-folder-open"); } var keys =
 * Object.keys(json); for (var i = 0; i < keys.length; i++) { if (isDir(json["" +
 * keys[i]])) { addMainCategory(keys[i], json["" + keys[i]], element);
 * jarray[keys[i]] = json["" + keys[i]]; } } for (var i = 0; i < keys.length;
 * i++) { if (isFile(json["" + keys[i]])) { var pathvalue = toString("" +
 * json["" + keys[i]]); addSubCategory(keys[i], pathvalue, element);
 * 
 * jarray[keys[i]] = json["" + keys[i]]; } } }
 */
function showDirectory(json, elementId, elementbe, flag) {
	// alert("DDDsD"+flag);
	var element = document.getElementById("divSubCategoryd" + elementId);
	element.setAttribute("onclick", "");
	if (elementbe != null) {
		elementbe.setAttribute("onclick", "toggleFileSelect(" + elementId
				+ ",this);");
		$(elementbe).toggleClass("glyphicon glyphicon-folder-close changedColorClass");
		$(elementbe).toggleClass("glyphicon glyphicon-folder-open changedColorClass");
	}
	var keys = Object.keys(json);
	for (var i = 0; i < keys.length; i++) {
		if (isDir(json["" + keys[i]])) {

			addMainCategory(keys[i], json["" + keys[i]], element, flag);
			jarray[keys[i]] = json["" + keys[i]];

		}
	}
	for (var i = 0; i < keys.length; i++) {
		if (isFile(json["" + keys[i]])) {
			var pathvalue = toString("" + json["" + keys[i]]);
			addSubCategory(keys[i], pathvalue, element);

			jarray[keys[i]] = json["" + keys[i]];
		}
	}
}
function isFile(pathname) {
	return pathname.split('/').pop().split('.').length > 1;
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

function addMainCategory(mainCategory, jsonMain, element, flag) {
	if (flag) {
		element.innerHTML = element.innerHTML
				+ "<div class='form-group "
				+ k
				+ "'><div class='col-sm-1'></div><label class='control-label col-sm-11 textClassFile colorTextFile '> "
				+ "<span class=' glyphicon glyphicon glyphicon-folder-close iconSmallClass colorTextFile' id='spanSubCategory"
				+ k + "' onClick='selectedFile(" + toString(mainCategory)
				+ ",this);' ondblClick='getAllDirectoryNew("
				+ toString(jsonMain) + "," + k + ",this);' value='" + k + "'> "
				+ mainCategory + "</span><div id='divSubCategoryd" + k
				+ "' ></div></div>";
	} else {
		element.innerHTML = element.innerHTML
				+ "<div class='form-group "
				+ k
				+ "'><div class='col-sm-1'></div><label class='control-label col-sm-11 textClassFile colorTextFile '> "
				+ "<span class=' glyphicon glyphicon glyphicon-folder-close iconSmallClass colorTextFile' id='spanSubCategory"
				+ k + "'  ondblClick='getAllDirectoryNew(" + toString(jsonMain)
				+ "," + k + ",this);' value='" + k + "'>  " + mainCategory
				+ "</span><div id='divSubCategoryd" + k + "' ></div></div>";
	}

	k++;
}
function addSubCategory(subCategory, pathValue, element) {
	element.innerHTML = element.innerHTML
			+ "<div class='form-group "
			+ k
			+ "' ><div class='col-sm-1'></div><label class='control-label col-sm-10 textClassFile colorTextFile onHoverChangeColorClass'> "
			+ "<span onClick='selectedFile(" + toString(subCategory)
			+ ",this);' class=' glyphicon  iconSmallClass' >" + subCategory
			+ "</span></div>";

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
	/* $(element).parent().parent().toggleClass("glyphicon glyphicon-folder-open"); */

	var x = document.getElementsByClassName("changedColorClass");
	$(x[0]).toggleClass("changedColorClass");
	$(element).parent().toggleClass("changedColorClass");
	// $("#selectFile").modal('hide');
	// document.getElementById(globleElementId).innerHTML = subCategory;
	document.getElementById("valueSelectedDseq").value = "" + subCategory;

}
/*
 * function selectedFile(subCategory) { $("#selectFile").modal('hide');
 * document.getElementById(globleElementId).innerHTML = subCategory; }
 */

function setSelectedValue(element) {
	if (document.getElementById("valueSelectedDseq").value != "") {
		element.innerHTML = ""
				+ document.getElementById("valueSelectedDseq").value;
		document.getElementById("closeFileModel").click();
	} else {
		alert("Please select file");
	}

}
function toggleClassfiles(element) {
	$(element).toggleClass("glyphicon glyphicon-folder-open");
	$(element).toggleClass("glyphicon glyphicon-folder-close");

	$("#bowtie1OutputFormDiv").slideToggle("slow");
}