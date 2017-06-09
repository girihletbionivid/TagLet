$(document).ready(function() {
	localStorage.setItem("userId", document.getElementById("userId").innerHTML);
	
	document.getElementById("rawDataQualityControlDiv").setAttribute("onclick","aTagCall(\"../qc454?userid="+localStorage.userId+"\");");
	document.getElementById("rawDataQualityControl").setAttribute("onclick","aTagCall(\"../qc454?userid="+localStorage.userId+"\");");
	
	document.getElementById("rnaSeqDenoveDiv").setAttribute("onclick","aTagCall(\"../trinity_index?userid="+localStorage.userId+"\");");
	document.getElementById("rnaSeqDenove").setAttribute("onclick","aTagCall(\"../trinity_index?userid="+localStorage.userId+"\");");
	
	document.getElementById("rnaSeqDiffDiv").setAttribute("onclick","aTagCall(\"../deseq_index?userid="+localStorage.userId+"\");");
	document.getElementById("rnaSeqDiff").setAttribute("onclick","aTagCall(\"../deseq_index?userid="+localStorage.userId+"\");");
	
	document.getElementById("metagenome16sRnaDiv").setAttribute("onclick","aTagCall(\"../uparsereadprep?userid="+localStorage.userId+"\");");
	document.getElementById("metagenome16sRna").setAttribute("onclick","aTagCall(\"../uparsereadprep?userid="+localStorage.userId+"\");");
	
	document.getElementById("rnaSeqReseqDiv").setAttribute("onclick","aTagCall(\"../reseqgenomeindexing?userid="+localStorage.userId+"\");");
	document.getElementById("rnaSeqReseq").setAttribute("onclick","aTagCall(\"../reseqgenomeindexing?userid="+localStorage.userId+"\");");
	
});
	function aTagCall(link){
		var atag=document.getElementById("aTagCall");
		atag.setAttribute("href",link);
		atag.click();
		
	}
	
	
	
	