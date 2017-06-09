package com.jaxlayer.webreflector.resti.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.zip.ZipOutputStream;

public class CheckMethods
{
	
/*
	public static void main(String[] args) throws Exception 
	{
		File file = new File("/home/bionivid/Desktop/graphInput.txt");
		BufferedReader br = new BufferedReader(new FileReader(file));
		String line = "";
		
		ArrayList<BigDecimal> NumberOfSequeces = new ArrayList<BigDecimal>();
		ArrayList<BigDecimal> Abundance = new ArrayList<BigDecimal>();
		
		while((line = br.readLine()) != null)
		{
			String [] SplittedArr = line.split("\t");
			NumberOfSequeces.add(new BigDecimal(SplittedArr[0].replaceAll(",", "")));
			Abundance.add(new BigDecimal(SplittedArr[1].replaceAll(",", "")));
		}
		
	}*/
/*
	public static void main(String[] args) throws Exception 
	{
		
	    

		MultiFolderReading mf = new MultiFolderReading();
		List<String> listOfFileImage = mf.getFileNameInDirectorys("_qualDistribution.png", "/media/bionivid/DATA/SQIT_INSTALLER/skeleton-web-service/users/Nitin/OTHER/sibsankar/HG");
		
		for (int i = 0; i < listOfFileImage.size(); i++) 
		{
			System.out.println(listOfFileImage.get(i));
//			if (listOfFileImage.get(i).equals("not_found")) throw new ExceptionFileNotFound("avg qual image file not found");	
		}
	}
	
	public static void main(String[] args) throws Exception 
	{
		String input = "/home/ubuntu/programs/raviProject/sys/TestData/C1_S3_L001_R1_001.fastq<br/>DNA<br/>Yes<br/>Single End<br/>151<br/>4<br/>4<br/>>= 84<br/>143<br/>1<br/>897659<br/>66000<br/>98<br/>65902<br/>128397<br/>1<br/>1.00<br/>13.62<br/><br/>>Prefix2.1.128397<br/>CCTACGGGAGGCAGCAGTGGGGAATTTTGGACAATGGGCGCAAGCCTGATCCAGCCATGCCGCGTGCAGGATGAAGGCCTTCGGGTTGTAAACTGCTTTTGTACGGAACGAAAAGGTTTGGCCTAATAAGCTGAGCTCATGAC<br/>>Prefix2.2.50935<br/>CCTACGGGAGGCAGCAGTGGGGAATTTTGGACAATGGGCGCAAGCCTGATCCAGCAATGCCGCGTGCAGGAAGAAGGCCTTCGGGTTGTAAACTGCTTTTGTCAGGGAAGAAATCTTCTGGGCTAATACCCCGGGAGGATGAC<br/>>Prefix2.3.42120<br/>CCTACGGGAGGCAGCAGTAGGGAATATTGGGCAATGGAGGGAACTCTGACCCAGCCATGCCGCGTGCAGGAAGAAGGCGTTATGCGTTGTAAACTGCTTTTTTATAGGAAGAAGGATCTCTTGCGAGAGAAGGTGACGGTACT<br/>>Prefix2.4.35694<br/>CCTACGGGAGGCAGCAGTAGGGAATATTGGGCAATGGGCGGAAGCCTGACCCAGCCACGCCGCGTGCAGGAAGACGGCCCTCTGGGTTGTAAACTGCTTTTGATTGGGAAGAAAGCAGCTCATGCGTGAGAATTTGACGGTAC<br/>>Prefix2.5.26485<br/>CCTACGGGAGGCAGCAGTGGGGAATTTTGGACAATGGGGGCAACCCTGATCCAGCAATGCCGCGTGAGTGAAGAAGGCCTTCGGGTTGTAAAGCTCTTTTGTCAGGGAAGAAACACCGGCTCTAACACAGTCCGGGAATGACG<br/>>Prefix2.6.20430<br/>CCTACGGGAGGCAGCAGTGGGGAATATTGGGCAATGGAGGAAACTCTGACCCAGCGACGCCGCGTGAGGGATGAAGGCCTTCGGGTTGTAAACCTCTTTCAGTAGGGAAGAAGCGAAAGTGACGGTACCTACAGAAGAAGCAC<br/>>Prefix2.7.17540<br/>CCTACGGGAGGCAGCAGTGGGGAATTTTGGACAATGGGCGCAAGCCTGATCCAGCAATGCCGCGTGCAGGATGAAGGCCTTCGGGTTGTAAACTGCTTTTGTACGGAACGAAACGGTGAGCTCTAATACAGCTTGCTAATGAC<br/>>Prefix2.8.17109<br/>CCTACGGGAGGCAGCAGTAGGGAATATTGGGCAATGGGCGGAAGCCTGACCCAGCCATGCCGCGTGCAGGAAGAAGGCGTTATGCGTTGTAAACTGCTTTTTTATAGGAAGAAGGATCCCTTGCGAGGGAAGGTGACGGTACT<br/>>Prefix2.9.16841<br/>CCTACGGGAGGCAGCAGTGGGGAATTTTGGACAATGGGGGAAACCCTGATCCAGCAATGCCGCGTGAGTGAAGAAGGCCTTCGGGTTGTAAAGCTCTTTTGTCAGGGAAGAAACACCGGCTCTAACACAGTCCGGGAATGACG<br/>>Prefix2.10.15591<br/>CCTACGGGAGGCAGCAGTGGGGAATTTTGGACAATGGACGCAAGTCTGATCCAGCCATTCCGCGTGCAGGACGAAGGCCTTCGGGTTGTAAACTGCTTTTGTACAGAACGAAAAGGTCTCTGTTAATACCAGGGGCTCATGAC<br/>9423986 bp<br/>25.98 %<br/>20.64 %<br/>32.41 %<br/>20.97 %<br/>46.62 %<br/>53.38 %<br/>0.00 %<br/>897659<br/>";
		
		File file = new File("../users/Nitin/sampleInput_R1.fq");
		System.out.println("" + file.getParent());;
		
		String pdfFilePath;
		DateFormat dateFormat = new SimpleDateFormat("EEEE MMMMM yyyy HH:mm:ss.SSSZ");
		
		Date date = new Date();
		String pdfName = "Result_Summary";
		String currentTime = pdfName.trim() + "_" + dateFormat.format(date).trim();
		pdfFilePath = Utils.PDF_FILE_PATH + currentTime.trim().replaceAll("\\W+", "_") + ".pdf";
		
		MakeReportFirstProgram report = new MakeReportFirstProgram();
		System.out.println("Report Status: " + report.createPDFReport(input, pdfFilePath,"abc", "xyz", "mno", "ijk"));
	}

*/}
