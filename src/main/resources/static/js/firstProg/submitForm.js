function submitForm()
{
	if(validateProjectName() && validateScientistName() && validateSpecialization() 
			&& validateAddress() && validateRepeatLength() && validateOutputPrefix() 
			 && validateInputFile() && validateOutputFolder())
	{
		var formData = new FormData();
		formData.append("projectName", $("#idProjectName").val());
		
		formData.append("ScientistName", $("#idScientistName").val());
		formData.append("Specialization", $("#idSpecialization").val() + " At \n" + $("#idInstituteName").val());
		formData.append("Address", $("#idAddress").val());
		
		formData.append("processMode", $("#processMode").val());
		
//		#if($("#processMode").val() == "DNA")
//		{
			formData.append("truncation", $("#truncation").val());
//		}
		
		if($("#repeatFilter").val() == "1")
		{
			formData.append("repeatFilter", $("#repeatLength").val());
		}
		else
		{
			formData.append("repeatFilter", "0");
		}
		
		formData.append("outputPrefix", $("#outputPrefix").val());
		formData.append("inptuFileName", jarray[$("#idInputSelectFile").html()]);
		formData.append("outputFolder", jarray[$("#idSelectOutputFolder").html()]);
		formData.append("userId", localStorage.userId);
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', URL_FOR_RUNNING_1ST_PROGRAM, true);
		
		xhr.send(formData);
		
		alert("Your process has been submitted successfully.\nPlease use \'Result Summary\' tab to see the progress which is given in navigation bar...!!");
		onloadForBody();
		
//		$("#myModal").modal('show');
		
		xhr.onreadystatechange = function() 
		{
			var response = eval("(" + xhr.responseText + ")");
			
			if (xhr.readyState == 4) 
			{
				if (xhr.status == 200) 
				{
//					$("#myModal").modal('hide');
//					$("#firstProgDiv").fadeOut('slow');
//					$("#divShowCustomReportPdf").fadeOut('slow');
//					$("#illuminaQcCmd").fadeIn('slow');
//					alert("Process completed successfully,\nPlease refer Resut summary to take action....!!");
//					onloadForBody();
					
//					var str = response.message;
//					var splitArr = str.split("##**##");
					
//					var outputLog = splitArr[0];
//					var allValues = splitArr[1].split("\n");
//					var SequenceOnly = splitArr[2].split("\n");
					
//					var fieldNm = ["Input File Name (s)","Processing Mode","Truncation Enabled","Read Layout","Observed Read Length","Pre-length","Post-length","Applicable Read Length Range","Selected Tag Length","No. Of Representative OR Tags Per Read","Total No. Of Tags Generated","Total No. Of Unique Tags Generate","Total No. Of Tags Discarded","Total No. Of Valid Unique Tags","Maximum Tag Abundance","Minimum Tag Abundance","Median Tag Abundance","Mean Tag Abundance","Total No. Of Bases In Filtered Tags","Total No. Of As","Total No. Of Ts","Total No. Of Gs","Total No. Of Cs","Total No. Of (A + T)s","Total No. Of (G + C)s","Total No. Of Ns"];
					
//					setVlueInTable(fieldNm, allValues);
					
					/*illuminaOutput = response.message;
					
					document.getElementById("illuminaQcCmdOutput").innerHTML = illuminaOutput;
					alert(illuminaOutput);
					$("#illuminaQcCmd").animate({
						scrollTop : $('#illuminaQcCmd')[0].scrollHeight
					}, 1000);
*/					
//					alert("Program run Successfully, You can view and download from Instances and rport tab...");
					
//					showPdfCustomQc(splitArr[3]);
//					$("#firstProgDiv").fadeOut('slow');
//					localStorage.removeItem('firstProgDiv');
				}
				else
				{
					$("#myModal").modal('hide');
					alert(response.message);
				}
			}
		};
	}
}