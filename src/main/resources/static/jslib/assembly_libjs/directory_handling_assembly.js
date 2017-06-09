function showOnlyDirectoryAssembly(json, elementId, elementbe) {
	var element = document.getElementById("divSubCategoryd" + elementId);
	element.setAttribute("onclick", "");
	if (k != 0 && elementbe != null) {
		elementbe.setAttribute("onclick", "toggleFileSelect(" + elementId
				+ ",this);");
		$(elementbe).toggleClass("glyphicon-collapse-up");
		$(elementbe).toggleClass("glyphicon-collapse-down");
	}
	var keys = Object.keys(json);
	if (keys.length === 0) {
		elementbe.setAttribute("ondblclick", "yu('"+elementbe.innerHTML+"');");
	
	} else {

		for (var i = 0; i < keys.length; i++) {
			if (typeof json["" + keys[i]] == 'object') {
				addOnlyDirectoryMainCategory(keys[i], json["" + keys[i]],
						element);
			}
		}
	}
}
function yu(valuesss) {
	//alert("ygi==>"+valuesss);
	document.getElementById("valueSelectedDseq").value=""+valuesss;
	
}
function addOnlyDirectoryMainCategory(mainCategory, jsonMain, element) {
	element.innerHTML = element.innerHTML
			+ "<div class='form-group "
			+ k
			+ "'><div class='col-sm-1'></div><label class='control-label col-sm-10 textClassFile colorTextFile'> "
			+ "<span class='glyphicon glyphicon-collapse-up iconSmallClass ' id='spanSubCategory"
			+ k + "' onclick='showOnlyDirectoryAssembly(" + toString(jsonMain) + ","
			+ k + ",this);'>" + mainCategory
			+ "</span><div id='divSubCategoryd" + k + "' ></div></div>";

	k++;
}
