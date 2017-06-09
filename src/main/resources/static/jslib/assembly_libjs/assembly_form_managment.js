function changeInputFileAligmentAndEstimate(element) {
	if (element.value == "fa") {
		$("#idRightFileAligmentBrowse").attr("onclick",
				"getAllDirectory('idRightFileAligmentSelect','fasta');");
		$("#idSingleFileAligmentBrowse").attr("onclick",
				"getAllDirectory('idSingleFileAligmentSelect','fasta');");
		$("#idLeftFileAligmentBrowse").attr("onclick",
				"getAllDirectory('idLeftFileAligmentSelect','fasta,fasta_filtered');");

	} else {
		$("#idRightFileAligmentBrowse").attr("onclick",
				"getAllDirectory('idRightFileAligmentSelect','fastq');");
		$("#idSingleFileAligmentBrowse").attr("onclick",
				"getAllDirectory('idSingleFileAligmentSelect','fastq');");
		$("#idLeftFileAligmentBrowse").attr("onclick",
				"getAllDirectory('idLeftFileAligmentSelect','fastq,fastq_filtered');");
	}
}
function showAssemblyForm(){
	$("#assemblyCmd").fadeOut('slow');
	$("#aligmentAndEstimateDiv").fadeIn('slow');
	resetAssemblyValidationForm();
}
function changeAligmentAndEstimate(element) {
	if (element.value == "paired") {
		$("#pairedFileDivAssembly").fadeIn('slow');
		$("#selectSingleFileFormGroupAlignment").fadeOut('slow');
	} else {
		$("#pairedFileDivAssembly").fadeOut('slow');
		$("#selectSingleFileFormGroupAlignment").fadeIn('slow');
	}
}
function changeEstimateMethodOption(element) {
	if (element.value == "RSEM") {
		$("#bowtie2OpationId").fadeIn('slow');
	} else {
		$("#bowtie2OpationId").fadeOut('slow');
	}
}
$(document).ready(function() {
	$("#idSingleFileAligmentSelect").html("No file selected");
	$("#idLeftFileAligmentSelect").html("No file selected");
	$("#idRightFileAligmentSelect").html("No file selected");
	$("#idTranscriptFastaFileSelect").html("No file selected");
	$("#transcriptDiv").slideToggle("slow");
	$("#transcriptInputDiv").click(function() {
		$("#transcriptDiv").slideToggle("slow");
		$("#transcriptDivSpan").toggleClass("glyphicon-collapse-up");
		$("#transcriptDivSpan").toggleClass("glyphicon-collapse-down");
		$("#transcriptDivSpan").toggleClass("colorCollapseClass");

	});
	$("#inputDiv").slideToggle("slow");
	$("#parameterInputDiv").click(function() {
		$("#inputDiv").slideToggle("slow");
		$("#inputDivSpan").toggleClass("glyphicon-collapse-up");
		$("#inputDivSpan").toggleClass("glyphicon-collapse-down");
		$("#inputDivSpan").toggleClass("colorCollapseClass");

	});

	$("#clusteringDivAsse").slideToggle("slow");
	$("#parameterClusteringDiv").click(function() {
		$("#clusteringDivAsse").slideToggle("slow");
		$("#clusteringDivSpan").toggleClass("glyphicon-collapse-up");
		$("#clusteringDivSpan").toggleClass("glyphicon-collapse-down");
		$("#clusteringDivSpan").toggleClass("colorCollapseClass");

	});

	
});