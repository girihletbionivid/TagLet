package com.jaxlayer.webreflector.rest.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.JoinColumn;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jaxlayer.webreflector.rest.service.ProcessesCommanInterface;
@Entity
@Table(name = "table_illumina_qc")
public class IlluminaQc implements Serializable,ProcessesCommanInterface{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long illuminaQcId;
	private String l;
	private String s;
	private String t;
	private String z;
	private Boolean onstat;
//	private List<String> queryFiles;
//	private List<String> queryAdapterFiles;
	private String sequenceType;
	private Long cpu;
	private String outputFolder;
	@JsonIgnore
	private Processes processes;
	private String projectName;
	
	private String samples;
	private String adapterFiles;
	private String leftFiles;
	private String rightFiles;
	private String singleFiles;
	private String variants;
	private String readLayout;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "illumina_qc_id", unique = true)
	public Long getIlluminaQcId() {
		return illuminaQcId;
	}

	public void setIlluminaQcId(Long illuminaQcId) {
		this.illuminaQcId = illuminaQcId;
	}

	@Column(name = "l", nullable = false, unique = false)
	public String getL() {
		return l;
	}

	public void setL(String l) {
		this.l = l;
	}

	@Column(name = "s", nullable = false, unique = false)
	public String getS() {
		return s;
	}

	public void setS(String s) {
		this.s = s;
	}

	@Column(name = "t", nullable = false, unique = false)
	public String getT() {
		return t;
	}

	public void setT(String t) {
		this.t = t;
	}

	@Column(name = "z", nullable = false, unique = false)
	public String getZ() {
		return z;
	}

	public void setZ(String z) {
		this.z = z;
	}

	@Column(name = "onstat", nullable = false, unique = false)
	public Boolean getOnstat() {
		return onstat;
	}

	public void setOnstat(Boolean onstat) {
		this.onstat = onstat;
	}


/*	@ElementCollection
	@CollectionTable(name = "table_illumina_query_files", joinColumns = @JoinColumn(name = "illumina_qc_id"))
	@Column(name = "query_files")
	public List<String> getQueryFiles() {
		return queryFiles;
	}

	public void setQueryFiles(List<String> queryFiles) {
		this.queryFiles = queryFiles;
	}


	@ElementCollection
	@CollectionTable(name = "table_illumina_adapter_files", joinColumns = @JoinColumn(name = "illumina_qc_id"))
	@Column(name = "query_adapter_files")
	public List<String> getQueryAdapterFiles() {
		return queryAdapterFiles;
	}

	public void setQueryAdapterFiles(List<String> queryAdapterFiles) {
		this.queryAdapterFiles = queryAdapterFiles;
	}
*/
	@Column(name = "cpu", nullable = false, unique = false)
	public Long getCpu() {
		return cpu;
	}

	public void setCpu(Long cpu) {
		this.cpu = cpu;
	}

	@Column(name = "output_dir", nullable = false, unique = false)
	public String getOutputFolder() {
		return outputFolder;
	}

	public void setOutputFolder(String outputFolder) {
		this.outputFolder = outputFolder;
	}
	@Column(name = "project_name", nullable = false, unique = false)
	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	@OneToOne(cascade = CascadeType.ALL,orphanRemoval=true)
	public Processes getProcesses() {
		return processes;
	}

	public void setProcesses(Processes processes) {
		this.processes = processes;
	}
	@Column(name = "sequence_type", nullable = false, unique = false)
	public String getSequenceType() {
		return sequenceType;
	}

	public void setSequenceType(String sequenceType) {
		this.sequenceType = sequenceType;
	}
	@Column(name = "samples", nullable = false, unique = false , columnDefinition = "text")
	public String getSamples() {
		return samples;
	}

	public void setSamples(String samples) {
		this.samples = samples;
	}
	@Column(name = "adapter_files", nullable = false, unique = false, columnDefinition = "text")
	public String getAdapterFiles() {
		return adapterFiles;
	}

	public void setAdapterFiles(String adapterFiles) {
		this.adapterFiles = adapterFiles;
	}
	@Column(name = "left_files", nullable = false, unique = false, columnDefinition = "text")
	public String getLeftFiles() {
		return leftFiles;
	}

	public void setLeftFiles(String leftFiles) {
		this.leftFiles = leftFiles;
	}
	@Column(name = "right_files", nullable = false, unique = false, columnDefinition = "text")
	public String getRightFiles() {
		return rightFiles;
	}

	public void setRightFiles(String rightFiles) {
		this.rightFiles = rightFiles;
	}
	@Column(name = "single_files", nullable = false, unique = false, columnDefinition = "text")
	public String getSingleFiles() {
		return singleFiles;
	}

	public void setSingleFiles(String singleFiles) {
		this.singleFiles = singleFiles;
	}
	
	@Column(name = "variants", nullable = false, unique = false)
	public String getVariants() {
		return variants;
	}

	public void setVariants(String variants) {
		this.variants = variants;
	}
	
	@Column(name = "readLayout", nullable = true, unique = false)
	public String getReadLayout() {
		return readLayout;
	}

	public void setReadLayout(String readLayout) {
		this.readLayout = readLayout;
	}
	
	@Override
	public String toString() {
		return "IlluminaQc [illuminaQcId=" + illuminaQcId + ", l=" + l + ", s="
				+ s + ", t=" + t + ", z=" + z + ", onstat=" + onstat
				+ ", sequenceType=" + sequenceType + ", cpu=" + cpu
				+ ", outputFolder=" + outputFolder + ", processes=" + processes
				+ ", projectName=" + projectName + ", samples=" + samples
				+ ", adapterFiles=" + adapterFiles + ", leftFiles=" + leftFiles
				+ ", rightFiles=" + rightFiles + ", singleFiles=" + singleFiles
				+ ", variants=" + variants + "]";
	}


	/*@Override
	public String toString() {
		return "IlluminaQc [illuminaQcId=" + illuminaQcId + ", l=" + l + ", s="
				+ s + ", t=" + t + ", z=" + z + ", onstat=" + onstat
				+ ", queryFiles=" + queryFiles + ", queryAdapterFiles="
				+ queryAdapterFiles + ", sequenceType=" + sequenceType
				+ ", cpu=" + cpu + ", outputFolder=" + outputFolder
				+ ", processes=" + processes + "]";
	}*/


}
