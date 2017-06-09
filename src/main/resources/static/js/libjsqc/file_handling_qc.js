var responseJson;
var globleElementId;
var myflag = false;
var k = 0;
var jarray = {};
function getAllDirectory(elementId, extensions) {
	//document.getElementById("valueSelected").value = "";
	document.getElementById("valueSelected").value = "";
	globleElementId = elementId;
	var xhr = new XMLHttpRequest();
	xhr.open('POST', URL_GET_DIRECTORY, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	xhr.onload = function(e) {
	};
	var data="extensions="+extensions;
	xhr.send(data);
	xhr.onreadystatechange = function() {
		var response = eval("(" + xhr.responseText + ")");
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				// alert("You haveTTTT=>" + xhr.responseText);
				var j = 0;
				var list=	""+response.list[0];
				responseJson = toEval(list);
				document.getElementById("openBtnDialog").setAttribute(
						"onclick", "setSelectedValue(" + elementId + ");");
				document.getElementById("divSubCategorydmd").innerHTML = "";
				if (extensions != "diretory")
					showDirectory(responseJson, "md", null);
				else
					showOnlyDirectory(responseJson, "md", null);
			} else {

			}
		}
	};
}
function setSelectedValue(element) {
	if (document.getElementById("valueSelected").value != "") {
	element.innerHTML = "" + document.getElementById("valueSelected").value;
	document.getElementById("closeFileModel").click();
	}else{
		alert("Please select file");
	}
	/*

	var valueSelected = document.getElementById("valueSelected");
	if (document.getElementById("valueSelected").value != "") {
		element.innerHTML = "" + valueSelected.value;
		if ($("#warningSpanDiv").length > 0) {
			document.getElementById("warningSpanDiv").remove();
		}
	} else {
		valueSelected.className += " has-warning";
		document.getElementById("inputTypeTextSelectionDiv").innerHTML = "<span class='glyphicon glyphicon-warning-sign form-control-feedback' id='warningSpanDiv'></span>";

	}
*/}
function showDirectory(json, elementId, elementbe) {
	var element = document.getElementById("divSubCategoryd" + elementId);
	element.setAttribute("onclick", "");
	if (k != 0 && elementbe != null) {
		elementbe.setAttribute("onclick", "toggleFileSelect(" + elementId
				+ ",this);");
		$(elementbe).toggleClass("glyphicon-collapse-up");
		$(elementbe).toggleClass("glyphicon-collapse-down");
	}
	var keys = Object.keys(json);
	for (var i = 0; i < keys.length; i++) {
		if (typeof json["" + keys[i]] == 'object') {
			addMainCategory(keys[i], json["" + keys[i]], element);

		}
	}
	for (var i = 0; i < keys.length; i++) {
		if (typeof json["" + keys[i]] != 'object') {
			var pathvalue = toString("" + json["" + keys[i]]);
			addSubCategory(keys[i], pathvalue, element);

			jarray[keys[i]] = json["" + keys[i]];
		}
	}
}
function toggleFileSelect(elementId, element) {
	$("#divSubCategoryd" + elementId).slideToggle();
	$(element).toggleClass("glyphicon-collapse-up");
	$(element).toggleClass("glyphicon-collapse-down");
}

function addMainCategory(mainCategory, jsonMain, element) {
	element.innerHTML = element.innerHTML
			+ "<div class='form-group "
			+ k
			+ "'><div class='col-sm-1'></div><label class='control-label col-sm-10 textClassFile colorTextFile'> "
			+ "<span class=' glyphicon glyphicon-collapse-up iconSmallClass' id='spanSubCategory"
			+ k + "' onclick='showDirectory(" + toString(jsonMain) + "," + k
			+ ",this);'>" + mainCategory + "</span><div id='divSubCategoryd"
			+ k + "' ></div></div>";

	k++;
}
function addSubCategory(subCategory, pathValue, element) {
	element.innerHTML = element.innerHTML
			+ "<div class='form-group "
			+ k
			+ "' ><div class='col-sm-1'></div><label class='control-label col-sm-10 textClassFile  colorTextFile onHoverChangeColorClass'> "
			+ "<span onClick='selectedFile(" + toString(subCategory)
			+ ");' class=' glyphicon  iconSmallClass' >" + subCategory
			+ "</span></div>";

}
function selectedFile(subCategory) {
	// $("#selectFile").modal('hide');
	// document.getElementById(globleElementId).innerHTML = subCategory;
	document.getElementById("valueSelected").value = "" + subCategory;

}
function toggleClassfiles(element) {
	$(element).toggleClass("glyphicon-collapse-down");
	$(element).toggleClass("glyphicon-collapse-up");
	$("#bowtie1OutputFormDiv").slideToggle("slow");
}