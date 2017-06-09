package com.jaxlayer.webreflector.rest.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "table_processes")
public class Processes implements Serializable 
{
	private static final long serialVersionUID = 1L;
	private Long processId;
	private Long PID;
	private String processName;
	private String processStatus;
	private String processStartTime;
	private String processEndTime;
	private String processCmd;
	private String nextProcesses;
	private Long processesTypeId;
	private String reportPathToDownload;
	private String reportPathToServer;
	private String projectName;
	
	@JsonIgnore
	private String processLog;
	@JsonIgnore
	private User user;


	private String processType;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "process_id", unique = true)
	public Long getProcessId() {
		return processId;
	}

	public void setProcessId(Long processId) {
		this.processId = processId;
	}

	@Column(name = "process_cmd", unique = false, columnDefinition = "text")
	public String getProcessCmd() {
		return processCmd;
	}

	public void setProcessCmd(String processCmd) {
		this.processCmd = processCmd;
	}

	@Column(name = "process_pid", unique = false)
	public Long getPID() {
		return PID;
	}

	public void setPID(Long pID) {
		PID = pID;
	}

	@Column(name = "process_name", unique = false)
	public String getProcessName() {
		return processName;
	}

	public void setProcessName(String processName) {
		this.processName = processName;
	}

	@Column(name = "process_type_id", unique = false)
	public Long getProcessesTypeId() {
		return processesTypeId;
	}

	public void setProcessesTypeId(Long processesTypeId) {
		this.processesTypeId = processesTypeId;
	}

	@Column(name = "process_status", unique = false)
	public String getProcessStatus() {
		return processStatus;
	}

	public void setProcessStatus(String processStatus) {
		this.processStatus = processStatus;
	}

	@Column(name = "process_start_time", unique = false)
	public String getProcessStartTime() {
		return processStartTime;
	}

	public void setProcessStartTime(String processStartTime) {
		this.processStartTime = processStartTime;
	}

	@Column(name = "process_end_time", unique = false)
	public String getProcessEndTime() {
		return processEndTime;
	}

	public void setProcessEndTime(String processEndTime) {
		this.processEndTime = processEndTime;
	}

	@Column(name = "process_log", unique = false, columnDefinition = "text")
	public String getProcessLog() {
		return processLog;
	}

	public void setProcessLog(String processLog) {
		this.processLog = processLog;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Column(name = "process_next", unique = false)
	public String getNextProcesses() {
		return nextProcesses;
	}

	public void setNextProcesses(String nextProcesses) {
		this.nextProcesses = nextProcesses;
	}

	@Column(name = "process_type", unique = false, columnDefinition = "text")
	public String getProcessType() {
		return processType;
	}

	public void setProcessType(String processType) {
		this.processType = processType;
	}
	
	@Column(name = "report_path", nullable = true, unique = false, columnDefinition="text")
	public String getReportPathToDownload() {
		return reportPathToDownload;
	}
	public void setReportPathToDownload(String reportPathToDownload) {
		this.reportPathToDownload = reportPathToDownload;
	}
	
	@Column(name = "report_server_path", nullable = true, unique = false, columnDefinition="text")
	public String getReportPathToServer() {
		return reportPathToServer;
	}

	public void setReportPathToServer(String reportPathToServer) {
		this.reportPathToServer = reportPathToServer;
	}
	
	@Column(name = "project_Name", nullable = true, unique = false, columnDefinition="text")
	public String getProjectName() 
	{
		return projectName;
	}
	public void setProjectName(String projectName) 
	{
		this.projectName = projectName;
	}
	
/*	@Override
	public String toString() {
		return "Processes [processId=" + processId + ", PID=" + PID
				+ ", processName=" + processName + ", processStatus="
				+ processStatus + ", processStartTime=" + processStartTime
				+ ", processEndTime=" + processEndTime + ", processCmd="
				+ processCmd + ", nextProcesses=" + nextProcesses
				+ ", processesTypeId=" + processesTypeId + ", processLog="
				+ processLog + ", user=" + user + ", processType="
				+ processType + "]";
	}*/
}
