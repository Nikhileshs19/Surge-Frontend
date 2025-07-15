package com.surge.compressor.service;

import java.util.List;

import com.surge.compressor.model.CompressorStatusDto;
import com.surge.compressor.model.TagValueDto;

public interface KeyKpiService {

	List<TagValueDto> getKeyKpis(int compressor);

	List<CompressorStatusDto> getCompressorStatus();

	String getBlcLastRunTime();

	List<TagValueDto> getAliasTrendData(int compressor, String from, String to);
		
	

}
