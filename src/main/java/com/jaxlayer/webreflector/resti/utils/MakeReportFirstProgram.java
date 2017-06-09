package com.jaxlayer.webreflector.resti.utils;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Paint;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;
import javax.servlet.jsp.tagext.TagInfo;

import org.hibernate.secure.internal.DisabledJaccServiceImpl;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.labels.ItemLabelAnchor;
import org.jfree.chart.labels.ItemLabelPosition;
import org.jfree.chart.labels.StandardCategoryItemLabelGenerator;
import org.jfree.chart.labels.StandardPieSectionLabelGenerator;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.plot.DefaultDrawingSupplier;
import org.jfree.chart.plot.PiePlot;
import org.jfree.chart.plot.PiePlot3D;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.renderer.category.CategoryItemRenderer;
import org.jfree.data.category.DefaultCategoryDataset;
import org.jfree.data.general.DefaultPieDataset;
import org.jfree.ui.TextAnchor;

import com.itextpdf.awt.DefaultFontMapper;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfTemplate;
import com.itextpdf.text.pdf.PdfWriter;

public class MakeReportFirstProgram 
{
//	private static Font bigBold = new Font(Font.FontFamily.TIMES_ROMAN, 36, Font.BOLD, new BaseColor(79, 98, 40));
	private static Font bigBold = new Font(Font.FontFamily.TIMES_ROMAN, 32, Font.BOLD, new BaseColor(24, 21, 231));
	private static Font tinyBold = new Font(Font.FontFamily.TIMES_ROMAN, 18, Font.BOLD, new BaseColor(53, 65, 243));
	private static Font smallBold = new Font(Font.FontFamily.TIMES_ROMAN, 25, Font.BOLD, new BaseColor(24, 21, 231));
	
	private static Font mediumItalicBold = new Font(Font.FontFamily.TIMES_ROMAN, 30, Font.BOLDITALIC, new BaseColor(79, 98, 40));
	private static Font smallBoldBlack = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, new BaseColor(0, 0, 0));
		
	private static Font tableFontWhite = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL, new BaseColor(255, 255, 255));
	private static Font tableFontHeader = new Font(Font.FontFamily.TIMES_ROMAN, 15, Font.NORMAL, new BaseColor(255, 255, 255));
	private static Font tableFontBlack = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL, new BaseColor(0, 0, 0));
	private static Font tableFontBlackBold = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, new BaseColor(0, 0, 0));
	private static Font tinyItalicBold = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLDITALIC);
	
//New Font Family
	
	private static Font bigBoldForBact = new Font(Font.FontFamily.TIMES_ROMAN, 30, Font.BOLD, new BaseColor(79, 98, 40));
	private static Font mediumItalicBoldForBact = new Font(Font.FontFamily.TIMES_ROMAN, 26, Font.BOLDITALIC, new BaseColor(79, 98, 40));
	private static Font tinyBoldHead = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.BOLD, new BaseColor(79, 98, 40));
	private static Font tinyBoldHead4NewTable = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.BOLD, new BaseColor(0, 0, 0));
	private static Font tinyBoldHead4Top10Tag = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.BOLD, new BaseColor(4, 13, 149));
	
	private static Font tinynt = new Font(Font.FontFamily.COURIER, 10, Font.NORMAL, new BaseColor(0,0,0));
	private static Font tinyntBold = new Font(Font.FontFamily.COURIER, 10, Font.BOLD, new BaseColor(32, 32, 32));
	private static Font tableFontBlackItalic = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.ITALIC, new BaseColor(0, 0, 0));
	
	private static Font tinyBoldForTextGraphHeader = new Font(Font.FontFamily.TIMES_ROMAN, 36, Font.BOLD, new BaseColor(3, 40, 88));
	private static Font tinyBoldForTextGraphSubHeader = new Font(Font.FontFamily.TIMES_ROMAN, 18, Font.BOLD, new BaseColor(58, 3, 244));
	private static Font tinyBoldForTextGraphText = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL, new BaseColor(155, 135, 224));
	
	
	private String ProcessingMode, Truncation, InputFileNames, ReadLayout, ObservedReadLength, PreLength, PostLength,
	ApplicableReadLengthRange, SelectedTagLength, NoOfRepresentativeORTagsPerRead, TotalNoOfTagsGenerated, TotalNoOfUniqueTagsGenerated,
	TotalNoOfTagsDiscarded, TotalNoOfValidUniqueTags, MaximumTagAbundance, MinimumTagAbundance, MedianTagAbundance, MeanTagAbundance, Top10TagsBasedOnCount, 
	TotalNoOfBases, TotalNoOfAs, TotalNoOfTs, TotalNoOfGs, TotalNoOfCs, TotalNoOfATs, TotalNoOfGCs, TotalNoOfNs, pdfFilePath,  projectName, scientistName,
	specialization, address, TotalReads;
	
	public boolean createPDFReport(String outputLog, String pdfFilePath, String projectName, String scientistName, String specialization, String address) throws Exception
	{
		boolean flag = GenerateReport(new ArrayList<String>(Arrays.asList(outputLog.split("<br/>"))), pdfFilePath, projectName, scientistName, specialization, address);
		return flag;
	}
	private boolean GenerateReport(ArrayList<String> arrayList, String pdfFilePath, String projectName, String scientistName, String specialization, String address) throws Exception
	{
		this.InputFileNames = arrayList.get(0);
		this.ProcessingMode = arrayList.get(1);
		this.Truncation = arrayList.get(2);
		
		this.ReadLayout = arrayList.get(3);
		this.ObservedReadLength = arrayList.get(4);
		this.PreLength = arrayList.get(5);
		this.PostLength = arrayList.get(6);
		this.ApplicableReadLengthRange = arrayList.get(7);
		this.SelectedTagLength = arrayList.get(8);
		this.NoOfRepresentativeORTagsPerRead = arrayList.get(9);
		this.TotalNoOfTagsGenerated = arrayList.get(10);
		this.TotalNoOfUniqueTagsGenerated = arrayList.get(11);
		this.TotalNoOfTagsDiscarded = arrayList.get(12);
		this.TotalNoOfValidUniqueTags = arrayList.get(13);
		this.MaximumTagAbundance = arrayList.get(14);
		this.MinimumTagAbundance = arrayList.get(15);
		this.MedianTagAbundance = arrayList.get(16);
		this.MeanTagAbundance = arrayList.get(17);
		
		this.Top10TagsBasedOnCount =  arrayList.get(18) + "\n" + arrayList.get(19) + "\n" + arrayList.get(20) + "\n" 
									+ arrayList.get(21) + "\n" + arrayList.get(22) + "\n" + arrayList.get(23) + "\n"
									+ arrayList.get(24) + "\n" + arrayList.get(25) + "\n" + arrayList.get(26) + "\n" 
									+ arrayList.get(27) + "\n" + arrayList.get(28) + "\n" + arrayList.get(29) + "\n"
									+ arrayList.get(30) + "\n" + arrayList.get(31) + "\n" + arrayList.get(32) + "\n" 
									+ arrayList.get(33) + "\n" + arrayList.get(34) + "\n" + arrayList.get(35) + "\n" 
									+ arrayList.get(36) + "\n" + arrayList.get(37) + "\n" + arrayList.get(38);
		
		this.TotalNoOfBases = arrayList.get(39);
		this.TotalNoOfAs = arrayList.get(40);
		this.TotalNoOfTs = arrayList.get(41);
		this.TotalNoOfGs = arrayList.get(42);
		this.TotalNoOfCs = arrayList.get(43);
		this.TotalNoOfATs = arrayList.get(44);
		this.TotalNoOfGCs = arrayList.get(45);
		this.TotalNoOfNs = arrayList.get(46);
		
		this.TotalReads = arrayList.get(47);
		
		this.pdfFilePath = pdfFilePath;
		
		this.projectName = projectName;
		this.scientistName = scientistName;
		this.specialization = specialization;
		this.address = address;
		
		Document document = new Document(PageSize.A4, 50, 50, 50, 50);
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(pdfFilePath));
		writer.setPageEvent(new HeaderAndFooter());
		document.open();
		
		addTitlePage(document, writer);
		
//		tagInfoPage(document, writer);
		
		document.close();
		
		return true;
	}
	
	private void addTitlePage(Document document, PdfWriter writer) throws Exception 
	{
		Paragraph preface = new Paragraph();
		
		Image image1 = Image.getInstance(Utils.IMAGE_DIRECTORY + "girihlet.png");
//		image1.scaleAbsolute(320f, 280f);
		image1.setAlignment(Element.ALIGN_CENTER);
		image1.setAbsolutePosition(0, document.bottom() + 696);
		preface.add(image1);
		
		addEmptyLine(preface, 8);
		
		Paragraph paragraph1 = new Paragraph("TagLet Result Summary For\n" + projectName, bigBold);
		paragraph1.setAlignment(Element.ALIGN_CENTER);
		preface.add(paragraph1);

		addEmptyLine(preface, 1);
		Paragraph paragraphReporter = new Paragraph(scientistName, smallBold);
		paragraphReporter.setAlignment(Element.ALIGN_CENTER);

		preface.add(paragraphReporter);
		Paragraph paragraphAboutReporter1 = new Paragraph(specialization, tinyBold);
			paragraphAboutReporter1.setAlignment(Element.ALIGN_CENTER);
			preface.add(paragraphAboutReporter1);
		
		addEmptyLine(preface, 1);
		
		java.util.List<String> outPutVaules = Arrays.asList(address.replace("\n", "").replace("\r", "").split(","));
		
		for (int i = 0; i < outPutVaules.size(); i++) {
			Paragraph paragraphAboutReporter4 = new Paragraph(
					outPutVaules.get(i), tinyBold);
			paragraphAboutReporter4.setAlignment(Element.ALIGN_CENTER);
			preface.add(paragraphAboutReporter4);
		}
		

		document.add(preface);
		
		document.newPage();
		secondPage(document, writer);
//		document.newPage();
		
		secondPage2(document, writer);
		document.newPage();
		
		tagInfoPage(document, writer);
		
//		document.newPage();
//		secondPage3(document, writer);
//		document.newPage();
		fouthPage(document, writer);
	}
	private void secondPage(Document document, PdfWriter writer) throws Exception
	{
		Paragraph preface = new Paragraph();
		addEmptyLine(preface, 1);
		PdfPTable tableTool = new PdfPTable(2);
		tableTool.setWidthPercentage(100);
		
		Paragraph paragraphTool = new Paragraph("Read Processing Summary", tinyBoldHead4NewTable);
		paragraphTool.setAlignment(Element.ALIGN_CENTER);
		PdfPCell cellTool = new PdfPCell();
		cellTool.setColspan(12);
		cellTool.setFixedHeight(26f);
		cellTool.setPaddingTop(-10);
		cellTool.addElement(paragraphTool);
		cellTool.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cellTool.setBackgroundColor(new BaseColor(80, 90, 241));
		tableTool.addCell(cellTool);
		
		DecimalFormat twoDForm = new DecimalFormat("#.###");
		
		tableTool.addCell(getTableCell("Input File Name (s)", new BaseColor(80, 90, 241), tableFontBlack));
		if(ReadLayout.trim().equalsIgnoreCase("Paired End"))
		tableTool.addCell(getTableCellWithSpan(InputFileNames, new BaseColor(139, 145, 238), tableFontBlack, 2));
		else
		tableTool.addCell(getTableCellWithSpan(InputFileNames, new BaseColor(139, 145, 238), tableFontBlack, 4));
		
		tableTool.addCell(getTableCell("Sequencing Layout", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell("" + ReadLayout, new BaseColor(255, 255, 255), tableFontBlack));
		
		tableTool.addCell(getTableCell("Application / Mode", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell("" + ProcessingMode, new BaseColor(139, 145, 238), tableFontBlack));

		tableTool.addCell(getTableCell("Read Truncation", new BaseColor(80, 90, 241), tableFontBlack));
		if(ProcessingMode.equalsIgnoreCase("DNA"))
		tableTool.addCell(getTableCell("" + Truncation, new BaseColor(255, 255, 255), tableFontBlack));
		else
		tableTool.addCell(getTableCell("NA", new BaseColor(255, 255, 255), tableFontBlack));
		
		tableTool.addCell(getTableCell("Total Number Of Input Reads", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell("" + TotalReads + " (" + twoDForm.format((double)Long.parseLong(TotalReads)/1000000) + " Millions)", new BaseColor(139, 145, 238), tableFontBlack));
		
		tableTool.addCell(getTableCell("Observed Read Length", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell("" + ObservedReadLength + " (bp)", new BaseColor(255, 255, 255), tableFontBlack));
		
		tableTool.addCell(getTableCell("Applicable Read Length Range", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell("" + ApplicableReadLengthRange, new BaseColor(139, 145, 238), tableFontBlack));
		
		tableTool.addCell(getTableCell("5' Read Trimming", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell("" + PreLength + " (bp)", new BaseColor(255, 255, 255), tableFontBlack));
		
		tableTool.addCell(getTableCell("3' Read Trimming", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell(PostLength + " (bp)", new BaseColor(139, 145, 238), tableFontBlack));
		
		preface.add(tableTool);
		document.add(preface);
	}
	private void secondPage2(Document document, PdfWriter writer) throws Exception
	{

		Paragraph preface = new Paragraph();
		addEmptyLine(preface, 1);
		PdfPTable tableTool = new PdfPTable(2);
		tableTool.setWidthPercentage(100);
		
		Paragraph paragraphTool = new Paragraph("Tag Processing Summary", tinyBoldHead4NewTable);
		paragraphTool.setAlignment(Element.ALIGN_CENTER);
		PdfPCell cellTool = new PdfPCell();
		cellTool.setColspan(12);
		cellTool.setFixedHeight(26f);
		cellTool.setPaddingTop(-10);
		cellTool.addElement(paragraphTool);
		cellTool.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cellTool.setBackgroundColor(new BaseColor(80, 90, 241));
		tableTool.addCell(cellTool);
		
		DecimalFormat twoDForm = new DecimalFormat("#.###");
		
		tableTool.addCell(getTableCell("Selected Tag Length", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell("" + SelectedTagLength + " (bp)", new BaseColor(139, 145, 238), tableFontBlack));

/*		tableTool.addCell(getTableCell("No. Of Representative OR Tags Per Read", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell(NoOfRepresentativeORTagsPerRead, new BaseColor(255, 255, 255), tableFontBlack));
*/
		tableTool.addCell(getTableCell( "Total No. Of Tags", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell( "" + TotalNoOfTagsGenerated + " (" + twoDForm.format((double)Long.parseLong(TotalNoOfTagsGenerated)/1000000) + " Millions)", new BaseColor(255, 255, 255), tableFontBlack));
		
		tableTool.addCell(getTableCell( "Total No. Unique Tags", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell( "" + TotalNoOfUniqueTagsGenerated + " (" + twoDForm.format((double)Long.parseLong(TotalNoOfUniqueTagsGenerated)/1000000) + " Millions)", new BaseColor(139, 145, 238), tableFontBlack));
		
		tableTool.addCell(getTableCell( "Total No. Of Valid Tags", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell( "" + TotalNoOfValidUniqueTags + " (" + twoDForm.format((double)Long.parseLong(TotalNoOfValidUniqueTags)/1000000) + " Millions)", new BaseColor(255, 255, 255), tableFontBlack));
		
		tableTool.addCell(getTableCell( "Total No. Of Discarded Tags (Millions)", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell( "" + TotalNoOfTagsDiscarded + " (" + twoDForm.format((double)Long.parseLong(TotalNoOfTagsDiscarded)/1000000) + " Millions)", new BaseColor(139, 145, 238), tableFontBlack));
		
		tableTool.addCell(getTableCell( "Maximum Valid Tag Abundance", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell( "" + MaximumTagAbundance, new BaseColor(255, 255, 255), tableFontBlack));
		
		tableTool.addCell(getTableCell( "Minimum Valid Tag Abundance", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell( "" + MinimumTagAbundance, new BaseColor(139, 145, 238), tableFontBlack));
		
		tableTool.addCell(getTableCell( "Median Valid Tag Abundance", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell( "" + MedianTagAbundance, new BaseColor(255, 255, 255), tableFontBlack));
		
		tableTool.addCell(getTableCell( "Mean Valid Tag Abundance", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell( "" + MeanTagAbundance, new BaseColor(139, 145, 238), tableFontBlack));
		
		preface.add(tableTool);
		document.add(preface);
	}
	private void secondPageTagGraph(Document document, PdfWriter writer) throws Exception
	{
		Paragraph preface = new Paragraph();
		addEmptyLine(preface, 1);
		PdfPTable tableTool = new PdfPTable(2);
		tableTool.setWidthPercentage(100);
		
		Paragraph paragraphTool = new Paragraph("Base Composition Summary", tinyBoldHead4NewTable);
		paragraphTool.setAlignment(Element.ALIGN_CENTER);
		PdfPCell cellTool = new PdfPCell();
		cellTool.setColspan(12);
		cellTool.setFixedHeight(26f);
		cellTool.setPaddingTop(-10);
		cellTool.addElement(paragraphTool);
		cellTool.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cellTool.setBackgroundColor(new BaseColor(80, 90, 241));
		tableTool.addCell(cellTool);
		
		JavaRunCommands rcmd = new JavaRunCommands();
		rcmd.executeCommandOnlyForBact(Utils.RUN_R_SCRIPT_FOR_TAG_GRAPH + " " + TotalNoOfUniqueTagsGenerated+ " " + TotalNoOfValidUniqueTags);
		
		Image image1 = Image.getInstance(pdfFilePath.replaceFirst(".pdf", "_barChart.png"));
		image1.setAlignment(Image.LEFT);
		
		addEmptyLine(preface, 1);
		preface.add(image1);
		
		document.add(preface);
	}
	
	private void fouthPage(Document document, PdfWriter writer) throws Exception
	{
		Paragraph preface = new Paragraph();
		addEmptyLine(preface, 17);
		Paragraph paragraphGenomeAssembly = new Paragraph("Top 10 Tags Based On Abundance: ", tinyBoldHead4Top10Tag);
		
		paragraphGenomeAssembly.setAlignment(Element.ALIGN_LEFT);
		preface.add(paragraphGenomeAssembly);
		addEmptyLine(preface, 1);
		
		PdfPTable paragraphForTop10Seq =  new PdfPTable(1);
		paragraphForTop10Seq.setWidthPercentage(100);
		
		String pattern = "^\\>.*";
		Pattern r = Pattern.compile(pattern);
		String [] arrList = Top10TagsBasedOnCount.split("\\n");
		
		for(int i = 0; i < arrList.length; i++)
		{
			System.out.println(arrList[i]);
			Matcher m = r.matcher(arrList[i]);
			
			if(m.find())
			{
				paragraphForTop10Seq.addCell(getTableCellForNT(arrList[i], new BaseColor(255,255,255), tinyntBold));
			}
			else
			{
				paragraphForTop10Seq.addCell(getTableCellForNT(arrList[i], new BaseColor(255,255,255), tinynt));
			}
		}
		
		preface.add(paragraphForTop10Seq);
		addEmptyLine(preface, 1);
		document.add(preface);
	}
	private void secondPage3(Document document, PdfWriter writer) throws Exception
	{
		Paragraph preface = new Paragraph();
		addEmptyLine(preface, 1);
		PdfPTable tableTool = new PdfPTable(2);
		tableTool.setWidthPercentage(100);
		
		Paragraph paragraphTool = new Paragraph("Base Composition Summary", tinyBoldHead4NewTable);
		paragraphTool.setAlignment(Element.ALIGN_CENTER);
		PdfPCell cellTool = new PdfPCell();
		cellTool.setColspan(12);
		cellTool.setFixedHeight(26f);
		cellTool.setPaddingTop(-10);
		cellTool.addElement(paragraphTool);
		cellTool.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cellTool.setBackgroundColor(new BaseColor(80, 90, 241));
		tableTool.addCell(cellTool);
		
		tableTool.addCell(getTableCell("Total No. Of Bases In Filtered Tags", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell(TotalNoOfBases, new BaseColor(139, 145, 238), tableFontBlack));

		tableTool.addCell(getTableCell("Percentage Of As", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell( "" + TotalNoOfAs, new BaseColor(255, 255, 255), tableFontBlack));

		tableTool.addCell(getTableCell("Percentage Of Ts", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell( "" + TotalNoOfATs, new BaseColor(139, 145, 238), tableFontBlack));

		tableTool.addCell(getTableCell("Percentage Of Gs", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell( "" + TotalNoOfGCs, new BaseColor(255, 255, 255), tableFontBlack));

		tableTool.addCell(getTableCell("Percentage OfCs", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell( "" + TotalNoOfCs, new BaseColor(139, 145, 238), tableFontBlack));

		tableTool.addCell(getTableCell("Percentage Of (A + T)s", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell( "" + TotalNoOfATs, new BaseColor(255, 255, 255), tableFontBlack));

		tableTool.addCell(getTableCell("Percentage Of (G + C)s", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell( "" + TotalNoOfGCs, new BaseColor(139, 145, 238), tableFontBlack));

		tableTool.addCell(getTableCell("Percentage Of Ns", new BaseColor(80, 90, 241), tableFontBlack));
		tableTool.addCell(getTableCell( "" + TotalNoOfNs, new BaseColor(255, 255, 255), tableFontBlack));

		preface.add(tableTool);
		document.add(preface);
	}
	
	private void tagInfoPage(Document document, PdfWriter writer) throws Exception 
	{
		DecimalFormat twoDForm = new DecimalFormat("#.###");
		
		Paragraph preface = new Paragraph();
		addEmptyLine(preface, 1);
		PdfPTable tableTool = new PdfPTable(1);
		tableTool.setWidthPercentage(100);
		
		Paragraph paragraphTool = new Paragraph("" + twoDForm.format((double)Long.parseLong(TotalNoOfTagsGenerated)/1000000) + " Millions. " , tinyBoldForTextGraphHeader);
		paragraphTool.setAlignment(Element.ALIGN_CENTER);
		
		PdfPCell cellTool = new PdfPCell();
		cellTool.setBorder(0);
		cellTool.setColspan(12);
		cellTool.setFixedHeight(52f);
		cellTool.setPaddingTop(-10);
		cellTool.addElement(paragraphTool);
		cellTool.setVerticalAlignment(Element.ALIGN_RIGHT);
		cellTool.setBackgroundColor(new BaseColor(255, 255, 255));
		tableTool.addCell(cellTool);
		
		paragraphTool = new Paragraph("Total Number Of Tags Generated", tinyBoldForTextGraphSubHeader);
		paragraphTool.setAlignment(Element.ALIGN_CENTER);
		
		cellTool = new PdfPCell();
		cellTool.setBorder(0);
		cellTool.setColspan(12);
		cellTool.setFixedHeight(30f);
		cellTool.setPaddingTop(-10);
		cellTool.addElement(paragraphTool);
		cellTool.setVerticalAlignment(Element.ALIGN_RIGHT);
		cellTool.setBackgroundColor(new BaseColor(255, 255, 255));
		tableTool.addCell(cellTool);
		
		preface.add(tableTool);
		document.add(preface);
		
		double validTag = Long.parseLong(TotalNoOfValidUniqueTags);
		double uniqueTag = Long.parseLong(TotalNoOfUniqueTagsGenerated);
		
		double discardedTag = uniqueTag - validTag;
		System.out.println("Valid Tags: " + validTag + "\nUnique Tags: " + uniqueTag + "\nDiscarded Tags: " + discardedTag);
		System.out.println("Percentage of Valid Tags: " + twoDForm.format((double)(validTag/uniqueTag*100)));
		System.out.println("Percentage of Discarded Tags: " + twoDForm.format((double)(discardedTag/uniqueTag*100)));
		
		DefaultPieDataset dataSet1 = new DefaultPieDataset();
		
		dataSet1.setValue("Tolal Number Of Unique Valid Tags\n" + twoDForm.format((double)(validTag/uniqueTag*100)) + "%", Long.parseLong(TotalNoOfValidUniqueTags));
		dataSet1.setValue("Tolal Number Of Unique Discarded Tags\n" + twoDForm.format((double)(discardedTag/uniqueTag*100)) + "%", Long.parseLong(TotalNoOfUniqueTagsGenerated) - Long.parseLong(TotalNoOfValidUniqueTags));
		
		addPieChart(document, writer, 0, 377, "", dataSet1);

		absText(document, writer, "" + twoDForm.format((double)Long.parseLong(TotalNoOfValidUniqueTags)/1000000)  + " Millions. ", 10, 650, 18, BaseColor.BLUE);
		absText(document, writer, "Total Number Of Valid Unique Tags", 10, 632, 12, BaseColor.DARK_GRAY);
		
		absText(document, writer, "     " + SelectedTagLength + " bp", 380, 610, 30, BaseColor.RED);
		absText(document, writer, "Selected Tag Length", 380, 585, 18, BaseColor.DARK_GRAY);

		absText(document, writer, "     " + twoDForm.format(((double)Long.parseLong(MaximumTagAbundance)/1000)) + " K", 380, 530, 30, BaseColor.BLUE);
		absText(document, writer, "Maximum Tag Abundance", 380, 505, 18, BaseColor.DARK_GRAY);
		
		absText(document, writer, "     " + twoDForm.format(Double.parseDouble(MedianTagAbundance)/1000) + " K", 380, 450, 30, BaseColor.MAGENTA);
		absText(document, writer, "Median Tag Abundance", 380, 430, 18, BaseColor.DARK_GRAY);
	}
	
	private static void addEmptyLine(Paragraph paragraph, int number) 
	{
		for (int i = 0; i < number; i++) {
			paragraph.add(new Paragraph(" "));
		}
	}
	public static void saveToFile(BufferedImage img,String filePath) throws FileNotFoundException, IOException
	{
		File outputfile = new File(filePath);
	    ImageIO.write(img, "png", outputfile);
	}
	public void deletImagFiles(String filePath)
	{
		File delFile = new File(filePath);
		delFile.delete();
		System.out.println("File Deleted: " + filePath);
	}

	protected PdfPCell getTableCellForNT(String value, BaseColor color, Font tableFont) 
	{
		PdfPCell cellTool12 = new PdfPCell();
		cellTool12.setFixedHeight(10f);
		cellTool12.setPaddingTop(-8);
		cellTool12.setPaddingLeft(5f);
		cellTool12.setHorizontalAlignment(Element.ALIGN_MIDDLE);
		cellTool12.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cellTool12.setBackgroundColor(color);
		cellTool12.setBorder(0);
		Paragraph paragraphToolDec = new Paragraph(value, tableFont);
		paragraphToolDec.setAlignment(Element.ALIGN_TOP);
		cellTool12.addElement(paragraphToolDec);
		return cellTool12;
	}
	protected PdfPCell getTableCell(String value, BaseColor color, Font tableFont) 
	{
		PdfPCell cellTool12 = new PdfPCell();
		cellTool12.setFixedHeight(20f);
		cellTool12.setPaddingTop(-8);
		cellTool12.setPaddingLeft(5f);
		cellTool12.setHorizontalAlignment(Element.ALIGN_MIDDLE);
		cellTool12.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cellTool12.setBackgroundColor(color);
		Paragraph paragraphToolDec = new Paragraph(value, tableFont);
		paragraphToolDec.setAlignment(Element.ALIGN_TOP);
		cellTool12.addElement(paragraphToolDec);
		return cellTool12;
	}
	
	protected PdfPCell getTableCell2(String value, BaseColor color, Font tableFont) 
	{
		PdfPCell cellTool12 = new PdfPCell();
		cellTool12.setFixedHeight(20f);
		cellTool12.setPaddingTop(-8);
		cellTool12.setPaddingLeft(5f);
		cellTool12.setHorizontalAlignment(Element.ALIGN_MIDDLE);
		cellTool12.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cellTool12.setBackgroundColor(color);
		Paragraph paragraphToolDec = new Paragraph(value, tableFont);
		paragraphToolDec.setAlignment(Element.ALIGN_TOP);
		cellTool12.addElement(paragraphToolDec);
		
		return cellTool12;
	}
	
	protected PdfPCell getTableCellWithSpan(String value, BaseColor color,
			Font tableFont, int colspan) {
		PdfPCell cellTool12 = new PdfPCell(new Phrase(value));
		cellTool12.setColspan(colspan);
		cellTool12.setBackgroundColor(color);
		Paragraph paragraphToolDec = new Paragraph(value, tableFont);
		paragraphToolDec.setAlignment(Element.ALIGN_TOP);
		return cellTool12;
	}

	private void addPieChart(Document document, PdfWriter writer, int x, int y,
			String titlePie, DefaultPieDataset dataSet) throws Exception{
		writeChartToPDF(generatePieChart(titlePie, dataSet), 300, 250,
				"piechart.pdf", document, writer, x, y);

	}
	public void writeChartToPDF(JFreeChart chart, int width, int height, String fileName, Document document, PdfWriter writer, int x, int y) throws Exception
	{
			java.awt.Font font = new java.awt.Font(java.awt.Font.SERIF, java.awt.Font.PLAIN, 5);
			PdfContentByte contentByte = writer.getDirectContent();
			
			PdfTemplate template = contentByte.createTemplate(width, height);
			Graphics2D graphics2d = template.createGraphics(width, height, new DefaultFontMapper());
			graphics2d.setFont(font);
			Rectangle2D rectangle2d = new Rectangle2D.Double(0, 0, width, height);

			chart.draw(graphics2d, rectangle2d);

			graphics2d.dispose();
			contentByte.addTemplate(template, x, y);
	}
	
	public JFreeChart generatePieChart(String titlePie, DefaultPieDataset dataSet)
	{
		JFreeChart chart = ChartFactory.createPieChart(titlePie, dataSet, false, false, false);

		chart.setBackgroundPaint(Color.WHITE);
		chart.setBorderVisible(false);
		chart.setTitle(new org.jfree.chart.title.TextTitle(titlePie,
				new java.awt.Font("SansSerif", java.awt.Font.BOLD, 12)));
		chart.getTitle().setPaint(Color.BLUE);
		chart.setBorderStroke(null);

		java.awt.Font newFont = new java.awt.Font("Times New Roman", 6, 8);

		PiePlot plot = (PiePlot) chart.getPlot();
		plot.setBackgroundPaint(Color.WHITE);
		plot.setNoDataMessage("No data available");
		plot.setCircular(true);

		plot.setLabelBackgroundPaint(Color.WHITE);
		plot.setShadowXOffset(0);
		plot.setShadowYOffset(0);
		plot.setDrawingSupplier(new ChartDrawingSupplier());

		plot.setOutlineVisible(false);
		plot.setLabelOutlinePaint(Color.BLUE);
		plot.setLabelBackgroundPaint(Color.WHITE);
		plot.setLabelFont(newFont);
		plot.setLabelPaint(Color.BLUE);
		plot.setLabelShadowPaint(Color.WHITE);
		
		plot.setMaximumLabelWidth(0.2);
//		plot.setSimpleLabels(true);
		
		return chart;
	}
	
	private static void absText(Document document, PdfWriter writer, String text, int x, int y, 
								int fontSize, BaseColor colo)
	{
		try 
		{
			
			PdfContentByte cb = writer.getDirectContent();
//			new Font(Font.FontFamily.TIMES_ROMAN, 32, Font.BOLD, new BaseColor(79, 98, 40));
      		BaseFont bf = BaseFont.createFont(BaseFont.TIMES_BOLD, BaseFont.CP1252, 
      										BaseFont.NOT_EMBEDDED);
      		cb.saveState();
		    cb.beginText();
		    cb.moveText(x, y);
		    cb.setFontAndSize(bf, fontSize);
		    cb.setColorFill(colo);
		    cb.showText(text);
		    cb.endText();
		    cb.restoreState();
    	}catch (DocumentException e) {
      		e.printStackTrace();
    	}catch (IOException e) {
      		e.printStackTrace();
    	}
  	}
}

