package com.jaxlayer.webreflector.rest.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "table_admin")
public class Admin {
	private Long adminId;
	private String adminName;
	private String adminPassword;
	private String adminEmailId;
	@JsonIgnore
	private String adminSalt;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "admin_id", unique = true)
	public Long getAdminId() {
		return adminId;
	}
	public void setAdminId(Long adminId) {
		this.adminId = adminId;
	}
	@Column(name = "admin_name", nullable = false, unique = false)
	public String getAdminName() {
		return adminName;
	}
	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}
	@Column(name = "admin_password", nullable = false, unique = false)
	public String getAdminPassword() {
		return adminPassword;
	}
	public void setAdminPassword(String adminPassword) {
		this.adminPassword = adminPassword;
	}
	@Column(name = "admin_email", nullable = false, unique = false)
	public String getAdminEmailId() {
		return adminEmailId;
	}
	public void setAdminEmailId(String adminEmailId) {
		this.adminEmailId = adminEmailId;
	}
	@Column(name = "admin_salt", nullable = false, unique = false)
	public String getAdminSalt() {
		return adminSalt;
	}
	public void setAdminSalt(String adminSalt) {
		this.adminSalt = adminSalt;
	}
	@Override
	public String toString() {
		return "Admin [adminId=" + adminId + ", adminName=" + adminName
				+ ", adminPassword=" + adminPassword + ", adminEmailId="
				+ adminEmailId + ", adminSalt=" + adminSalt + "]";
	}
}
