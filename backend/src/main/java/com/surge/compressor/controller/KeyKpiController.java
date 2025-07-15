package com.surge.compressor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.surge.compressor.model.CompressorStatusDto;
import com.surge.compressor.model.TagValueDto;
import com.surge.compressor.service.KeyKpiService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class KeyKpiController {

	@Autowired
	KeyKpiService keyKpiService;

	@GetMapping("/key-kpis/{compressor}")
	public List<TagValueDto> getKeyKpis(@PathVariable int compressor) {
		return keyKpiService.getKeyKpis(compressor);
	}

	@GetMapping("/compressor-status")
	public List<CompressorStatusDto> getCompressorStatus() {
		return keyKpiService.getCompressorStatus();

	}

	@GetMapping("/last-run-time")
	public String getBlcLastRunTime() {
		return keyKpiService.getBlcLastRunTime();
	}

	@GetMapping("/trend/{compressor}")
	public List<TagValueDto> getAliasTrendData(@PathVariable int compressor,
			@RequestParam(required = false) String from,
			@RequestParam(required = false) String to) {
		return keyKpiService.getAliasTrendData(compressor,from,to);
	}

}
