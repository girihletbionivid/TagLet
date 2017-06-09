package com.jaxlayer.webreflector.resti.utils;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

public class HeaderAndFooter extends PdfPageEventHelper {


	protected Phrase footer;
	protected Phrase header;
	private static Font tooTinyBold = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL);


	@Override
	public void onEndPage(PdfWriter writer, Document document) 
	{
		PdfContentByte cb = writer.getDirectContent();
		try {
/*			Paragraph preface = new Paragraph();
			Image image1 = Image.getInstance(Utils.IMAGE_DIRECTORY + "girihlet.png");
//			image1.scaleAbsolute(320f, 280f);
			image1.setAlignment(Element.ALIGN_CENTER);
			image1.setAbsolutePosition(0, document.bottom() + 700);
			preface.add(image1);
*/			
	/*		Paragraph paragraph = new Paragraph("A GENOME“IT” COMPANY",
					tinyBold);
			paragraph.setAlignment(Element.ALIGN_LEFT);
			ColumnText.showTextAligned(cb, Element.ALIGN_LEFT, new Phrase(
					paragraph), document.leftMargin() + 50, document.top()-20, 0);

			
			
			Paragraph p = new Paragraph();
			Image imageHeader = Image.getInstance(Utils.IMAGE_DIRECTORY
					+ "bionivid_logo.png");
			imageHeader.scaleAbsolute(150f, 150f);
			imageHeader.setAlignment(Element.ALIGN_RIGHT);
			p.add(new Chunk(imageHeader, 0, -100, true));
			ColumnText.showTextAligned(cb, Element.ALIGN_RIGHT, new Phrase(p),
					document.right() - 50, document.top() + 30, 0);*/
			
			
			/*
			Paragraph preface1 = new Paragraph();
			Paragraph preface2 = new Paragraph();
			Paragraph paragraphFooter1 = new Paragraph(
					"Package Designed By Bionivid Technology Private Limited ©, All Rights Reserved.",
					tooTinyBold);
			paragraphFooter1.setAlignment(Element.ALIGN_CENTER);
			preface1.add(paragraphFooter1);

			ColumnText.showTextAligned(cb, Element.ALIGN_CENTER, new Phrase(
					preface1), document.right()-200 , document.bottom()-10, 0);
			
*/			
			/*Paragraph paragraphFooter2 = new Paragraph(
					"Tel (+91)80-4097 8222 | Mob (+91)-95 35 61 91 91 | Email – info@bionivid.com | Web: ww.bionivid.com",
					tooTinyBold);
			paragraphFooter2.setAlignment(Element.ALIGN_CENTER);
			preface2.add(paragraphFooter2);*/
			/*
			ColumnText.showTextAligned(cb, Element.ALIGN_CENTER, new Phrase(
					preface1), document.right() - 50, document.bottom() - 5, 0);*/
		/*	ColumnText.showTextAligned(cb, Element.ALIGN_RIGHT, new Phrase(
					preface2), document.right() - 2, document.bottom() - 20, 0);*/
			
		
			
			
			
			/*PdfContentByte contentByte = writer.getDirectContentUnder();
			Image watermark_image = Image.getInstance(Utils.IMAGE_DIRECTORY
					+ "watermark.gif");
			watermark_image.scaleAbsolute(400f, 700f);
			watermark_image.setAbsolutePosition(100, 50);
			contentByte.addImage(watermark_image);*/
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}