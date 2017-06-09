	/*
 * This Script is written by 'Nitin' 
 *
 */

var counterForSampleName = 1;
var flagForChildDiv = false;
var flagForNewDivCreation = false;

var arrayForDiv = [];
var arrIndex = 0;
var callCounter = 1;

		

function addMoreSamplesForIllumina() 
{
	if (arrayForDiv.length > 0) 
	{
		for (var i = 0; i < arrayForDiv.length; i++) 
		{
			if (!validateNewCreatedDivElements(arrayForDiv[i])) 
			{
				alert("Fill the mandatory fields\nbefore adding new samples...!!");
				return false;
			} 
			else 
			{
				getIlluminaInputFiles();
				changeFunctionAttributesForDynamicDiv( arrayForDiv[arrIndex - 1] )
				arrOfFileList[arrIndex] = listOfFileForIllumina;
			}
		}
	}
	else 
	{
		if (!validateOldDivElements()) 
		{
			alert("Fill the mandatory fields\nbefore adding new sample...!!");
			return false;
		} 
		else 
		{
			changeFunctionAttributesForStaticDiv();
			getIlluInputFilesForOld();
			arrOfFileList[arrIndex] = listOfFileForIllumina;
			/*
			var existingNode = document.getElementById("cloneDiv");
			document.getElementById('cloneDiv').className += ' fragment'
			var dateSpan = document.createElement('span')
			dateSpan.innerHTML = '<span class="bgColorForCloseButton" style="position:absolute; left:10; top:30" onclick= "removeNewlyCreatedDiv(this.parentNode); return false;">CLOSE</span>';
			
			existingNode.appendChild(dateSpan);*/
		}
	}
	
	arrayForDiv.push(callCounter);
	
	var targetIdForOnchange = "selectSingleFileAdaptorFormGroupIllumina" + arrayForDiv[arrIndex];
	var node = document.createElement('div');
	node.id = 'childDiv' + arrayForDiv[arrIndex];
	node.className = "fragment";
	
// Sample Name

	node.innerHTML = '<span class="bgColorForCloseButton" onclick= "removeNewlyCreatedDiv(this.parentNode); return false;">CLOSE</span>'
			+ '<div class="form-group">'
			+ '<label class="control-label col-sm-4  col-lg-4 test textClass required">'
			+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sample Name:'
			+ '</label>'
			+ '<div class="col-sm-6 col-lg-6" id="idSampleNm'
			+ arrayForDiv[arrIndex]
			+ '">'
			+ '<input class="form-control" type="text" id="idSampleNameIlluminaQc'
			+ arrayForDiv[arrIndex]
			+ '" placeholder="Sample Name'
			+ '" onblur="warningForEmptyField(this.id, this.parentNode.id)"></input>'
			+ '</div>'
			+ '</div>'

			// Sequencing Layout

			+ '<div id="illuminaInputFormDiv'
			+ arrayForDiv[arrIndex]
			+ '">'
			+ '<div class="form-group">'
			+ '<label class="control-label col-sm-4 col-lg-4 textClass" for="pwd">'
			+ '<span class="glyphicon glyphicon-question-sign iconSmallClass textClass"'
			+ 'data-placement="left" data-toggle="tooltip"'
			+ 'title="Sequencing Layout:\n 1) paired end sequencing layout.\n 2) Single end sequencing layout."></span>'
			+ '&nbsp;'
			+ 'Sequencing Read Layout:'
			+ '</label>'
			+ '<div class="col-sm-6 col-lg-6">'
			+ '<select class="form-control" id="idInputReadTypeQCIllumina' + arrayForDiv[arrIndex] + '"'
			+ 'onchange="changeOptionQCIlluminaForNewDiv(this,' + arrayForDiv[arrIndex] + ');">'
			+ '<option value="Paired" selected="selected">Paired</option>'
			+ '<option value="Single">Single</option>'
			+ '</select>'
			+ '</div>'
			+ '</div>'

			/*
			 * + '<div class="form-group">' + '<label class="control-label
			 * col-sm-4 col-lg-4 textClass" for="pwd">' + '<span
			 * class="glyphicon glyphicon-question-sign iconSmallClass
			 * textClass"' + 'data-placement="left" data-toggle="tooltip"' +
			 * 'title="Input sequence file format."></span>' +
			 * '&nbsp;&nbsp;&nbsp;' + 'Sequence file format' + '</label>' + '<div
			 * class="col-sm-6 col-lg-6">' + '<select id="idSequenceType' +
			 * arrayForDiv[arrIndex] + '">' + '<option value="fq"
			 * selected="selected">Fastq</option>' + '<option value="fa">Fasta</option>' + '</select>' + '</div>' + '</div>'
			 */

			// Adaptor Library

			+ '<div class="form-group">'
			+ '<label class="control-label col-sm-4  col-lg-4 textClass" for="email">'
			+ '<span class=" glyphicon glyphicon-question-sign iconSmallClass textClass" '
			+ 'data-placement="left" data-html="true"'
			+ 'data-toggle="tooltip"'
			+ 'title="1=Genomic DNA/Chip-seq,\n 2=Paired End DNA,\n 3=DpnII gene expression,\n 4=NlaIII gene expression,\n 5=Small RNA Library,\n 6=Multiplexing DNA,\n N = Do not filter for Primer/Adaptor,\n file = File for user defined primer/adaptor sequences, one per line">'
			+ '</span>'
			+ '&nbsp;'
			+ 'Primer/Adaptor Libraries:'
			+ '</label>'
			+ '<div class="col-sm-6 col-lg-6">'
			+ '<select class="form-control" id="idAdaptorLibrariesValueIllumina'
			+ arrayForDiv[arrIndex]
			+ '" onchange="onChangeAdaptorLibrariesValueForNewDivForIllumina(this,'
			+ targetIdForOnchange
			+ ');">'
			+ '<option value="file">Custom Adaptor File</option>'
			+ '<option value="1">1</option>'
			+ '<option value="2" selected="selected">2</option>'
			+ '<option value="3">3</option>'
			+ '<option value="4">4</option>'
			+ '<option value="4">5</option>'
			+ '<option value="5">6</option>'
			+ '<option value="N">N</option>'
			+ '</select>'
			+ '</div>'
			+ '</div>'

			// primer / adaptor library file

			+ '<div class="form-group" style="display: none;" id="selectSingleFileAdaptorFormGroupIllumina'
			+ arrayForDiv[arrIndex]
			+ '">'
			+ '<label class="control-label col-sm-4  col-lg-4 textClass required" for="pwd">'
			+ '<span class=" glyphicon glyphicon-question-sign iconSmallClass textClass"'
			+ 'data-placement="left" data-html="true" data-toggle="tooltip"'
			+ 'title="File for user defined OR Custom primer/adaptor sequences, one per line">'
			+ '</span>'
			+ '&nbsp;Select Custom Adapter File:'
			+ '</label>'
			+ '<div class="col-sm-6 col-lg-6" id="idForAdapterFileDiv'
			+ arrayForDiv[arrIndex]
			+ '">'
			+ '<input type="button" class="col-sm-4  col-lg-4  btn-file" id="idBrowseIlluminaSingleFileAdaptor' + arrayForDiv[arrIndex] + '"'
			+ 'data-toggle="modal" data-target="#selectFile" placeholder="Select single file"'
//			+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
			+ 'onclick="getAllDirectoryForDynamicDiv(\'idSingleFileAdaptorSelectIllumina' + arrayForDiv[arrIndex] + '\');"'
			+ 'accept=".fa" value="BROWSE..."></input>'
			+ '<div id="idSingleFileAdaptorSelectIllumina'
			+ arrayForDiv[arrIndex]
			+ '"'
			+ 'class="col-sm-6 col-lg-6 text-left">No file selected</div>'
			+ '</div>'
			+ '</div>'
			
			// FastQVarient Options

			+ '<div class="form-group">'
			+ '<label class="control-label col-sm-4  col-lg-4 textClass" for="email">'
			+ '<span class=" glyphicon glyphicon-question-sign iconSmallClass textClass"'
			+ 'data-placement="left" data-html="true" data-toggle="tooltip"'
			+ 'title="1=Sanger (Phred+33, 33 to 73),\n 2=Solexa (Phred+64, 59 to 104),\n 3=Illumina (1.3+) (Phred+64, 64 to 104),\n 4=Illumina (1.5+) (Phred+64, 66 to 104),\n 5=Illumina (1.8+) (Phred+33, 33 to 74),\n A = Automatic detection of FASTQ variant">'
			+ '</span>'
			+ '&nbsp;'
			+ 'FASTQ Variants:'
			+ '</label>'
			+ '<div class="col-sm-6 col-lg-6">'
			+ '<select class="form-control"'
			+ 'id="idAdaptorLibrariesValueIlluminaFastaVarient'
			+ arrayForDiv[arrIndex]
			+ '">'
			+ '<option value="A" selected="selected">A</option>'
			+ '<option value="1">1</option>'
			+ '<option value="2">2</option>'
			+ '<option value="3">3</option>'
			+ '<option value="4">4</option>'
			+ '<option value="5">5</option>'
			+ '</select>'
			+ '</div>'
			+ '</div>'

			// R1 file

			+ '<div class="form-group" id="idFirstFileSelectParentIlluminaDiv'
			+ arrayForDiv[arrIndex]
			+ '">'
			+ '<label class="control-label col-sm-4  col-lg-4 textClass required"'
			+ 'for="pwd" id="lableFastqFileSelect">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select Left / R1 File:</label>'
			+ '<div class="col-sm-6 col-lg-6" id="idFirstFileSelectIlluminaDiv'
			+ arrayForDiv[arrIndex]
			+ '">'
			+ '<input type="button" class="col-sm-4  col-lg-4  btn-file "'
			+ 'data-toggle="modal" data-target="#selectFile"'
			+ 'placeholder="Select right file" id="idFirstFileBrowseIllumina"'
			+ 'onclick="getAllDirectoryForDynamicDiv(\'idFirstFileSelectIllumina' + arrayForDiv[arrIndex] + '\');"'
			+ 'accept=".fa" value="BROWSE..."></input>'
			+ '<div id="idFirstFileSelectIllumina'
			+ arrayForDiv[arrIndex]
			+ '" class="col-sm-6 col-lg-6 text-left"> No file selected</div>'
			+ '</div>'
			+ '</div>'

			// R2 file

			+ '<div class="form-group" id="idSecondFileParentSelectIlluminaDiv'
			+ arrayForDiv[arrIndex]
			+ '">'
			+ '<label class="control-label col-sm-4  col-lg-4 textClass required"'
			+ 'for="pwd">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select Right / R2 File:</label>'
			+ '<div class="col-sm-6 col-lg-6" id="idSecondFileSelectIlluminaDiv'
			+ arrayForDiv[arrIndex]
			+ '">'
			+ '<input type="button" class="col-sm-4  col-lg-4  btn-file "'
			+ 'data-toggle="modal" data-target="#selectFile"'
			+ 'placeholder="Select right file" id="idSecondFileBrowseIllumina'
			+ arrayForDiv[arrIndex]
			+ '"'
			+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
			+ 'accept=".fa" value="BROWSE..."></input>'
			+ '<div id="idSecondFileSelectIllumina'
			+ arrayForDiv[arrIndex]
			+ '" class="col-sm-6 col-lg-6 text-left">No file selected</div>'
			+ '</div>'
			+ '</div>'

			// Singleinput file

			+ '<div class="form-group" style="display: none;" id="selectSingleFileFormGroupIllumina'
			+ arrayForDiv[arrIndex]
			+ '">'
			+ '<label class="control-label col-sm-4  col-lg-4 textClass required"'
			+ 'for="pwd" id="lableSingleFileSelectIllumina">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select Single-End Input File:</label>'
			+ '<div class="col-sm-6 col-lg-6" id="idSingleFileSelectIlluminaDiv'
			+ arrayForDiv[arrIndex]
			+ '">'
			+ '<input type="button" class="col-sm-4  col-lg-4  btn-file "'
			+ 'data-toggle="modal" data-target="#selectFile"'
			+ 'placeholder="Select single file" id="idBrowseSingleEndIlluminaFile' + arrayForDiv[arrIndex] + '"' 
			+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
			+ 'accept=".fa" value="BROWSE..."></input>'
			+ '<div id="idSingleFileSelectIllumina'
			+ arrayForDiv[arrIndex]
			+ '" class="col-sm-6 col-lg-6 text-left">No file selected</div>'
			+ '</div>' 
			+ '</div>'
			
			+ '</div>'
	// Add more sample button

	var myDivClasses = document.getElementById('idChildDiv').classList;
	if (document.getElementById("addMoreSampleDiv") != null) {
		var element = document.getElementById("addMoreSampleDiv");
		element.parentNode.removeChild(element);
	}

	var AddSamplenode = document.createElement('div');
	AddSamplenode.id = 'addMoreSampleDiv';
	AddSamplenode.innerHTML = '<div class="form-group" id="addMoreSampleDiv">'
			+ '<label class="control-label col-sm-4  col-lg-4 test textClass"></label>'
			+ '<div class="col-sm-6 col-lg-6">'
			+ '<a class="btn btn-default bgColorForButton" onclick="addMoreSamplesForIllumina();">+ Add More Samples</a>'
			+ '</div>' + '</div>'

	document.getElementById("idChildDiv").appendChild(node);
	document.getElementById("idChildDiv").appendChild(AddSamplenode);

	callCounter = callCounter + 1;
	arrIndex = arrIndex + 1;
}

function removeNewlyCreatedDiv(inputElement) 
{
	var tempElementId = inputElement.id;
	var tempCallCounter = tempElementId.match(/\d+/);
	var div = document.getElementById(inputElement.id);

	if (div) {
		div.parentNode.removeChild(div);
	}

	var value = arrayForDiv.splice(arrayForDiv
			.indexOf(parseInt(tempCallCounter)), 1);
	value = arrOfFileList.splice(
			arrayForDiv.indexOf(parseInt(tempCallCounter)), 1);

	arrIndex = arrIndex - 1;
}

function getChildDivIdForFileSelect(parentID) 
{
	var children = [].slice.call(document.getElementById(parentID)
			.getElementsByTagName('*'), 0);

	var elemnts = new Array(children.length);
	var arrayLength = children.length;
	for (var i = 0; i < arrayLength; i++) {
		var name = children[i].getAttribute("id");
		elemnts[i] = name;
	}
	return elemnts[3];
}

// Warning message for the value exceed than Maximum value

function blurFunctionForMaxLimit(IdforDiv, idForParentDiv, MaxVal, defaultValue) 
{
	var inputVal = document.getElementById(IdforDiv).value;
	var myDivClasses = document.getElementById(IdforDiv).classList;

	if (inputVal > MaxVal)
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}

		creatNewDiv(MaxVal, idForParentDiv, defaultValue);
		$('#childDiv').show();
	}
	else if(!inputVal)
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}

		creatNewDivForEmptyField(idForParentDiv);
		$('#childDiv').show();
	}
	else 
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		if (myDivClasses.contains("myErrorBorder")) 
		{
			myDivClasses.remove("myErrorBorder");
		}
	}
}

function creatNewDiv(MaxValueForNewDiv, idForParentDivReuiredForNewDiv, defaultValueForNewDiv) 
{
	var node = document.createElement('div');
	node.id = 'childDiv';
	node.className = 'alert alert-warning fade in myErrorBorder';
	node.innerHTML = '<a href="#" class="close" data-dismiss="alert">&times;</a>'
			+ '<strong>Warning!</strong> you can not enter the value beyond '
			+ MaxValueForNewDiv
			+ '. Otherwise program will run with default value = '
			+ defaultValueForNewDiv + " ." + '</div>';

	document.getElementById("" + idForParentDivReuiredForNewDiv).appendChild(node);
}

function blurFunctionForMinLimit(IdforDiv, idForParentDiv, MinVal, defaultValue) 
{
	var inputVal = document.getElementById(IdforDiv).value;
	var myDivClasses = document.getElementById(IdforDiv).classList;

	if (inputVal < MinVal) 
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		creatNewDivForMinVal(MinVal, idForParentDiv, defaultValue);
		$('#childDiv').show();
	}
	else if(!inputVal)
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}

		creatNewDivForEmptyField(idForParentDiv);
		$('#childDiv').show();
	}
	else 
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		if (myDivClasses.contains("myErrorBorder")) 
		{
			myDivClasses.remove("myErrorBorder");
		}
	}
}

function creatNewDivForMinVal(MinValueForNewDiv, idForParentDivReuiredForNewDiv, defaultValueForNewDiv) 
{
	var node = document.createElement('div');
	node.id = 'childDiv';
	node.className = 'alert alert-warning fade in myErrorBorder';
	node.innerHTML = '<a href="#" class="close" data-dismiss="alert">&times;</a>'
			+ '<strong>Warning!</strong> you can not enter the value less than '
			+ MinValueForNewDiv
			+ '. Otherwise program will run with default value = '
			+ defaultValueForNewDiv + " ." + '</div>';

	document.getElementById("" + idForParentDivReuiredForNewDiv).appendChild(
			node);
}

// Warning for the values exceed than the range

function blurFunctionForMaxAndMinLimit(IdforDiv, idForParentDiv, MaxVal, MinVal, defaultValue) 
{
	var inputVal = document.getElementById(IdforDiv).value;
	var myDivClasses = document.getElementById(IdforDiv).classList;

	if (inputVal < MinVal || inputVal > MaxVal) 
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}

		creatNewDivForRangeValue(MinVal, MaxVal, idForParentDiv, defaultValue);
		$('#childDiv').show();
	} 
	else if(!inputVal)
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}

		creatNewDivForEmptyField(idForParentDiv);
		$('#childDiv').show();
	}
	else 
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		if (myDivClasses.contains("myErrorBorder")) 
		{
			myDivClasses.remove("myErrorBorder");
		}
	}
}

function blurFunctionForMaxAndMinLimitForCPU(IdforDiv, idForParentDiv, idForCpuInfo, MinVal, defaultValue)
{
	var inputVal = document.getElementById(IdforDiv).value;
	var myDivClasses = document.getElementById(IdforDiv).classList;
	var MaxVal = parseInt( document.getElementById(idForCpuInfo).innerHTML );
	
	if(!inputVal)
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForEmptyField( idForParentDiv);
		$( '#childDiv' ).show();
	}
	else if((inputVal < MinVal) || (inputVal > MaxVal))
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForRangeValue(MinVal, MaxVal, idForParentDiv, defaultValue);
		$( '#childDiv' ).show();
	}
	else
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		if (myDivClasses.contains("myErrorBorder")) 
		{
			myDivClasses.remove("myErrorBorder");
		}
	}
}

function creatNewDivForRangeValue(MinValueForNewDiv, MaxValueForNewDiv,
		idForParentDivReuiredForNewDiv, defaultValueForNewDiv) {
	var node = document.createElement('div');
	node.id = 'childDiv';
	node.className = 'alert alert-warning fade in myErrorBorder';
	node.innerHTML = '<a href="#" class="close" data-dismiss="alert">&times;</a>'
			+ '<strong>Warning!</strong> you can not enter the value less than '
			+ MinValueForNewDiv
			+ ' And greater than '
			+ MaxValueForNewDiv
			+ ". Otherwise program will run with default value = "
			+ defaultValueForNewDiv + " ." + '</div>';

	document.getElementById("" + idForParentDivReuiredForNewDiv).appendChild(
			node);
}

// Warning message for empty Field

function warningForEmptyField(fieldName, idForParentDiv) 
{
	var inputVal = document.getElementById(fieldName).value;
	var myDivClasses = document.getElementById(fieldName).classList;
	
	if (inputVal == "") 
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}

		creatNewDivForEmptyField(idForParentDiv);
		$('#childDiv').show();
	}
	else if(!inputVal)
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}

		creatNewDivForEmptyField(idForParentDiv);
		$('#childDiv').show();		
	}
	else 
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		if (myDivClasses.contains("myErrorBorder")) 
		{
			myDivClasses.remove("myErrorBorder");
		}

		if (arrOfFileList.length > 0) 
		{
			var tempElementOfArrOfFileList = arrOfFileList[location];
			var tempSplittedContents = tempElementOfArrOfFileList.split(";");
		}
	}
}

function onblurFunctionOnRecall(fieldName, idForParentDiv, divNumber, indexOfElement) 
{
	var inputVal = document.getElementById(fieldName).value;
	var myDivClasses = document.getElementById(fieldName).classList;

	if (inputVal == "") 
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}

		creatNewDivForEmptyField(idForParentDiv);
		$('#childDiv').show();
	}
	else if(!inputVal)
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}

		creatNewDivForEmptyField(idForParentDiv);
		$('#childDiv').show();		
	}
	else 
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		if (myDivClasses.contains("myErrorBorder")) 
		{
			myDivClasses.remove("myErrorBorder");
		}
	}
	
	getIlluminaInputFilesOnRecall(divNumber);
	arrOfFileList[divNumber] = listOfFileForIllumina;
}

function creatNewDivForEmptyField(idForParenDivNewDiv) 
{
	var node = document.createElement('div');
	node.id = 'childDiv';
	node.className = 'alert alert-warning fade in myErrorBorder';
	node.innerHTML = '<a href="#" class="close" data-dismiss="alert">&times;</a>'
			+ '<strong>Warning!</strong> This field is mandatory...!!.'
			+ '</div>';

	document.getElementById("" + idForParenDivNewDiv).appendChild(node);
}

// Warning message for input Files

function warningForFileOrFolders(fieldName, idForParentDiv, value) 
{
	var inputVal = document.getElementById(fieldName).innerHTML;
	var myDivClasses = document.getElementById(idForParentDiv).classList;

	if (inputVal == value) 
	{
		if (document.getElementById("childDiv") != null) {
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}

		creatNewDivForFileOrFolder(idForParentDiv);
		$('#childDiv').show();
	}
	else 
	{
		if (document.getElementById("childDiv") != null) 
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}	
	}
}

function creatNewDivForFileOrFolder(idForParenDivNewDiv) {
	var node = document.createElement('div');
	node.id = 'childDiv';
	node.className = 'alert alert-warning fade in myErrorBorder';
	node.innerHTML = '<a href="#" class="close" data-dismiss="alert">&times;</a>'
			+ '<strong>Warning!</strong> Please select the file/folder.'
			+ '</div>';

	document.getElementById("" + idForParenDivNewDiv).appendChild(node);
}

function removeAddedClass(idForParentDiv) {
	var myDivClasses = document.getElementById(idForParentDiv).classList;
	if (document.getElementById("childDiv") != null) {
		var element = document.getElementById("childDiv");
		element.parentNode.removeChild(element);
	}
	if (myDivClasses.contains("myErrorBorder")) {
		myDivClasses.remove("myErrorBorder");
	}
}

function changeFunctionAttributesForStaticDiv()
{
	$("#idSampleNameIlluminaQc").attr("onblur", "onblurFunctionOnRecall(this.id, 'idSampleNm',0,0)");
	$("#idInputReadTypeQCIllumina").attr("onchange", "changeOptionQCIlluminaOnRecall(this,0,1);");
	
	if(document.getElementById("idInputReadTypeQCIllumina").value == "Paired")
	{
		$("#idFirstFileBrowseIllumina").attr("onclick", "getAllDirectoryOnRecall('idFirstFileSelectIllumina','txt',0,2);");
		$("#idSecondFileBrowseIllumina").attr("onclick", "getAllDirectoryOnRecall('idSecondFileSelectIllumina','txt',0,3);");
		$("#idAdaptorLibrariesValueIllumina").attr("onchange", "onChangeAdaptorLibrariesValueIlluminaOnRecall(this,0,4);");
		$("#idBrowseIlluminaSingleFileAdaptor").attr("onclick", "getAllDirectoryOnRecall('idSingleFileAdaptorSelectIllumina','txt',0,4);");
		$("#idAdaptorLibrariesValueIlluminaFastaVarient").attr("onchange", "onChangeOptionForFastQVarOnRecall(this,0,5)");
	}
	else
	{
		$("#idBrowseSingleEndIlluminaFile").attr("onclick", "getAllDirectoryOnRecall('idSingleFileSelectIllumina','txt',0,2);");
		$("#idAdaptorLibrariesValueIllumina").attr("onchange", "onChangeAdaptorLibrariesValueIlluminaOnRecall(this,0,3);");
		$("#idBrowseIlluminaSingleFileAdaptor").attr("onclick", "getAllDirectoryOnRecall('idSingleFileAdaptorSelectIllumina','txt',0,3);");
		$("#idAdaptorLibrariesValueIlluminaFastaVarient").attr("onchange", "onChangeOptionForFastQVarOnRecall(this,0,4)");
	}
}

function changeFunctionAttributesForDynamicDiv( inputArrIndex )
{
	$("#idSampleNameIlluminaQc" + inputArrIndex).attr("onblur", "onblurFunctionOnRecall(this.id, 'idSampleNm" + inputArrIndex + "'," + inputArrIndex + ",0)");
	$("#idInputReadTypeQCIllumina" + inputArrIndex).attr("onchange", "changeOptionQCIlluminaOnRecall(this," + inputArrIndex + ",1);");
	
	if(document.getElementById("idInputReadTypeQCIllumina" + inputArrIndex).value == "Paired")
	{
		$("#idFirstFileBrowseIllumina" + inputArrIndex).attr("onclick", "getAllDirectoryOnRecall('idFirstFileSelectIllumina" + inputArrIndex + "','txt'," + inputArrIndex + ",2);");
		$("#idSecondFileBrowseIllumina" + inputArrIndex).attr("onclick", "getAllDirectoryOnRecall('idSecondFileSelectIllumina" + inputArrIndex + "','txt'," + inputArrIndex + ",3);");

		$("#idAdaptorLibrariesValueIllumina" + inputArrIndex).attr("onchange", "onChangeAdaptorLibrariesValueIlluminaOnRecall(this," + inputArrIndex + ",4);");
		$("#idBrowseIlluminaSingleFileAdaptor" + inputArrIndex).attr("onclick", "getAllDirectoryOnRecall('idSingleFileAdaptorSelectIllumina" + inputArrIndex + "','txt'," + inputArrIndex + ",4);");
		$("#idAdaptorLibrariesValueIlluminaFastaVarient" + inputArrIndex).attr("onchange", "onChangeOptionForFastQVarOnRecall(this," + inputArrIndex + ",5)");
	}
	else
	{
		$("#idBrowseSingleEndIlluminaFile"+ inputArrIndex).attr("onclick", "getAllDirectoryOnRecall('idSingleFileSelectIllumina" + inputArrIndex + "','txt'," + inputArrIndex + ",2);");
		$("#idAdaptorLibrariesValueIllumina" + inputArrIndex).attr("onchange", "onChangeAdaptorLibrariesValueIlluminaOnRecall(this," + inputArrIndex + ",3);");
		$("#idBrowseIlluminaSingleFileAdaptor" + inputArrIndex).attr("onclick", "getAllDirectoryOnRecall('idSingleFileAdaptorSelectIllumina" + inputArrIndex + "','txt'," + inputArrIndex + ",3);");
		$("#idAdaptorLibrariesValueIlluminaFastaVarient" + inputArrIndex).attr("onchange", "onChangeOptionForFastQVarOnRecall(this," + inputArrIndex + ",4)");
	}
}


