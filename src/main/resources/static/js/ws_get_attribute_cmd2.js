function wsGetCommandAttributeByPid(processesId, processType) 
{	
	var url = URL_GET_ATTRI_PROCESSES;
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("processesId=" + processesId + "&&processType=" + processType);
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) 
		{
			if (xhr.status == 200) 
			{
				var response = eval('(' + xhr.responseText + ')');
				
				if (localStorage.tagName == "US Project") 
				{
					showTrinityToAssembly(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				}
				else if (localStorage.tagName == "illumina_report") 
				{
					showIlluminaToReport(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				} 
				else if (localStorage.tagName == "FourFiveFourQcReport") 
				{
					showFourFiveFourToReport(response.list[0]);
					localStorage.removeItem('pid');
					localStorage.removeItem('tagName');
				}
			}
		};
	}
}

function showFourFiveFourToReport(data) {
	document.getElementById("idProjectNameQC").value = data.projectName;
	
	document.getElementById("idScientistName").value = "";
	document.getElementById("idSpecialization").value= "";
	document.getElementById("idAddress").value = "";
	document.getElementById("idInstituteName").value= "";
	
	if(document.getElementById("myuserName").innerHTML != "")
		document.getElementById("idScientistName").value = document.getElementById("myuserName").innerHTML;
	if(document.getElementById("mydesignation").innerHTML != "")
		document.getElementById("idSpecialization").value = document.getElementById("mydesignation").innerHTML;
	if(document.getElementById("myaddress").innerHTML != "")	
		document.getElementById("idAddress").value = document.getElementById("myaddress").innerHTML;
	if(document.getElementById("myinstitute").innerHTML != "")
		document.getElementById("idInstituteName").value = document.getElementById("myinstitute").innerHTML;
	
	localStorage.typeOfQc = "fourFiveFour";
	document.getElementById("idSequencingType").value = "fourFiveFour";
	$("#endSelectionDiv").hide();
	
	var str_samples = data.samples.split(',');

	for (var i = 0; i < str_samples.length; i++) {
		if (i == 0) {
			document.getElementById("idSampleName454Qc").value = str_samples[i];
			document.getElementById("idOutputDirctorySelectIllumina").innerHTML = str_samples[i];
		} else {
			document.getElementById("idSampleName454Qc"+i).value = str_samples[i];
			document.getElementById("idOutputDirctorySelectIllumina"+i).innerHTML = str_samples[i];
		}
		jarray[str_samples[i]] = data.o + "/" + str_samples[i];
	
		if (i < (str_samples.length - 1)) {
			addMoreSamples();
		}
	}
}

function showIlluminaToReport(data) 
{
	localStorage.typeOfQc = "illumina";
	document.getElementById("idProjectNameQC").value = data.projectName;
	
	document.getElementById("idScientistName").value = "";
	document.getElementById("idSpecialization").value= "";
	document.getElementById("idAddress").value = "";
	document.getElementById("idInstituteName").value= "";
	
	if(document.getElementById("myuserName").innerHTML != "")
		document.getElementById("idScientistName").value = document.getElementById("myuserName").innerHTML;
	if(document.getElementById("mydesignation").innerHTML != "")
		document.getElementById("idSpecialization").value = document.getElementById("mydesignation").innerHTML;
	if(document.getElementById("myaddress").innerHTML != "")	
		document.getElementById("idAddress").value = document.getElementById("myaddress").innerHTML;
	if(document.getElementById("myinstitute").innerHTML != "")
		document.getElementById("idInstituteName").value = document.getElementById("myinstitute").innerHTML;
	
	$("#idTypeOfOutputSelectIllumina").show();
	document.getElementById("idSequencingType").value = "illumina";
	document.getElementById("idTypeOfInputSelect").value = "Whole Genome Sequencing";
	
	$("#endSelectionDiv").show("slow");
//	if (data.leftFiles != null) 
//	{
//		document.getElementById("idTypeOfOutputSelectIllumina").value = "Paired End";
		
		var str_array_samples = data.samples.split(',');
		var str_array_layout = data.readLayout.split(',');
		
		for (var i = 0; i < str_array_samples.length; i++) 
		{
			if (i == 0) 
			{
				if (str_array_layout[i] == "Paired")
				{
					document.getElementById("idTypeOfOutputSelectIllumina").value = "Paired End";
				}
				else
				{
					document.getElementById("idTypeOfOutputSelectIllumina").value = "Single End";
				}
				document.getElementById("idSampleName454Qc").value = str_array_samples[i];
				document.getElementById("idOutputDirctorySelectIllumina").innerHTML = str_array_samples[i];
			} 
			else 
			{
				if (str_array_layout[i] == "Paired")
				{
					document.getElementById("idTypeOfOutputSelectIllumina" + i).value = "Paired End";
				}
				else
				{
					document.getElementById("idTypeOfOutputSelectIllumina" + i).value = "Single End";
				}
				
				document.getElementById("idSampleName454Qc" + i).value = str_array_samples[i];
				document.getElementById("idOutputDirctorySelectIllumina" + i).innerHTML = str_array_samples[i];
			}
			
			jarray[str_array_samples[i]] = data.outputFolder + "/" + str_array_samples[i];
			
			if (i < (str_array_layout.length - 1)) 
			{
				addMoreSamples();
			}
		}

/*	} else {
		document.getElementById("idTypeOfOutputSelectIllumina").value = "Single End";
		var str_array_samples = data.samples.split(',');
		var str_array_right = data.singleFiles.split(',');
		document.getElementById("idSequencingType").value = "illumina";
		document.getElementById("idTypeOfInputSelect").value = "Whole Genome Sequencing";

		for (var i = 0; i < str_array_right.length; i++) {
			if (i == 0) {
				document.getElementById("idSampleName454Qc").value = str_array_samples[i];
				document.getElementById("idOutputDirctorySelectIllumina").innerHTML = str_array_samples[i];
			} else {
				document.getElementById("idSampleName454Qc" + i).value = str_array_samples[i];
				document.getElementById("idOutputDirctorySelectIllumina" + i).innerHTML = str_array_samples[i];
			}
			jarray[str_array_samples[i]] = data.outputFolder + "/"
					+ str_array_samples[i];
			if (i < (str_array_right.length - 1)) {
				addMoreSamples();
			}
		}
	}*/
}
