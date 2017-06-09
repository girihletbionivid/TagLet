/*
 * This Script is written by 'Nitin' 
*/

var callAddMoreSampleForIllumina = 1;
var flagForChildDiv = false;

// Warning message for the value exceed than Maximum value

function blurFunctionForMaxLimit(IdforDiv, idForParentDiv, MaxVal, defaultValue)
{
	var inputVal = document.getElementById(IdforDiv).value;
	var myDivClasses = document.getElementById(IdforDiv).classList;
	
	if(inputVal > MaxVal)
	{
		myDivClasses.add("myErrorBorder");
		
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
	node.className = 'alert alert-warning fade in';
	node.innerHTML = '<a href="#" class="close" data-dismiss="alert">&times;</a>'
					+ '<strong>Warning!</strong> you can not enter the value beyond '
					+ MaxValueForNewDiv
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
		myDivClasses.add("myErrorBorder");
		
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
	node.className = 'alert alert-warning fade in';
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
//	alert(fieldName + "\n" + idForParentDiv)
	var inputVal = document.getElementById(fieldName).value;
	var myDivClasses = document.getElementById(fieldName).classList;
	
	if(inputVal == "")
	{
		myDivClasses.add("myErrorBorder");
		
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForEmptyField(idForParentDiv);
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
function creatNewDivForEmptyField(idForParenDivNewDiv)
{
	var node = document.createElement('div');
	node.id = 'childDiv';
	node.className = 'alert alert-warning fade in';
	node.innerHTML = '<a href="#" class="close" data-dismiss="alert">&times;</a>'
					+ '<strong>Warning!</strong> you can not left this field empty.'
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
		myDivClasses.add("myErrorBorder");
		
		if(document.getElementById("childDiv") != null)
		{
			var element = document.getElementById("childDiv");
			element.parentNode.removeChild(element);
		}
		
		creatNewDivForFileOrFolder(idForParentDiv);
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
	node.className = 'alert alert-warning fade in';
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
function addMoreSamples()
{
	flagForChildDiv = true;
	addMoreSamplesForSingleEnd();
/*	
	if(document.getElementById("idInputReadTypeQCIllumina").value == "Single")
	{
		addMoreSamplesForSingleEnd();
	}
	else
	{
		addMoreSamplesForPairedEnd();
	}
*/
}

function addMoreSamplesForSingleEnd()
{
	var targetIdForOnchange = "selectSingleFileAdaptorFormGroupIllumina" + callAddMoreSampleForIllumina;
	var node = document.createElement('div');
	node.id = 'childDiv' + callAddMoreSampleForIllumina;
	node.className = "fragment";

//				Sample Name
	
	node.innerHTML = '<span id="close" class="bgColorForCloseButton" onclick= "removeNewlyCreatedDiv(this.parentNode); return false;">CLOSE</span>'
					+ '<div class="form-group">'
					+ '<label class="control-label col-sm-4  col-lg-4 test textClass required">'
					+ 'Sample Name:'
					+ '</label>'
					+ '<div class="col-sm-6 col-lg-6" id="idSampleNm' + callAddMoreSampleForIllumina + '">'
					+ '<input class="form-control" type="text" id="idSampleNameIlluminaQc' + callAddMoreSampleForIllumina + '" placeholder="Sample Name' + callAddMoreSampleForIllumina 
					+ '" onblur="warningForEmptyField(this.id, this.parentNode.id)"></input>' 
					+ '</div>'
					+ '</div>'
					
//					Sequencing Layout
					
					+ '<div id="illuminaInputFormDiv' + callAddMoreSampleForIllumina + '">'
					+ '<div class="form-group">'
					+ '<label class="control-label col-sm-4 col-lg-4 textClass" for="pwd">'
					+ '<span class="glyphicon glyphicon-question-sign iconSmallClass textClass"' 
					+ 'data-placement="left" data-toggle="tooltip"'
					+ 'title="Sequencing Layout:\n	paired end sequencing layout.\n		OR\n	Single end sequencing layout."></span>'
					+ '&nbsp;&nbsp;&nbsp;'
					+ 'Sequence layout'
					+ '</label>'
					+ '<div class="col-sm-6 col-lg-6">'
					+ '<select class="form-control" id="idInputReadTypeQCIllumina' + callAddMoreSampleForIllumina + '"'
					+ 'onchange="changeOptionQCIlluminaForNewDiv(this,' + callAddMoreSampleForIllumina + ');">'
					+ '<option value="Paired" selected="selected">Paired</option>'
					+ '<option value="Single">Single</option>'
					+ '</select>'
					+ '</div>'
					+ '</div>'
					+ '<div class="form-group">'
					+ '<label class="control-label col-sm-4 col-lg-4 textClass" for="pwd">'
					+ '<span class="glyphicon glyphicon-question-sign iconSmallClass textClass"' 
					+ 'data-placement="left" data-toggle="tooltip"'
					+ 'title="Input sequence file format."></span>'
					+ '&nbsp;&nbsp;&nbsp;'
					+ 'Sequence file format'
					+ '</label>'
					+ '<div class="col-sm-6 col-lg-6">'
					+ '<select id="idSequenceType' + callAddMoreSampleForIllumina + '">'
					+ '<option value="fq"  selected="selected">Fastq</option>'
					+ '<option value="fa">Fasta</option>'
					+ '</select>'
					+ '</div>'
					+ '</div>'
					+ '</div>'

//					Adaptor Library
					
					+ '<div class="form-group">'
					+ '<label class="control-label col-sm-4  col-lg-4 textClass" for="email">'
					+ '<span class=" glyphicon glyphicon-question-sign iconSmallClass textClass" '
					+ 'data-placement="left" data-html="true"'
					+ 'data-toggle="tooltip"'
					+ 'title="1=Genomic DNA/Chip-seq,\n 2=Paired End DNA,\n 3=DpnII gene expression,\n 4=NlaIII gene expression,\n 5=Small RNA Library,\n 6=Multiplexing DNA,\n N = Do not filter for Primer/Adaptor,\n file = File for user defined primer/adaptor sequences, one per line">'
					+ '</span>'
					+ '&nbsp;'
					+ 'Primer/Adaptor libraries:'
					+ '</label>'
					+ '<div class="col-sm-6 col-lg-6">'
					+ '<select class="form-control" id="idAdaptorLibrariesValueIllumina' + callAddMoreSampleForIllumina + '" onchange="onChangeAdaptorLibrariesValueForNewDivForIllumina(this,' + targetIdForOnchange + ');">'
					+ '<option value="file" selected="selected">file</option>'
					+ '<option value="1">1</option>'
					+ '<option value="2">2</option>'
					+ '<option value="3">3</option>'
					+ '<option value="4">4</option>'
					+ '<option value="4">5</option>'
					+ '<option value="5">6</option>'
					+ '<option value="N">N</option>'
					+ '</select>'
					+ '</div>'
					+ '</div>'
					
//					primer / adaptor library file

					+ '<div class="form-group" id="selectSingleFileAdaptorFormGroupIllumina' + callAddMoreSampleForIllumina + '">'
					+ '<label class="control-label col-sm-4  col-lg-4 textClass required" for="pwd">'
					+ 'Select Primer/Adapter file:'
					+ '</label>'
					+ '<div class="col-sm-6 col-lg-6" id="idForAdapterFileDiv' + callAddMoreSampleForIllumina + '">'
					+ '<input type="button" class="col-sm-4  col-lg-4  btn-file " data-toggle="modal" data-target="#selectFile" placeholder="Select single file"'
					+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
					+ 'accept=".fa" value="BROWSE..."></input>'
					+ '<div id="idSingleFileAdaptorSelectIllumina' + callAddMoreSampleForIllumina + '"'
					+ 'class="col-sm-6 col-lg-6 text-left">No file selected</div>'
					+ '</div>'
					+ '</div>'

//				FastQVarient Options
					
					+ '<div class="form-group">'
					+ '<label class="control-label col-sm-4  col-lg-4 textClass" for="email">'
					+ '<span class=" glyphicon glyphicon-question-sign iconSmallClass textClass"'
					+ 'data-placement="left" data-html="true" data-toggle="tooltip"'
					+ 'title="1=Sanger (Phred+33, 33 to 73),\n 2=Solexa (Phred+64, 59 to 104),\n 3=Illumina (1.3+) (Phred+64, 64 to 104),\n 4=Illumina (1.5+) (Phred+64, 66 to 104),\n 5=Illumina (1.8+) (Phred+33, 33 to 74),\n A = Automatic detection of FASTQ variant">'
					+ '</span>'
					+ '&nbsp;'
					+ 'FASTQ variants:'
					+ '</label>'
					+ '<div class="col-sm-6 col-lg-6">'
					+ '<select class="form-control"'
					+ 'id="idAdaptorLibrariesValueIlluminaFastaVarient' + callAddMoreSampleForIllumina + '">'
					+ '<option value="A" selected="selected">A</option>'
					+ '<option value="1">1</option>'
					+ '<option value="2">2</option>'
					+ '<option value="3">3</option>'
					+ '<option value="4">4</option>'
					+ '<option value="5">5</option>'
					+ '</select>'
					+ '</div>'
					+ '</div>'
					
//					R1 file
					
					+ '<div class="form-group" id="idFirstFileSelectParentIlluminaDiv' + callAddMoreSampleForIllumina + '">'
					+ '<label class="control-label col-sm-4  col-lg-4 textClass required"' 
					+ 'for="pwd" id="lableFastqFileSelect">Select left / R1 file:</label>'
					+ '<div class="col-sm-6 col-lg-6" id="idFirstFileSelectIlluminaDiv' + callAddMoreSampleForIllumina + '">'
					+ '<input type="button" class="col-sm-4  col-lg-4  btn-file "'
					+ 'data-toggle="modal" data-target="#selectFile"'
					+ 'placeholder="Select right file" id="idFirstFileBrowseIllumina"'
					+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
					+ 'accept=".fa" value="BROWSE..."></input>'
					+ '<div id="idFirstFileSelectIllumina' + callAddMoreSampleForIllumina + '" class="col-sm-6 col-lg-6 text-left"> No file selected</div>'
					+ '</div>'
					+ '</div>'
					
//					R2 file
					
					+ '<div class="form-group" id="idSecondFileParentSelectIlluminaDiv' + callAddMoreSampleForIllumina + '">'
					+ '<label class="control-label col-sm-4  col-lg-4 textClass required"'
					+ 'for="pwd">Select right / R2 file:</label>'
					+ '<div class="col-sm-6 col-lg-6" id="idSecondFileSelectIlluminaDiv' + callAddMoreSampleForIllumina + '">'
					+ '<input type="button" class="col-sm-4  col-lg-4  btn-file "'
					+ 'data-toggle="modal" data-target="#selectFile"'
					+ 'placeholder="Select right file" id="idSecondFileBrowseIllumina' + callAddMoreSampleForIllumina + '"'
					+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
					+ 'accept=".fa" value="BROWSE..."></input>'
					+ '<div id="idSecondFileSelectIllumina' + callAddMoreSampleForIllumina + '" class="col-sm-6 col-lg-6 text-left">No file selected</div>'
					+ '</div>'
					+ '</div>'
					
//					Singleinput file
					
					+ '<div class="form-group" style="display: none;" id="selectSingleFileFormGroupIllumina' + callAddMoreSampleForIllumina + '">'
					+ '<label class="control-label col-sm-4  col-lg-4 textClass required"' 
					+ 'for="pwd" id="lableSingleFileSelectIllumina">Select single-end input file:</label>'
					+ '<div class="col-sm-6 col-lg-6" id="idSingleFileSelectIlluminaDiv' + callAddMoreSampleForIllumina + '">'
					+ '<input type="button" class="col-sm-4  col-lg-4  btn-file "'
					+ 'data-toggle="modal" data-target="#selectFile"'
					+ 'placeholder="Select single file"'
					+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
					+ 'accept=".fa" value="BROWSE..."></input>'
					+ '<div id="idSingleFileSelectIllumina' + callAddMoreSampleForIllumina + '" class="col-sm-6 col-lg-6 text-left">No file selected</div>'
					+ '</div>'
					+ '</div>'
					
//					output folder
					
					/*+ '<div class="form-group" id="selectIlluminaqcOutput' + callAddMoreSampleForIllumina + '">'
					+ '<label class="control-label col-sm-4  col-lg-4 textClass required"'
					+ 'for="pwd">Select output folder:</label>'
					+ '<div class="col-sm-6 col-lg-6" id="idOutputDirIlluminaSelectDiv' + callAddMoreSampleForIllumina + '">'
					+ '<input type="button" class="col-sm-4  col-lg-4  btn-file "'
					+ 'data-toggle="modal" data-target="#selectFile"'
					+ 'placeholder="Select output folder"'
					+ 'id="idOutputDirSelectBrowse' + callAddMoreSampleForIllumina + '"'
					+ 'onclick="getOnlyDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
					+ 'accept=".fa" value="BROWSE..."></input>'
					+ '<div id="idOutputDirIlluminaSelect' + callAddMoreSampleForIllumina + '" class="col-sm-6 col-lg-6 text-left">No folder selected</div>'
					+ '</div>'
					+ '</div>'*/
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
	
	callAddMoreSampleForIllumina = callAddMoreSampleForIllumina + 1;
}

// Paired End data

function addMoreSamplesForPairedEnd()
{
	var targetIdForOnchange = "selectSingleFileAdaptorFormGroupIllumina" + callAddMoreSampleForIllumina;
	var node = document.createElement('div');
	node.id = 'childDiv' + callAddMoreSampleForIllumina;
	node.className = "fragment";

//					Sample Name
	
	node.innerHTML = '<span id="close" class="bgColorForCloseButton" onclick= "removeNewlyCreatedDiv(this.parentNode); return false;">CLOSE</span>'
					+ '<div class="form-group">'
					+ '<label class="control-label col-sm-4  col-lg-4 test textClass required">'
					+ 'Sample Name:'
					+ '</label>'
					+ '<div class="col-sm-6 col-lg-6" id="idSampleNm' + callAddMoreSampleForIllumina + '">'
					+ '<input class="form-control" type="text" id="idSampleNameIlluminaQc' + callAddMoreSampleForIllumina + '" placeholder="Sample Name' + callAddMoreSampleForIllumina 
					+ '" onblur="warningForEmptyField(this.id, this.parentNode.id)"></input>' 
					+ '</div>'
					+ '</div>'
				
//					Sequencing Layout
					
					+ '<div id="illuminaInputFormDiv' + callAddMoreSampleForIllumina + '">'
					+ '<div class="form-group">'
					+ '<label class="control-label col-sm-4 col-lg-4 textClass" for="pwd">'
					+ '<span class="glyphicon glyphicon-question-sign iconSmallClass textClass"' 
					+ 'data-placement="left" data-toggle="tooltip"'
					+ 'title="Sequencing Layout:\n 1) paired end sequencing layout.\n 2) Single end sequencing layout."></span>'
					+ '&nbsp;&nbsp;&nbsp;'
					+ 'Sequence layout'
					+ '</label>'
					+ '<div class="col-sm-6 col-lg-6">'
					+ '<select class="form-control" id="idInputReadTypeQCIllumina' + callAddMoreSampleForIllumina + '"'
					+ 'onchange="changeOptionQCIllumina(this);">'
					+ '<option value="Paired" selected="selected">Paired</option>'
					+ '<option value="Single">Single</option>'
					+ '</select>'
					+ '</div>'
					+ '</div>'
					+ '<div class="form-group">'
					+ '<label class="control-label col-sm-4 col-lg-4 textClass" for="pwd">'
					+ '<span class="glyphicon glyphicon-question-sign iconSmallClass textClass"' 
					+ 'data-placement="left" data-toggle="tooltip"'
					+ 'title="Input sequence file format."></span>'
					+ '&nbsp;&nbsp;&nbsp;'
					+ 'Sequence file format'
					+ '</label>'
					+ '<div class="col-sm-6 col-lg-6">'
					+ '<select id="idSequenceType' + callAddMoreSampleForIllumina + '">'
					+ '<option value="fq"  selected="selected">Fastq</option>'
					+ '<option value="fa">Fasta</option>'
					+ '</select>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					
//					Adaptor Library
					
					+ '<div class="form-group">'
					+ '<label class="control-label col-sm-4  col-lg-4 textClass" for="email">'
					+ '<span class=" glyphicon glyphicon-question-sign iconSmallClass textClass" '
					+ 'data-placement="left" data-html="true"'
					+ 'data-toggle="tooltip"'
					+ 'title="1=Genomic DNA/Chip-seq,\n 2=Paired End DNA,\n 3=DpnII gene expression,\n 4=NlaIII gene expression,\n 5=Small RNA Library,\n 6=Multiplexing DNA,\n N = Do not filter for Primer/Adaptor,\n file = File for user defined primer/adaptor sequences, one per line">'
					+ '</span>'
					+ '&nbsp;'
					+ 'Primer/Adaptor libraries:'
					+ '</label>'
					+ '<div class="col-sm-6 col-lg-6">'
					+ '<select class="form-control" id="idAdaptorLibrariesValueIllumina' + callAddMoreSampleForIllumina + '"' 
					+ 'onchange="onChangeAdaptorLibrariesValueForNewDivForIllumina(this,' + targetIdForOnchange + ');">'
					+ '<option value="file" selected="selected">file</option>'
					+ '<option value="1">1</option>'
					+ '<option value="2">2</option>'
					+ '<option value="3">3</option>'
					+ '<option value="4">4</option>'
					+ '<option value="4">5</option>'
					+ '<option value="5">6</option>'
					+ '<option value="N">N</option>'
					+ '</select>'
					+ '</div>'
					+ '</div>'
					
//					primer / adaptor library file

					+ '<div class="form-group" id="selectSingleFileAdaptorFormGroupIllumina' + callAddMoreSampleForIllumina + '">'
					+ '<label class="control-label col-sm-4  col-lg-4 textClass required" for="pwd">'
					+ 'Select Primer/Adapter file:'
					+ '</label>'
					+ '<div class="col-sm-6 col-lg-6" id="idForAdapterFileDiv' + callAddMoreSampleForIllumina + '">'
					+ '<input type="button" class="col-sm-4  col-lg-4  btn-file " data-toggle="modal" data-target="#selectFile" placeholder="Select single file"'
					+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
					+ 'accept=".fa" value="BROWSE..."></input>'
					+ '<div id="idSingleFileAdaptorSelectIllumina' + callAddMoreSampleForIllumina + '"'
					+ 'class="col-sm-6 col-lg-6 text-left">No file selected</div>'
					+ '</div>'
					+ '</div>'

//					FastQVarient Options
					
					+ '<div class="form-group">'
					+ '<label class="control-label col-sm-4  col-lg-4 textClass" for="email">'
					+ '<span class=" glyphicon glyphicon-question-sign iconSmallClass textClass"'
					+ 'data-placement="left" data-html="true" data-toggle="tooltip"'
					+ 'title="1=Sanger (Phred+33, 33 to 73),\n 2=Solexa (Phred+64, 59 to 104),\n 3=Illumina (1.3+) (Phred+64, 64 to 104),\n 4=Illumina (1.5+) (Phred+64, 66 to 104),\n 5=Illumina (1.8+) (Phred+33, 33 to 74),\n A = Automatic detection of FASTQ variant">'
					+ '</span>'
					+ '&nbsp;'
					+ 'FASTQ variants:'
					+ '</label>'
					+ '<div class="col-sm-6 col-lg-6">'
					+ '<select class="form-control"'
					+ 'id="idAdaptorLibrariesValueIlluminaFastaVarient' + callAddMoreSampleForIllumina + '">'
					+ '<option value="A" selected="selected">A</option>'
					+ '<option value="1">1</option>'
					+ '<option value="2">2</option>'
					+ '<option value="3">3</option>'
					+ '<option value="4">4</option>'
					+ '<option value="5">5</option>'
					+ '</select>'
					+ '</div>'
					+ '</div>'
					
//					R1 file
					
					+ '<div class="form-group" id="idFirstFileSelectParentIlluminaDiv' + callAddMoreSampleForIllumina + '">'
					+ '<label class="control-label col-sm-4  col-lg-4 textClass required"' 
					+ 'for="pwd" id="lableFastqFileSelect">Select left / R1 file:</label>'
					+ '<div class="col-sm-6 col-lg-6" id="idFirstFileSelectIlluminaDiv' + callAddMoreSampleForIllumina + '">'
					+ '<input type="button" class="col-sm-4  col-lg-4  btn-file "'
					+ 'data-toggle="modal" data-target="#selectFile"'
					+ 'placeholder="Select right file" id="idFirstFileBrowseIllumina"'
					+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
					+ 'accept=".fa" value="BROWSE..."></input>'
					+ '<div id="idFirstFileSelectIllumina' + callAddMoreSampleForIllumina + '" class="col-sm-6 col-lg-6 text-left"> No file selected</div>'
					+ '</div>'
					+ '</div>'
					
//					R2 file
					
					+ '<div class="form-group" id="idSecondFileParentSelectIlluminaDiv' + callAddMoreSampleForIllumina + '">'
					+ '<label class="control-label col-sm-4  col-lg-4 textClass required"'
					+ 'for="pwd">Select right / R2 file:</label>'
					+ '<div class="col-sm-6 col-lg-6" id="idSecondFileSelectIlluminaDiv' + callAddMoreSampleForIllumina + '">'
					+ '<input type="button" class="col-sm-4  col-lg-4  btn-file "'
					+ 'data-toggle="modal" data-target="#selectFile"'
					+ 'placeholder="Select right file" id="idSecondFileBrowseIllumina' + callAddMoreSampleForIllumina + '"'
					+ 'onclick="getAllDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
					+ 'accept=".fa" value="BROWSE..."></input>'
					+ '<div id="idSecondFileSelectIllumina' + callAddMoreSampleForIllumina + '" class="col-sm-6 col-lg-6 text-left">No file selected</div>'
					+ '</div>'
					+ '</div>'
					
//					output folder
					
				/*	+ '<div class="form-group" id="selectIlluminaqcOutputDiv' + callAddMoreSampleForIllumina + '">'
					+ '<label class="control-label col-sm-4  col-lg-4 textClass required"'
					+ 'for="pwd">Select output folder:</label>'
					+ '<div class="col-sm-6 col-lg-6" id="idOutputDirIlluminaSelectDiv' + callAddMoreSampleForIllumina + '">'
					+ '<input type="button" class="col-sm-4  col-lg-4  btn-file "'
					+ 'data-toggle="modal" data-target="#selectFile"'
					+ 'placeholder="Select output folder"'
					+ 'id="idOutputDirSelectBrowse' + callAddMoreSampleForIllumina + '"'
					+ 'onclick="getOnlyDirectoryForDynamicDiv(getChildDivIdForFileSelect(this.parentNode.parentNode.id));"'
					+ 'accept=".fa" value="BROWSE..."></input>'
					+ '<div id="idOutputDirIlluminaSelect' + callAddMoreSampleForIllumina + '" class="col-sm-6 col-lg-6 text-left">No folder selected</div>'
					+ '</div>'
					+ '</div>'*/
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
	
	callAddMoreSampleForIllumina = callAddMoreSampleForIllumina + 1;
}

function removeNewlyCreatedDiv(elemet)
{
	var div = document.getElementById(elemet.id);
	if (div)
	{
	    div.parentNode.removeChild(div);
	}
	callAddMoreSampleForIllumina = callAddMoreSampleForIllumina - 1;
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
