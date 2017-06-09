package com.jaxlayer.webreflector.rest.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "table_user")
public class User implements Serializable 
{
	private static final long serialVersionUID = 1L;
	private Long userId;
	private String userName;
	private String password;
	private String emailId;
	private String userDir;
	
	private String designation;
	private String institute;
	private String address;
	
	@JsonIgnore
	private String salt;
	@JsonIgnore
	private Collection<Processes> listOfProcess = new ArrayList<Processes>();
	@JsonIgnore
	private Collection<UserReports> listOfReports = new ArrayList<UserReports>();

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "user_id", unique = true)
	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	@Column(name = "user_name", nullable = false, unique = true)
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	@Column(name = "user_designation", nullable = false, unique = false, columnDefinition="text")
	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}
	@Column(name = "user_institute_name", nullable = false, unique = false, columnDefinition="text")
	public String getInstitute() {
		return institute;
	}

	public void setInstitute(String institute) {
		this.institute = institute;
	}
	
	@Column(name = "user_address", nullable = false, unique = false, columnDefinition="text")
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	@Lob
	@Column(name = "user_password", nullable = false, unique = false, length = 100000)
	public String getPassword() {
		return password;
	}
	

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "user_email_id", nullable = false, unique = false)
	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	@Column(name = "user_salt", nullable = false, unique = false)
	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany( mappedBy = "user",cascade=CascadeType.ALL)
	public Collection<Processes> getListOfProcess() {
		return listOfProcess;
	}

	public void setListOfProcess(Collection<Processes> listOfProcess) {
		this.listOfProcess = listOfProcess;
	}
	
	@OneToMany( mappedBy = "user",fetch = FetchType.EAGER,cascade=CascadeType.ALL)
	public Collection<UserReports> getListOfReports() {
		return listOfReports;
	}

	public void setListOfReports(Collection<UserReports> listOfReports) {
		this.listOfReports = listOfReports;
	}
	@Column(name = "user_dir", nullable = false, unique = false)
	public String getUserDir() {
		return userDir;
	}

	public void setUserDir(String userDir) {
		this.userDir = userDir;
	}
/*
	@Override
	public String toString() {
		return "User [userId=" + userId + ", userName=" + userName + ", password=" + password + ", emailId=" + emailId
				+ ", userDir=" + userDir + ", designation=" + designation + ", institute=" + institute + ", address="
				+ address + ", salt=" + salt + ", listOfProcess=" + listOfProcess + ", listOfReports=" + listOfReports
				+ "]";
	}*/
}
