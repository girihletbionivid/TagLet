package com.jaxlayer.webreflector.resti.utils;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.geom.Rectangle2D;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PiePlot3D;
import org.jfree.data.general.DefaultPieDataset;

import com.itextpdf.awt.DefaultFontMapper;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfTemplate;
import com.itextpdf.text.pdf.PdfWriter;

public class QcPairedEndPdf {
	private static Font bigBold = new Font(Font.FontFamily.TIMES_ROMAN, 36,
			Font.BOLD, new BaseColor(79, 98, 40));
	private static Font mediumItalicBold = new Font(
			Font.FontFamily.TIMES_ROMAN, 30, Font.BOLDITALIC, new BaseColor(79,
					98, 40));
	private static Font smallBoldBlack = new Font(Font.FontFamily.TIMES_ROMAN,
			12, Font.BOLD, new BaseColor(0, 0, 0));
	public String fullPath;
	private static Font smallBold = new Font(Font.FontFamily.TIMES_ROMAN, 25,
			Font.BOLD, new BaseColor(79, 98, 40));
	private static Font tinyBold = new Font(Font.FontFamily.TIMES_ROMAN, 18,
			Font.BOLD, new BaseColor(79, 98, 40));
	private static Font tableFontWhite = new Font(Font.FontFamily.TIMES_ROMAN,
			12, Font.NORMAL, new BaseColor(255, 255, 255));
	private static Font tableFontHeader = new Font(Font.FontFamily.TIMES_ROMAN,
			15, Font.NORMAL, new BaseColor(255, 255, 255));
	private static Font tableFontBlack = new Font(Font.FontFamily.TIMES_ROMAN,
			12, Font.NORMAL, new BaseColor(0, 0, 0));
	
	private static Font tableFontBlackBold = new Font(Font.FontFamily.TIMES_ROMAN,
			12, Font.BOLD, new BaseColor(0, 0, 0));
	
	private static Font tinyItalicBold = new Font(Font.FontFamily.TIMES_ROMAN,
			12, Font.BOLDITALIC);

	private String inputReadTypes, organismName, plateform, scientistName,
			specialization, nameOfSample, address, assemblyType,
			fileNameFirstSingleEnd, fileNameSecondSingleEnd,
			fileNameFirstPairedEnd, fileNameSecondPairedEnd, pdfFilePath;
	private Double minReadLSingleEnd, maxReadLSingleEnd, avgReadLSingleEnd,
			totNoReadSingleEnd, totNoAtgcBaseSingleEnd, totNoBaseSingleEnd,
			totNoHqBaseSingleEnd, totNoNonAtgcBaseSingleEnd;
	private Double minReadLPairedEnd, maxReadLPairedEnd, avgReadLPairedEnd,
			totNoReadPairedEnd, totNoAtgcBasePairedEnd, totNoBasePairedEnd,
			totNoHqBasePairedEnd, totNoNonAtgcBasePairedEnd;
	private Double minReadLFilterSingleEnd, maxReadLFilterSingleEnd,
			avgReadLFilterSingleEnd, totNoReadFilterSingleEnd,
			totNoAtgcBaseFilterSingleEnd, totNoBaseFilterSingleEnd,
			totNoHqBaseFilterSingleEnd, totNoNonAtgcBaseFilterSingleEnd,
			totNoHqReadsMySingleEnd;
	private String percTotNoHqBaseSingleEnd, percTotNoAtgcBaseFilterSingleEnd,
			percTotNoHqBaseFilterSingleEnd, percTotNoNonAtgcBaseSingleEnd,
			percTotNoNonAtgcBaseFilterSingleEnd, percTotNoAtgcBaseSingleEnd,
			percOfHqReadsSingleEnd;
	private Double minReadLFilterPairedEnd, maxReadLFilterPairedEnd,
			avgReadLFilterPairedEnd, totNoReadFilterPairedEnd,
			totNoAtgcBaseFilterPairedEnd, totNoBaseFilterPairedEnd,
			totNoHqBaseFilterPairedEnd, totNoNonAtgcBaseFilterPairedEnd;
	private String percTotNoHqBasePairedEnd, percTotNoAtgcBaseFilterPairedEnd,
			percTotNoHqBaseFilterPairedEnd, percTotNoNonAtgcBasePairedEnd,
			percTotNoNonAtgcBaseFilterPairedEnd, percTotNoAtgcBasePairedEnd,
			percOfHqReadsPairedEnd, sequencingType;
	Double subSingleEnd, subPairedEnd;
	private BigDecimal showTotalNoRead, showTotalNoHqRead, showTotalLowReads;
	
	NumberFormat nf = NumberFormat.getNumberInstance(Locale.US);
	
//	NumberFormat nf = new DecimalFormat("#,###,###,###");
//	NumberFormat nf1 = new DecimalFormat("#.######");
	NumberFormat nf1 = new DecimalFormat("#.##");
	BigDecimal num2 = new BigDecimal(1000000);
	
	private boolean checkReturnValueVar;
	
	private Integer numberOfSample;
	private Integer NumberOfSamplesInProject;
	
	private Document document;
	private PdfWriter writer;
	
	private String combinedSampleNames;
	
	public QcPairedEndPdf(String organismName, String scientistName,
			String specialization, String plateform, String nameOfSample,
			String address, String pdfFilePath, String assemblyType,

			String inputReadTypes,

			Double totNoReadsMySingleEnd, Double totNoReadsMyPairedEnd,
			Double totNoHqReadsMySingleEnd, Double totNoHqReadsMyPairedEnd,

			String percOfHqReadsSingleEnd, String percOfHqReadsPairedEnd,

			String fileNameFirstSingleEnd, String fileNameFirstPairedEnd,
			String fileNameSecondSingleEnd, String fileNameSecondPairedEnd,

			Double minReadLSingleEnd, Double minReadLPairedEnd,
			Double minReadLFilterSingleEnd, Double minReadLFilterPairedEnd,

			Double maxReadLSingleEnd, Double maxReadLPairedEnd,
			Double maxReadLFilterSingleEnd, Double maxReadLFilterPairedEnd,

			Double avgReadLSingleEnd, Double avgReadLPairedEnd,
			Double avgReadLFilterSingleEnd, Double avgReadLFilterPairedEnd,

			Double totNoReadSingleEnd, Double totNoReadPairedEnd,
			Double totNoReadFilterSingleEnd, Double totNoReadFilterPairedEnd,

			Double totNoAtgcBaseSingleEnd, Double totNoAtgcBasePairedEnd,
			Double totNoAtgcBaseFilterSingleEnd,
			Double totNoAtgcBaseFilterPairedEnd,

			String percTotNoAtgcBaseSingleEnd,
			String percTotNoAtgcBasePairedEnd,
			String percTotNoAtgcBaseFilterSingleEnd,
			String percTotNoAtgcBaseFilterPairedEnd,

			Double totNoBaseSingleEnd, Double totNoBasePairedEnd,
			Double totNoBaseFilterSingleEnd, Double totNoBaseFilterPairedEnd,

			Double totNoHqBaseSingleEnd, Double totNoHqBasePairedEnd,
			Double totNoHqBaseFilterSingleEnd,
			Double totNoHqBaseFilterPairedEnd,

			String percTotNoHqBaseSingleEnd, String percTotNoHqBasePairedEnd,
			String percTotNoHqBaseFilterSingleEnd,
			String percTotNoHqBaseFilterPairedEnd,

			Double totNoNonAtgcBaseSingleEnd, Double totNoNonAtgcBasePairedEnd,
			Double totNoNonAtgcBaseFilterSingleEnd,
			Double totNoNonAtgcBaseFilterPairedEnd,

			String percTotNoNonAtgcBaseSingleEnd,
			String percTotNoNonAtgcBasePairedEnd,
			String percTotNoNonAtgcBaseFilterSingleEnd,
			String percTotNoNonAtgcBaseFilterPairedEnd, String fullPath,
			String outputFileName, String sequencingType,
			Integer sampleNumber,Integer NumberOfSamplesInProject,
			Document document, PdfWriter writer, String combinedSampleNames) throws Exception {
			
		this.organismName = organismName;
		this.scientistName = scientistName;
		this.specialization = specialization;
		this.plateform = plateform;
		this.nameOfSample = nameOfSample;
		this.address = address;
		this.assemblyType = assemblyType;

		this.pdfFilePath = pdfFilePath;
		this.totNoHqReadsMySingleEnd = totNoHqReadsMySingleEnd;
		
		BigDecimal tempVar = new BigDecimal(0);
		tempVar = tempVar.add(BigDecimal.valueOf(totNoReadsMySingleEnd));
		tempVar = tempVar.add(BigDecimal.valueOf(totNoReadsMyPairedEnd));
		this.showTotalNoRead = tempVar;
		
		BigDecimal tempVar2 = new BigDecimal(0);
		tempVar2 = tempVar2.add(BigDecimal.valueOf(totNoReadFilterSingleEnd));
		tempVar2 = tempVar2.add(BigDecimal.valueOf(totNoReadFilterSingleEnd));
		
		this.showTotalNoHqRead =  tempVar2;
		this.showTotalLowReads = this.showTotalNoRead.subtract(this.showTotalNoHqRead);
		
		System.out.println("***** Total Reads: " + tempVar + "\nTotal HQ Reads: " + tempVar2 + "\nTotal Low Read: " + showTotalLowReads);
		
		this.inputReadTypes = inputReadTypes;
		this.percOfHqReadsSingleEnd = percOfHqReadsSingleEnd;
		this.fileNameFirstSingleEnd = fileNameFirstSingleEnd;
		this.fileNameSecondSingleEnd = fileNameSecondSingleEnd;

		this.minReadLSingleEnd = minReadLSingleEnd;
		this.maxReadLSingleEnd = maxReadLSingleEnd;
		this.avgReadLSingleEnd = avgReadLSingleEnd;
		this.totNoReadSingleEnd = totNoReadSingleEnd;
		this.totNoAtgcBaseSingleEnd = totNoAtgcBaseSingleEnd;
		this.percTotNoAtgcBaseSingleEnd = percTotNoAtgcBaseSingleEnd;
		this.totNoBaseSingleEnd = totNoBaseSingleEnd;
		this.totNoHqBaseSingleEnd = totNoHqBaseSingleEnd;
		this.percTotNoHqBaseSingleEnd = percTotNoHqBaseSingleEnd;
		this.totNoNonAtgcBaseSingleEnd = totNoNonAtgcBaseSingleEnd;
		this.percTotNoNonAtgcBaseSingleEnd = percTotNoNonAtgcBaseSingleEnd;

		this.minReadLFilterSingleEnd = minReadLFilterSingleEnd;
		this.maxReadLFilterSingleEnd = maxReadLFilterSingleEnd;
		this.avgReadLFilterSingleEnd = avgReadLFilterSingleEnd;
		this.totNoReadFilterSingleEnd = totNoReadFilterSingleEnd;
		this.totNoAtgcBaseFilterSingleEnd = totNoAtgcBaseFilterSingleEnd;
		this.percTotNoAtgcBaseFilterSingleEnd = percTotNoAtgcBaseFilterSingleEnd;
		this.totNoBaseFilterSingleEnd = totNoBaseFilterSingleEnd;
		this.totNoHqBaseFilterSingleEnd = totNoHqBaseFilterSingleEnd;
		this.percTotNoHqBaseFilterSingleEnd = percTotNoHqBaseFilterSingleEnd;
		this.totNoNonAtgcBaseFilterSingleEnd = totNoNonAtgcBaseFilterSingleEnd;
		this.percTotNoNonAtgcBaseFilterSingleEnd = percTotNoNonAtgcBaseFilterSingleEnd;
		this.subSingleEnd = totNoReadsMySingleEnd - totNoHqReadsMySingleEnd;

		this.percOfHqReadsPairedEnd = percOfHqReadsPairedEnd;
		this.fileNameFirstPairedEnd = fileNameFirstPairedEnd;
		this.fileNameSecondPairedEnd = fileNameSecondPairedEnd;

		this.minReadLPairedEnd = minReadLPairedEnd;
		this.maxReadLPairedEnd = maxReadLPairedEnd;
		this.avgReadLPairedEnd = avgReadLPairedEnd;
		this.totNoReadPairedEnd = totNoReadPairedEnd;
		this.totNoAtgcBasePairedEnd = totNoAtgcBasePairedEnd;
		this.percTotNoAtgcBasePairedEnd = percTotNoAtgcBasePairedEnd;
		this.totNoBasePairedEnd = totNoBasePairedEnd;
		this.totNoHqBasePairedEnd = totNoHqBasePairedEnd;
		this.percTotNoHqBasePairedEnd = percTotNoHqBasePairedEnd;
		this.totNoNonAtgcBasePairedEnd = totNoNonAtgcBasePairedEnd;
		this.percTotNoNonAtgcBasePairedEnd = percTotNoNonAtgcBasePairedEnd;

		this.minReadLFilterPairedEnd = minReadLFilterPairedEnd;
		this.maxReadLFilterPairedEnd = maxReadLFilterPairedEnd;
		this.avgReadLFilterPairedEnd = avgReadLFilterPairedEnd;
		this.totNoReadFilterPairedEnd = totNoReadFilterPairedEnd;
		this.totNoAtgcBaseFilterPairedEnd = totNoAtgcBaseFilterPairedEnd;
		this.percTotNoAtgcBaseFilterPairedEnd = percTotNoAtgcBaseFilterPairedEnd;
		this.totNoBaseFilterPairedEnd = totNoBaseFilterPairedEnd;
		this.totNoHqBaseFilterPairedEnd = totNoHqBaseFilterPairedEnd;
		this.percTotNoHqBaseFilterPairedEnd = percTotNoHqBaseFilterPairedEnd;
		this.totNoNonAtgcBaseFilterPairedEnd = totNoNonAtgcBaseFilterPairedEnd;
		this.percTotNoNonAtgcBaseFilterPairedEnd = percTotNoNonAtgcBaseFilterPairedEnd;
		this.subPairedEnd = totNoReadsMyPairedEnd - totNoHqReadsMyPairedEnd;
		this.fullPath = fullPath;
		this.sequencingType = sequencingType;
		
		this.checkReturnValueVar = false;
		this.numberOfSample = sampleNumber;
		this.NumberOfSamplesInProject = NumberOfSamplesInProject;
		this.document = document;
		this.writer = writer;
		this.combinedSampleNames = combinedSampleNames;

		if(numberOfSample == 0)
		{
			generatePdf(document,writer);
			checkReturnValueVar = true;
		}
		else
		{
			generatePdfForMultipleSamples(document, writer);
			checkReturnValueVar = true;
		}
	}
	public Boolean checkReturnValue()
	{
		if(!checkReturnValueVar)
		{
			return false;
		}
		return checkReturnValueVar;
	}
	
	public Boolean generatePdf(Document document,PdfWriter writer)throws Exception 
	{
			addTitlePage(document, writer);
			document.newPage();
			thirdPageA(document, writer);
			
			document.newPage();
			thirdPageB(document, writer);
			
			document.newPage();
			thirdPageBInner(document, writer);
			
			document.newPage();
			thirdPageC(document, writer);
			
			document.newPage();
			fourthPage(document, writer);
	
			return true;
	}
	public Boolean generatePdfForMultipleSamples(Document document,PdfWriter writer) throws Exception 
	{
		document.newPage();
		secondPageForMoreSamples(document, writer);
		
		document.newPage();
		secondButOnePage(document, writer);
		
		document.newPage();
		thirdPage(document, writer);
		
		document.newPage();
		thirdPageA(document, writer);
		
		document.newPage();
		thirdPageB(document, writer);
		
		document.newPage();
		thirdPageBInner(document, writer);
		
		document.newPage();
		thirdPageC(document, writer);
		
		document.newPage();
		fourthPage(document, writer);
		
		return true;
	}
	
	public void thirdPageC(Document document, PdfWriter writer) throws Exception 
	{
		Paragraph preface = new Paragraph();
		MultiFolderReading mf = new MultiFolderReading();
		List<String> listOfFileImage = mf.getFileNameInDirectorys("_qualDistribution.png", fullPath);

		addEmptyLine(preface, 3);
		Paragraph paragraphObjective = new Paragraph("Average Read Quality Distribution Graph:", tinyBold);
		paragraphObjective.setAlignment(Element.ALIGN_LEFT);
		preface.add(paragraphObjective);
		
		Image imageHeader = null;
		Image imageHeader2 = null;
		
		for (int i = 0; i < listOfFileImage.size(); i++) 
		{
			if (listOfFileImage.get(i).equals("not_found")) throw new ExceptionFileNotFound("Quality Distribution image file not found");
			
//			R1 Files
			
			Pattern r1 = Pattern.compile("(.*)_1\\.(.*)_qualDistribution\\.png");
			Matcher m1 = r1.matcher(listOfFileImage.get(i).toString());
			Pattern r1_2 = Pattern.compile("(.*)_R1(.*)_qualDistribution\\.png");
			Matcher m1_2 = r1_2.matcher(listOfFileImage.get(i).toString());
			
//			R2 Files
			
			Pattern r2 = Pattern.compile("(.*)_2\\.(.*)_qualDistribution\\.png");
			Matcher m2 = r2.matcher(listOfFileImage.get(i).toString());
			Pattern r2_2 = Pattern.compile("(.*)_R2(.*)_qualDistribution\\.png");
			Matcher m2_2 = r2_2.matcher(listOfFileImage.get(i).toString());
			
			if(m1.find())
			{
				imageHeader = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
			}
			else if(m1_2.find())
			{
				imageHeader = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
			}
			else
			{
				if(m2.find())
				{
					imageHeader2 = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
				}
				else if(m2_2.find())
				{
					imageHeader2 = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
				}
				else
				{
					throw new ExceptionFileNotFound("Quality Distribution image file not found OR Name of the file is not written in proper formate.");
				}
			}
			
			if(listOfFileImage.get(i).toUpperCase().contains("LEFT"))
			{
				imageHeader = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
			}
			if(listOfFileImage.get(i).toUpperCase().contains("RIGHT"))
			{
				imageHeader2 = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
			}
			
		}
		
		Paragraph p = new Paragraph();
		imageHeader.scaleAbsolute(500f, 300f);
		imageHeader.setAlignment(Element.ALIGN_RIGHT);
		p.add(imageHeader);
		preface.add(p);

		Paragraph p2 = new Paragraph();
		imageHeader2.scaleAbsolute(500f, 300f);
		imageHeader2.setAlignment(Element.ALIGN_RIGHT);
		p2.add(imageHeader2);
		preface.add(p2);
		document.add(preface);
	}

	public void thirdPageBInner(Document document, PdfWriter writer) throws Exception 
	{
		Paragraph preface = new Paragraph();
		MultiFolderReading mf = new MultiFolderReading();
		addEmptyLine(preface, 3);
		Paragraph paragraphObjective = new Paragraph("GC content distribution:", tinyBold);
		paragraphObjective.setAlignment(Element.ALIGN_LEFT);
		preface.add(paragraphObjective);
		
		List<String> listOfFileImage = mf.getFileNameInDirectorys("_gcDistribution.png", fullPath);
		
		/*if (listOfFileImage.size() > 1) 
		{
			if (listOfFileImage.get(0).equals("not_found")) throw new ExceptionFileNotFound("gc composition image file not found...!!");
			if (listOfFileImage.get(1).equals("not_found")) throw new ExceptionFileNotFound("gc composition image file not found...!!");
		}
		else
		{
			throw new ExceptionFileNotFound("gc composition image file not found");
		}
		*/
		
		Image imageHeader = null;
		Image imageHeader2 = null;
		
		for (int i = 0; i < listOfFileImage.size(); i++) 
		{
			if (listOfFileImage.get(i).equals("not_found")) throw new ExceptionFileNotFound("GC composition image file not found...!!");
			
//			R1 File
			Pattern r1 = Pattern.compile("(.*)_1\\.(.*)_gcDistribution\\.png");
			Matcher m1 = r1.matcher(listOfFileImage.get(i).toString());
			Pattern r1_2 = Pattern.compile("(.*)_R1(.*)_gcDistribution\\.png");
			Matcher m1_2 = r1_2.matcher(listOfFileImage.get(i).toString());
			
//			R2 File
			
			Pattern r2 = Pattern.compile("(.*)_2\\.(.*)_gcDistribution\\.png");
			Matcher m2 = r2.matcher(listOfFileImage.get(i).toString());
			Pattern r2_2 = Pattern.compile("(.*)_R2(.*)_gcDistribution\\.png");
			Matcher m2_2 = r2_2.matcher(listOfFileImage.get(i).toString());
			
			if(m1.find())
			{
				imageHeader = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
			}
			else if(m1_2.find())
			{
				imageHeader = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
			}
			else
			{
				if(m2.find())
				{
					imageHeader2 = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
				}
				else if(m2_2.find())
				{
					imageHeader2 = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
				}
				else
				{
					throw new ExceptionFileNotFound("gc composition image file not found OR Name of the file is not written in proper formate.");
				}
			}
			
			if(listOfFileImage.get(i).toUpperCase().contains("LEFT"))
			{
				imageHeader = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
			}
			if(listOfFileImage.get(i).toUpperCase().contains("RIGHT"))
			{
				imageHeader2 = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
			}
		}
		
		Paragraph p = new Paragraph();
		imageHeader.scaleAbsolute(500f, 300f);
		imageHeader.setAlignment(Element.ALIGN_RIGHT);
		p.add(imageHeader);
		preface.add(p);

		Paragraph p2 = new Paragraph();
		imageHeader2.scaleAbsolute(500f, 300f);
		imageHeader2.setAlignment(Element.ALIGN_RIGHT);
		p2.add(imageHeader2);
		preface.add(p2);
		document.add(preface);
	}

	public void thirdPageB(Document document, PdfWriter writer) throws Exception 
	{
		Paragraph preface = new Paragraph();
		addEmptyLine(preface, 3);
		Paragraph paragraphObjective = new Paragraph("Base composition:", tinyBold);
		paragraphObjective.setAlignment(Element.ALIGN_LEFT);
		preface.add(paragraphObjective);

		MultiFolderReading mf = new MultiFolderReading();
		List<String> listOfFileImage = mf.getFileNameInDirectorys("_baseCompostion.png", fullPath);
		
		/*if (listOfFileImage.size() > 1) 
		{
			if (listOfFileImage.get(0).equals("not_found")) throw new ExceptionFileNotFound("base compostion image file not found");
			if (listOfFileImage.get(1).equals("not_found")) throw new ExceptionFileNotFound("base compostion image file not found");
		}
		else
		{
			throw new ExceptionFileNotFound("base compostion image file not found");
		}*/
		
		
		Image imageHeader = null;
		Image imageHeader2 = null;
		
		for (int i = 0; i < listOfFileImage.size(); i++) 
		{
			if (listOfFileImage.get(i).equals("not_found")) throw new ExceptionFileNotFound("baseCompostion image file not found");
			
//			R1 File
			Pattern r1 = Pattern.compile("(.*)_1\\.(.*)_baseCompostion\\.png");
			Matcher m1 = r1.matcher(listOfFileImage.get(i).toString());
			Pattern r1_2 = Pattern.compile("(.*)_R1(.*)_baseCompostion\\.png");
			Matcher m1_2 = r1_2.matcher(listOfFileImage.get(i).toString());
			
//			R2 File
			Pattern r2 = Pattern.compile("(.*)_2\\.(.*)_baseCompostion\\.png");
			Matcher m2 = r2.matcher(listOfFileImage.get(i).toString());
			Pattern r2_2 = Pattern.compile("(.*)_R2(.*)_baseCompostion\\.png");
			Matcher m2_2 = r2_2.matcher(listOfFileImage.get(i).toString());
			
			if(m1.find())
			{
				imageHeader = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
			}
			else if(m1_2.find())
			{
				imageHeader = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
			}
			else
			{
				if(m2.find())
				{
					imageHeader2 = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
				}
				else if(m2_2.find())
				{
					imageHeader2 = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
				}
				else
				{
					throw new ExceptionFileNotFound("baseCompostion image file not found OR Name of the file is not written in proper formate.");
				}
			}
			
			if(listOfFileImage.get(i).toUpperCase().contains("LEFT"))
			{
				imageHeader = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
			}
			if(listOfFileImage.get(i).toUpperCase().contains("RIGHT"))
			{
				imageHeader2 = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
			}
		}
		
		Paragraph p = new Paragraph();
		imageHeader.scaleAbsolute(500f, 300f);
		imageHeader.setAlignment(Element.ALIGN_RIGHT);
		p.add(imageHeader);
		preface.add(p);

		Paragraph p2 = new Paragraph();
		imageHeader2.scaleAbsolute(500f, 300f);
		imageHeader2.setAlignment(Element.ALIGN_RIGHT);
		p2.add(imageHeader2);
		preface.add(p2);
		document.add(preface);
	}

	public void thirdPageA(Document document, PdfWriter writer) throws Exception 
	{
		Paragraph preface = new Paragraph();

		addEmptyLine(preface, 3);
		Paragraph paragraphObjective = new Paragraph("Average Base Quality Distribution Graph:", tinyBold);
		paragraphObjective.setAlignment(Element.ALIGN_LEFT);
		preface.add(paragraphObjective);
		
		MultiFolderReading mf = new MultiFolderReading();
		List<String> listOfFileImage = mf.getFileNameInDirectorys("_avgQual.png", fullPath);
		
		/*if (listOfFileImage.size() > 1) 
		{
			if (listOfFileImage.get(0).equals("not_found")) throw new ExceptionFileNotFound("avg qual image file not found");
			if (listOfFileImage.get(1).equals("not_found")) throw new ExceptionFileNotFound("avg qual image file not found");
		}
		else
		{
			throw new ExceptionFileNotFound("avg qual image file not found");
		}
		*/
		
		Image imageHeader = null;
		Image imageHeader2 = null;
		
		for (int i = 0; i < listOfFileImage.size(); i++) 
		{
			if (listOfFileImage.get(i).equals("not_found")) throw new ExceptionFileNotFound("Average Base Quality Distribution image file not found");
			
//			R1 Fle	
			Pattern r1 = Pattern.compile("(.*)_1\\.(.*)_avgQual\\.png");
			Matcher m1 = r1.matcher(listOfFileImage.get(i).toString());
			Pattern r1_2 = Pattern.compile("(.*)_R1(.*)_avgQual\\.png");
			Matcher m1_2 = r1_2.matcher(listOfFileImage.get(i).toString());
			
//			R2 file
			Pattern r2 = Pattern.compile("(.*)_2\\.(.*)_avgQual\\.png");
			Matcher m2 = r2.matcher(listOfFileImage.get(i).toString());
			Pattern r2_2 = Pattern.compile("(.*)_R2(.*)_avgQual\\.png");
			Matcher m2_2 = r2_2.matcher(listOfFileImage.get(i).toString());
			
			if(m1.find())
			{
				imageHeader = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
			}
			else if(m1_2.find())
			{
				imageHeader = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
			}
			else
			{
				if(m2.find())
				{
					imageHeader2 = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
				}
				else if(m2_2.find())
				{
					imageHeader2 = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
				}
				else
				{
					throw new ExceptionFileNotFound("Average Base Quality Distribution image file not found OR Name of the file is not written in proper formate.");
				}
			}
			
			if(listOfFileImage.get(i).toUpperCase().contains("LEFT"))
			{
				imageHeader = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
			}
			if(listOfFileImage.get(i).toUpperCase().contains("RIGHT"))
			{
				imageHeader2 = Image.getInstance(fullPath + "/" + listOfFileImage.get(i));
			}
		}

		/*
		 * Image imageHeader2 = Image.getInstance(fullPath + "/" +
		 * outputFileName2 + ".fastq_avgQual.png");
		 */
		/*
		if (listOfFileImage.size() > 1) 
		{
			String pattern = "(.*)_*2(.*)_avgQual.png";
			Pattern r = Pattern.compile(pattern);
			Matcher m = r.matcher(listOfFileImage.get(1).toString());
			
			if (m.find())
			{
				imageHeader2 = Image.getInstance(fullPath + "/" + listOfFileImage.get(1));
			}
		}
		else
		{
			throw new ExceptionFileNotFound("avg qual image file not found");
		}*/
		
		Paragraph p = new Paragraph();
		imageHeader.scaleAbsolute(500f, 300f);
		imageHeader.setAlignment(Element.ALIGN_RIGHT);
		p.add(imageHeader);
		preface.add(p);
		
		Paragraph p2 = new Paragraph();
		imageHeader2.scaleAbsolute(500f, 300f);
		imageHeader2.setAlignment(Element.ALIGN_RIGHT);
		p2.add(imageHeader2);
		preface.add(p2);
		document.add(preface);
	}

	private void addTitlePage(Document document, PdfWriter writer)
			throws Exception {
		Paragraph preface = new Paragraph();
		addEmptyLine(preface, 3);
		Paragraph paragraph1 = new Paragraph(assemblyType + " ", bigBold);
		paragraph1.setAlignment(Element.ALIGN_CENTER);
		preface.add(paragraph1);
		Paragraph paragraph2 = new Paragraph(organismName, mediumItalicBold);
		paragraph2.setAlignment(Element.ALIGN_CENTER);

		preface.add(paragraph2);
		addEmptyLine(preface, 1);
		Paragraph paragraphReporter = new Paragraph(scientistName, smallBold);
		paragraphReporter.setAlignment(Element.ALIGN_CENTER);

		preface.add(paragraphReporter);
		java.util.List<String> outPutVaules = Arrays.asList(specialization
				.replace("\n", "").replace("\r", "").split(","));

		for (int i = 0; i < outPutVaules.size(); i++) {
			Paragraph paragraphAboutReporter1 = new Paragraph(
					outPutVaules.get(i), tinyBold);
			paragraphAboutReporter1.setAlignment(Element.ALIGN_CENTER);
			preface.add(paragraphAboutReporter1);
		}
		Paragraph paragraphAboutReporter4 = new Paragraph(address, tinyBold);
		paragraphAboutReporter4.setAlignment(Element.ALIGN_CENTER);
		preface.add(paragraphAboutReporter4);

		Image image1 = Image.getInstance(Utils.IMAGE_DIRECTORY
				+ "bionivid_logo.png");
		image1.scaleAbsolute(320f, 280f);
		image1.setAlignment(Element.ALIGN_CENTER);
		image1.setAbsolutePosition(document.left() + 100,
				document.bottom() + 50);
		preface.add(image1);

		document.add(preface);
		document.newPage();
		secondPage(document, writer);
		document.newPage();
		secondButOnePage(document, writer);
		document.newPage();
		thirdPage(document, writer);

	}

	public void secondButOnePage(Document document, PdfWriter writer)
			throws Exception {

		Paragraph preface = new Paragraph();
		addEmptyLine(preface, 3);
		Paragraph paragraphObjective = new Paragraph("Overall Summary:",
				tinyBold);
		paragraphObjective.setAlignment(Element.ALIGN_LEFT);
		preface.add(paragraphObjective);
		NumberFormat numberFormat = NumberFormat.getNumberInstance(Locale.US);
		
		addEmptyLine(preface, 2);
		
		PdfPTable tableToolTrinity = new PdfPTable(2);
		tableToolTrinity.setWidthPercentage(100);
		Paragraph paragraphTool = new Paragraph("Raw Data Quality Summary",
				tableFontHeader);
		paragraphTool.setAlignment(Element.ALIGN_CENTER);
		PdfPCell cellTool = new PdfPCell();
		cellTool.setColspan(12);
		cellTool.setFixedHeight(40f);
		cellTool.setPaddingTop(-10);
		cellTool.addElement(paragraphTool);
		cellTool.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cellTool.setBackgroundColor(new BaseColor(79, 98, 40));
		tableToolTrinity.addCell(cellTool);
//		(NumberFormat.getNumberInstance(Locale.US).format(35634646)
//		BigDecimal num1 = new BigDecimal(showTotalNoRead);
		tableToolTrinity.addCell(getTableCell("Total No. of reads", new BaseColor(79, 98, 40), tableFontWhite));
		tableToolTrinity.addCell(getTableCell(numberFormat.format(showTotalNoRead) + " ( " + showTotalNoRead.divide(num2).setScale(2, BigDecimal.ROUND_HALF_EVEN).toString() + " Million )", new BaseColor(
				235, 241, 221), tableFontBlack));

//		num1 = new BigDecimal(showTotalNoHqRead);
		tableToolTrinity.addCell(getTableCell("Total HQ reads", new BaseColor(
				79, 98, 40), tableFontWhite));
		tableToolTrinity.addCell(getTableCell(numberFormat.format(showTotalNoHqRead)
				+ " ( " + showTotalNoHqRead.divide(num2).setScale(2, BigDecimal.ROUND_HALF_EVEN).toString() + " Million )",
				new BaseColor(214, 227, 188), tableFontBlack));
//		num1 = new BigDecimal(showTotalLowReads);
		tableToolTrinity.addCell(getTableCell("Total Low quality reads",
				new BaseColor(79, 98, 40), tableFontWhite));

		tableToolTrinity.addCell(getTableCell(numberFormat.format(showTotalLowReads)
				+ " ( " + showTotalLowReads.divide(num2).setScale(2, BigDecimal.ROUND_HALF_EVEN).toString() + " Million )",
				new BaseColor(235, 241, 221), tableFontBlack));

		preface.add(tableToolTrinity);
		addEmptyLine(preface, 6);
		// addPieChart(document, writer);

		Paragraph paragraphObjective1 = new Paragraph("", tinyBold);
		paragraphObjective.setAlignment(Element.ALIGN_LEFT);
		preface.add(paragraphObjective1);
		Paragraph p = new Paragraph();
		MultiFolderReading mf = new MultiFolderReading();
		String nameOfFileImage = mf.getFileNameInDirectory("_summary.png",
				fullPath);
		if (nameOfFileImage.equals("not_found"))
			throw new ExceptionFileNotFound("summery image file not found");
		Image imageHeader = Image.getInstance(fullPath + "/" + nameOfFileImage);
		imageHeader.scaleAbsolute(500f, 300f);
		imageHeader.setAlignment(Element.ALIGN_RIGHT);
		p.add(imageHeader);
		preface.add(p);
		document.add(preface);

	}

	@SuppressWarnings("unused")
	private void addPieChart(Document document, PdfWriter writer) throws Exception {
		writeChartToPDF(generatePieChart(), 500, 400, "C://piechart.pdf",
				document, writer);

	}

	@SuppressWarnings("deprecation")
	public void writeChartToPDF(JFreeChart chart, int width, int height,
			String fileName, Document document, PdfWriter writer) throws Exception {


			// document.open();
			PdfContentByte contentByte = writer.getDirectContent();
			PdfTemplate template = contentByte.createTemplate(width, height);

			Graphics2D graphics2d = template.createGraphics(width, height,
					new DefaultFontMapper());
			Rectangle2D rectangle2d = new Rectangle2D.Double(0, 0, width,
					height);
			Image watermark_image = Image.getInstance(Utils.IMAGE_DIRECTORY
					+ "watermark.gif");
			watermark_image.setAbsolutePosition(0, 50);

			contentByte.addImage(watermark_image);
			chart.draw(graphics2d, rectangle2d);

			graphics2d.dispose();
			contentByte.addTemplate(template, 50, 100);
			// document.newPage();

		// document.close();
	}

	public JFreeChart generatePieChart() {
		DefaultPieDataset myColoredChart = new DefaultPieDataset();
		myColoredChart.setValue("High quality filtered reads",
				totNoHqReadsMySingleEnd);
		myColoredChart.setValue("Low quality reads", subSingleEnd);
		myColoredChart.setValue("Primer/Adapter contaminated reads", 0);
		JFreeChart chart = ChartFactory.createPieChart3D("Base Composition",
				myColoredChart, true, true, false);

		PiePlot3D ColorConfigurator = (PiePlot3D) chart.getPlot();
		ColorConfigurator.setSectionPaint("High quality filtered reads",
				new Color(146, 180, 80));
		ColorConfigurator.setSectionPaint("Low quality reads", new Color(146,
				208, 80));
		ColorConfigurator.setSectionPaint("Primer/Adapter contaminated reads",
				new Color(235, 241, 221));
		return chart;
	}
	
	public void secondPageForMoreSamples(Document document, PdfWriter writer)
			throws Exception{

		JavaRunCommands runCMD = new JavaRunCommands();
		MultiFolderReading mf = new MultiFolderReading();
		
		String outputFileName = mf.getFileNameInDirectory("_stat", fullPath);
		
		String output = runCMD.executeCommandOnlyForBact(Utils.PARSE_CUTOFF_FOR_QC + fullPath + "/" + outputFileName);
		String [] cutoffForHQ = output.split("\n|\r");
		
		Paragraph preface = new Paragraph();
		addEmptyLine(preface, 3);
	
		Paragraph paragraphOverview = new Paragraph("Sample Overview:",
				tinyBold);
		paragraphOverview.setAlignment(Element.ALIGN_LEFT);
		preface.add(paragraphOverview);
		addEmptyLine(preface, 1);
		PdfPTable tableOverview = new PdfPTable(2);
		tableOverview.setWidthPercentage(100);

		PdfPCell cell1 = new PdfPCell();
		cell1.setMinimumHeight(10);
		cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell1.addElement(new Phrase("Organism"));
		cell1.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell1);

		PdfPCell cell12 = new PdfPCell();
		cell12.setMinimumHeight(10);
		cell12.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell12.addElement(new Phrase("- " + organismName, tinyItalicBold));
		cell12.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell12);
		// addEmptyLine(preface, 1);

		PdfPCell cell3 = new PdfPCell();
		cell3.setMinimumHeight(10);
		cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell3.addElement(new Phrase("NGS Platform Used"));
		cell3.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell3);

		PdfPCell cell4 = new PdfPCell();
		cell4.setMinimumHeight(10);
		cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell4.addElement(new Phrase("- " + plateform));
		cell4.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell4);

		PdfPCell cell5 = new PdfPCell();
		cell5.setMinimumHeight(10);
		cell5.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell5.addElement(new Phrase("Sequencing Layout"));
		cell5.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell5);

		PdfPCell cell6 = new PdfPCell();
		cell6.setMinimumHeight(10);
		cell6.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell6.addElement(new Phrase("- " + inputReadTypes));
		cell6.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell6);

		PdfPCell cell811 = new PdfPCell();
		cell811.setMinimumHeight(10);
		cell811.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell811.addElement(new Phrase("Sequencing Type"));
		cell811.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell811);

		PdfPCell cell821 = new PdfPCell();
		cell821.setMinimumHeight(10);
		cell821.setHorizontalAlignment(Element.ALIGN_LEFT);

		cell821.addElement(new Phrase("- " + sequencingType));
		cell821.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell821);

		PdfPCell cell91 = new PdfPCell();
		cell91.setMinimumHeight(10);
		cell91.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell91.addElement(new Phrase("Tools Used For QC"));
		cell91.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell91);

		PdfPCell cell92 = new PdfPCell();
		cell92.setMinimumHeight(10);
		cell92.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell92.addElement(new Phrase("- NGSQC Toolkit, SQIT"));
		cell92.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell92);

		PdfPCell cell111 = new PdfPCell();
		cell111.setMinimumHeight(10);
		cell111.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell111.addElement(new Phrase("Sample Name"));
		cell111.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell111);

		PdfPCell cell112 = new PdfPCell();
		cell112.setMinimumHeight(10);
		cell112.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell112.addElement(new Phrase("- " + nameOfSample));
		cell112.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell112);
		preface.add(tableOverview);
		addEmptyLine(preface, 1);
		Image arrow_bullet = Image.getInstance(Utils.IMAGE_DIRECTORY
				+ "arrow_bullet.png");
		arrow_bullet.scaleAbsolute(15f, 15f);

		PdfPTable tableToolTrinity = new PdfPTable(2);
		tableToolTrinity.setWidthPercentage(100);
		Paragraph paragraphTool = new Paragraph("NGSQC Toolkit Parameters",
				tableFontHeader);
		paragraphTool.setAlignment(Element.ALIGN_CENTER);
		PdfPCell cellTool = new PdfPCell();
		cellTool.setColspan(12);
		cellTool.setFixedHeight(40f);
		cellTool.setPaddingTop(-10);
		cellTool.addElement(paragraphTool);
		cellTool.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cellTool.setBackgroundColor(new BaseColor(79, 98, 40));
		tableToolTrinity.addCell(cellTool);
		tableToolTrinity.addCell(getTableCell("HQ Bases", new BaseColor(79, 98,
				40), tableFontWhite));
		tableToolTrinity.addCell(getTableCell("Bases having >= " + cutoffForHQ[1] + " phred score",
				new BaseColor(235, 241, 221), tableFontBlack));

		tableToolTrinity.addCell(getTableCell("HQ Reads", new BaseColor(79, 98,
				40), tableFontWhite));
		tableToolTrinity.addCell(getTableCell(
				"Reads having >= " + cutoffForHQ[0] + " HQ bases (i.e. >= " + cutoffForHQ[1] + " phred score)",
				new BaseColor(214, 227, 188), tableFontBlack));

		preface.add(tableToolTrinity);

		document.add(preface);
	}
	
	public void secondPage(Document document, PdfWriter writer) throws Exception 
	{
		JavaRunCommands runCMD = new JavaRunCommands();
		MultiFolderReading mf = new MultiFolderReading();
		
		String outputFileName = mf.getFileNameInDirectory("_stat", fullPath);
		String output = runCMD.executeCommandOnlyForBact(Utils.PARSE_CUTOFF_FOR_QC + fullPath + "/" + outputFileName);
		String [] cutoffForHQ = output.split("\n|\r");
		
		Paragraph preface = new Paragraph();
		addEmptyLine(preface, 3);
		Paragraph paragraphObjective = new Paragraph("Objective(s):", tinyBold);
		paragraphObjective.setAlignment(Element.ALIGN_LEFT);
		preface.add(paragraphObjective);
		Paragraph comb = new Paragraph();

		Paragraph paragraphObjDescription = new Paragraph("      To perform Raw Data Quality Control and generate a comprehensive report for ",tableFontBlack);
		paragraphObjDescription.setAlignment(Element.ALIGN_LEFT);
		
		Chunk chunk1 = new Chunk(organismName, tinyItalicBold);
		Chunk chunk2 = new Chunk();
		
		if(NumberOfSamplesInProject > 1)
		{
			chunk2 = new Chunk(" of " + NumberOfSamplesInProject + " Samples ( viz. " + combinedSampleNames + " ). ", tableFontBlackBold);
		}
		else if(NumberOfSamplesInProject == 1)
		{
			chunk2 = new Chunk(" of " + NumberOfSamplesInProject + " Sample ( viz. " + combinedSampleNames + " ). ", tableFontBlackBold);
		}
		
		paragraphObjDescription.add(chunk1);
		paragraphObjDescription.add(chunk2);

		comb.add(paragraphObjDescription);
		
		preface.add(comb);

		Paragraph paragraphOverview = new Paragraph("Sample Overview:",
				tinyBold);
		paragraphOverview.setAlignment(Element.ALIGN_LEFT);
		preface.add(paragraphOverview);
		addEmptyLine(preface, 1);
		PdfPTable tableOverview = new PdfPTable(2);
		tableOverview.setWidthPercentage(100);

		PdfPCell cell1 = new PdfPCell();
		cell1.setMinimumHeight(10);
		cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell1.addElement(new Phrase("Organism"));
		cell1.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell1);

		PdfPCell cell12 = new PdfPCell();
		cell12.setMinimumHeight(10);
		cell12.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell12.addElement(new Phrase("- " + organismName, tinyItalicBold));
		cell12.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell12);
		// addEmptyLine(preface, 1);

		PdfPCell cell3 = new PdfPCell();
		cell3.setMinimumHeight(10);
		cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell3.addElement(new Phrase("NGS Platform Used"));
		cell3.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell3);

		PdfPCell cell4 = new PdfPCell();
		cell4.setMinimumHeight(10);
		cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell4.addElement(new Phrase("- " + plateform));
		cell4.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell4);

		PdfPCell cell5 = new PdfPCell();
		cell5.setMinimumHeight(10);
		cell5.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell5.addElement(new Phrase("Sequencing Layout"));
		cell5.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell5);

		PdfPCell cell6 = new PdfPCell();
		cell6.setMinimumHeight(10);
		cell6.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell6.addElement(new Phrase("- " + inputReadTypes));
		cell6.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell6);

		PdfPCell cell811 = new PdfPCell();
		cell811.setMinimumHeight(10);
		cell811.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell811.addElement(new Phrase("Sequencing Type"));
		cell811.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell811);

		PdfPCell cell821 = new PdfPCell();
		cell821.setMinimumHeight(10);
		cell821.setHorizontalAlignment(Element.ALIGN_LEFT);

		cell821.addElement(new Phrase("- " + sequencingType));
		cell821.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell821);

		PdfPCell cell91 = new PdfPCell();
		cell91.setMinimumHeight(10);
		cell91.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell91.addElement(new Phrase("Tools Used For QC"));
		cell91.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell91);

		PdfPCell cell92 = new PdfPCell();
		cell92.setMinimumHeight(10);
		cell92.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell92.addElement(new Phrase("- NGSQC Toolkit, SQIT"));
		cell92.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell92);

		PdfPCell cell111 = new PdfPCell();
		cell111.setMinimumHeight(10);
		cell111.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell111.addElement(new Phrase("Sample Name"));
		cell111.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell111);

		PdfPCell cell112 = new PdfPCell();
		cell112.setMinimumHeight(10);
		cell112.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell112.addElement(new Phrase("- " + nameOfSample));
		cell112.setBorder(Rectangle.NO_BORDER);
		tableOverview.addCell(cell112);
		preface.add(tableOverview);
		addEmptyLine(preface, 1);
		Image arrow_bullet = Image.getInstance(Utils.IMAGE_DIRECTORY + "arrow_bullet.png");
		arrow_bullet.scaleAbsolute(15f, 15f);

		PdfPTable tableToolTrinity = new PdfPTable(2);
		tableToolTrinity.setWidthPercentage(100);
		Paragraph paragraphTool = new Paragraph("NGSQC Toolkit Parameters", tableFontHeader);
		paragraphTool.setAlignment(Element.ALIGN_CENTER);
		PdfPCell cellTool = new PdfPCell();
		cellTool.setColspan(12);
		cellTool.setFixedHeight(40f);
		cellTool.setPaddingTop(-10);
		cellTool.addElement(paragraphTool);
		cellTool.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cellTool.setBackgroundColor(new BaseColor(79, 98, 40));
		tableToolTrinity.addCell(cellTool);

		/*tableToolTrinity.addCell(getTableCell("HQ Bases", new BaseColor(79, 98, 40), tableFontWhite));
		tableToolTrinity.addCell(getTableCell("Bases having >= " + cutoffForHQ[1] + " phred score", new BaseColor(235, 241, 221), tableFontBlack));
		
		tableToolTrinity.addCell(getTableCell("HQ Reads", new BaseColor(79, 98, 40), tableFontWhite));
		tableToolTrinity.addCell(getTableCell("Reads having >= " + cutoffForHQ[0] + " HQ bases (i.e. >= " + cutoffForHQ[1] + " phred score)", new BaseColor(214, 227, 188), tableFontBlack));
		*/
		tableToolTrinity.addCell(getTableCell("HQ Bases", new BaseColor(79, 98,
				40), tableFontWhite));
		tableToolTrinity.addCell(getTableCell("Bases having >= " + cutoffForHQ[1] + " phred score",
				new BaseColor(235, 241, 221), tableFontBlack));

		tableToolTrinity.addCell(getTableCell("HQ Reads", new BaseColor(79, 98,
				40), tableFontWhite));
		tableToolTrinity.addCell(getTableCell(
				"Reads having >= " + cutoffForHQ[0] + " HQ bases (i.e. >= " + cutoffForHQ[1] + " phred score)",
				new BaseColor(214, 227, 188), tableFontBlack));
		preface.add(tableToolTrinity);

		document.add(preface);
	}

	protected PdfPCell getTableCell(String value, BaseColor color,
			Font tableFont) {
		PdfPCell cellTool12 = new PdfPCell(new Phrase(value));
		// cellTool12.setFixedHeight(20f);
		// cellTool12.setPaddingTop(-8);
		// cellTool12.setPaddingLeft(5f);
		// cellTool12.setHorizontalAlignment(Element.ALIGN_MIDDLE);
		// cellTool12.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cellTool12.setBackgroundColor(color);
		Paragraph paragraphToolDec = new Paragraph(value, tableFont);
		paragraphToolDec.setAlignment(Element.ALIGN_TOP);
		// cellTool12.addElement(paragraphToolDec);
		return cellTool12;
	}

	protected PdfPCell getTableCellWithSpan(String value, BaseColor color,
			Font tableFont, int colspan) {
		PdfPCell cellTool12 = new PdfPCell(new Phrase(value));
		// cellTool12.setFixedHeight(20f);
		cellTool12.setColspan(colspan);
		// cellTool12.setPaddingTop(-8);
		// cellTool12.setPaddingLeft(5f);
		// cellTool12.setHorizontalAlignment(Element.ALIGN_MIDDLE);
		// cellTool12.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cellTool12.setBackgroundColor(color);
		Paragraph paragraphToolDec = new Paragraph(value, tableFont);
		paragraphToolDec.setAlignment(Element.ALIGN_TOP);
		// cellTool12.addElement(paragraphToolDec);
		return cellTool12;
	}

	public void thirdPage(Document document, PdfWriter writer)
			throws DocumentException {
		Paragraph preface = new Paragraph();
			addEmptyLine(preface, 3);
			PdfPTable tableToolTrinity = new PdfPTable(4);
			tableToolTrinity.setWidthPercentage(100);
			Paragraph paragraphTool = new Paragraph(
					"Raw Data Quality Statistics", tableFontHeader);
			paragraphTool.setAlignment(Element.ALIGN_CENTER);
			PdfPCell cellTool = new PdfPCell();
			cellTool.setColspan(4);
			cellTool.setFixedHeight(40f);
			cellTool.setPaddingTop(-10);
			cellTool.addElement(paragraphTool);
			cellTool.setVerticalAlignment(Element.ALIGN_MIDDLE);
			cellTool.setBackgroundColor(new BaseColor(79, 98, 40));
			tableToolTrinity.addCell(cellTool);

			tableToolTrinity.addCell(getTableCellWithSpan("File name",
					new BaseColor(79, 98, 40), tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					fileNameFirstSingleEnd.replaceAll(".gz.*", ""), new BaseColor(235, 241, 221),
					tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					fileNameFirstPairedEnd.replaceAll(".gz.*", ""), new BaseColor(235, 241, 221),
					tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Minimum Read Length", new BaseColor(79, 98, 40),
					tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(minReadLSingleEnd), new BaseColor(214, 227,
							188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(minReadLPairedEnd), new BaseColor(214, 227,
							188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Maximum Read Length", new BaseColor(79, 98, 40),
					tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(maxReadLSingleEnd), new BaseColor(235, 241,
							221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(maxReadLPairedEnd), new BaseColor(235, 241,
							221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Average Read Length", new BaseColor(79, 98, 40),
					tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(avgReadLSingleEnd), new BaseColor(214, 227,
							188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(avgReadLPairedEnd), new BaseColor(214, 227,
							188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan("Total no. of Reads",
					new BaseColor(79, 98, 40), tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoReadSingleEnd), new BaseColor(235, 241,
							221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoReadPairedEnd), new BaseColor(235, 241,
							221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Total no. of Reads with non-ATGC bases", new BaseColor(79,
							98, 40), tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoAtgcBaseSingleEnd), new BaseColor(214,
							227, 188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoAtgcBasePairedEnd), new BaseColor(214,
							227, 188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Percentage of Reads with non-ATGC bases", new BaseColor(
							79, 98, 40), tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					percTotNoAtgcBaseSingleEnd, new BaseColor(235, 241, 221),
					tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					percTotNoAtgcBasePairedEnd, new BaseColor(235, 241, 221),
					tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan("Total no. of bases",
					new BaseColor(79, 98, 40), tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoBaseSingleEnd), new BaseColor(214, 227,
							188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoBasePairedEnd), new BaseColor(214, 227,
							188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Total no. of HQ bases", new BaseColor(79, 98, 40),
					tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoHqBaseSingleEnd), new BaseColor(235,
							241, 221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoHqBasePairedEnd), new BaseColor(235,
							241, 221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Percentage of HQ bases", new BaseColor(79, 98, 40),
					tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					percTotNoHqBaseSingleEnd, new BaseColor(214, 227, 188),
					tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					percTotNoHqBasePairedEnd, new BaseColor(214, 227, 188),
					tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Total no. of non-ATGC bases", new BaseColor(79, 98, 40),
					tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(""
					+ nf.format(totNoNonAtgcBaseSingleEnd), new BaseColor(235, 241, 221),
					tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(""
					+ totNoNonAtgcBasePairedEnd, new BaseColor(235, 241, 221),
					tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Percentage of non-ATGC bases", new BaseColor(79, 98, 40),
					tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(""
					+ percTotNoNonAtgcBaseSingleEnd, new BaseColor(214, 227,
					188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(""
					+ percTotNoNonAtgcBasePairedEnd, new BaseColor(214, 227,
					188), tableFontBlack, 1));

			Paragraph paragraphTool1 = new Paragraph(
					"High Quality Paired-End Filtered Data Quality Statistics",
					tableFontHeader);
			
			paragraphTool1.setAlignment(Element.ALIGN_CENTER);
			PdfPCell cellTool21 = new PdfPCell();
			cellTool21.setColspan(4);
			cellTool21.setFixedHeight(40f);
			cellTool21.setPaddingTop(-10);
			cellTool21.addElement(paragraphTool1);
			cellTool21.setVerticalAlignment(Element.ALIGN_MIDDLE);
			cellTool21.setBackgroundColor(new BaseColor(79, 98, 40));
			tableToolTrinity.addCell(cellTool21);

			tableToolTrinity.addCell(getTableCellWithSpan("File name",
					new BaseColor(79, 98, 40), tableFontWhite, 2));
			
			if(fileNameSecondSingleEnd.contains(".gz"))
			{
				fileNameSecondSingleEnd = fileNameSecondSingleEnd.replaceAll(".gz.*", "");
				if(!fileNameSecondSingleEnd.contains("_filtered"))
				fileNameSecondSingleEnd = fileNameSecondSingleEnd+"_filtered";
				tableToolTrinity.addCell(getTableCellWithSpan(
						fileNameSecondSingleEnd, new BaseColor(235, 241, 221),
						tableFontBlack, 1));
			}
			else
			{
				tableToolTrinity.addCell(getTableCellWithSpan(
						fileNameSecondSingleEnd, new BaseColor(235, 241, 221),
						tableFontBlack, 1));
			}
			
			if(fileNameSecondPairedEnd.contains(".gz"))
			{
				fileNameSecondPairedEnd = fileNameSecondPairedEnd.replaceAll(".gz.*", "");
				if(!fileNameSecondPairedEnd.contains("_filtered"))
					fileNameSecondPairedEnd = fileNameSecondPairedEnd+"_filtered";
				tableToolTrinity.addCell(getTableCellWithSpan(
						fileNameSecondPairedEnd, new BaseColor(235, 241, 221),
						tableFontBlack, 1));
			}
			else
			{
				tableToolTrinity.addCell(getTableCellWithSpan(
					fileNameSecondPairedEnd, new BaseColor(235, 241, 221),
					tableFontBlack, 1));
			}
			tableToolTrinity.addCell(getTableCellWithSpan(
					"Minimum Read Length", new BaseColor(79, 98, 40),
					tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(minReadLFilterSingleEnd), new BaseColor(214,
							227, 188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(minReadLFilterPairedEnd), new BaseColor(214,
							227, 188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Maximum Read Length", new BaseColor(79, 98, 40),
					tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(maxReadLFilterSingleEnd), new BaseColor(235,
							241, 221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(maxReadLFilterPairedEnd), new BaseColor(235,
							241, 221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Average Read Length", new BaseColor(79, 98, 40),
					tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(avgReadLFilterSingleEnd), new BaseColor(214,
							227, 188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(avgReadLFilterPairedEnd), new BaseColor(214,
							227, 188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Total no. of HQ reads", new BaseColor(79, 98, 40),
					tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoReadFilterSingleEnd), new BaseColor(
							235, 241, 221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoReadFilterPairedEnd), new BaseColor(
							235, 241, 221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Percentage HQ reads", new BaseColor(79, 98, 40),
					tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(""
					+ percOfHqReadsSingleEnd, new BaseColor(214, 227, 188),
					tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(""
					+ percOfHqReadsPairedEnd, new BaseColor(214, 227, 188),
					tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Total no. of HQ Reads with non-ATGC bases", new BaseColor(
							79, 98, 40), tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoAtgcBaseFilterSingleEnd),
					new BaseColor(235, 241, 221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoAtgcBaseFilterPairedEnd),
					new BaseColor(235, 241, 221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Percentage of HQ Reads with ATGC bases non-ATGC bases",
					new BaseColor(79, 98, 40), tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(""
					+ percTotNoAtgcBaseFilterSingleEnd, new BaseColor(214, 227,
					188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(""
					+ percTotNoAtgcBaseFilterPairedEnd, new BaseColor(214, 227,
					188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Total no. of bases in HQ Reads",
					new BaseColor(79, 98, 40), tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoBaseFilterSingleEnd), new BaseColor(
							235, 241, 221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoBaseFilterPairedEnd), new BaseColor(
							235, 241, 221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Total no. of HQ bases in HQ Reads", new BaseColor(79, 98,
							40), tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoHqBaseFilterSingleEnd), new BaseColor(
							214, 227, 188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoHqBaseFilterPairedEnd), new BaseColor(
							214, 227, 188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Percentage of HQ bases in HQ Reads", new BaseColor(79, 98,
							40), tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(""
					+ percTotNoHqBaseFilterSingleEnd, new BaseColor(235, 241,
					221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(""
					+ percTotNoHqBaseFilterPairedEnd, new BaseColor(235, 241,
					221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Total no. of non-ATGC bases in HQ Reads", new BaseColor(
							79, 98, 40), tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoNonAtgcBaseFilterSingleEnd),
					new BaseColor(214, 227, 188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"" + nf.format(totNoNonAtgcBaseFilterPairedEnd),
					new BaseColor(214, 227, 188), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(
					"Percentage of non-ATGC bases in HQ Reads", new BaseColor(
							79, 98, 40), tableFontWhite, 2));
			tableToolTrinity.addCell(getTableCellWithSpan(""
					+ percTotNoNonAtgcBaseFilterSingleEnd, new BaseColor(235,
					241, 221), tableFontBlack, 1));

			tableToolTrinity.addCell(getTableCellWithSpan(""
					+ percTotNoNonAtgcBaseFilterPairedEnd, new BaseColor(235,
					241, 221), tableFontBlack, 1));

			preface.add(tableToolTrinity);
			addEmptyLine(preface, 6);

			document.add(preface);

	}

	/*
	 * private static PdfPCell addFirstCellAssembleTable(String x) { PdfPCell
	 * cellTool51 = new PdfPCell(); cellTool51.setMinimumHeight(8); Paragraph
	 * paragraphTool = new Paragraph(x, tooTiny);
	 * paragraphTool.setAlignment(Element.ALIGN_LEFT);
	 * cellTool51.setVerticalAlignment(Element.ALIGN_LEFT);
	 * cellTool51.addElement(paragraphTool); cellTool51.setPadding(5);
	 * cellTool51.setPaddingTop(10); cellTool51.setBackgroundColor(new
	 * BaseColor(79, 98, 40)); return cellTool51; }
	 */
	/*
	 * private static PdfPCell addSecondCellAssembleTable(String x, BaseColor c)
	 * { PdfPCell cellTool52 = new PdfPCell(); cellTool52.setMinimumHeight(8);
	 * cellTool52.setPadding(5);
	 * cellTool52.setHorizontalAlignment(Element.ALIGN_MIDDLE);
	 * cellTool52.setVerticalAlignment(Element.ALIGN_MIDDLE);
	 * cellTool52.setBackgroundColor(c); Paragraph paragraphToolDec3 = new
	 * Paragraph(x); paragraphToolDec3.setAlignment(Element.ALIGN_TOP);
	 * cellTool52.addElement(paragraphToolDec3); return cellTool52;
	 * 
	 * }
	 */

	public void fourthPage(Document document, PdfWriter writer)
			throws Exception {
		Paragraph preface = new Paragraph();
			addEmptyLine(preface, 3);
			Paragraph paragraphObjective = new Paragraph(
					"Comments on Data Quality:", tinyBold);
			paragraphObjective.setAlignment(Element.ALIGN_LEFT);
			preface.add(paragraphObjective);

			PdfPTable tableToolTrinity = new PdfPTable(12);
			tableToolTrinity.setWidthPercentage(100);

			PdfPCell cellTool1 = new PdfPCell();

			Image arrow_bullet = Image.getInstance(Utils.IMAGE_DIRECTORY
					+ "arrow_bullet.png");
			arrow_bullet.scaleAbsolute(20f, 20f);
			arrow_bullet.setAlignment(Element.ALIGN_RIGHT);
			cellTool1.setVerticalAlignment(Element.ALIGN_RIGHT);
			cellTool1.addElement(arrow_bullet);
			cellTool1.setPadding(5);
			cellTool1.setBorder(Rectangle.NO_BORDER);
			cellTool1.setPaddingTop(10);
			tableToolTrinity.addCell(cellTool1);

			PdfPCell cellTool12 = new PdfPCell();
			cellTool12.setColspan(11);
			cellTool12.setPadding(5);
			cellTool12.setHorizontalAlignment(Element.ALIGN_MIDDLE);
			cellTool12.setVerticalAlignment(Element.ALIGN_MIDDLE);
			cellTool12.setBorder(Rectangle.NO_BORDER);

			String statusReadString = "";
			MultiFolderReading m = new MultiFolderReading();
			if (m.getValueFromPercentage(percOfHqReadsSingleEnd) < 60) {
				statusReadString = "not good";
			} else if (m.getValueFromPercentage(percOfHqReadsSingleEnd) > 60
					&& m.getValueFromPercentage(percOfHqReadsSingleEnd) < 70) {
				statusReadString = "average";
			} else if (m.getValueFromPercentage(percOfHqReadsSingleEnd) > 70
					&& m.getValueFromPercentage(percOfHqReadsSingleEnd) < 80) {
				statusReadString = "good";
			} else if (m.getValueFromPercentage(percOfHqReadsSingleEnd) > 80) {
				statusReadString = "very good";
			}
			Paragraph comb = new Paragraph();
			Chunk paragraphToolDec = new Chunk("Overall data quality is ");
			comb.add(paragraphToolDec);
			Chunk paragraphToolDecType = new Chunk("" + statusReadString,
					smallBoldBlack);
			comb.add(paragraphToolDecType);
			Chunk paragraphToolDecType1 = new Chunk(" with ");
			comb.add(paragraphToolDecType1);
			Chunk paragraphToolDecType2 = new Chunk(
					"" + percOfHqReadsSingleEnd, smallBoldBlack);
			comb.add(paragraphToolDecType2);
			Chunk paragraphToolDecType3 = new Chunk(" High Quality reads.");
			comb.add(paragraphToolDecType3);
			comb.setAlignment(Element.ALIGN_TOP);
			cellTool12.addElement(comb);
			tableToolTrinity.addCell(cellTool12);

			PdfPCell cellTool2 = new PdfPCell();

			cellTool2.setVerticalAlignment(Element.ALIGN_RIGHT);
			cellTool2.addElement(arrow_bullet);
			cellTool2.setPadding(5);
			cellTool2.setBorder(Rectangle.NO_BORDER);
			cellTool2.setPaddingTop(10);
			tableToolTrinity.addCell(cellTool2);

			PdfPCell cellTool22 = new PdfPCell();
			cellTool22.setColspan(11);
			cellTool22.setPadding(5);
			cellTool22.setHorizontalAlignment(Element.ALIGN_MIDDLE);
			cellTool22.setVerticalAlignment(Element.ALIGN_MIDDLE);
			cellTool22.setBorder(Rectangle.NO_BORDER);
			Paragraph paragraphToolDec2 = new Paragraph(
					"High quality reads have average read length "
							+ avgReadLFilterSingleEnd
							+ " bp, these reads will be considered for further downstream analysis.");
			paragraphToolDec2.setAlignment(Element.ALIGN_TOP);
			cellTool22.addElement(paragraphToolDec2);
			tableToolTrinity.addCell(cellTool22);
			preface.add(tableToolTrinity);
			document.add(preface);
		
	}

	private static void addEmptyLine(Paragraph paragraph, int number) {
		for (int i = 0; i < number; i++) {
			paragraph.add(new Paragraph(" "));
		}
	}
}