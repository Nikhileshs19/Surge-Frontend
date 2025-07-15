package com.surge.compressor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.surge.compressor.model.TagValueDto;
import com.surge.compressor.service.SurgeParamsService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class SurgeParamsController {

	@Autowired
	SurgeParamsService surgeParamsService;

	@GetMapping("/surge-scm-opening/{compressor}")
	public List<TagValueDto> getScmValveOpening(@PathVariable int compressor) {
		return surgeParamsService.getScmValveOpening(compressor);

	}

	@GetMapping("/surge-graph-data/{compressor}")
	public List<TagValueDto> getSurgeGraphData(@PathVariable int compressor,
			@RequestParam(required = false) String from, @RequestParam(required = false) String to) {
		return surgeParamsService.getSurgeGraphData(compressor,from,to);

	}
}
