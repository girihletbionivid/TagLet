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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jaxlayer.webreflector.rest.service.ProcessesCommanInterface;
@Entity
@Table(name = "table_ion")
public class IonTorrent implements Serializable, ProcessesCommanInterface {
	private static final long serialVersionUID = 1L;
	private Long ionId;
	private String seqType;
	private Boolean phred;
	private Boolean aa;
	private Boolean qual;
	private String projectName;

	private String length;
	private String filterSequence;
	private String fastaFile;
	private String fastqFile;
	private String qualFile;
	private String output;
	@JsonIgnore
	private Processes processes;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ion_id", unique = true)
	public Long getIonId() {
		return ionId;
	}

	public void setIonId(Long ionId) {
		this.ionId = ionId;
	}

	@Column(name = "seq_type", nullable = true, unique = false)
	public String getSeqType() {
		return seqType;
	}

	public void setSeqType(String seqType) {
		this.seqType = seqType;
	}

	@Column(name = "phred", nullable = true, unique = false)
	public Boolean getPhred() {
		return phred;
	}

	public void setPhred(Boolean phred) {
		this.phred = phred;
	}

	@Column(name = "aa", nullable = true, unique = false)
	public Boolean getAa() {
		return aa;
	}

	public void setAa(Boolean aa) {
		this.aa = aa;
	}

	@Column(name = "qual", nullable = true, unique = false)
	public Boolean getQual() {
		return qual;
	}

	public void setQual(Boolean qual) {
		this.qual = qual;
	}

	@Column(name = "projectName", nullable = true, unique = false)
	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	@Column(name = "length", nullable = true, unique = false)
	public String getLength() {
		return length;
	}

	public void setLength(String length) {
		this.length = length;
	}

	@Column(name = "filter_sequence", nullable = true, unique = false)
	public String getFilterSequence() {
		return filterSequence;
	}

	public void setFilterSequence(String filterSequence) {
		this.filterSequence = filterSequence;
	}

	@Column(name = "fasta_file", nullable = true, unique = false)
	public String getFastaFile() {
		return fastaFile;
	}

	public void setFastaFile(String fastaFile) {
		this.fastaFile = fastaFile;
	}

	@Column(name = "fastq_file", nullable = true, unique = false)
	public String getFastqFile() {
		return fastqFile;
	}

	public void setFastqFile(String fastqFile) {
		this.fastqFile = fastqFile;
	}

	@Column(name = "qual_file", nullable = true, unique = false)
	public String getQualFile() {
		return qualFile;
	}

	public void setQualFile(String qualFile) {
		this.qualFile = qualFile;
	}

	@Column(name = "output", nullable = true, unique = false)
	public String getOutput() {
		return output;
	}

	public void setOutput(String output) {
		this.output = output;
	}

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "process_id", nullable = false, unique = false)
	public Processes getProcesses() {
		return processes;
	}

	public void setProcesses(Processes processes) {
		this.processes = processes;
	}

	@Override
	public String toString() {
		return "IonTorrent [ionId=" + ionId + ", seqType=" + seqType
				+ ", phred=" + phred + ", aa=" + aa + ", qual=" + qual
				+ ", projectName=" + projectName + ", length=" + length
				+ ", filterSequence=" + filterSequence + ", fastaFile="
				+ fastaFile + ", fastqFile=" + fastqFile + ", qualFile="
				+ qualFile + ", output=" + output + ", processes=" + processes
				+ "]";
	}

}
