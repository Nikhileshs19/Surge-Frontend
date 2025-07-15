package com.surge.compressor.service;

import java.util.List;

import com.surge.compressor.model.TagValueDto;

public interface OperatingParamsService {

	List<TagValueDto> OperatingParamsService(int compressor);
	List<TagValueDto> getHealthCurveData(int compressor);

}
