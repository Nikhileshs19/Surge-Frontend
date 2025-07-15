package com.surge.compressor.model;

import java.util.List;

public class CompressorStatusDto {
	private int compressor;
	private String name;
	private int runningStatus;
	private boolean alert;
	private int alertCompressor;
	private List<Integer> alertSection;

	public CompressorStatusDto() {
		super();

	}

	public CompressorStatusDto(int compressor, String name, int runningStatus, boolean alert, int alertCompressor,
			List<Integer> alertSection) {
		super();
		this.compressor = compressor;
		this.name = name;
		this.runningStatus = runningStatus;
		this.alert = alert;
		this.alertCompressor = alertCompressor;
		this.alertSection = alertSection;
	}

	public int getCompressor() {
		return compressor;
	}

	public void setCompressor(int compressor) {
		this.compressor = compressor;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getRunningStatus() {
		return runningStatus;
	}

	public void setRunningStatus(int i) {
		this.runningStatus = i;
	}

	public boolean isAlert() {
		return alert;
	}

	public void setAlert(boolean alert) {
		this.alert = alert;
	}

	public int getAlertCompressor() {
		return alertCompressor;
	}

	public void setAlertCompressor(int alertCompressor) {
		this.alertCompressor = alertCompressor;
	}

	public List<Integer> getAlertSection() {
		return alertSection;
	}

	public void setAlertSection(List<Integer> alertSection) {
		this.alertSection = alertSection;
	}

	@Override
	public String toString() {
		return "CompressorStatusDto [compressor=" + compressor + ", name=" + name + ", runningStatus=" + runningStatus
				+ ", alert=" + alert + ", alertCompressor=" + alertCompressor + ", alertSection=" + alertSection + "]";
	}

}
