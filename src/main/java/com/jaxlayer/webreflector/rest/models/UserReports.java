package com.jaxlayer.webreflector.rest.models;

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
@Table(name = "table_user_reports")
public class UserReports {
	private Long userReportsId;
	private String projectName;
	private String pathOnSystem;
	private String processName;
	private String dateOfCreation;
	private String downloadLink;
	private String uniqueNameForMultipleReportsInOneProcess;
	
	@JsonIgnore
	private User user;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "user_reports_id", unique = true)
	public Long getUserReportsId() {
		return userReportsId;
	}
	public void setUserReportsId(Long userReportsId) {
		this.userReportsId = userReportsId;
	}
	@Column(name = "project_name", nullable = true, unique = false)
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	@Column(name = "path_system", nullable = false, unique = false, columnDefinition="text")
	public String getPathOnSystem() {
		return pathOnSystem;
	}
	public void setPathOnSystem(String pathOnSystem) {
		this.pathOnSystem = pathOnSystem;
	}
	@Column(name = "process_name", nullable = false, unique = false)
	public String getProcessName() {
		return processName;
	}
	public void setProcessName(String processName) {
		this.processName = processName;
	}
	@Column(name = "date_creation", nullable = false, unique = false)
	public String getDateOfCreation() {
		return dateOfCreation;
	}
	public void setDateOfCreation(String dateOfCreation) {
		this.dateOfCreation = dateOfCreation;
	}
	@Column(name = "download_link", nullable = false, unique = false, columnDefinition="text")
	public String getDownloadLink() {
		return downloadLink;
	}
	public void setDownloadLink(String downloadLink) {
		this.downloadLink = downloadLink;
	}
	
	@Column(name = "unique_Name_For_Multiple_Process", nullable = true, unique = false)
	public String getUniqueNameForMultipleReportsInOneProcess() {
		return uniqueNameForMultipleReportsInOneProcess;
	}
	public void setUniqueNameForMultipleReportsInOneProcess(String uniqueNameForMultipleReportsInOneProcess) {
		this.uniqueNameForMultipleReportsInOneProcess = uniqueNameForMultipleReportsInOneProcess;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
}
