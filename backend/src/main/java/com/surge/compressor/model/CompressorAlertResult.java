package com.surge.compressor.model;

import java.util.List;

public class CompressorAlertResult {
	private List<Integer> alertSectionList;
	private boolean compressorAlert;

	public CompressorAlertResult(List<Integer> alertSectionList, boolean compressorAlert2) {
		this.alertSectionList = alertSectionList;
		this.compressorAlert = compressorAlert2;
	}

	public List<Integer> getAlertSectionList() {
		return alertSectionList;
	}

	public boolean getCompressorAlert() {
		return compressorAlert;
	}
}
