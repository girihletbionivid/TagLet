function wsGetReports() 
{
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
				var response = eval('(' + xhr.responseText + ')');
				showReports(response.list);
			}
		};
	}
}

function showReports(data) 
{
	$("#frameOfMainContainer").hide();
	$("#sectionUserReports").show();

	document.getElementById("tableBodyListReports").innerHTML = "";
	
	for (var i = 0; i < data.length; i++) 
	{
		var dataProcess = data[i];
//		alert(dataProcess.userReportsId);
		var arrDownLink;
		var arrFileName;
		
		if (dataProcess.downloadLink.indexOf(",") > 1) 
		{
				arrDownLink = dataProcess.downloadLink.split(",");
				arrFileName = dataProcess.pathOnSystem.split(",");
			
			for (var j = 0; j < arrDownLink.length; j++) 
			{
				var tableBodyListUser = document
						.getElementById("tableBodyListReports");
				var trTable = document.createElement("tr");

				var tdTableName = document.createElement("td");
				tdTableName.innerHTML = dataProcess.projectName;

				trTable.appendChild(tdTableName);

				var tdTableStatus = document.createElement("td");
				tdTableStatus.innerHTML = dataProcess.processName;

				trTable.appendChild(tdTableStatus);
				var dStart = new Date(Number(dataProcess.dateOfCreation));

				var d = new Date, dformat = [
						(dStart.getMonth() + 1).padLeft(),
						dStart.getDate().padLeft(), dStart.getFullYear() ]
						.join('/')
						+ ' '
						+ [ dStart.getHours().padLeft(),
								dStart.getMinutes().padLeft(),
								dStart.getSeconds().padLeft() ].join(':');
				var tdTableStartTime = document.createElement("td");
				tdTableStartTime.innerHTML = dformat;
				trTable.appendChild(tdTableStartTime);

//				var tdTablePID1 = document.createElement("td");
//				tdTablePID1.innerHTML = arrFileName[j].replace(/^.*(\\|\/|\:)/,'');
//				trTable.appendChild(tdTablePID1);

				var tdTableBtn = document.createElement("td");
				tdTableBtn.setAttribute("class", "btn btn-info btn-block colorForViewOrDownloadButton");
				if (arrDownLink[j].indexOf("pdf") > 1) 
				{
					tdTableBtn.innerHTML = "View " + arrFileName[j].replace(/^.*(\\|\/|\:)/,'') + " file";
				} 
				else 
				{
					tdTableBtn.innerHTML = "Download " + arrFileName[j].replace(/^.*(\\|\/|\:)/,'') + " file";
//					tdTableBtn.innerHTML = "Download";
				}
				tdTableBtn.setAttribute("onclick", "showPdfOnList(\'"
						+ arrDownLink[j] + "\');");

				trTable.appendChild(tdTableBtn);

				var tdTableBtn1 = document.createElement("td");
				tdTableBtn1.setAttribute("class", "btn btn-info btn-block colorForRemoveButton");
				tdTableBtn1.innerHTML = "Remove " + arrFileName[j].replace(/^.*(\\|\/|\:)/,'') + " file";
				tdTableBtn1.setAttribute("onclick", "wsDelete(\'"
						+ dataProcess.userReportsId + "\');");
				
				trTable.appendChild(tdTableBtn1);
				
				tableBodyListUser.appendChild(trTable);
			}
		} 
		else 
		{
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
					dStart.getDate().padLeft(), dStart.getFullYear() ]
					.join('/')
					+ ' '
					+ [ dStart.getHours().padLeft(),
							dStart.getMinutes().padLeft(),
							dStart.getSeconds().padLeft() ].join(':');
			var tdTableStartTime = document.createElement("td");
			tdTableStartTime.innerHTML = dformat;
			trTable.appendChild(tdTableStartTime);

			var tdTablePID1 = document.createElement("td");

			tdTablePID1.innerHTML = dataProcess.pathOnSystem.replace(/^.*(\\|\/|\:)/, '');
			trTable.appendChild(tdTablePID1);

			var tdTableBtn = document.createElement("td");
			tdTableBtn.setAttribute("class", "btn btn-info btn-block colorForViewOrDownloadButton");
			tdTableBtn.setAttribute("id", "downloadBtn");
			
			if (dataProcess.downloadLink.indexOf("pdf") > 1) 
			{
				tdTableBtn.innerHTML = "View";
			} 
			else 
			{
				tdTableBtn.innerHTML = "Download";
			}
			tdTableBtn.setAttribute("onclick", "showPdfOnList(\'" + dataProcess.downloadLink + "\');");

			trTable.appendChild(tdTableBtn);

			var tdTableBtn1 = document.createElement("td");
			tdTableBtn1.setAttribute("class", "btn btn-info btn-block colorForRemoveButton");
			tdTableBtn1.innerHTML = "Remove";
			tdTableBtn1.setAttribute("onclick", "wsDelete(\'" + dataProcess.userReportsId + "\');");

			trTable.appendChild(tdTableBtn1);

			tableBodyListUser.appendChild(trTable);
		}
	}
}
function showPdfOnList(path) {

	if (path.indexOf(".pdf") > -1) 
	{
		$("#trinity").fadeOut("slow");
		$("#iframeReport").fadeIn("slow");
		setHeightToThis(document.getElementById("iframeReport"));
		
		document.getElementById("iframeReport").setAttribute("src", path);
		document.getElementById("iframeReport").click();
	}
	else
	{
		var link = document.createElement("a");
		link.download = makeid();
		link.href = path;
		document.body.appendChild(link);
		link.click();
		
		document.body.removeChild(link);
		delete link;
	}
}
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function wsDelete(reportId) {

	var url = URL_DELETE_REPORTS;
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("userId=" + localStorage.userId + "&reportId=" + reportId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {

				var response = eval('(' + xhr.responseText + ')');
				// alert(";D=>" + xhr.responseText);
				wsGetReports();
			} else {
				alert("error " + xhr.responseText);
			}
		}
	};

}
$(document).ready(new function(){
	$("#iframeReport").fadeOut();
	$("#trinity").fadeIn("slow");
});