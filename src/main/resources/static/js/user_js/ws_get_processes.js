function wsGetUserProcesses() 
{
	var url = URL_GET_USER_PROCESSES;
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("userId=" + localStorage.userId);
	$("#myModalSpr").modal('show');
	xhr.onreadystatechange = function() {
		var response = eval("(" + xhr.responseText + ")");
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				document.getElementById("idSpanCurrentRefreshTime").innerHTML = ""
						+ getCurrentDateTime();
				var response = eval('(' + xhr.responseText + ')');
				// alert(";D=>" + xhr.responseText);
				$("#sectionUserReports").fadeOut("slow");
				$("#sectionUserProcesses").fadeIn("slow");
				$("#divShowListReportPdf").fadeOut("slow");
				hideFrame(response.list);
				$("#myModalSpr").modal('hide');

			} else {
				alert("" + response.message);
			}
		}
	};

}
function wsResumeProcess(processesId,step) 
{
	var url = URL_RESUME_PROCESSES;
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', url, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("processesId=" + processesId + "&&step=" + step);
	document.getElementById("processStatus"+processesId).innerHTML="Running";
	document.getElementById("processEnd"+processesId).innerHTML="Pending";
	
	var dStart = new Date();
	var d = new Date, dformat = [ (dStart.getMonth() + 1).padLeft(),
	              				dStart.getDate().padLeft(), dStart.getFullYear() ].join('/')
	              				+ ' '
	              				+ [ dStart.getHours().padLeft(), dStart.getMinutes().padLeft(),
	              						dStart.getSeconds().padLeft() ].join(':');
	document.getElementById("processStart"+processesId).innerHTML=dformat;
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				wsGetUserProcesses();

			} 
			else 
			{
				alert("" + response.message);
			}
		}
	};
}

function hideFrame(data) 
{
	$("#frameOfMainContainer").hide();
	$("#sectionUserProcesses").show();
	
	document.getElementById("tableBodyListUser").innerHTML = "";
	
	for (var i = 0; i < data.length; i++) 
	{
		var dataProcess = data[i];
		var tableBodyListUser = document.getElementById("tableBodyListUser");
		var trTable = document.createElement("tr");
		var myStringl = "" + dataProcess.processCmd;
		
		var tdApplicationName = document.createElement("td");
		tdApplicationName.innerHTML = dataProcess.processName;
		tdApplicationName.setAttribute("class","textFormatForStart");
		trTable.appendChild(tdApplicationName);
		
		var tdTableName = document.createElement("td");
		tdTableName.setAttribute("class","textFormatForStart");
		
		tdTableName.innerHTML = dataProcess.projectName
				+ "<div id=\"popup\" style=\"display: none\">some text here</div>"
				+ "<div class='myspanProcessDetails'>" 
				
				+ "<a href=\"#\"" 
				+ "onclick='showCommand(\"" + myStringl+ "\");'"
				+ " class='icon fa fa-indent' title=\"Show Processed Command.\"></a>"
				
				+ "<a href='#' data-toggle='modal' data-target='#myModal' onclick=\'wsGetCommandAttribute(\""+ dataProcess.processId + "\",\"" + dataProcess.processType
				+ "\");\' class='icon fa fa-list' title=\"Show Processed Attributes.\"></a>"
				
				+ "<a href='#' data-toggle='modal' data-target='#myModalProcessLog' " 
				+ "onclick='wsLogProcess(\""+ dataProcess.processId + "\");' class='icon fa fa-linux'title=\"Show Processed Command Log.\"></a>" 
				
				+ "<div>";

		trTable.appendChild(tdTableName);

		var tdTableStatus = document.createElement("td");
		tdTableStatus.setAttribute("id","processStatus"+dataProcess.processId);
		
		if(dataProcess.processStatus=="null")
		{
			tdTableStatus.setAttribute("class","textFormatForError");
			tdTableStatus.innerHTML = "Failed";
		}
		else if(dataProcess.processStatus=="Running")
		{
			tdTableStatus.setAttribute("class","textFormatForPending");
			tdTableStatus.innerHTML = dataProcess.processStatus;
		}
		else
		{
			tdTableStatus.setAttribute("class","textFormatForStart");
			tdTableStatus.innerHTML = dataProcess.processStatus;	
		}
		
		trTable.appendChild(tdTableStatus);
		
		var dStart = new Date(Number(dataProcess.processStartTime));
		var dEnd = new Date(Number(dataProcess.processEndTime));
		
		var d = new Date, dformat = [ (dStart.getMonth() + 1).padLeft(),
				dStart.getDate().padLeft(), dStart.getFullYear() ].join('/')
				+ ' '
				+ [ dStart.getHours().padLeft(), dStart.getMinutes().padLeft(),
						dStart.getSeconds().padLeft() ].join(':');
		
		var d = new Date, dformat1 = [ (dEnd.getMonth() + 1).padLeft(),
				dEnd.getDate().padLeft(), dEnd.getFullYear() ].join('/')
				+ ' '
				+ [ dEnd.getHours().padLeft(), dEnd.getMinutes().padLeft(),
						dEnd.getSeconds().padLeft() ].join(':');
		
		var tdTableTime = document.createElement("td");
		
		var time =  "<div class='form-group'>"
			+ "<div class='textFormatForStart' id=processStart" + dataProcess.processId + ">"
			+ "START&nbsp;: "  + dformat
			+ "</div>";
		
		if (dataProcess.processEndTime == "Pending") 
		{
			time = time + "<div class='textFormatForPending' id=processStart" + dataProcess.processId + ">"
						+ "END &nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; --/--/-- --:--:--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
						+ "</div>";
		} 
		else 
		{
			time = time + "<div class='textFormatForStart' id=processStart" + dataProcess.processId + ">"
						+ "END &nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;" + dformat1
						+ "</div>";
		}
		
		time = time + "</div>";
		tdTableTime.innerHTML = time;
		trTable.appendChild(tdTableTime);
		
		var tdTablePID = document.createElement("td");
		tdTablePID.setAttribute("class","cellpaddingInstance");
		var my = "";
		
		if (dataProcess.nextProcesses != null) 
		{
			my = "<div class='dropdown'>"
				+ "<button class='btn-default btn-block dropdown-toggle colorForButton'"
				+ "type='button' data-toggle='dropdown'>"
				+ "Next Step<span class='caret'></span></button>"
				+ "<ul class='dropdown-menu backgroundForUL'>";

			var res = dataProcess.nextProcesses.split(",");
			if (res.length > 0) 
			{
				for (var j = 0; j < res.length; j++) 
				{
					if (res[j].indexOf("final fasta") > -1) 
					{
						my = my + "<li><a href='http://192.168.1.2:8180/webpage/11AC.txt' download target='_blank'>"
								+ res[j] + "</a></li>";
					} 
					else 
					{
						if (res[j] == "ReseqResume") 
						{
							if (data[i].processStatus == "Completed") 
							{

							}
						}
						else if(res[j].indexOf("resume") > -1)
						{
							var splitstep =	dataProcess.nextProcesses.split(" "); 
							
							my = my + "<li class='widhtForDropDownDiv'><a href='#' class='textColorForRemoveButton colorForViewOrDownloadButton' onclick='wsResumeProcess(\""+dataProcess.processId+ "\",\"" +splitstep[1]+ "\");'>" + res[j] + "</a></li>";
						} 
						else if(res[j] == "ReseqCuffling")
						{
							my = my + "<li class='widhtForDropDownDiv'><a href='#' class='textColorForRemoveButton colorForViewOrDownloadButton' onclick='myfunction(\"" + res[j]
									+ "\",\"" + dataProcess.processId
									+ "\");'>" +"ReseqCufflink" + "</a></li>";
						}
						else 
						{
							my = my + "<li class='widhtForDropDownDiv'><a href='#' class='textColorForRemoveButton colorForViewOrDownloadButton' onclick='myfunction(\"" + res[j]
									+ "\",\"" + dataProcess.processId
									+ "\");'>" + res[j] + "</a></li>";
						}
					}
				}
			}
			else
			{
				my = my + "<li class='widhtForDropDownDiv'><a href='#' class='textColorForRemoveButton colorForViewOrDownloadButton' onclick='myfunction(\""
						+ dataProcess.nextProcesses + "\",\""
						+ dataProcess.processId + "\");'>"
						+ dataProcess.nextProcesses + "</a></li>";
			}
			my = my + "</ul>" + "</div>";
		}
		else
		{
			my = "Not Applicable"
			tdTablePID.setAttribute("class","redTextColor");
		}
		
		tdTablePID.innerHTML = my;
		trTable.appendChild(tdTablePID);
		
		var dropdownForActionButton = "<div class='dropdown'>"
										+ "<button class='btn-default btn-block dropdown-toggle colorForButton'"
										+ "type='button' data-toggle='dropdown'>"
										+ "Select<span class='caret'></span></button>"
										+ "<ul class='dropdown-menu backgroundForUL'>";
		
		if (data[i].processStatus == "Completed") 
		{
			dropdownForActionButton = dropdownForActionButton + "<li class='widhtForDropDownDiv'><a href='#' class='textColorForRemoveButton colorForRemoveButton' onclick='wsRemoveProcess(\"" + dataProcess.processId
				+ "\");'>" +"Remove Process" + "</a></li>";
			
			if(data[i].reportPathToDownload)
			{
				var reportFilePathOnSystem = data[i].reportPathToDownload;
				var reportFilePathOnServer = data[i].reportPathToServer;
				
				if(reportFilePathOnSystem .indexOf("pdf") > 1)
				{
					dropdownForActionButton = dropdownForActionButton + "<li class='widhtForDropDownDiv'><a href='#' class='textColorForRemoveButton colorForViewOrDownloadButton' onclick='showPdfOnList(\"" + dataProcess.reportPathToServer
					+ "\");'>" +"View Report" + /*reportFilePathOnSystem.replace(/^.*(\\|\/|\:)/,'') + " file" +*/ "</a></li>";
				}
				else 
				{
					dropdownForActionButton = dropdownForActionButton + "<li class='widhtForDropDownDiv'><a href='#' class='textColorForRemoveButton colorForViewOrDownloadButton' onclick='showPdfOnList(\"" + dataProcess.reportPathToServer
					+ "\");'>" +"Download Result File" /* + reportFilePathOnSystem.replace(/^.*(\\|\/|\:)/,'') + " file"*/ + "</a></li>";
				}
			}
		}
		else if (data[i].processStatus == "Error") 
		{
			dropdownForActionButton = dropdownForActionButton + "<li class='widhtForDropDownDiv'><a href='#' class='textColorForRemoveButton colorForRemoveButton' onclick='wsRemoveProcess(\"" + dataProcess.processId
			+ "\");'>" +"Remove Process" + "</a></li>";
		}
		else if(dataProcess.processStatus=="null")
		{
			dropdownForActionButton = dropdownForActionButton + "<li class='widhtForDropDownDiv'><a href='#' class='textColorForRemoveButton colorForRemoveButton' onclick='wsRemoveProcess(\"" + dataProcess.processId
			+ "\");'>" +"Remove Process" + "</a></li>";
		}
		else 
		{
			dropdownForActionButton = dropdownForActionButton + "<li class='widhtForDropDownDiv'><a href='#' class='textColorForRemoveButton colorForRemoveButton' onclick='wsCloseProcess(\"" + dataProcess.pid
			+ "\");'>" +"Stop Process" + "</a></li>";
		}
		
		dropdownForActionButton = dropdownForActionButton + "</ul>" + "</div>";
		
		var tdTableBtn = document.createElement("td");
		tdTableBtn.setAttribute("class","cellpaddingInstance");
		tdTableBtn.innerHTML = dropdownForActionButton;
		trTable.appendChild(tdTableBtn);
		tableBodyListUser.appendChild(trTable);
	}
}

function showCommand(cmd) {
	document.getElementById("myProcessCommand").innerHTML = "" + cmd;
	$("#myModalProcessesCmd").modal('show');
}

function myfunction(data, processesId) 
{
	localStorage.pid = processesId;
	localStorage.tagName = data;
	
	if (data.indexOf("assembly") > -1) {
		window.location = URL_FOR_RUNNING_1ST_PROGRAM+"?userid="+localStorage.userId;
	}else if (data.indexOf("illumina") > -1) {
		window.location = URL_QC_REPORT+"?userid="+localStorage.userId;
	} else if (data.indexOf("FourFiveFour") > -1) {
		window.location = URL_QC_REPORT+"?userid="+localStorage.userId;
	} 
}

Number.prototype.padLeft = function(base, chr) {
	var len = (String(base || 10).length - String(this).length) + 1;
	return len > 0 ? new Array(len).join(chr || '0') + this : this;
}

function showFrameWithTag(data) {

	var frameOfMainContainer = document.getElementById("frameOfMainContainer");
	frameOfMainContainer.setAttribute("src", "" + data);

	$("#sectionUserProcesses").hide();
	$("#frameOfMainContainer").show();

}
function getDateAndTime(t) {
	var d = new Date(t);
	return d.toString();
}
function wsCloseProcess(pid) {
	var url = URL_CLOSE_PROCESSES;
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("pid=" + pid);
	xhr.onreadystatechange = function() {
		var response = eval("(" + xhr.responseText + ")");
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {

				var response = eval('(' + xhr.responseText + ')');

				// wsGetUserProcesses()
				// hideFrame(response.list);\
				wsGetUserProcesses();

			} else {
				alert("error " + response.message);
			}
		}
	};

}
function wsRemoveProcess(pid) {
	var url = URL_REMOVE_PROCESSES;
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("processid=" + pid);
	xhr.onreadystatechange = function() 
	{
		var response = eval("(" + xhr.responseText + ")");
		if (xhr.readyState == 4) 
		{
			if (xhr.status == 200) 
			{

				var response = eval('(' + xhr.responseText + ')');
				wsGetUserProcesses();

			} 
			else 
			{
				alert("" + response.message);
			}
		}
	};
}
function wsLogProcess(pid) {
	var url = URL_GET_PROCESSES_OUTPUT;
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("processid=" + pid);
	xhr.onreadystatechange = function() {
		var response = eval("(" + xhr.responseText + ")");
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {

				var response = eval('(' + xhr.responseText + ')');
				// alert("" +response.message);
				var objDiv = document.getElementById("processlog");
				if(response.message)
				{
					objDiv.innerHTML = response.message;
				}
				else
				{
					objDiv.innerHTML = "Currently process is running,\nLog will generate at the end of process...!!\n"
				}
				
				$("#processcmd").animate({
					scrollTop : $('#processcmd')[0].scrollHeight
				}, 1000);
				// wsGetUserProcesses()

			} else {
				alert("" + response.message);
			}
		}
	};
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

    return text + ".zip";
}