function wsRequestPassword() {
	///alert("Dddddmmmmm");
	var emailId = document.getElementById("emailIdForget");
	if (emailId.value != "") {
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (emailId.value.match(mailformat)) {

			var url = URL_GET_USER_PASSWORD;
			var xhr = new XMLHttpRequest();
			xhr.open('POST', url, true);
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type",
					"application/x-www-form-urlencoded");
			xhr.send("emailId=" + emailId.value);
			document.getElementById("waitingDiv").innerHTML = "<h4 class='modal-title'>wait requesting for password....   <img src='images/call1.gif' height='35px' width='35px' /></h4>";
			$("#aTagRequestPassword").toggleClass("disabled");
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {

						var response = eval('(' + xhr.responseText + ')');
						/*
						 * alert("Your new password is send to " + emailId.value + "
						 * ...!");
						 */
						document.getElementById("waitingDiv").innerHTML = "Your new password is send to "
								+ emailId.value + " ...!";
						$("#aTagRequestPassword").toggleClass("disabled");
					} else if (xhr.status == 417) {
						document.getElementById("waitingDiv").innerHTML = "<h4 class='modal-title'>You are not authorized user..!</h4>";
						$("#aTagRequestPassword").toggleClass("disabled");
					
					} else if (xhr.status == 401) {
						document.getElementById("waitingDiv").innerHTML = "<h4 class='modal-title'>You are not authorized user..!</h4>";
						$("#aTagRequestPassword").toggleClass("disabled");
					} else {
						document.getElementById("waitingDiv").innerHTML = "<h4 class='modal-title'>Please provide valid credientials..!..!</h4>";
						$("#aTagRequestPassword").toggleClass("disabled");
					}

				}
			};
		} else {
			alert("Please provide valid email id");
		}
	} else {
		//alert("Please provide email id");
		document.getElementById("waitingDiv").innerHTML = "Please provide email id";
	}
}
function wsChangePassword() {
	if (validateChangePasswordForm()) {

		var url = URL_CHANGE_PASSWORD;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type",
				"application/x-www-form-urlencoded");
		xhr.send("userId=" + localStorage.userId + "&&" + "newPassword="
				+ document.getElementById("changeNewPassword").value);
				
				document.getElementById("waitingDivChangePass").innerHTML = "<h4 class='modal-title'>wait requesting for password....   <img src='images/call1.gif' height='35px' width='35px' /></h4>";
				$("#aTagChangePassword").toggleClass("disabled");
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {

					var response = eval('(' + xhr.responseText + ')');
					//alert("New password is set..!");
					document.getElementById("waitingDivChangePass").innerHTML = "<h4 class='modal-title'>New password is set..!</h4>";
					$("#aTagChangePassword").toggleClass("disabled");
					// hideFrame(response.list);

				} else if (xhr.status == 401) {
					//alert("You are not authorized user..!");
					document.getElementById("waitingDivChangePass").innerHTML = "<h4 class='modal-title'>You are not authorized user..!</h4>";
					$("#aTagChangePassword").toggleClass("disabled");
				} else {
				//	alert("Please provide valid credientials..!");
					document.getElementById("waitingDivChangePass").innerHTML = "<h4 class='modal-title'>Please provide valid credientials..!</h4>";
					$("#aTagChangePassword").toggleClass("disabled");
				}

			}
		};

	}
}
function validateChangePasswordForm() {
	var changeNewPassword = document.getElementById("changeNewPassword").value;
	var changeConfirmPassword = document
			.getElementById("changeConfirmPassword").value;
	if (localStorage.userId != null || localStorage.userId != undefined) {
		if (changeNewPassword == "") {
			alert("enter new password");
			return false;
		} else if (changeConfirmPassword == "") {
			alert("enter comfirm password");
			return false;
		} else {
			if (changeNewPassword == changeConfirmPassword) {
				return true;
			} else {
				alert("Comfirm password is different..!");
			}
		}
	} else {
		alert("You are not authorized user..!");
	}
}