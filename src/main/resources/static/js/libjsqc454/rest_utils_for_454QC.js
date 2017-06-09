/*
 * This Script is written by 'Nitin' 
*/

var counterForSampleName = 1;
var flagForChildDiv = false;
var flagForNewDivCreation = false;

var arrayForDiv = [];
var arrIndex = 0;
var callCounter = 1;

function addMoreSamples()
{
	if (arrayForDiv.length > 0) 
	{
		for (var i = 0; i < arrayForDiv.length; i++) 
		{
			if (!validateNewCreatedDivElementsFor454(arrayForDiv[i])) 
			{
				alert("Fill the mandatory fields\nbefore adding new samples...!!");
				return false;
			} 
			else 
			{
				getFilesForNewCreatedDiv();
				changeFunctionAttributesForDynamicDiv( arrayForDiv[arrIndex - 1] )
				arrOfFileList[arrIndex] = listOfFile;
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
			getFilesForSingleSample();
			changeFunctionAttributesForStaticDiv();
			arrOfFileList[arrIndex] = listOfFile;
		}
	}

	if(document.getElementById("idInputReadTypeQCIllumina").value == "Single")
	{
		flagForChildDiv = true;
	}
	else
	{
		flagForChildDiv = false;
	}
	
	if(flagForChildDiv)
	{
		arrayForDiv.push(callCounter);

		var targetIdForOnchange = "selectSingleFileFormGroup" + arrayForDiv[arrIndex];
		var node = document.createElement('div');
		var testDiv = "idSingleFileSelect" + arrayForDiv[arrIndex];
		String(testDiv);
		var testExtension = "txt";
		String(testExtension);
		node.id = 'childDiv' + arrayForDiv[arrIndex];
		node.className = "fragment";

//		Sample Name
			
		node.innerHTML = '<span class="bgColorForCloseButton" onclick= "removeNewlyCreatedDiv(this.parentNode); return false;">CLOSE</span>'
						+ '<div class="form-group">'
						+ '<label class="control-label col-sm-4  col-lg-4 test textClass required">'
						+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sample Name:'
						+ '</label>'
						+ '<div class="col-sm-6 col-lg-6" id="idSampleNm' + arrayForDiv[arrIndex] + '">'
						+ '<input class="form-control" type="text" id="idSampleName454Qc' + arrayForDiv[arrIndex] + '" placeholder="Sample Name' 
						+ '" onblur="warningForEmptyField(this.id, this.parentNode.id)"></input>' 
						+ '</div>'
						+ '</div>'
							
//							Adaptor Library
							
						+ '<div class="form-group">'
						+ '<label class="control-label col-sm-4  col-lg-4 textClass" for="email">'
						+ '<span class=" glyphicon glyphicon-question-sign iconSmallClass textClass" data-placement="left" data-html="true" data-toggle="tooltip"' 
						+ 'title="1 = Rapid Library (Standard),\n'
						+ '2 = Paired End Library,\n'
						+ '3 = Amplicon PE Library,\n'
						+ '4 = Small RNA Library,\n'
						+ 'N = Do not filter for Primer/Adaptor,\n'
						+ 'file = File for user defined primer/adaptor sequences, one per line"> </span>'
						+ '&nbsp;'
						+ 'Primer/Adaptor libraries:'
						+ '</label>'
						+ '<div class="col-sm-6 col-lg-6">'
						+ '<select class="form-control" id="idAdaptorLibrariesValue' + arrayForDiv[arrIndex] + '" onchange="onChangeAdaptorLibrariesValueForNewDiv(this,' + targetIdForOnchange + ');">'
						+ '<option value="file">Custom Adaptor File</option>'
						+ '<option value="1">1</option>'
						+ '<option value="2" selected="selected">2</option>'
						+ '<option value="3">3</option>'
						+ '<option value="4">4</option>'
						+ '<option value="N">N</option>'
						+ '</select>'
						+ '</div>'
						+ '</div>'
						
//						primer adaptor library file
							
						+ '<div class="form-group" style="display: none;" id="selectSingleFileFormGroup' + arrayForDiv[arrIndex] + '">'
						+ '<label class="control-label col-sm-4  col-lg-4 textClass required" for="pwd">'
						+ '<span class=" glyphicon glyphicon-question-sign iconSmallClass textClass"'
						+ 'data-placement="left" data-html="true" data-toggle="tooltip"'
						+ 'title="File for user defined OR Custom primer/adaptor sequences, one per line">'
						+'</span>'
						+ '&nbsp;'
						+ 'Select Primer/Adapter file:'
						+ '</label>'
						+ '<div class="col-sm-6 col-lg-6" id="idForAdapterFileDiv' + arrayForDiv[arrIndex] + '">'
						+ '<input type="button" class="col-sm-4  col-lg-4  btn-file" data-toggle="modal"'
						+ 'data-target="#selectFile" placeholder="Select single file" id="idBroweAdaptorFile' + arrayForDiv[arrIndex] + '"'
						+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
						+ 'accept=".fa" value="BROWSE..."></input>'
						+ '<div id="idSingleFileSelect' + arrayForDiv[arrIndex] + '"'
						+ 'class="col-sm-6 col-lg-6 text-left">No file selected</div>'
						+ '</div>'
						+ '</div>'

//						input fasta file
							
						+ '<div id="fileSelectionDiv' + arrayForDiv[arrIndex] + '">'
						+ '<div class="form-group" id="selectFastaFileFormGroup' + arrayForDiv[arrIndex] + '">'
						+ '<label class="control-label col-sm-4  col-lg-4 textClass required" for="pwd">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select input fasta file:</label>'
						+ '<div class="col-sm-6 col-lg-6" id="idForInputFileDiv' + arrayForDiv[arrIndex] + '">'
						+ '<input type="button" class="col-sm-4  col-lg-4  btn-file"'
						+ 'data-toggle="modal" data-target="#selectFile"'
						+ 'placeholder="Select right file" id="idFastaFileBrowse' + arrayForDiv[arrIndex] +'"'
						+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
						+ 'accept=".fa" value="BROWSE..."></input>'
						+ '<div id="idFastaFileSelect' + arrayForDiv[arrIndex] + '" class="col-sm-6 col-lg-6 text-left">No file selected</div>'
						+ '</div>'
						+ '</div>'
						
//						quality file
							
						+ '<div class="form-group" id="selectLeftFileFormGroup' + arrayForDiv[arrIndex] + '">'
						+ '<label class="control-label col-sm-4  col-lg-4 textClass required"'
						+ 'for="pwd">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select quality file:</label>'
						+ '<div class="col-sm-6 col-lg-6" id="idForQualityFileDiv' + arrayForDiv[arrIndex] + '">'
						+ '<input type="button" class="col-sm-4  col-lg-4  btn-file "'
						+ 'data-toggle="modal" data-target="#selectFile"'
						+ 'placeholder="Select right file" id="idQualityFileBrowse' + arrayForDiv[arrIndex] + '"'
						+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
						+ 'accept=".fa" value="BROWSE..."></input>'
						+ '<div id="idQualityFileSelect' + arrayForDiv[arrIndex] + '" class="col-sm-6 col-lg-6 text-left">No file selected</div>'
						+ '</div>'
						+ '</div>'
						+ '</div>'
						
						+ '</div>';
			
		// Add more sample button	
			
			var myDivClasses = document.getElementById('cloneDiv').classList;
			if(document.getElementById("addMoreSampleDiv") != null)
			{
				var element = document.getElementById("addMoreSampleDiv");
				element.parentNode.removeChild(element);
			}
			
			var AddSamplenode = document.createElement('div');
			AddSamplenode.id = 'addMoreSampleDiv';
			AddSamplenode.innerHTML = '<div class="form-group" id="addMoreSampleDiv">'
							+ '<label class="control-label col-sm-4  col-lg-4 test textClass"></label>'
							+ '<div class="col-sm-6 col-lg-6">'
							+ '<a class="btn btn-default bgColorForButton" onclick="addMoreSamples();">+ Add More Samples</a>'
							+ '</div>'
							+ '</div>'
							
			document.getElementById("cloneDiv").appendChild(node);
			document.getElementById("cloneDiv").appendChild(AddSamplenode);
			
			callCounter = callCounter + 1;
			arrIndex = arrIndex + 1;
		}
		else
		{
			arrayForDiv.push(callCounter);

			var targetIdForOnchange = "selectSingleFileFormGroup" + arrayForDiv[arrIndex];
			var node = document.createElement('div');
			var testDiv = "idSingleFileSelect" + arrayForDiv[arrIndex];
			String(testDiv);
			var testExtension = "txt";
			String(testExtension);
			
			node.id = 'childDiv' + arrayForDiv[arrIndex];
			node.className = "fragment";

//						Sample Name
			
			node.innerHTML = '<span id="close" class="bgColorForCloseButton" onclick= "removeNewlyCreatedDiv(this.parentNode); return false;">CLOSE</span>'
							+ '<div class="form-group">'
							+ '<label class="control-label col-sm-4  col-lg-4 test textClass required">'
							+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sample Name:'
							+ '</label>'
							+ '<div class="col-sm-6 col-lg-6" id="idSampleNm' + arrayForDiv[arrIndex] + '">'
							+ '<input class="form-control" type="text" id="idSampleName454Qc' + arrayForDiv[arrIndex] + '" placeholder="Sample Name' 
							+ '" onblur="warningForEmptyField(this.id, this.parentNode.id)"></input>' 
							+ '</div>'
							+ '</div>'
							
//							Adaptor Library
							
							+ '<div class="form-group">'
							+ '<label class="control-label col-sm-4  col-lg-4 textClass" for="email">'
							+ '<span class=" glyphicon glyphicon-question-sign iconSmallClass textClass" data-placement="left" data-html="true" data-toggle="tooltip"' 
							+ 'title="1 = Rapid Library (Standard),\n'
							+ '2 = Paired End Library,\n'
							+ '3 = Amplicon PE Library,\n'
							+ '4 = Small RNA Library,\n'
							+ 'N = Do not filter for Primer/Adaptor,\n'
							+ 'file = File for user defined primer/adaptor sequences, one per line"> </span>'
							+ '&nbsp;'
							+ 'Primer/Adaptor libraries:'
							+ '</label>'
							+ '<div class="col-sm-6 col-lg-6">'
							+ '<select class="form-control" id="idAdaptorLibrariesValue' + arrayForDiv[arrIndex] + '" onchange="onChangeAdaptorLibrariesValueForNewDiv(this,' + targetIdForOnchange + ');">'
							+ '<option value="file">Custom Adaptor File</option>'
							+ '<option value="1">1</option>'
							+ '<option value="2" selected="selected">2</option>'
							+ '<option value="3">3</option>'
							+ '<option value="4">4</option>'
							+ '<option value="N">N</option>'
							+ '</select>'
							+ '</div>'
							+ '</div>'
							
//							primer adaptor library file
							
							+ '<div class="form-group" style="display: none;" id="selectSingleFileFormGroup' + arrayForDiv[arrIndex] + '">'
							+ '<label class="control-label col-sm-4  col-lg-4 textClass required" for="pwd">'
							+ '<span class=" glyphicon glyphicon-question-sign iconSmallClass textClass"'
							+ 'data-placement="left" data-html="true" data-toggle="tooltip"'
							+ 'title="File for user defined OR Custom primer/adaptor sequences, one per line">'
							+'</span>'
							+ '&nbsp;'
							+ 'Select Primer/Adapter file:'
							+ '</label>'
							+ '<div class="col-sm-6 col-lg-6" id="idForAdapterFileDiv' + arrayForDiv[arrIndex] + '">'
							+ '<input type="button" class="col-sm-4  col-lg-4  btn-file"'
							+ 'data-toggle="modal" data-target="#selectFile" placeholder="Select single file" id="idBroweAdaptorFile' + arrayForDiv[arrIndex] + '"' 
							+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
							+ 'accept=".fa" value="BROWSE..."></input>'
							+ '<div id="idSingleFileSelect' + arrayForDiv[arrIndex] + '"'
							+ 'class="col-sm-6 col-lg-6 text-left">No file selected</div>'
							+ '</div>'
							+ '</div>'

//							First input fasta file
							
							+ '<div id="fileSelectionDiv' + arrayForDiv[arrIndex] + '">'
							+ '<div class="form-group" id="selectFirstFastaFileFormGroup' + arrayForDiv[arrIndex] + '">'
							+ '<label class="control-label col-sm-4  col-lg-4 textClass required" for="pwd">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select input fasta file:</label>'
							+ '<div class="col-sm-6 col-lg-6" id="idForFirstInputFileDiv' + arrayForDiv[arrIndex] + '">'
							+ '<input type="button" class="col-sm-4  col-lg-4  btn-file"'
							+ 'data-toggle="modal" data-target="#selectFile"'
							+ 'placeholder="Select right file" id="idFastaFileBrowse' + arrayForDiv[arrIndex] + "'"
							+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
							+ 'accept=".fa" value="BROWSE..."></input>'
							+ '<div id="idFirstFastaFileSelect' + arrayForDiv[arrIndex] + '" class="col-sm-6 col-lg-6 text-left">No file selected</div>'
							+ '</div>'
							+ '</div>'
							
//							First quality file
							
							+ '<div class="form-group" id="selectFirstQualityFileFormGroup' + arrayForDiv[arrIndex] + '">'
							+ '<label class="control-label col-sm-4  col-lg-4 textClass required"'
							+ 'for="pwd">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select first quality file:</label>'
							+ '<div class="col-sm-6 col-lg-6" id="idForFirstQualityFileDiv' + arrayForDiv[arrIndex] + '">'
							+ '<input type="button" class="col-sm-4  col-lg-4  btn-file "'
							+ 'data-toggle="modal" data-target="#selectFile"'
							+ 'placeholder="Select right file" id="idFirstQualityFileBrowse' + arrayForDiv[arrIndex] + '"'
							+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
							+ 'accept=".fa" value="BROWSE..."></input>'
							+ '<div id="idFirstQualityFileSelect' + arrayForDiv[arrIndex] + '" class="col-sm-6 col-lg-6 text-left">No file selected</div>'
							+ '</div>'
							+ '</div>'
							
//							Second input fasta file
							
							+ '<div class="form-group" id="idForSecondInputDiv' + arrayForDiv[arrIndex] + '">'
							+ '<label class="control-label col-sm-4  col-lg-4 textClass required" for="pwd">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select input fasta file:</label>'
							+ '<div class="col-sm-6 col-lg-6" id="idForSecondInputFileDiv' + arrayForDiv[arrIndex] + '">'
							+ '<input type="button" class="col-sm-4  col-lg-4  btn-file"'
							+ 'data-toggle="modal" data-target="#selectFile"'
							+ 'placeholder="Select right file" id="idFastaFileBrowse' + arrayForDiv[arrIndex] + '"'
							+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
							+ 'accept=".fa" value="BROWSE..."></input>'
							+ '<div id="idSecondFastaFileSelect' + arrayForDiv[arrIndex] + '" class="col-sm-6 col-lg-6 text-left">No file selected</div>'
							+ '</div>'
							+ '</div>'
							
//							Second quality file
							
							+ '<div class="form-group" id="selectSecondQualityFileFormGroup' + arrayForDiv[arrIndex] + '">'
							+ '<label class="control-label col-sm-4  col-lg-4 textClass required"'
							+ 'for="pwd">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select second quality file:</label>'
							+ '<div class="col-sm-6 col-lg-6" id="idForSecondQualityFileDiv' + arrayForDiv[arrIndex] + '">'
							+ '<input type="button" class="col-sm-4  col-lg-4  btn-file "'
							+ 'data-toggle="modal" data-target="#selectFile"'
							+ 'placeholder="Select right file" id="idSecondQualityFileBrowse' + arrayForDiv[arrIndex] + '"'
							+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
							+ 'accept=".fa" value="BROWSE..."></input>'
							+ '<div id="idSecondQualityFileSelect' + arrayForDiv[arrIndex] + '" class="col-sm-6 col-lg-6 text-left">No file selected</div>'
							+ '</div>'
							+ '</div>'
							+ '</div>'
							
							+ '</div>';
			
		// Add more sample button	
			
			var myDivClasses = document.getElementById('cloneDiv').classList;
			if(document.getElementById("addMoreSampleDiv") != null)
			{
				var element = document.getElementById("addMoreSampleDiv");
				element.parentNode.removeChild(element);
			}
			
			var AddSamplenode = document.createElement('div');
			AddSamplenode.id = 'addMoreSampleDiv';
			AddSamplenode.innerHTML = '<div class="form-group" id="addMoreSampleDiv">'
							+ '<label class="control-label col-sm-4  col-lg-4 test textClass"></label>'
							+ '<div class="col-sm-6 col-lg-6">'
							+ '<a class="btn btn-default bgColorForButton" onclick="addMoreSamples();">+ Add More Samples</a>'
							+ '</div>'
							+ '</div>'
						
		document.getElementById("cloneDiv").appendChild(node);
		document.getElementById("cloneDiv").appendChild(AddSamplenode);
		
		callCounter = callCounter + 1;
		arrIndex = arrIndex + 1;
	}
}

function removeNewlyCreatedDiv(inputElement)
{
	var tempElementId = inputElement.id;
	var tempCallCounter = tempElementId.match(/\d+/);
	var div = document.getElementById(inputElement.id);
	
	if (div)
	{
	    div.parentNode.removeChild(div);
	}
	
	var value = arrayForDiv.splice( arrayForDiv.indexOf( parseInt(tempCallCounter) ), 1 );
	value = arrOfFileList.splice( arrayForDiv.indexOf( parseInt(tempCallCounter) ), 1 );
	
	arrIndex = arrIndex - 1;
}

function removeAllNewlyCreatedDiv()
{
	for (var int = 0; int < arrayForDiv.length; int++)
	{
		var div = document.getElementById("childDiv" + arrayForDiv[int]);
		if (div)
		{
		    div.parentNode.removeChild(div);
		}
	}
	arrOfFileList = [];
	arrayForDiv = [];
	arrIndex = 0;
	callCounter = 1;
}

function getChildDivIdForFileSelect(parentID)
{
	var children = [].slice.call(document.getElementById(parentID).getElementsByTagName('*'),0);

	var elemnts = new Array(children.length);
	var arrayLength = children.length;
	for (var i = 0; i < arrayLength; i++)
	{
	    var name = children[i].getAttribute("id");    
	    elemnts[i] = name;
	}
	return elemnts[3];
}

//Warning message for the value exceed than Maximum value

function blurFunctionForMaxLimit(IdforDiv, idForParentDiv, MaxVal, defaultValue)
{
	var inputVal = document.getElementById(IdforDiv).value;
	var myDivClasses = document.getElementById(IdforDiv).classList;
	
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
	else if( inputVal > MaxVal)
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDiv(MaxVal, idForParentDiv, defaultValue);
		$( '#childDiv' ).show();
	}
	else
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
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
					+ defaultValueForNewDiv
					+ " ."
					+ '</div>';

	document.getElementById("" + idForParentDivReuiredForNewDiv).appendChild(node);
}

function blurFunctionForMinLimit(IdforDiv, idForParentDiv, MinVal, defaultValue)
{
	var inputVal = document.getElementById(IdforDiv).value;
	var myDivClasses = document.getElementById(IdforDiv).classList;
	
	if(inputVal < MinVal)
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForMinVal(MinVal, idForParentDiv, defaultValue);
		$( '#childDiv' ).show();
	}
	else if(!inputVal)
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForEmptyField( idForParentDiv);
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

function creatNewDivForMinVal(MinValueForNewDiv, idForParentDivReuiredForNewDiv, defaultValueForNewDiv)
{
	var node = document.createElement('div');
	node.id = 'childDiv';
	node.className = 'alert alert-warning fade in myErrorBorder';
	node.innerHTML = '<a href="#" class="close" data-dismiss="alert">&times;</a>'
					+ '<strong>Warning!</strong> you can not enter the value less than '
					+ MinValueForNewDiv
					+ '. Otherwise program will run with default value = '
					+ defaultValueForNewDiv
					+ " ."
					+ '</div>';

	document.getElementById("" + idForParentDivReuiredForNewDiv).appendChild(node);
}

// Warning for the values exceed than the range

function blurFunctionForMaxAndMinLimit(IdforDiv, idForParentDiv, MaxVal, MinVal, defaultValue)
{
	var inputVal = document.getElementById(IdforDiv).value;
	var myDivClasses = document.getElementById(IdforDiv).classList;
	
	if(inputVal < MinVal || inputVal > MaxVal)
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForRangeValue(MinVal, MaxVal, idForParentDiv, defaultValue);
		$( '#childDiv' ).show();
	}
	else if(!inputVal)
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForEmptyField( idForParentDiv);
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
									idForParentDivReuiredForNewDiv, defaultValueForNewDiv)
{
	var node = document.createElement('div');
	node.id = 'childDiv';
	node.className = 'alert alert-warning fade in myErrorBorder';
	node.innerHTML = '<a href="#" class="close" data-dismiss="alert">&times;</a>'
					+ '<strong>Warning!</strong> you can not enter the value less than '
					+ MinValueForNewDiv
					+ ' And greater than '
					+ MaxValueForNewDiv
					+ ". Otherwise program will run with default value = "
					+ defaultValueForNewDiv
					+ " ."
					+ '</div>';

	document.getElementById("" + idForParentDivReuiredForNewDiv).appendChild(node);
}

// Warning message for empty Field

function warningForEmptyField(fieldName, idForParentDiv)
{
	var inputVal = document.getElementById(fieldName).value;
	var myDivClasses = document.getElementById(fieldName).classList;
	
	if(inputVal == "")
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForEmptyField(idForParentDiv);
		$( '#childDiv' ).show();
	}
	else if(!inputVal)
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForEmptyField( idForParentDiv);
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
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForEmptyField( idForParentDiv);
		$( '#childDiv' ).show();
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
	
	getFilesForNewCreatedDivOnRecall(divNumber);
	arrOfFileList[divNumber] = listOfFile;
}

function creatNewDivForEmptyField(idForParenDivNewDiv)
{
	var node = document.createElement('div');
	node.id = 'childDiv';
	node.className = 'alert alert-warning fade in myErrorBorder';
	node.innerHTML = '<a href="#" class="close" data-dismiss="alert">&times;</a>'
					+ '<strong>Warning!</strong>This field is mandatory...!!'
					+ '</div>';

	document.getElementById("" + idForParenDivNewDiv).appendChild(node);
}

//Warning message for input Files

function warningForFileOrFolders(fieldName, idForParentDiv, value)
{
	var inputVal = document.getElementById(fieldName).innerHTML;
	var myDivClasses = document.getElementById(idForParentDiv).classList;
	
	if(inputVal == value)
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForFileOrFolder(idForParentDiv);
		$( '#childDiv' ).show();
	}
	else if(!inputVal)
	{
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForEmptyField( idForParentDiv);
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
function creatNewDivForFileOrFolder(idForParenDivNewDiv)
{
	var node = document.createElement('div');
	node.id = 'childDiv';
	node.className = 'alert alert-warning fade in myErrorBorder';
	node.innerHTML = '<a href="#" class="close" data-dismiss="alert">&times;</a>'
					+ '<strong>Warning!</strong> Please select the file/folder.'
					+ '</div>';

	document.getElementById("" + idForParenDivNewDiv).appendChild(node);
}
function removeAddedClass(idForParentDiv)
{
	var myDivClasses = document.getElementById(idForParentDiv).classList;
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

function changeFunctionAttributesForStaticDiv()
{
	$("#idSampleName454Qc").attr("onblur", "onblurFunctionOnRecall(this.id, 'idSampleNm',0,0)");
	$("#idInputReadTypeQCIllumina").attr("onchange", "changeOptionQC454OnRecall(this,0,1);");
	
	if(document.getElementById("idInputReadTypeQCIllumina").value == "Paired")
	{/*
		$("#idFirstFileBrowseIllumina").attr("onclick", "getAllDirectoryOnRecall('idFirstFileSelectIllumina',0,2);");
		$("#idSecondFileBrowseIllumina").attr("onclick", "getAllDirectoryOnRecall('idSecondFileSelectIllumina',0,3);");
		$("#idAdaptorLibrariesValueIllumina").attr("onchange", "onChangeAdaptorLibrariesValueIlluminaOnRecall(this,0,4);");
		$("#idBrowseIlluminaSingleFileAdaptor").attr("onclick", "getAllDirectoryOnRecall('idSingleFileAdaptorSelectIllumina',0,4);");
		$("#idAdaptorLibrariesValueIlluminaFastaVarient").attr("onchange", "onChangeOptionForFastQVarOnRecall(this,0,5)");
	*/}
	else
	{
		$("#idAdaptorLibrariesValue").attr("onchange", "onChangeAdaptorLibrariesValueRecall(this,0,2);");
		$("#idBroweAdaptorFile").attr("onclick", "getAllDirectoryOnRecall('idSingleFileSelect','txt',0,2);");
		$("#idFastaFileBrowse").attr("onclick", "getAllDirectoryOnRecall('idFastaFileSelect','txt',0,3);");
		$("#idQualityFileBrowse").attr("onclick", "getAllDirectoryOnRecall('idQualityFileSelect','txt',0,4);");
	}
}

function changeFunctionAttributesForDynamicDiv( inputArrIndex )
{
	$("#idSampleName454Qc" + inputArrIndex).attr("onblur", "onblurFunctionOnRecall(this.id, 'idSampleNm" + inputArrIndex + "'," + inputArrIndex + ",0)");
	$("#idInputReadTypeQCIllumina" + inputArrIndex).attr("onchange", "changeOptionQC454OnRecall(this,0,1);");
	
	if(document.getElementById("idInputReadTypeQCIllumina").value == "Paired")
	{/*
		$("#idFirstFileBrowseIllumina" + inputArrIndex).attr("onclick", "getAllDirectoryOnRecall('idFirstFileSelectIllumina" + inputArrIndex + "'," + inputArrIndex + ",2);");
		$("#idSecondFileBrowseIllumina" + inputArrIndex).attr("onclick", "getAllDirectoryOnRecall('idSecondFileSelectIllumina" + inputArrIndex + "'," + inputArrIndex + ",3);");

		$("#idAdaptorLibrariesValueIllumina" + inputArrIndex).attr("onchange", "onChangeAdaptorLibrariesValueIlluminaOnRecall(this," + inputArrIndex + ",4);");
		$("#idBrowseIlluminaSingleFileAdaptor" + inputArrIndex).attr("onclick", "getAllDirectoryOnRecall('idSingleFileAdaptorSelectIllumina" + inputArrIndex + "'," + inputArrIndex + ",4);");
		$("#idAdaptorLibrariesValueIlluminaFastaVarient" + inputArrIndex).attr("onchange", "onChangeOptionForFastQVarOnRecall(this," + inputArrIndex + ",5)");
	*/}
	else
	{
		$("#idAdaptorLibrariesValue" + inputArrIndex).attr("onchange", "onChangeAdaptorLibrariesValueRecall(this," + inputArrIndex + ",2);");
		$("#idBroweAdaptorFile" + inputArrIndex).attr("onclick", "getAllDirectoryOnRecall('idSingleFileSelect" + inputArrIndex + "','txt'," + inputArrIndex + ",2);");
		$("#idFastaFileBrowse" + inputArrIndex).attr("onclick", "getAllDirectoryOnRecall('idFastaFileSelect" + inputArrIndex + "','txt'," + inputArrIndex + ",3);");
		$("#idQualityFileBrowse" + inputArrIndex).attr("onclick", "getAllDirectoryOnRecall('idQualityFileSelect" + inputArrIndex + "','txt'," + inputArrIndex + ",4);");
	}
}