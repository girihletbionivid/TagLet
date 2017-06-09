package com.jaxlayer.webreflector.rest.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jaxlayer.webreflector.rest.service.ProcessesCommanInterface;

@Entity
@Table(name = "table_four_five_four_qc")
public class FourFiveFourQc implements Serializable,ProcessesCommanInterface{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long fourFiveFourQcId;
	private String l;
	private String s;
	private String n;
	private String m;
	private String f;
	private String c;
	private Boolean onlyStat;
	private String t;
	private String o;
	private String z;
	private String projectName;
	@JsonIgnore
	private Processes processes;
	private List<String> listOfInputFile=new ArrayList<String>();
	private String samples;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "fffqc_id", unique = true)
	public Long getFourFiveFourQcId() {
		return fourFiveFourQcId;
	}

	public void setFourFiveFourQcId(Long fourFiveFourQcId) {
		this.fourFiveFourQcId = fourFiveFourQcId;
	}
	@Column(name = "fffqc_l",  unique = false, columnDefinition = "text")
	public String getL() {
		return l;
	}

	public void setL(String l) {
		this.l = l;
	}
	@Column(name = "fffqc_s",  unique = false, columnDefinition = "text")
	public String getS() {
		return s;
	}

	public void setS(String s) {
		this.s = s;
	}
	@Column(name = "fffqc_n",  unique = false, columnDefinition = "text")
	public String getN() {
		return n;
	}

	public void setN(String n) {
		this.n = n;
	}
	@Column(name = "fffqc_m",  unique = false, columnDefinition = "text")
	public String getM() {
		return m;
	}

	public void setM(String m) {
		this.m = m;
	}
	@Column(name = "fffqc_f",  unique = false, columnDefinition = "text")
	public String getF() {
		return f;
	}

	public void setF(String f) {
		this.f = f;
	}
	@Column(name = "fffqc_c",  unique = false, columnDefinition = "text")
	public String getC() {
		return c;
	}

	public void setC(String c) {
		this.c = c;
	}
	@Column(name = "fffqc_onlyStat",  unique = false, columnDefinition = "text")
	public Boolean getOnlyStat() {
		return onlyStat;
	}

	public void setOnlyStat(Boolean onlyStat) {
		this.onlyStat = onlyStat;
	}
	@Column(name = "fffqc_t",  unique = false, columnDefinition = "text")
	public String getT() {
		return t;
	}

	public void setT(String t) {
		this.t = t;
	}
	@Column(name = "fffqc_o",  unique = false, columnDefinition = "text")
	public String getO() {
		return o;
	}

	public void setO(String o) {
		this.o = o;
	}
	@Column(name = "fffqc_z",  unique = false, columnDefinition = "text")
	public String getZ() {
		return z;
	}

	public void setZ(String z) {
		this.z = z;
	}
	@ElementCollection
	@CollectionTable(name = "table_fffqc_query_files", joinColumns = @JoinColumn(name = "fffqc_id"))
	@Column(name = "fffqc_query_files")
	public List<String> getListOfInputFile() {
		return listOfInputFile;
	}

	public void setListOfInputFile(List<String> listOfInputFile) {
		this.listOfInputFile = listOfInputFile;
	}
	@OneToOne(cascade = CascadeType.ALL,orphanRemoval=true)
	public Processes getProcesses() {
		return processes;
	}

	public void setProcesses(Processes processes) {
		this.processes = processes;
	}
	@Column(name = "ffqc_project_name",  unique = false, columnDefinition = "text")
	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	@Column(name = "samples",  unique = false, columnDefinition = "text")
	public String getSamples() {
		return samples;
	}

	public void setSamples(String samples) {
		this.samples = samples;
	}

	@Override
	public String toString() {
		return "FourFiveFourQc [fourFiveFourQcId=" + fourFiveFourQcId + ", l="
				+ l + ", s=" + s + ", n=" + n + ", m=" + m + ", f=" + f
				+ ", c=" + c + ", onlyStat=" + onlyStat + ", t=" + t + ", o="
				+ o + ", z=" + z + ", projectName=" + projectName
				+ ", processes=" + processes + ", listOfInputFile="
				+ listOfInputFile + ", samples=" + samples + "]";
	}



}