package com.surge.compressor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.surge.compressor.model.TagValueDto;
import com.surge.compressor.service.OperatingParamsService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class OperatingParamsController {
	
	@Autowired
	OperatingParamsService operatingParamsService;
	
	@GetMapping("/operating-params/{compressor}")
	public List<TagValueDto> getOperatingParams(@PathVariable int compressor){
		
		return operatingParamsService.OperatingParamsService(compressor);
		
	}
	
	@GetMapping("/health-graph-data/{compressor}")
	public List<TagValueDto> getHealthCurveData(@PathVariable int compressor){
		
		return operatingParamsService.getHealthCurveData(compressor);
		
	}
	
	

	

}
