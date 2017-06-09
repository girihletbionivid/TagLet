function wsGetReports() {

	// alert("dp");
	var url = URL_GET_REPORTS;
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("userId=" + localStorage.userId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				$("#sectionUserReports").fadeIn("slow");
				$("#sectionUserProcesses").fadeOut("slow");
				$("#divShowListReportPdf").fadeOut("slow");
				
				// alert("d"+localStorage.tagName);
				var response = eval('(' + xhr.responseText + ')');
				showReports(response.list);
			}
		}
		;

	}
}
function showReports(data) {

	$("#frameOfMainContainer").hide();
	$("#sectionUserReports").show();

	document.getElementById("tableBodyListReports").innerHTML = "";
	for (var i = 0; i < data.length; i++) {
		var dataProcess = data[i];
		var tableBodyListUser = document.getElementById("tableBodyListReports");
		var trTable = document.createElement("tr");

		var tdTableName = document.createElement("td");
		tdTableName.innerHTML = dataProcess.projectName;

		trTable.appendChild(tdTableName);

		var tdTableStatus = document.createElement("td");
		tdTableStatus.innerHTML = dataProcess.processName;

		trTable.appendChild(tdTableStatus);
		var dStart = new Date(Number(dataProcess.dateOfCreation));

		var d = new Date, dformat = [ (dStart.getMonth() + 1).padLeft(),
				dStart.getDate().padLeft(), dStart.getFullYear() ].join('/')
				+ ' '
				+ [ dStart.getHours().padLeft(), dStart.getMinutes().padLeft(),
						dStart.getSeconds().padLeft() ].join(':');
		var tdTableStartTime = document.createElement("td");
		tdTableStartTime.innerHTML = dformat;
		trTable.appendChild(tdTableStartTime);

		var tdTablePID1 = document.createElement("td");

		tdTablePID1.innerHTML ="d"/* dataProcess.pathOnSystem*/;
		trTable.appendChild(tdTablePID1);

		var tdTableBtn = document.createElement("td");
		tdTableBtn.setAttribute("class", "btn btn-info btn-block");
		tdTableBtn.innerHTML = "View";
		tdTableBtn.setAttribute("onclick", "showPdfOnList(\'"
				+ dataProcess.downloadLink + "\');");
		
		trTable.appendChild(tdTableBtn);
		
		
		var tdTableBtn1 = document.createElement("td");
		tdTableBtn1.setAttribute("class", "btn btn-info btn-block");
		tdTableBtn1.innerHTML = "Remove";
		tdTableBtn1.setAttribute("onclick", "wsDelete(\'"
				+ dataProcess.userReportsId + "\');");
		
		trTable.appendChild(tdTableBtn1);
		/*var tdTablePID = document.createElement("td");

		tdTablePID.innerHTML = dataProcess.downloadLink;
		trTable.appendChild(tdTablePID);*/

		tableBodyListUser.appendChild(trTable);
	}

}
function showPdfOnList(path){
	if(path.indexOf(".pdf") > -1){
	$("#sectionUserReports").fadeOut("slow");
	$("#sectionUserProcesses").fadeOut("slow");
	$("#divShowListReportPdf").fadeIn("slow");
	}
	document.getElementById("iframeListReport").setAttribute("src", path);
}function wsDelete(reportId){
	
	var url = URL_DELETE_REPORTS;
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("userId=" + localStorage.userId+"&reportId="+reportId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {

				var response = eval('(' + xhr.responseText + ')');
				// alert(";D=>" + xhr.responseText);
				wsGetReports() ;
			} else {
				alert("error " + xhr.responseText);
			}
		}
	};

}