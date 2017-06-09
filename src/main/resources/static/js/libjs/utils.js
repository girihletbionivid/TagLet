function formToJsonConversion(form) {

	var array = jQuery(form).serializeArray();
	var json = {};

	jQuery.each(array, function() {

		json[this.name] = this.value;
	});
	// alert("You have=>" + JSON.stringify(json));
	// $(form).trigger("reset");
	return json;
}
function setHeightToThis(element){
	$(element).height($(document).height()-220);
	$(element).height($(window).height()-220);
	$(window).resize(function() {
		$(element).height($(document).height()-220);
	});
} 
function callLink(url,userId){

	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	xhr.send(convertToFromDataLink(userId));
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {

				var response = eval('(' + xhr.responseText + ')');
				 alert("You " + xhr.responseText);
				
			}

		}
	};

}function convertToFromDataLink(userid) {
	var sourceString = "userid=" + userid ;
	var encodedSourceString = encodeURIComponent(sourceString);
	return sourceString;
}
function isAlphaNumeric(e)
{
    var k;
    document.all ? k=e.keycode : k=e.which;
    
    if((k>47 && k<58)||(k>64 && k<91)||(k>96 && k<123) || k == 45 || k == 46 || k == 8 || k == 95 || k==0)
    {
    	return true;
    }
    else
    {
    	return false;
    }
 }

function AlphaNumCheck(e) {
    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode == 8) return true;

    var keynum;
    var keychar;
    var charcheck = /[a-zA-Z0-9]/;
    if (window.event) // IE
    {
        keynum = e.keyCode;
    }
    else {
        if (e.which) // Netscape/Firefox/Opera
        {
            keynum = e.which;
        }
        else return true;
    }

    keychar = String.fromCharCode(keynum);
    return charcheck.test(keychar);
}
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
function setHeightToThisWindow(element){
	$(element).height($(document).height()-300);
	$(element).height($(window).height()-300);
	$(window).resize(function() {
		$(element).height($(document).height()-300);
	});
	$(element).width($(document).width()-300);
	$(element).width($(window).width()-300);
	$(window).resize(function() {
		$(element).height($(document).width()-300);
	});
}
function toEval(str) {
	return eval('(' + str + ')');
}
function toString(json){
	return JSON.stringify(json);
}
function testJSON(text){
    try{
        JSON.parse(text);
        return true;
    }
    catch (error){
        return false;
    }
}
Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}
function getNameByCurrentDateTime(){
/*
 * var currentdate = new Date(); var datetime = "" + currentdate.getDate() +"_" +
 * (currentdate.getMonth()+1) + "_" + currentdate.getFullYear() + "_" +
 * currentdate.getHours() + "_" + currentdate.getMinutes() + "_qc_filter_files" ;
 */
	var d = new Date();
  var  dformat = [(d.getMonth()+1).padLeft(),
               d.getDate().padLeft(),
               d.getFullYear()].join("_") +"_" +
              [d.getHours().padLeft(),
               d.getMinutes().padLeft(),
               d.getSeconds().padLeft()].join("_");
	return ""+dformat+ "_qc_filter_files";
}
function getCurrentDateTime(){
	/*
	 * var currentdate = new Date(); var datetime = "" + currentdate.getDate()
	 * +"_" + (currentdate.getMonth()+1) + "_" + currentdate.getFullYear() + "_" +
	 * currentdate.getHours() + "_" + currentdate.getMinutes() +
	 * "_qc_filter_files" ;
	 */
		var d = new Date();
	  var  dformat = [(d.getMonth()+1).padLeft(),
	               d.getDate().padLeft(),
	               d.getFullYear()].join("-") +"-" +
	              [d.getHours().padLeft(),
	               d.getMinutes().padLeft(),
	               d.getSeconds().padLeft()].join(":");
		return "Status on "+dformat;
	}
/*
 * function changeNav(){ var document.getElementById(""); }
 */



function creatNewDivForEmptyField(fieldName) 
{	var idForParentDiv=document.getElementById(fieldName).parentElement;
	var node = document.createElement('div');
	node.id = 'childDiv'+fieldName;
	node.className = 'alert alert-warning fade in myErrorBorder';
	node.innerHTML = '<a href="#" class="close" data-dismiss="alert">&times;</a>'
			+ '<strong>Warning!</strong> This field is mandatory...!!'
			+ '</div>';

	idForParentDiv.appendChild(node);
}

// Warning message for input Files
function validateAllFilesAndFolder(){
	for (i in jsonArrayForIndexLocation){
	    for (key in jsonArrayForIndexLocation[i][0]){
	    	// console.log( key + ": " +
			// toString(jsonArrayForIndexLocation[i][0][key]));
	        if(jsonArrayForIndexLocation[i][0][key]==""){
	        	warningForEmptyField(key+i);
	        	return false;
	        }
	    }
	}
	return true;
}
function warningForEmptyField(fieldName) 
{
	var inputVal = document.getElementById(fieldName).value;
	var idForParentDiv=document.getElementById(fieldName).parentElement;
	var value= document.getElementById(fieldName).type;
	var myDivClasses = document.getElementById(fieldName).classList;
	
	if (inputVal == "") 
	{
		if (document.getElementById("childDiv"+fieldName) != null) 
		{
			var element = document.getElementById("childDiv"+fieldName);
			element.parentNode.removeChild(element);
		}

		creatNewDivForEmptyField(fieldName);
		$('#childDiv'+fieldName).show();
	}
	else 
	{
		if (document.getElementById("childDiv"+fieldName) != null) 
		{
			var element = document.getElementById("childDiv"+fieldName);
			element.parentNode.removeChild(element);
		}
		if (myDivClasses.contains("myErrorBorder")) 
		{
			myDivClasses.remove("myErrorBorder");
		}
	}
}

function warningForFileOrFolders(fieldName) 
{
	var inputVal = document.getElementById(fieldName).innerHTML;
	var idForParentDiv=document.getElementById(fieldName).parentElement;
	
	var myDivClasses = idForParentDiv.classList;

	if (inputVal == "No file selected") 
	{
		/*
		 * if (document.getElementById("childDiv") != null) { var element =
		 * document.getElementById("childDiv");
		 * element.parentNode.removeChild(element); }
		 */
		creatNewDivForFileOrFolder1(idForParentDiv,"file");
		$('#childDiv').show();
	}else if(inputVal == "No folder selected"){

	/*
	 * if (document.getElementById("childDiv") != null) { var element =
	 * document.getElementById("childDiv");
	 * element.parentNode.removeChild(element); }
	 */

		creatNewDivForFileOrFolder1(idForParentDiv,"folder");
		$('#childDiv').show();
	
	}
	else 
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}	
	}
}

function creatNewDivForFileOrFolder1(idForParenDivNewDiv,Stringy) {
	var node = document.createElement('div');
	node.id = 'childDiv';
	node.className = 'alert alert-warning fade in myErrorBorder';
	node.innerHTML = '<a href="#" class="close" data-dismiss="alert">&times;</a>'
			+ '<strong>Warning!</strong> Please select the '+Stringy+'.'
			+ '</div>';

	idForParenDivNewDiv.appendChild(node);
}

function removeAddedClass(idForParentDiv) {
	var myDivClasses = document.getElementById(idForParentDiv).classList;
	if (document.getElementById("childDiv") != null) {
		var element = document.getElementById("childDiv");
		element.parentNode.removeChild(element);
	}
	if (myDivClasses.contains("myErrorBorder")) {
		myDivClasses.remove("myErrorBorder");
	}
}
