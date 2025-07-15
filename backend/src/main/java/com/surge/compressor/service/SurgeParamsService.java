package com.surge.compressor.service;

import java.util.List;

import com.surge.compressor.model.TagValueDto;

public interface SurgeParamsService {

	List<TagValueDto> getScmValveOpening(int compressor);

	List<TagValueDto> getSurgeGraphData(int compressor, String from, String to);

}
