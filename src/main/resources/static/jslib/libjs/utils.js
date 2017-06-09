function formToJsonConversion(form) {

	var array = jQuery(form).serializeArray();
	var json = {};

	jQuery.each(array, function() {

		json[this.name] = this.value;
	});
	//alert("You have=>" + JSON.stringify(json));
	//$(form).trigger("reset");
	return json;
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