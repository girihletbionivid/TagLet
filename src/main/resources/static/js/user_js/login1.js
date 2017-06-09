var userId;
function showAlert() {
	alert("dancing doll.");
}
function showFrame(data) {
	var frameOfMainContainer = document.getElementById("frameOfMainContainer");
	frameOfMainContainer.setAttribute("src", "" + data);
	$("#sectionUserProcesses").hide();
	$("#sectionUserReports").hide();
	$("#frameOfMainContainer").show();
}

function wsLogin() 
{
	if (validateLoginEmailId() && validateLoginPassword()) 
	{
		var url = URL_USER_LOGIN;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		xhr.send(convertToFromData());
		
		$("#aTagLoginRequest").toggleClass("disabled");
		$("#aTagForgetPassword").toggleClass("disabled");

		document.getElementById("waitingDivLogin").innerHTML = "<img src='images/spinner.gif' height='35px' width='35px' />";
		xhr.onreadystatechange = function() 
		{
			if (xhr.readyState == 4) 
			{
				if (xhr.status == 200) 
				{
					var response = eval('(' + xhr.responseText + ')');
					
					if (response.userId != -1) 
					{
						startSession(response.userId, response.userName,response.userDir,response.emailId);
					} 
					else 
					{
						$("#aTagLoginRequest").toggleClass("disabled");
						document.getElementById("waitingDivLogin").innerHTML = "Please enter correct userName and password..!";
						$("#aTagForgetPassword").toggleClass("disabled");
					}
				} 
				else if (xhr.status == 401) 
				{
					$("#aTagLoginRequest").toggleClass("disabled");
					document.getElementById("waitingDivLogin").innerHTML = "You are not authorized user..!";
					$("#aTagForgetPassword").toggleClass("disabled");
				} 
				else 
				{
					$("#aTagLoginRequest").toggleClass("disabled");
					document.getElementById("waitingDivLogin").innerHTML = "Please provide valid credientials..!";
					$("#aTagForgetPassword").toggleClass("disabled");
				}

			}
		};
	}
}
function convertToFromData() 
{
	var emailId = document.getElementById("emailLogin").value;
	var password = document.getElementById("passwordLogin").value;
	document.getElementById("passwordLogin").value = "";
	// alert(emailId + "-df-" + password);
	var sourceString = "emailId=" + emailId + "&" + "password=" + password;
	var encodedSourceString = encodeURIComponent(sourceString);
	return sourceString;
}
function validateLoginEmailId() {
	if (document.getElementById("emailLogin").value == "") {
		// alert("please enter userName");
		document.getElementById("waitingDivLogin").innerHTML = "please enter userName";
		document.getElementById("emailLogin").style.border = '1px solid red';
		// document.getElementById("name").focus();
		return false;
	} else {
		document.getElementById("waitingDivLogin").innerHTML = "";
		document.getElementById("emailLogin").style.border = '';
		// document.getElementById("name").blur();
		return true;
	}
}
function validateLoginPassword() 
{
	if (document.getElementById("passwordLogin").value == "") {
		// alert("please enter password");
		document.getElementById("waitingDivLogin").innerHTML = "please enter password";
		document.getElementById("passwordLogin").style.border = '1px solid red';
		// document.getElementById("email").focus();
		return false;
	} else {
		document.getElementById("waitingDivLogin").innerHTML = "";
		document.getElementById("passwordLogin").style.border = '';
		// document.getElementById("email").blur();
		return true;
	}
}
function startSession(suserId, userName,userDir,userEmail) {
	
	localStorage.setItem("userId", suserId);
	localStorage.setItem("userName", userName);
	localStorage.setItem("userDir", userDir);
	localStorage.setItem("userEmail", userEmail);
	localStorage.setItem("server",server);
	
	window.location=URL_DASHBOARD+"?userid="+suserId;
	
}
function stopSession() {
	localStorage.removeItem("userId");
	localStorage.removeItem("userName");
	localStorage.removeItem("userDir");
	localStorage.removeItem("userEmail");
	$("#page-top").show();
	$("#userDetailsSection").hide();
	$("#homePad").show();
	$("#bottom-pad").show();
	$("#headerSection").show();
	$("#sectionUserProcesses").show();
	$("#loginSection").show("slow");
	$("#registrationSection").show();
	$("#section2").show();
	$("#imageOfDrawer").hide();
	
	$("#wrapper").fadeOut("slow");
	$("#page-top").fadeIn("slow");
	$("#section2").fadeOut("slow");
	$("#bottom-pad").fadeOut("slow");
	$("#registrationSection").fadeOut("slow");
	$("#homePad").fadeOut("slow");
	/*
	 * $("#aTagLogout").hide(); $("#aTagHome").show();
	 * $("#aTagFeatures").show(); $("#aTagContact").show();
	 * $("#aTagLogin").show(); $("#aTagRegister").show();
	 */

}
$(document).ready(
		function() {
			if (localStorage.userId == undefined) {
				stopSession();
				/*document.getElementById("aHome").click();*/
			} else {
				/*document.getElementById("userDivName").innerHTML = "Welcome "	+ localStorage.userName;
				document.getElementById("userDivEmail").innerHTML = ""
					+ localStorage.userEmail;*/
				startSession(localStorage.userId, localStorage.userName, localStorage.userDir, localStorage.userEmail);
			}
			// startSession(localStorage.userId, localStorage.userName);
			// $("#aHome").click();
			
			// alert("DD");
		});

$(document).keypress(function(e) {
	if (e.which == 13) {
		if ($("#liLogin").hasClass("active"))
			document.getElementById("aTagLoginRequest").click();
		if ($("#liRegister").hasClass("active"))
			document.getElementById("aTagRegistrationRequest").click();
		if (document.getElementById("forgetModel").style.display == "block") {
			document.getElementById("aTagRequestPassword").click();
		} else {
			if (!flagLogin)
				document.getElementById("aTagLoginRequest").click();
		}

		/*if (flagChange)
			wsChangePassword();*/
		return false;
	}
});

$("#menu-toggle").click(function(e) {
	e.preventDefault();
	$("#wrapper").toggleClass("toggled");
	$(".myccd").toggleClass("fa-rotate-90");
	
});
function changeClass(thisElemnt){
	$("li").removeClass("changeActive");
	$(thisElemnt).toggleClass("changeActive");

}
var flagLogin = false;
function forgetBtnClick() {
	$("#emailIdForget").click();
	flagRegis = false;
	flagLogin = false;
	flagForget = true;
	flagChange = false;
}
function changeBtnClick() {
	flagRegis = false;
	flagLogin = false;
	flagForget = false;
	flagChange = true;
}
function setNullButton(element) {
	flagRegis = false;
	flagLogin = false;
	flagForget = false;
	flagChange = false;
	if (element == "aTagHome") {
		$("#page-top").fadeIn("slow");
		$("#section2").fadeOut("slow");
		$("#bottom-pad").fadeOut("slow");
		$("#loginSection").fadeOut("slow");
		$("#registrationSection").fadeOut("slow");
		$("#homePad").fadeOut("slow");
	} else if (element == "aTagFeatures") {
		$("#page-top").fadeOut("slow");
		$("#section2").fadeIn("slow");
		$("#bottom-pad").fadeOut("slow");
		$("#loginSection").fadeOut("slow");
		$("#homePad").fadeOut("slow");
		$("#registrationSection").fadeOut("slow");
	} else if (element == "aTagContact") {
		$("#page-top").fadeOut("slow");
		$("#section2").fadeOut("slow");
		$("#bottom-pad").fadeIn("slow");
		$("#loginSection").fadeOut("slow");
		$("#homePad").fadeOut("slow");
		$("#registrationSection").fadeOut("slow");
	}
}