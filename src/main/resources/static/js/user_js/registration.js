/*validate the registration form-Yogesh*/
function validateForm() {
	var alphabetOnly = /^[a-zA-Z\s]+$/;
	var addressRegex = /^[\w&.\/\[\]():;-|{,\\"']+$/;

	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	if (document.activeElement != document.body) document.activeElement.blur();
	var phNo = /^\d{10}$/;
var userName=document.getElementById("userName");
var password=document.getElementById("password");
var repassword=document.getElementById("repassword");
var emailId=document.getElementById("emailId");
	if (userName.value == "") {
		document.getElementById("waitingDivRegistration").innerHTML="please enter username";
		userName.style.border = '1px solid red';
		userName.focus();
		return false;
	} else {
		if (userName.value.match(alphabetOnly)) {

		} else {
			document.getElementById("waitingDivRegistration").innerHTML="only alpha numeric value allowed";
			userName.style.border = '1px solid red';
			userName.focus();
			return false;
		}
	}
	userName.style.border = '';
	
	var myemail = emailId.value;
	if (myemail == "") {
		document.getElementById("waitingDivRegistration").innerHTML="please provide email id";
		emailId.style.border = '1px solid red';
		emailId.focus();
		return false;
	} else {
		if (emailId.value.match(mailformat)) {

		} else {
			document.getElementById("waitingDivRegistration").innerHTML="email id formate is not correct";
			//alert("email id formate is not correct");
			emailId.style.border = '1px solid red';
			emailId.focus();
			return false;
		}
	}
	emailId.style.border = '';
	password.style.border = '';
	var mypassword = password.value;
	if (mypassword == "") {
		document.getElementById("waitingDivRegistration").innerHTML="password should not empty";
		password.style.border = '1px solid red';
		password.focus();
		return false;

	}if (password.value.length < 8) {
        document.getElementById("waitingDivRegistration").innerHTML="password should be greater then 8 charector";
		//alert("password should be greater then 8 charector");
		password.style.border = '1px solid red';
		password.focus();
		return false;

	}
	repassword.style.border = '';
	myrepassword = repassword.value;
	if (myrepassword != password.value) {
       // alert("comfirm password is not same");
        document.getElementById("waitingDivRegistration").innerHTML="comfirm password is not same";
		repassword.style.border = '1px solid red';
		repassword.focus();
		return false;

	}
	repassword.style.border = '';
	
	repassword.style.border = '';

	document.getElementById("waitingDivRegistration").innerHTML="";
	return true;
}
function checkInput(e){
	if(e.which===32){
		return false;
	}
	else{
		return true;
	}
}
function validateUserName(){
	var alphabetOnly = /^[a-zA-Z\s]+$/;
	var userName=document.getElementById("userName");
	var emailId=document.getElementById("emailId");
	if (userName.value == "") {
		document.getElementById("waitingDivRegistration").innerHTML="please enter Full Name";
		userName.style.border = '1px solid red';
		userName.focus();
		return false;
	} else {
		if (userName.value.match(alphabetOnly)) {
			userName.style.border = '';
			document.getElementById("waitingDivRegistration").innerHTML="";
			return true;
		} else {
			document.getElementById("waitingDivRegistration").innerHTML="only alpha numeric values are allowed...!!";
			userName.style.border = '1px solid red';
			userName.focus();
			return false;
		}
	}
	
}
function validateEmailId(){
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var myemail = emailId.value;
	if (myemail == "") {
		document.getElementById("waitingDivRegistration").innerHTML="please provide email id";
		emailId.style.border = '1px solid red';
		emailId.focus();
		return false;
	} else {
		if (emailId.value.match(mailformat)) {
			emailId.style.border = '';
			document.getElementById("waitingDivRegistration").innerHTML="";
			return true;
		} else {
			document.getElementById("waitingDivRegistration").innerHTML="email id formate is not correct";
			//alert("email id formate is not correct");
			emailId.style.border = '1px solid red';
			emailId.focus();
			return false;
		}
	}
	
}
function validatePassword(){
	var password=document.getElementById("password");
	password.style.border = '';
	var mypassword = password.value;
	if (mypassword == "") {
		document.getElementById("waitingDivRegistration").innerHTML="password should not empty";
		password.style.border = '1px solid red';
		password.focus();
		return false;

	}if (password.value.length < 8) {
        document.getElementById("waitingDivRegistration").innerHTML="password should be greater then 8 charector";
		//alert("password should be greater then 8 charector");
		password.style.border = '1px solid red';
		password.focus();
		return false;

	}
	password.style.border = '';
	document.getElementById("waitingDivRegistration").innerHTML="";
	return true;
}
function validateConfirmPassword(){
	var password=document.getElementById("password");
	var repassword=document.getElementById("repassword");
	repassword.style.border = '';
	myrepassword = repassword.value;
	if (myrepassword != password.value) {
       // alert("comfirm password is not same");
        document.getElementById("waitingDivRegistration").innerHTML="comfirm password is not same";
		repassword.style.border = '1px solid red';
		repassword.focus();
		return false;

	}
	repassword.style.border = '';
	document.getElementById("waitingDivRegistration").innerHTML="";
	return true;
}
/* create registration form json- yogesh */
function convertToJSONs() {

	var x = document.getElementById("adminRegistrationFrom");
	var array = jQuery(x).serializeArray();
	var json = {};

	jQuery.each(array, function() {

		json[this.name] = this.value;
	});
	json['userId'] = -1;
	//alert("You have=>" + JSON.stringify(json));
	return JSON.stringify(json);
}
/* call admin registration web service */
function registerAdminWs() 
{
	var email=document.getElementById("emailId").value;
	var flage = validateForm();
	if (flage == true) 
	{
		var xhr = new XMLHttpRequest();
		xhr.open('POST', URL_USER_REGISTRATION, true);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(convertToJSONs());
		$("#aTagRegistrationRequest").toggleClass("disabled"); 
		document.getElementById("waitingDivRegistration").innerHTML="<img src='images/call1.gif' height='35px' width='35px' />";
		xhr.onreadystatechange = function() {
			var response = eval('(' + xhr.responseText + ')');
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					
					//alert(xhr.responseText);
					if (response.userId != -1) {
						//alert(response.message);
						$( '#adminRegistrationFrom').trigger('reset');
						$("#aTagRegistrationRequest").toggleClass("disabled"); 
						document.getElementById("waitingDivRegistration").innerHTML=""+response.message;
						document.getElementById("aLogin").click();
						document.getElementById("emailLogin").value=email;
//						/document.getElementById("passwordLogin").focus();
					} else {
						$("#aTagRegistrationRequest").toggleClass("disabled"); 
						document.getElementById("waitingDivRegistration").innerHTML="Please enter correct userName and password..!";
					}

				}else{
					$("#aTagRegistrationRequest").toggleClass("disabled"); 
					document.getElementById("waitingDivRegistration").innerHTML=""+response.message;
					
				}
			}else{
				$("#aTagRegistrationRequest").toggleClass("disabled"); 
				document.getElementById("waitingDivRegistration").innerHTML=""+response.message;
			}
		};
	}
}