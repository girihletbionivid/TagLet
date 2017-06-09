package com.jaxlayer.webreflector.resti.utils;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.Paint;
import java.awt.geom.Ellipse2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.imageio.ImageIO;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.CategoryAxis;
import org.jfree.chart.axis.CategoryLabelPositions;
import org.jfree.chart.labels.ItemLabelAnchor;
import org.jfree.chart.labels.ItemLabelPosition;
import org.jfree.chart.labels.StandardCategoryItemLabelGenerator;
import org.jfree.chart.labels.StandardPieSectionLabelGenerator;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.plot.DefaultDrawingSupplier;
import org.jfree.chart.plot.PiePlot;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.renderer.category.CategoryItemRenderer;
import org.jfree.chart.renderer.category.LineAndShapeRenderer;
import org.jfree.data.category.CategoryDataset;
import org.jfree.data.category.DefaultCategoryDataset;
import org.jfree.data.general.DefaultPieDataset;
import org.jfree.ui.TextAnchor;


public class ChartGenerator 
{
		public static JFreeChart generateLineGraph(int value[], String lable[])
		{
			DefaultCategoryDataset dataset = new DefaultCategoryDataset();
			dataset.setValue(value[0], "a", lable[0]);
			dataset.setValue(value[1], "a", lable[1]);
			dataset.setValue(value[2], "a", lable[2]);
			dataset.setValue(value[3], "a", lable[3]);
			dataset.setValue(value[4], "a", lable[4]);
			dataset.setValue(value[5], "a", lable[5]);
			dataset.setValue(value[6], "a", lable[6]);
			dataset.setValue(value[7], "a", lable[7]);
			dataset.setValue(value[8], "a", lable[8]);
			dataset.setValue(value[9], "a", lable[9]);
			dataset.setValue(value[10], "a", lable[10]);
			dataset.setValue(value[11], "a", lable[11]);
			dataset.setValue(value[12], "a", lable[12]);
			dataset.setValue(value[13], "a", lable[13]);
			dataset.setValue(value[14], "a", lable[14]);
			dataset.setValue(value[15], "a", lable[15]);
			dataset.setValue(value[16], "a", lable[16]);
			dataset.setValue(value[17], "a", lable[17]);
			dataset.setValue(value[18], "a", lable[18]);
			dataset.setValue(value[19], "a", lable[19]);
			dataset.setValue(value[20], "a", lable[20]);
			dataset.setValue(value[21], "a", lable[21]);
			dataset.setValue(value[22], "a", lable[22]);
			dataset.setValue(value[23], "a", lable[23]);
			
			final JFreeChart chart = ChartFactory.createLineChart("", "", "", dataset,PlotOrientation.VERTICAL, false,false,false);
			
			chart.setBackgroundPaint(Color.WHITE);
			chart.setBorderVisible(false);
			chart.setBorderStroke(null);
			chart.getPlot();
			   
			CategoryPlot plot = chart.getCategoryPlot();
			   
		    plot.setBackgroundPaint(Color.WHITE);
		    plot.setNoDataMessage("No data available");
		    plot.setOutlineVisible(false);
		    plot.setRangeGridlinePaint(Color.DARK_GRAY);
		    plot.setRangeGridlineStroke(new BasicStroke(0.25f));
		       
		    LineAndShapeRenderer renderer = new LineAndShapeRenderer();
		    renderer.setSeriesLinesVisible(0, true);
		    
			renderer.setSeriesShapesVisible(0, true);
			renderer.setSeriesPaint(0, new Color(102,178,255));
			renderer.setSeriesShape(0, new Ellipse2D.Double(-2, -2, 4,4));
			
//			Lable Points

			renderer.setBaseItemLabelGenerator(new StandardCategoryItemLabelGenerator());
			renderer.setBaseItemLabelsVisible(true);
			
			CategoryAxis cx = new CategoryAxis();
			cx.setCategoryLabelPositionOffset(10);
			cx.setCategoryLabelPositions(CategoryLabelPositions.UP_45);
			cx.setTickLabelsVisible(true);
			cx.setTickMarksVisible(true);
			
			plot.setDomainAxis(cx);
			plot.setRenderer(renderer);
			
			return chart;
		}
		
    public static JFreeChart generatePieChart(String As, String countA, String Ts, String countT, String Gs, String countG, String Cs, String countC, String Ns, String countN) 
    {
    	
    	DefaultPieDataset dataSet = new DefaultPieDataset();
    	
    	double A = Double.parseDouble(As);
		double T = Double.parseDouble(Ts);
		double G = Double.parseDouble(Gs);
		double C = Double.parseDouble(Cs);
		double N = Double.parseDouble(Ns);
		
    	dataSet.setValue("A - " + countA,A);
		dataSet.setValue("T - " + countT,T);
		dataSet.setValue("G - " + countG,G);
		dataSet.setValue("C - " + countC,C);
		dataSet.setValue("N - " + countN,N);
		
    	
    	JFreeChart chart = ChartFactory.createPieChart(
    		"Base Composition",  // chart title
    		dataSet,             // data
    		false,               // include legend
    		false,
    		false
        );
    	
    	chart.setBackgroundPaint(Color.DARK_GRAY);
    	chart.setBorderVisible(false);
    	chart.setTitle(new org.jfree.chart.title.TextTitle("Base Composition",
  		       new java.awt.Font("SansSerif", java.awt.Font.BOLD, 12))
    			 );
    	chart.getTitle().setPaint(Color.white);
  		chart.setBorderStroke(null);
  		
  		Font newFont = new Font("Times New Roman", 4,10);
  		
        PiePlot plot = (PiePlot) chart.getPlot();
        plot.setBackgroundPaint(Color.DARK_GRAY);
        plot.setNoDataMessage("No data available");
        plot.setCircular(true);
        plot.setOutlineVisible(false);
        plot.setLabelOutlinePaint(Color.DARK_GRAY);
        
        plot.setLabelBackgroundPaint(Color.DARK_GRAY);
        plot.setLabelFont(newFont);
        plot.setLabelPaint(Color.WHITE);
        plot.setLabelGenerator(new StandardPieSectionLabelGenerator());
        plot.setLabelShadowPaint(Color.DARK_GRAY);
        
//        color change
        
        plot.setSectionPaint("A - " + countA, new Color(0, 204, 0));
        plot.setSectionPaint("T - " + countT, new Color(51, 153, 255));
        plot.setSectionPaint("G - " + countG, new Color(204, 204, 0));
        plot.setSectionPaint("C - " + countC, new Color(255, 128, 0));
        plot.setSectionPaint("N - " + countN, new Color(178, 102, 255));

        return chart;
    }
    
	public static JFreeChart generateBarChart(String title, DefaultCategoryDataset dataSet) 
	{
		final JFreeChart chart = ChartFactory.createBarChart(
                    title,
                    "",
                    "",
                    dataSet,
                    PlotOrientation.VERTICAL,
                    false,
                    true,
                    false);
        chart.setBackgroundPaint(Color.DARK_GRAY);  
        
        chart.setBorderVisible(false);
        chart.setTitle(new org.jfree.chart.title.TextTitle(title,
        		       new java.awt.Font("SansSerif", java.awt.Font.BOLD, 12))
        );
        chart.getTitle().setPaint(Color.white);
        chart.setBorderStroke(null);
        
        CategoryPlot plot = chart.getCategoryPlot();
        plot.getRangeAxis().setLowerBound(9.0);
        plot.getRangeAxis().setTickLabelPaint(Color.WHITE);
        plot.getDomainAxis().setTickLabelPaint(Color.WHITE);
        
        Font newFont = new Font("Times New Roman", 6,8);
        plot.getDomainAxis().setTickLabelFont(newFont);
        
        plot.setBackgroundPaint(Color.DARK_GRAY);     
        plot.setRangeGridlinePaint(Color.white);
        plot.setRangeGridlineStroke(new BasicStroke(0.25f));
        plot.setOutlineVisible(false);
      
        CategoryItemRenderer renderer = plot.getRenderer();
        renderer.setSeriesPaint(0, Color.decode("#3498DB"));
        
        renderer.setBaseItemLabelGenerator(new StandardCategoryItemLabelGenerator());
        renderer.setBaseItemLabelPaint(Color.WHITE);
        newFont = new Font("Times New Roman", 1,10);
        renderer.setBaseItemLabelFont(newFont);
        
        renderer.setBaseItemLabelsVisible(true);
        ItemLabelPosition position = new ItemLabelPosition(ItemLabelAnchor.OUTSIDE12, 
                TextAnchor.TOP_CENTER);
        renderer.setBasePositiveItemLabelPosition(position);
        
        
		return chart;
	}
	
	public static void saveToFile(BufferedImage img,String filePath) throws FileNotFoundException, IOException
	{
		File outputfile = new File(filePath);
	    ImageIO.write(img, "png", outputfile);
	}
	
//	New Chart Methods
	
	public static JFreeChart generateBarChart(List<String> listDataSample) 
	{
		DefaultCategoryDataset dataSet = new DefaultCategoryDataset();
		for (int i = 0; i < listDataSample.size(); i++) {
			List<String> listSingle = Arrays.asList(listDataSample.get(i)
					.split(","));
			dataSet.setValue(Double.parseDouble(listSingle.get(1)), "data",
					listSingle.get(0));
		}

		JFreeChart chart = ChartFactory.createBarChart(
				"Sample wise genus OTU distribution", "SAMPLES", "OTU'S",
				dataSet, PlotOrientation.VERTICAL, false, true, false);

		chart.setBackgroundPaint(Color.DARK_GRAY);

		chart.setBorderVisible(false);
		chart.setTitle(new org.jfree.chart.title.TextTitle(
				"Sample wise genus OTU distribution", new java.awt.Font(
						"SansSerif", java.awt.Font.BOLD, 12)));
		chart.getTitle().setPaint(Color.white);
		chart.setBorderStroke(null);

		CategoryPlot plot = chart.getCategoryPlot();
		plot.getRangeAxis().setLowerBound(9.0);
		plot.getRangeAxis().setTickLabelPaint(Color.WHITE);
		plot.getDomainAxis().setTickLabelPaint(Color.WHITE);

		java.awt.Font newFont = new java.awt.Font("Times New Roman", 4, 8);
		plot.getDomainAxis().setTickLabelFont(newFont);

		plot.setBackgroundPaint(Color.DARK_GRAY);
		plot.setRangeGridlinePaint(Color.white);
		plot.setRangeGridlineStroke(new BasicStroke(0.25f));
		plot.setOutlineVisible(false);

		plot.getDomainAxis().setAxisLinePaint(Color.white);
		plot.getRangeAxis().setAxisLinePaint(Color.white);

		CategoryItemRenderer renderer = plot.getRenderer();
		renderer.setSeriesPaint(0, Color.decode("#3498DB"));

		renderer.setBaseItemLabelGenerator(new StandardCategoryItemLabelGenerator());
		renderer.setBaseItemLabelPaint(Color.WHITE);
		newFont = new java.awt.Font("Times New Roman", 1, 10);
		renderer.setBaseItemLabelFont(newFont);

		renderer.setBaseItemLabelsVisible(true);
		ItemLabelPosition position = new ItemLabelPosition(
				ItemLabelAnchor.OUTSIDE12, TextAnchor.TOP_CENTER);
		renderer.setBasePositiveItemLabelPosition(position);
		return chart;
	}

	/*
	 * public JFreeChart generatePieChart(String titlePie, DefaultPieDataset
	 * dataSet) {
	 * 
	 * JFreeChart chart = ChartFactory.createPieChart(titlePie, dataSet, true,
	 * true, false); PiePlot plot = (PiePlot) chart.getPlot(); int fontSize =
	 * 10; // Adjust the size here plot.setLabelFont(new
	 * java.awt.Font("SansSerif", java.awt.Font.PLAIN, fontSize)); return chart;
	 * }
	 */
	public static JFreeChart generatePieChart2(String titlePie, DefaultPieDataset dataSet) {

		JFreeChart chart = ChartFactory.createPieChart(titlePie, dataSet,
				false, false, false);

		chart.setBackgroundPaint(Color.DARK_GRAY);
		chart.setBorderVisible(false);
		
		chart.setTitle(new org.jfree.chart.title.TextTitle(titlePie, new java.awt.Font("SansSerif", java.awt.Font.BOLD, 12)));
		chart.getTitle().setPaint(Color.white);
		chart.setBorderStroke(null);

		java.awt.Font newFont = new java.awt.Font("Times New Roman", 6, 8);

		PiePlot plot = (PiePlot) chart.getPlot();
		plot.setBackgroundPaint(Color.DARK_GRAY);
		plot.setNoDataMessage("No data available");
		plot.setCircular(true);

		plot.setLabelBackgroundPaint(Color.DARK_GRAY);
		plot.setShadowXOffset(0);
		plot.setShadowYOffset(0);
		plot.setDrawingSupplier(new ChartDrawingSupplier());

		plot.setOutlineVisible(false);
		plot.setLabelOutlinePaint(Color.DARK_GRAY);
		plot.setLabelBackgroundPaint(Color.DARK_GRAY);
		plot.setLabelFont(newFont);
		plot.setLabelPaint(Color.WHITE);
		plot.setLabelShadowPaint(Color.DARK_GRAY);

		/*
		 * PiePlot plot = (PiePlot) chart.getPlot(); int fontSize = 10; //
		 * Adjust the size here plot.setLabelFont(new java.awt.Font("SansSerif",
		 * java.awt.Font.PLAIN, fontSize));
		 */
		return chart;
	}
}