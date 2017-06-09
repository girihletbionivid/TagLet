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
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}function isNumber(evt, selection, number) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31
			&& (charCode < 48 || charCode > 57 || selection.value.length > (number+1))) {
		return false;
	}
	/*
	 * if (selection.value.length > number) { return false; }
	 */
	return true;
}