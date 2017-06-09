package com.jaxlayer.webreflector.rest.models;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jaxlayer.webreflector.rest.service.ProcessesCommanInterface;

@Entity
@Table(name = "table_firstprogram")
public class FirstProgram implements Serializable, ProcessesCommanInterface 
{
	private static final long serialVersionUID = 1L;
	private Long tagLetProcessId;
	private String processMode;
	private String outputPrefix;
	private String inptuFileName;
	private String outputFolder;
	private String projectName;
	private Integer truncation;
	
	@JsonIgnore
	private Processes processes;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "tagLetProcessId", unique = true)
	public Long getTagLetProcessId() {
		return tagLetProcessId;
	}
	public void setTagLetProcessId(Long processId) {
		this.tagLetProcessId = processId;
	}
	
	@Column(name = "processMode", nullable = false, unique = false)
	public String getProcessMode() {
		return processMode;
	}

	public void setProcessMode(String processMode) {
		this.processMode = processMode;
	}
	@Column(name = "outputPrefix", nullable = false, unique = false)
	public String getOutputPrefix() {
		return outputPrefix;
	}
	public void setOutputPrefix(String outputPrefix) {
		this.outputPrefix = outputPrefix;
	}
	@Column(name = "inptuFileName", nullable = false, unique = false, columnDefinition="text")
	public String getInptuFileName() {
		return inptuFileName;
	}
	public void setInptuFileName(String inptuFileName) {
		this.inptuFileName = inptuFileName;
	}
	@Column(name = "outputFolder", nullable = true, unique = false)
	public String getOutputFolder() {
		return outputFolder;
	}
	public void setOutputFolder(String outputFolder) {
		this.outputFolder = outputFolder;
	}
	@Column(name = "projectName", nullable = true, unique = false)
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	@Column(name = "truncation", nullable = false, unique = false)
	public Integer getTruncation() {
		return truncation;
	}
	public void setTruncation(Integer truncation) {
		this.truncation = truncation;
	}
	
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "process_id", nullable = false, unique = false)
	public Processes getProcesses() 
	{
		return processes;
	}
	public void setProcesses(Processes processes) 
	{
		this.processes = processes;
	}
}
