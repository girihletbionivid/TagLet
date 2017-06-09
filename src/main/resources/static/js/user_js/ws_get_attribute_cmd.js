function wsGetCommandAttribute(processesId,processType)
{
	var url = URL_GET_ATTRI_PROCESSES;
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("processesId=" + processesId+"&&processType="+processType);
	
	xhr.onreadystatechange = function() 
	{
		if (xhr.readyState == 4) 
		{
			if (xhr.status == 200) 
			{
				var response = eval('(' + xhr.responseText + ')');
				showAttributeInstance(response.list[0]);
			} 
			else 
			{
				alert("error " + xhr.responseText);
			}
		}
	};
}
function showAttributeInstance(data)
{
	var outerDiv=document.getElementById("pTagCmd");
	outerDiv.innerHTML="";
	var keys = Object.keys(data);
	
	for (var i = 0; i < keys.length; i++) 
	{
		if(data[keys[i]]!=null) {
		var tableBodyListUser = document.getElementById("tableBodyListAttribute");
		var trTable = document.createElement("tr");
		var tdTableKey = document.createElement("td");
		tdTableKey.innerHTML = keys[i];
		trTable.appendChild(tdTableKey);
		
		var tdTableValue= document.createElement("td");
		tdTableValue.innerHTML = data[keys[i]];
		trTable.appendChild(tdTableValue);
	
		outerDiv.appendChild(trTable);
		}
	}
}