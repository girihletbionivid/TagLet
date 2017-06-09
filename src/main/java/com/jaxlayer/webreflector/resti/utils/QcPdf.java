package com.jaxlayer.webreflector.resti.utils;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.geom.Rectangle2D;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.math.BigInteger;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Arrays;
import java.util.Locale;

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
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfTemplate;
import com.itextpdf.text.pdf.PdfWriter;

public class QcPdf 
{
	private static Font bigBold = new Font(Font.FontFamily.TIMES_ROMAN, 36, Font.BOLD, new BaseColor(79, 98, 40));
	private static Font mediumItalicBold = new Font(Font.FontFamily.TIMES_ROMAN, 30, Font.BOLDITALIC, new BaseColor(79, 98, 40));
	private static Font smallBoldBlack = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, new BaseColor(0, 0, 0));
	private static Font smallBold = new Font(Font.FontFamily.TIMES_ROMAN, 25, Font.BOLD, new BaseColor(79, 98, 40));
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

	private String inputReadTypes, organismName,
			plateform, scientistName, specialization, nameOfSample, address,
			assemblyType, fileNameFirst, fileNameSecond, pdfFilePath;
	private Double minReadL, maxReadL, avgReadL, totNoRead, totNoAtgcBase,
			totNoNonAtgcBase;
	private String totNoBase, totNoHqBase, totNoBaseFilter, totNoHqBaseFilter;
	private Double minReadLFilter, maxReadLFilter, avgReadLFilter,
			totNoReadFilter, totNoAtgcBaseFilter, totNoNonAtgcBaseFilter,
			totNoHqReadsMy, totNoReadsMy;
	private String percTotNoHqBase, percTotNoAtgcBaseFilter,
			percTotNoHqBaseFilter, percTotNoNonAtgcBase,
			percTotNoNonAtgcBaseFilter, percTotNoAtgcBase, percOfHqReads,
			fullPath, sequencingType;
	Double sub;
	NumberFormat nf = new DecimalFormat("#");
	NumberFormat nf1 = new DecimalFormat("#.##");
	
	private Integer numberOfSample;
	private Integer NumberOfSamplesInProject;
	
	private Document document;
	private PdfWriter writer;
	private String combinedSampleNames;
	
	private boolean checkReturnValueVar;

	public QcPdf(String organismName, String scientistName,
			String specialization, String plateform, String nameOfSample,
			String address, String pdfFilePath, String assemblyType,
			String inputReadTypes, Double totNoReadsMy, Double totNoHqReadsMy,
			String percOfHqReads, String fileNameFirst, String fileNameSecond,
			Double minReadL, Double minReadLFilter, Double maxReadL,
			Double maxReadLFilter, Double avgReadL, Double avgReadLFilter,
			Double totNoRead, Double totNoReadFilter, Double totNoAtgcBase,
			Double totNoAtgcBaseFilter, String percTotNoAtgcBase,
			String percTotNoAtgcBaseFilter, String totNoBase,
			String totNoBaseFilter, String totNoHqBase,
			String totNoHqBaseFilter, String percTotNoHqBase,
			String percTotNoHqBaseFilter, Double totNoNonAtgcBase,
			Double totNoNonAtgcBaseFilter, String percTotNoNonAtgcBase,
			String percTotNoNonAtgcBaseFilter, String fullPath,
			String outputFileName, String sequencingType,
			Integer SampleNumber, Integer NumberOfSamplesInProject,
			Document document, PdfWriter writer, String combinedSampleNames) throws Exception {

		this.organismName = organismName;
		this.scientistName = scientistName;
		this.specialization = specialization;
		this.plateform = plateform;
		this.nameOfSample = nameOfSample;
		this.address = address;
		this.assemblyType = assemblyType;

		this.pdfFilePath = pdfFilePath;
		this.totNoReadsMy = totNoReadsMy;
		this.totNoHqReadsMy = totNoHqReadsMy;
		this.inputReadTypes = inputReadTypes;
		this.percOfHqReads = percOfHqReads;
		this.fileNameFirst = fileNameFirst;
		this.fileNameSecond = fileNameSecond;

		this.minReadL = minReadL;
		this.maxReadL = maxReadL;
		this.avgReadL = avgReadL;
		this.totNoRead = totNoRead;
		this.totNoAtgcBase = totNoAtgcBase;
		this.percTotNoAtgcBase = percTotNoAtgcBase;
		this.totNoBase = totNoBase;
		this.totNoHqBase = totNoHqBase;
		this.percTotNoHqBase = percTotNoHqBase;
		this.totNoNonAtgcBase = totNoNonAtgcBase;
		this.percTotNoNonAtgcBase = percTotNoNonAtgcBase;

		this.minReadLFilter = minReadLFilter;
		this.maxReadLFilter = maxReadLFilter;
		this.avgReadLFilter = avgReadLFilter;
		this.totNoReadFilter = totNoReadFilter;
		this.totNoAtgcBaseFilter = totNoAtgcBaseFilter;
		this.percTotNoAtgcBaseFilter = percTotNoAtgcBaseFilter;
		this.totNoBaseFilter = totNoBaseFilter;
		this.totNoHqBaseFilter = totNoHqBaseFilter;
		this.percTotNoHqBaseFilter = percTotNoHqBaseFilter;
		this.totNoNonAtgcBaseFilter = totNoNonAtgcBaseFilter;
		this.percTotNoNonAtgcBaseFilter = percTotNoNonAtgcBaseFilter;
		this.sub = totNoReadsMy - totNoHqReadsMy;
		this.fullPath = fullPath;
		this.sequencingType = sequencingType;
		this.checkReturnValueVar = false;
		this.numberOfSample = SampleNumber;
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
	
	public Boolean generatePdf(Document document,PdfWriter writer) throws Exception 
	{
			addTitlePage(document, writer);
			document.newPage();
			
			thirdPageB(document, writer);
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
		thirdPageB(document, writer);
		
		document.newPage();
		thirdPageC(document, writer);
		
		document.newPage();
		fourthPage(document, writer);
		
		return true;
	}
	
	public void thirdPageC(Document document, PdfWriter writer) throws Exception {

		Paragraph preface = new Paragraph();

		addEmptyLine(preface, 3);
		Paragraph paragraphObjective = new Paragraph(
				"GC content distribution:", tinyBold);
		paragraphObjective.setAlignment(Element.ALIGN_LEFT);
		preface.add(paragraphObjective);
		Paragraph p = new Paragraph();
		MultiFolderReading mf = new MultiFolderReading();
		String nameOfFileImage = mf.getFileNameInDirectory(
				"_gcDistribution.png", fullPath);
		
		
		if(nameOfFileImage.equals("not_found"))
			throw new ExceptionFileNotFound("gc distribution image file not found");
		Image imageHeader = Image.getInstance(fullPath + "/" + nameOfFileImage);
		imageHeader.scaleAbsolute(500f, 300f);
		imageHeader.setAlignment(Element.ALIGN_RIGHT);
		p.add(imageHeader);
		preface.add(p);

		Paragraph paragraphObjective2 = new Paragraph(
				"Average Read Quality Distribution Graph:", tinyBold);
		paragraphObjective2.setAlignment(Element.ALIGN_LEFT);
		preface.add(paragraphObjective2);
		Paragraph p2 = new Paragraph();
		String nameOfFileImage2 = mf.getFileNameInDirectory(
				"_qualDistribution.png", fullPath);
		if(nameOfFileImage2.equals("not_found"))
			throw new ExceptionFileNotFound("qual distribution image file not found");
		Image imageHeader2 = Image.getInstance(fullPath + "/"
				+ nameOfFileImage2);
		imageHeader2.scaleAbsolute(500f, 300f);
		imageHeader2.setAlignment(Element.ALIGN_RIGHT);
		p2.add(imageHeader2);
		preface.add(p2);
		document.add(preface);
	}

	public void thirdPageB(Document document, PdfWriter writer)
			throws Exception {
		Paragraph preface = new Paragraph();

		addEmptyLine(preface, 3);
		Paragraph paragraphObjective = new Paragraph(
				"Average Base Quality Distribution Graph:", tinyBold);
		paragraphObjective.setAlignment(Element.ALIGN_LEFT);
		preface.add(paragraphObjective);
		Paragraph p = new Paragraph();
		MultiFolderReading mf = new MultiFolderReading();
		String nameOfFileImage = mf.getFileNameInDirectory("_avgQual.png",
				fullPath);
		
		if(nameOfFileImage.equals("not_found"))
			throw new ExceptionFileNotFound("avg Qual image file not found");
		Image imageHeader = Image.getInstance(fullPath + "/" + nameOfFileImage);
		imageHeader.scaleAbsolute(500f, 300f);
		imageHeader.setAlignment(Element.ALIGN_RIGHT);
		p.add(imageHeader);
		preface.add(p);
		Paragraph paragraphObjective2 = new Paragraph("Base composition:",
				tinyBold);
		paragraphObjective2.setAlignment(Element.ALIGN_LEFT);
		preface.add(paragraphObjective2);
		Paragraph p2 = new Paragraph();
		String nameOfFileImage2 = mf.getFileNameInDirectory(
				"_baseCompostion.png", fullPath);
		if(nameOfFileImage2.equals("not_found"))
			throw new ExceptionFileNotFound("base composition image file not found");
		Image imageHeader2 = Image.getInstance(fullPath + "/"
				+ nameOfFileImage2);
		imageHeader2.scaleAbsolute(500f, 300f);
		imageHeader2.setAlignment(Element.ALIGN_RIGHT);
		p2.add(imageHeader2);
		preface.add(p2);
		document.add(preface);
		/*
		 * Paragraph paragraphObjective2 = new Paragraph(
		 * "GC content distribution:", tinyBold);
		 * paragraphObjective2.setAlignment(Element.ALIGN_LEFT);
		 * preface.add(paragraphObjective2); Paragraph p2 = new Paragraph();
		 * String nameOfFileImage2 =
		 * mf.getFileNameInDirectory("_gcDistribution.png", fullPath); Image
		 * imageHeader2 = Image.getInstance(fullPath+"/" + nameOfFileImage2);
		 * imageHeader2.scaleAbsolute(500f, 300f);
		 * imageHeader2.setAlignment(Element.ALIGN_RIGHT); p2.add(imageHeader2);
		 * preface.add(p2); document.add(preface);
		 */

	}

	public void thirdPageA(Document document, PdfWriter writer)
			throws Exception {
		Paragraph preface = new Paragraph();

		addEmptyLine(preface, 3);
		Paragraph paragraphObjective = new Paragraph(
				"Average Base Quality Distribution Graph:", tinyBold);
		paragraphObjective.setAlignment(Element.ALIGN_LEFT);
		preface.add(paragraphObjective);
		MultiFolderReading mf = new MultiFolderReading();
		String nameOfFileImage = mf.getFileNameInDirectory("_avgQual.png",
				fullPath);
		if(nameOfFileImage.equals("not_found"))
			throw new ExceptionFileNotFound("avg Qual image file not found");
		Paragraph p = new Paragraph();
		Image imageHeader = Image.getInstance(fullPath + "/" + nameOfFileImage);
		imageHeader.scaleAbsolute(600f, 300f);
		imageHeader.setAlignment(Element.ALIGN_RIGHT);
		p.add(imageHeader);
		preface.add(p);

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

		tableToolTrinity.addCell(getTableCell("Total No. of reads",
				new BaseColor(79, 98, 40), tableFontWhite));
		tableToolTrinity.addCell(getTableCell(numberFormat.format(totNoReadsMy) + " ( "
				+ nf1.format(totNoReadsMy / 1000000) + " Million )",
				new BaseColor(235, 241, 221), tableFontBlack));

		tableToolTrinity.addCell(getTableCell("Total HQ reads", new BaseColor(
				79, 98, 40), tableFontWhite));
		tableToolTrinity.addCell(getTableCell(numberFormat.format(totNoHqReadsMy) + " ( "
				+ nf1.format(totNoHqReadsMy / 1000000) + " Million )",
				new BaseColor(214, 227, 188), tableFontBlack));

		tableToolTrinity.addCell(getTableCell("Total Low quality reads",
				new BaseColor(79, 98, 40), tableFontWhite));

		tableToolTrinity.addCell(getTableCell(
				numberFormat.format(sub) + " ( " + nf1.format(sub / 1000000) + " Million )",
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
		if(nameOfFileImage.equals("not_found"))
		throw new ExceptionFileNotFound("summary image file not found");
		Image imageHeader = Image.getInstance(fullPath + "/" + nameOfFileImage);
		imageHeader.scaleAbsolute(500f, 300f);
		imageHeader.setAlignment(Element.ALIGN_RIGHT);
		p.add(imageHeader);
		preface.add(p);
		document.add(preface);

	}
/*
	private void addPieChart(Document document, PdfWriter writer) {
		writeChartToPDF(generatePieChart(), 500, 400, "C://piechart.pdf",
				document, writer);

	}*/

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
		myColoredChart.setValue("High quality filtered reads", totNoHqReadsMy);
		myColoredChart.setValue("Low quality reads", sub);
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

	public void secondPage(Document document, PdfWriter writer) throws Exception 
	{
		JavaRunCommands runCMD = new JavaRunCommands();
		MultiFolderReading mf = new MultiFolderReading();
		
		String outputFileName = mf.getFileNameInDirectory("_stat", fullPath);
		
		System.out.println("*********Command: " + Utils.PARSE_CUTOFF_FOR_QC + fullPath + "/" + outputFileName + "\n");
		
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
		tableToolTrinity.addCell(getTableCell("Reads having >= " + cutoffForHQ[0] + " HQ bases (i.e. >= " + cutoffForHQ[1] + " phred score)",
				new BaseColor(214, 227, 188), tableFontBlack));

		preface.add(tableToolTrinity);

		document.add(preface);
	}
	public void secondPageForMoreSamples(Document document, PdfWriter writer) throws Exception
	{
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

		tableToolTrinity.addCell(getTableCell("HQ Bases", new BaseColor(79, 98, 40), tableFontWhite));
		tableToolTrinity.addCell(getTableCell("Bases having >= " + cutoffForHQ[1] + " phred score.", new BaseColor(235, 241, 221), tableFontBlack));

		tableToolTrinity.addCell(getTableCell("HQ Reads", new BaseColor(79, 98, 40), tableFontWhite));
		tableToolTrinity.addCell(getTableCell("Reads having >= " + cutoffForHQ[0] + " HQ bases (i.e. >= " + cutoffForHQ[1] + " phred score).", new BaseColor(214, 227, 188), tableFontBlack));

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

	public void thirdPage(Document document, PdfWriter writer)
			throws Exception 
	{
			NumberFormat numberFormat = NumberFormat.getNumberInstance(Locale.US);
			Paragraph preface = new Paragraph();
			addEmptyLine(preface, 3);
			PdfPTable tableToolTrinity = new PdfPTable(2);
			tableToolTrinity.setWidthPercentage(100);
			Paragraph paragraphTool = new Paragraph(
					"Raw Data Quality Statistics", tableFontHeader);
			paragraphTool.setAlignment(Element.ALIGN_CENTER);
			PdfPCell cellTool = new PdfPCell();
			cellTool.setColspan(12);
			cellTool.setFixedHeight(40f);
			cellTool.setPaddingTop(-10);
			cellTool.addElement(paragraphTool);
			cellTool.setVerticalAlignment(Element.ALIGN_MIDDLE);
			cellTool.setBackgroundColor(new BaseColor(79, 98, 40));
			tableToolTrinity.addCell(cellTool);

			tableToolTrinity.addCell(getTableCell("File name", new BaseColor(
					79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell(fileNameFirst, new BaseColor(
					235, 241, 221), tableFontBlack));

			tableToolTrinity.addCell(getTableCell("Minimum Read Length",
					new BaseColor(79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell("" + nf.format(minReadL),
					new BaseColor(214, 227, 188), tableFontBlack));

			tableToolTrinity.addCell(getTableCell("Maximum Read Length",
					new BaseColor(79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell("" + nf.format(maxReadL),
					new BaseColor(235, 241, 221), tableFontBlack));

			tableToolTrinity.addCell(getTableCell("Average Read Length",
					new BaseColor(79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell("" + nf.format(avgReadL),
					new BaseColor(214, 227, 188), tableFontBlack));

			tableToolTrinity.addCell(getTableCell("Total no. of Reads",
					new BaseColor(79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell("" + numberFormat.format(totNoRead),
					new BaseColor(235, 241, 221), tableFontBlack));

			tableToolTrinity.addCell(getTableCell(
					"Total no. of Reads with non-ATGC bases", new BaseColor(79,
							98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell(
					"" + numberFormat.format(totNoAtgcBase),
					new BaseColor(214, 227, 188), tableFontBlack));

			tableToolTrinity.addCell(getTableCell(
					"Percentage of Reads with non-ATGC bases", new BaseColor(
							79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell(percTotNoAtgcBase,
					new BaseColor(235, 241, 221), tableFontBlack));

			tableToolTrinity.addCell(getTableCell("Total no. of bases",
					new BaseColor(79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell("" + numberFormat.format(new BigInteger(totNoBase)),
					new BaseColor(214, 227, 188), tableFontBlack));

			tableToolTrinity.addCell(getTableCell("Total no. of HQ bases",
					new BaseColor(79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell("" + numberFormat.format(new BigInteger(totNoHqBase)),
					new BaseColor(235, 241, 221), tableFontBlack));

			tableToolTrinity.addCell(getTableCell("Percentage of HQ bases",
					new BaseColor(79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell(percTotNoHqBase,
					new BaseColor(214, 227, 188), tableFontBlack));

			tableToolTrinity.addCell(getTableCell(
					"Total no. of non-ATGC bases", new BaseColor(79, 98, 40),
					tableFontWhite));
			tableToolTrinity.addCell(getTableCell(
					"" + numberFormat.format(totNoNonAtgcBase), new BaseColor(235, 241,
							221), tableFontBlack));

			tableToolTrinity.addCell(getTableCell(
					"Percentage of non-ATGC bases", new BaseColor(79, 98, 40),
					tableFontWhite));
			tableToolTrinity.addCell(getTableCell("" + percTotNoNonAtgcBase,
					new BaseColor(214, 227, 188), tableFontBlack));

			Paragraph paragraphTool1 = new Paragraph(
					"High Quality Single-End Filtered Data Quality Statistics",
					tableFontHeader);
			paragraphTool1.setAlignment(Element.ALIGN_CENTER);
			PdfPCell cellTool21 = new PdfPCell();
			cellTool21.setColspan(12);
			cellTool21.setFixedHeight(40f);
			cellTool21.setPaddingTop(-10);
			cellTool21.addElement(paragraphTool1);
			cellTool21.setVerticalAlignment(Element.ALIGN_MIDDLE);
			cellTool21.setBackgroundColor(new BaseColor(79, 98, 40));
			tableToolTrinity.addCell(cellTool21);

			tableToolTrinity.addCell(getTableCell("File name", new BaseColor(
					79, 98, 40), tableFontWhite));
			fileNameSecond = fileNameSecond.replaceAll(".gz.*", "");
			tableToolTrinity.addCell(getTableCell(fileNameSecond,
					new BaseColor(235, 241, 221), tableFontBlack));

			tableToolTrinity.addCell(getTableCell("Minimum Read Length",
					new BaseColor(79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell(
					"" + nf.format(minReadLFilter),
					new BaseColor(214, 227, 188), tableFontBlack));

			tableToolTrinity.addCell(getTableCell("Maximum Read Length",
					new BaseColor(79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell(
					"" + nf.format(maxReadLFilter),
					new BaseColor(235, 241, 221), tableFontBlack));

			tableToolTrinity.addCell(getTableCell("Average Read Length",
					new BaseColor(79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell(
					"" + nf.format(avgReadLFilter),
					new BaseColor(214, 227, 188), tableFontBlack));

			tableToolTrinity.addCell(getTableCell("Total no. of HQ reads",
					new BaseColor(79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell(
					"" + numberFormat.format(totNoReadFilter), new BaseColor(235, 241,
							221), tableFontBlack));

			tableToolTrinity.addCell(getTableCell("Percentage HQ reads",
					new BaseColor(79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell("" + percOfHqReads,
					new BaseColor(214, 227, 188), tableFontBlack));

			tableToolTrinity.addCell(getTableCell(
					"Total no. of HQ Reads with non-ATGC bases", new BaseColor(
							79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell(
					"" + numberFormat.format(totNoAtgcBaseFilter), new BaseColor(235,
							241, 221), tableFontBlack));

			tableToolTrinity.addCell(getTableCell(
					"Percentage of HQ Reads with ATGC bases non-ATGC bases",
					new BaseColor(79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell("" + percTotNoAtgcBaseFilter,
					new BaseColor(214, 227, 188), tableFontBlack));

			tableToolTrinity.addCell(getTableCell(
					"Total no. of bases in HQ Reads",
					new BaseColor(79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell("" + numberFormat.format(new BigInteger(totNoBaseFilter)),
					new BaseColor(235, 241, 221), tableFontBlack));

			tableToolTrinity.addCell(getTableCell(
					"Total no. of HQ bases in HQ Reads", new BaseColor(79, 98,
							40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell("" + numberFormat.format(new BigInteger(totNoHqBaseFilter)),
					new BaseColor(214, 227, 188), tableFontBlack));

			tableToolTrinity.addCell(getTableCell(
					"Percentage of HQ bases in HQ Reads", new BaseColor(79, 98,
							40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell("" + percTotNoHqBaseFilter,
					new BaseColor(235, 241, 221), tableFontBlack));

			tableToolTrinity.addCell(getTableCell(
					"Total no. of non-ATGC bases in HQ Reads", new BaseColor(
							79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell(
					"" + numberFormat.format(totNoNonAtgcBaseFilter), new BaseColor(214,
							227, 188), tableFontBlack));

			tableToolTrinity.addCell(getTableCell(
					"Percentage of non-ATGC bases in HQ Reads", new BaseColor(
							79, 98, 40), tableFontWhite));
			tableToolTrinity.addCell(getTableCell(""
					+ percTotNoNonAtgcBaseFilter, new BaseColor(235, 241, 221),
					tableFontBlack));

			preface.add(tableToolTrinity);
			addEmptyLine(preface, 6);

			document.add(preface);

	}

	/*private static PdfPCell addFirstCellAssembleTable(String x) {
		PdfPCell cellTool51 = new PdfPCell();
		cellTool51.setMinimumHeight(8);
		Paragraph paragraphTool = new Paragraph(x, tooTiny);
		paragraphTool.setAlignment(Element.ALIGN_LEFT);
		cellTool51.setVerticalAlignment(Element.ALIGN_LEFT);
		cellTool51.addElement(paragraphTool);
		cellTool51.setPadding(5);
		cellTool51.setPaddingTop(10);
		cellTool51.setBackgroundColor(new BaseColor(79, 98, 40));
		return cellTool51;
	}

	private static PdfPCell addSecondCellAssembleTable(String x, BaseColor c) {
		PdfPCell cellTool52 = new PdfPCell();
		cellTool52.setMinimumHeight(8);
		cellTool52.setPadding(5);
		cellTool52.setHorizontalAlignment(Element.ALIGN_MIDDLE);
		cellTool52.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cellTool52.setBackgroundColor(c);
		Paragraph paragraphToolDec3 = new Paragraph(x);
		paragraphToolDec3.setAlignment(Element.ALIGN_TOP);
		cellTool52.addElement(paragraphToolDec3);
		return cellTool52;

	}*/

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
			String result = "";
			System.out.println("DDDhhhhhh");
			String percOfHqReadsssss = percOfHqReads.replace("%", "");
			System.out.println("result=============8=>" + ""
					+ percOfHqReadsssss);
			if (Double.parseDouble(percOfHqReadsssss) < 60) {
				result = "poor";
			} else if (Double.parseDouble(percOfHqReadsssss) < 80) {
				result = "average";
			} else {
				result = "good";
			}
			Paragraph comb = new Paragraph();
			Chunk paragraphToolDec = new Chunk("Overall data quality is ");
			comb.add(paragraphToolDec);
			Chunk paragraphToolDec1 = new Chunk("" + result, smallBoldBlack);
			comb.add(paragraphToolDec1);
			Chunk paragraphToolDectype2 = new Chunk(" with more than ");
			comb.add(paragraphToolDectype2);

			Chunk paragraphToolDectype3 = new Chunk("" + percOfHqReads,
					smallBoldBlack);
			comb.add(paragraphToolDectype3);

			Chunk paragraphToolDec4 = new Chunk(" High Quality reads.");
			comb.add(paragraphToolDec4);
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
							+ avgReadLFilter
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