package com.jaxlayer.webreflector.rest.qc.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.print.Doc;

import static com.jaxlayer.webreflector.rest.user.controller.JdRequestAccess.addAccessControllAllowOrigin;

import org.springframework.aop.ThrowsAdvice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.itextpdf.text.Document;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;
import com.jaxlayer.webreflector.rest.models.User;
import com.jaxlayer.webreflector.rest.models.UserReports;
import com.jaxlayer.webreflector.rest.response.JdJsonResponse;
import com.jaxlayer.webreflector.rest.service.GsIServiceUser;
import com.jaxlayer.webreflector.rest.service.GsIServiceUserReport;
import com.jaxlayer.webreflector.resti.utils.HeaderAndFooter;
import com.jaxlayer.webreflector.resti.utils.JavaRunCommands;
import com.jaxlayer.webreflector.resti.utils.MultiFolderReading;
import com.jaxlayer.webreflector.resti.utils.QC454Pdf;
import com.jaxlayer.webreflector.resti.utils.QcPairedEndPdf;
import com.jaxlayer.webreflector.resti.utils.QcPdf;
import com.jaxlayer.webreflector.resti.utils.Utils;

@Controller
public class ReportGeneratorControllerQC 
{
	@Autowired
	private GsIServiceUserReport serviceUserReport;
	@Autowired
	private GsIServiceUser serviceUser;

	@RequestMapping(value = "/generate/report/qc", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity<JdJsonResponse> generateReportqc(
			@RequestParam("listOfSamples") String listOfSamples,
			@RequestParam("projectName") String projectName,
			@RequestParam("organismName") String organismName,
			@RequestParam("SeqApplication") String SeqApplication,
			
			@RequestParam("scientistName") String scientistName,
			@RequestParam("specialization") String specialization,
			@RequestParam("address") String address,
			@RequestParam("sequencingType") String typeOfQc,
			@RequestParam("plateform") String plateform,
			
			@RequestParam("userId") Long userId
	) 
	{
		ResponseEntity<JdJsonResponse> entity = null;
		JdJsonResponse response = new JdJsonResponse();
		JavaRunCommands rcmd = new JavaRunCommands();
		MultiFolderReading mf = new MultiFolderReading();
		User user = null;
		
		try
		{
			user = serviceUser.getUserById(userId);
			String combinedSampleNames = "";
			
			if (user != null) 
			{
				String [] arrOfSamples = listOfSamples.split("###");

				for (int i = 0; i < arrOfSamples.length; i++) 
				{
					String [] arrOfContentOfSamples = arrOfSamples[i].split(";");
					String fullPath = "";
					
					if(combinedSampleNames.length() == 0)
					{
						combinedSampleNames = arrOfContentOfSamples[0];
					}
					else
					{
						combinedSampleNames = combinedSampleNames + ", " + arrOfContentOfSamples[0];
					}
					
					fullPath = arrOfContentOfSamples[arrOfContentOfSamples.length - 1];
					
					File fileoutputDir = new File("" + fullPath);
					
					if (fileoutputDir.exists()) 
					{
						String nameOfFile = mf.getFileNameInDirectory("_stat", fullPath);
						
						if (nameOfFile.equals("not_found")) 
						{
							response.setActor("nameOfFile stat");
							response.setMessage("static file not present in output folder");
							response.setStatus("FAILED");
							response.setId(-1l);
							entity = new ResponseEntity<JdJsonResponse>(response,
									addAccessControllAllowOrigin(),
									HttpStatus.BAD_REQUEST);
							return entity;
						}
					}
					else 
					{
						response.setActor("nameOfFile"
								+ fileoutputDir.getAbsolutePath());
						response.setMessage(fileoutputDir
								+ " not present on server");
						response.setStatus("FAILED");
						response.setId(-1l);
						entity = new ResponseEntity<JdJsonResponse>(response,
								addAccessControllAllowOrigin(),
								HttpStatus.BAD_REQUEST);
						return entity;
					}
				}
				
//				Illumina QC
				
				if(typeOfQc.equalsIgnoreCase("illumina"))
				{
					String pdfFilePath;
					DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm");
					Date date = new Date();
					String pdfName = projectName.trim().replace(' ', '-');
					String currentTime = pdfName.trim() + "_" + dateFormat.format(date).trim();
					pdfFilePath = Utils.PDF_FILE_PATH + currentTime.trim() + ".pdf";
					
					Document document = new Document(PageSize.A4, 50, 50, 50, 50);
					PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(pdfFilePath));
					writer.setPageEvent(new HeaderAndFooter());
					document.open();
					
					for (int i = 0; i < arrOfSamples.length; i++) 
					{
						String [] arrOfContentOfSamples = arrOfSamples[i].split(";");
						
//						SingleEnd
						
						System.out.println(arrOfContentOfSamples[1]);
						
						if( arrOfContentOfSamples[1].equalsIgnoreCase("Single End") )
						{
							String nameOfFile = mf.getFileNameInDirectory("_stat", arrOfContentOfSamples[arrOfContentOfSamples.length - 1]);
							
							boolean check = createQCSingleEndPdf(
											organismName,
											scientistName,
											specialization, 
											plateform,
											arrOfContentOfSamples[0],
											address, 
											pdfFilePath,
											arrOfContentOfSamples[arrOfContentOfSamples.length - 1], 
											nameOfFile, 
											SeqApplication,
											i,
											arrOfSamples.length,
											document,
											writer,
											combinedSampleNames);
							
							if(!check)
							{
								response.setActor("" + arrOfContentOfSamples[0]);
								response.setMessage("Missing some information for Sample=" +  arrOfContentOfSamples[0] + ".\n" 
													+ "NOTE: Browse correct folder for specified sample");
								response.setStatus("FAILED");
								response.setId(-1l);
								entity = new ResponseEntity<JdJsonResponse>(response,
										addAccessControllAllowOrigin(),
										HttpStatus.NOT_FOUND);

								return entity;
							}
						}
						
//						Paired End
						
						else
						{
							String nameOfFile = mf.getFileNameInDirectory("_stat", arrOfContentOfSamples[arrOfContentOfSamples.length - 1]);
							
							boolean check = createQCPairedEndPdf(
									organismName,
									scientistName,
									specialization, 
									plateform,
									arrOfContentOfSamples[0],
									address, 
									pdfFilePath,
									arrOfContentOfSamples[arrOfContentOfSamples.length - 1], 
									nameOfFile, 
									SeqApplication,
									i,
									arrOfSamples.length,
									document,
									writer,
									combinedSampleNames);
									
							if(!check)
							{
								response.setActor("" + arrOfContentOfSamples[0]);
								response.setMessage("Missing some information for Sample=" + arrOfContentOfSamples[0] + ".\n" 
													+ "NOTE: Browse correct folder for specified sample");
								
								response.setStatus("FAILED");
								response.setId(-1l);
								entity = new ResponseEntity<JdJsonResponse>(response,
										addAccessControllAllowOrigin(),
										HttpStatus.NOT_FOUND);
								
								return entity;
							}
						}
					}
					document.close();
					
					String [] arrOfContentOfSamples = arrOfSamples[0].split(";");
					
					String pdfFilePath2 = arrOfContentOfSamples[arrOfContentOfSamples.length  - 1] + "/" + pdfName + ".pdf";
					String copyPdfcmd = "cp " + pdfFilePath + " " + pdfFilePath2;
					
					rcmd.executeCommandOnly(copyPdfcmd);
					
					/*File file = new File(pdfFilePath);
					file.delete();*/
					
					UserReports userReports = new UserReports();
					userReports.setProcessName(projectName + "_Illumina");
					userReports.setDateOfCreation(System
							.currentTimeMillis() + "");
					userReports.setDownloadLink(Utils.PATH_SERVER_URL
							+ currentTime + ".pdf");
					userReports.setPathOnSystem(pdfFilePath2);
					userReports.setProjectName(projectName);
					userReports.setUser(user);
					serviceUserReport.insert(userReports);

					response.setActor("User");
					response.setMessage(Utils.PATH_SERVER_URL
							+ currentTime + ".pdf");
					response.setStatus("SUCCESS");
					response.setId(-1l);
					entity = new ResponseEntity<JdJsonResponse>(
							response, addAccessControllAllowOrigin(),
							HttpStatus.OK);
				}

//				454QC
				
				else
				{
					String [] arrOfContent = arrOfSamples[0].split(";");
					
					String pdfFilePath;
					DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm");
					Date date = new Date();
					String pdfName = arrOfContent[0].trim().replace(' ', '-');
					String currentTime = pdfName.trim() + "_" + dateFormat.format(date).trim();
					pdfFilePath = Utils.PDF_FILE_PATH + currentTime.trim() + ".pdf";
					
					Document document = new Document(PageSize.A4, 50, 50, 50, 50);
					PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(pdfFilePath));
					writer.setPageEvent(new HeaderAndFooter());
					document.open();
					
					for (int i = 0; i < arrOfSamples.length; i++) 
					{
						String [] arrOfContentOfSamples = arrOfSamples[i].split(";");
						
						String fullPath = arrOfContentOfSamples[arrOfContentOfSamples.length - 1];
						
						boolean check = createQC454Pdf(
								organismName, 
								SeqApplication,
								scientistName,
								specialization,
								address,
								typeOfQc,
								plateform,
								
								arrOfContentOfSamples[0],
								pdfFilePath, 
								fullPath,
								i,
								arrOfSamples.length,
								document,
								writer,
								combinedSampleNames
								);
						if(!check)
						{
							response.setActor("" + arrOfContentOfSamples[0]);
							response.setMessage("Missing some information for " + arrOfContentOfSamples[0] + " Sample.\nNOTE: Browse correct folder for specified sample");
							response.setStatus("FAILED");
							response.setId(-1l);
							entity = new ResponseEntity<JdJsonResponse>(response,
									addAccessControllAllowOrigin(),
									HttpStatus.NOT_FOUND);
							
							return entity;
						}
					}
					document.close();
					
					String [] arrOfContentOfSamples = arrOfSamples[0].split(";");
					
					String pdfFilePath2 = arrOfContentOfSamples[arrOfContentOfSamples.length  - 1] + "/" + pdfName + ".pdf";
					String copyPdfcmd = "cp " + pdfFilePath + " " + pdfFilePath2;
					
					rcmd.executeCommandOnly(copyPdfcmd);
					
					/*File file = new File(pdfFilePath);
					file.delete();*/
					
					UserReports userReports = new UserReports();
					userReports.setProcessName(projectName + "_454QC");
					userReports.setDateOfCreation(System
							.currentTimeMillis() + "");
					userReports.setDownloadLink(Utils.PATH_SERVER_URL
							+ currentTime + ".pdf");
					userReports.setPathOnSystem(pdfFilePath2);
					userReports.setProjectName(projectName);
					userReports.setUser(user);
					serviceUserReport.insert(userReports);

					response.setActor("User");
					response.setMessage(Utils.PATH_SERVER_URL
							+ currentTime + ".pdf");
					response.setStatus("SUCCESS");
					response.setId(-1l);
					entity = new ResponseEntity<JdJsonResponse>(
							response, addAccessControllAllowOrigin(),
							HttpStatus.OK);
				}
			}
			else 
			{
				response.setActor("" + userId);
				response.setMessage("user is not registered");
				response.setStatus("Not Found");
				response.setId(-1l);
				entity = new ResponseEntity<JdJsonResponse>(response,
						addAccessControllAllowOrigin(), HttpStatus.UNAUTHORIZED);
			}
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
			response.setActor("");
			response.setMessage("" + e.getMessage()
					+ ".");
			response.setStatus("FAILED");
			response.setId(-1l);
			entity = new ResponseEntity<JdJsonResponse>(response,
					addAccessControllAllowOrigin(),
					HttpStatus.EXPECTATION_FAILED);
		}
		
		return entity;
	}
	
	public Boolean createQC454Pdf
			(
				String organismName, 
				String SeqApplication,
				String scientistName,
				String specialization,
				String address,
				String typeOfQc,
				String plateform,
				
				String nameOfSample,
				String pdfFilePath, 
				String fullPath,
				Integer sampleNumber,
				Integer NumberOfSamplesInProject,
				Document document,
				PdfWriter writer,
				String combinedSampleNames) throws Exception 
	{
		JavaRunCommands rcmd = new JavaRunCommands();
		MultiFolderReading mf = new MultiFolderReading();
		
		String outputFileName = mf.getFileNameInDirectory("_stat", fullPath);
		
		mf.checkFilesPresent(Utils.QC_STAT_454_PERL_FILE.trim());
		String output = rcmd.executeCommandOnly(Utils.QC_STAT_454_PERL_FILE
				+ fullPath + "/" + outputFileName);
		
		List<String> values = Arrays.asList(output.split(","));
		
		if (values.size() == 19) 
		{
			QC454Pdf qcPdf = new QC454Pdf(
					organismName, 
					SeqApplication,
					scientistName,
					specialization,
					address,
					typeOfQc,
					plateform,
					
					nameOfSample,
					pdfFilePath,
					"Raw Data Quality Control Report",
					Double.parseDouble(values.get(0)),
					Double.parseDouble(values.get(1)),
					values.get(2),
					values.get(3),
					values.get(4),
					Double.parseDouble(values.get(5)),
					Double.parseDouble(values.get(6)),
					Double.parseDouble(values.get(7)),
					Double.parseDouble(values.get(8)),
					Double.parseDouble(values.get(9)),
					Double.parseDouble(values.get(10)),
					Double.parseDouble(values.get(11)),
					Double.parseDouble(values.get(12)),

					Double.parseDouble(values.get(13)),
					Double.parseDouble(values.get(14)),

					Double.parseDouble(values.get(15)),
					Double.parseDouble(values.get(16)),
					values.get(17),
					values.get(18),
					fullPath,
					outputFileName,
					sampleNumber,
					NumberOfSamplesInProject,
					document,
					writer,
					combinedSampleNames);
			
			return qcPdf.checkReturnValue();
		} 
		else 
		{
			return false;
		}
	}

	public Boolean createQCSingleEndPdf
	(
			String organismName,
			String scientistName,
			String specialization, 
			String plateform,
			String nameOfSample, 
			String address, 
			String pdfFilePath,
			String fullPath, 
			String outputFileName, 
			String sequencingType,
			Integer sampleNumber,
			Integer NumberOfSamplesInProject,
			Document document,
			PdfWriter writer,
			String combinedSampleNames) throws Exception 
	{
		System.out.println("## START");
		
		MultiFolderReading mf = new MultiFolderReading();
		JavaRunCommands rcmd = new JavaRunCommands();
		
		System.out.println("##CheckIn");
		
		mf.checkFilesPresent(Utils.QC_STAT_SINGLE_END_PERL_FILE.trim());
		
		System.out.println("I am here.......!! ## 1");
		
		String output = rcmd.executeCommandOnly(Utils.QC_STAT_SINGLE_END_PERL_FILE
						+ fullPath + "/" + outputFileName);
		
		System.out.println("I am here.......!! ## 2");
		
		System.out.println("****Command: " + Utils.QC_STAT_SINGLE_END_PERL_FILE
						+ fullPath + "/" + outputFileName);
		
		System.out.println("I am here.......!! ## 3");
		
		List<String> values = Arrays.asList(output.split(","));
		
		if (values.size() == 28) 
		{
			QcPdf qcPdf = new QcPdf(
						organismName, 
						scientistName,
						specialization,
						plateform, 
						nameOfSample, 
						address,
						pdfFilePath, "Raw Data Quality Control Report",
						values.get(0), 
						Double.parseDouble(values.get(1)),
						Double.parseDouble(values.get(2)), 
						values.get(3),
						values.get(4), 
						values.get(5), 
						Double.parseDouble(values.get(6)), 
						Double.parseDouble(values.get(7)),
						Double.parseDouble(values.get(8)),
						Double.parseDouble(values.get(9)),
						Double.parseDouble(values.get(10)),
						Double.parseDouble(values.get(11)),
						Double.parseDouble(values.get(12)),
						Double.parseDouble(values.get(13)),
						Double.parseDouble(values.get(14)),
						Double.parseDouble(values.get(15)), 
						values.get(16),
						values.get(17), 
						"" + values.get(18), 
						"" + values.get(19),
						"" + values.get(20), 
						"" + values.get(21), 
						values.get(22),
						values.get(23), 
						Double.parseDouble(values.get(24)),
						Double.parseDouble(values.get(25)), 
						values.get(26),
						values.get(27),
						
						fullPath, 
						outputFileName, 
						sequencingType,
						sampleNumber,
						NumberOfSamplesInProject,
						document,
						writer,
						combinedSampleNames);
			
			return qcPdf.checkReturnValue();
		}
		else 
		{
//			System.out.println("Hi I am here.......!!");
			return false;
		}
	}

	public Boolean createQCPairedEndPdf(
			String organismName,
			String scientistName, 
			String specialization, 
			String plateform,
			String nameOfSample,
			String address,
			String pdfFilePath,
			String fullPath,
			String outputFileName,
			String sequencingType,
			Integer sampleNumber,
			Integer NumberOfSamplesInProject,
			Document document,
			PdfWriter writer,
			String combinedSampleNames) throws Exception 
	{MultiFolderReading mf = new MultiFolderReading();
		JavaRunCommands rcmd = new JavaRunCommands();
		mf.checkFilesPresent(Utils.QC_STAT_PAIRED_END_PERL_FILE.trim());
		String output = rcmd.executeCommandOnly(Utils.QC_STAT_PAIRED_END_PERL_FILE
						+ fullPath + "/" + outputFileName);

		List<String> values = Arrays.asList(output.split(","));

		if (values.size() == 55) 
		{
			QcPairedEndPdf qcPdf = new QcPairedEndPdf(
					organismName,
					scientistName,
					specialization,
					plateform,
					nameOfSample,
					address,
					pdfFilePath,
					"Raw Data Quality Control Report",
					values.get(0),
					
					Double.parseDouble(values.get(1)),
					Double.parseDouble(values.get(2)),
					Double.parseDouble(values.get(3)),
					Double.parseDouble(values.get(4)),

					values.get(5),
					values.get(6),
					values.get(7),
					values.get(8),
					values.get(9),
					values.get(10),

					Double.parseDouble(values.get(11)),
					Double.parseDouble(values.get(12)),
					Double.parseDouble(values.get(13)),
					Double.parseDouble(values.get(14)),

					Double.parseDouble(values.get(15)),
					Double.parseDouble(values.get(16)),
					Double.parseDouble(values.get(17)),
					Double.parseDouble(values.get(18)),

					Double.parseDouble(values.get(19)),
					Double.parseDouble(values.get(20)),
					Double.parseDouble(values.get(21)),
					Double.parseDouble(values.get(22)),

					Double.parseDouble(values.get(23)),
					Double.parseDouble(values.get(24)),
					Double.parseDouble(values.get(25)),
					Double.parseDouble(values.get(26)),

					Double.parseDouble(values.get(27)),
					Double.parseDouble(values.get(28)),
					Double.parseDouble(values.get(29)),
					Double.parseDouble(values.get(30)),

					values.get(31),
					values.get(32),
					values.get(33),
					values.get(34),

					Double.parseDouble(values.get(35)),
					Double.parseDouble(values.get(36)),
					Double.parseDouble(values.get(37)),
					Double.parseDouble(values.get(38)),

					Double.parseDouble(values.get(39)),
					Double.parseDouble(values.get(40)),
					Double.parseDouble(values.get(41)),
					Double.parseDouble(values.get(42)),

					values.get(43),
					values.get(44),
					values.get(45),
					values.get(46),

					Double.parseDouble(values.get(47)),
					Double.parseDouble(values.get(48)),
					Double.parseDouble(values.get(49)),
					Double.parseDouble(values.get(50)),

					values.get(51),
					values.get(52),
					values.get(53),
					values.get(54),
					fullPath,
					outputFileName,
					sequencingType,
					sampleNumber,
					NumberOfSamplesInProject,
					document,
					writer,
					combinedSampleNames);
			
			return qcPdf.checkReturnValue();
		} 
		else 
		{
			return false;
		}
	}
}
