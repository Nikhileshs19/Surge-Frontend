package com.surge.compressor.service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.surge.compressor.model.MultipleKpiGraphDto;
import com.surge.compressor.model.TagValueDto;
import com.surge.compressor.utils.DataBaseUtility;

@Service
public class OperatingParamsServiceImpl implements OperatingParamsService {
	@Value("${spring.datasource.url}")
	private String url;

	@Value("${spring.datasource.username}")
	private String user;

	@Value("${spring.datasource.password}")
	private String password;

	@Value("${spring.datasource.driver-class-name}")
	private String driver;

	@Override
	public List<TagValueDto> OperatingParamsService(int compressor) {
		List<TagValueDto> result = new ArrayList<>();
		try (Connection conn = DataBaseUtility.getConnection(driver, url, user, password);
				Statement stmt = conn.createStatement();) {

			String sql = DataBaseUtility.sqlQueryUtil("operating-params", compressor, "ID");
			ResultSet rs = stmt.executeQuery(sql);

			while (rs.next()) {
				TagValueDto aliasData = new TagValueDto();
				aliasData.setAlias(rs.getString("alias"));
				aliasData.setTimestamp(rs.getString("timestamp"));
				aliasData.setDescription(rs.getString("description"));
				aliasData.setValue(rs.getFloat("value"));
				aliasData.setTag(rs.getInt("tag"));
				aliasData.setSection(rs.getInt("section"));
				result.add(aliasData);
			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return result;
	}

	@Override
	public List<TagValueDto> getHealthCurveData(int compressor) {

		List<TagValueDto> result = new ArrayList<>();


		try (Connection conn = DataBaseUtility.getConnection(driver, url, user, password);
				Statement stmt = conn.createStatement();) {

			String sql = DataBaseUtility.sqlQueryUtilGraph("health-graph", compressor, "OP");
			ResultSet rs = stmt.executeQuery(sql);

			while (rs.next()) {
				TagValueDto aliasData = new TagValueDto();
				aliasData.setAlias(rs.getString("alias"));
				aliasData.setTimestamp(rs.getString("timestamp"));
				aliasData.setDescription(rs.getString("description"));
				aliasData.setValue(rs.getFloat("value"));
				aliasData.setTag(rs.getInt("tag"));
				aliasData.setCategory(rs.getString("category"));
				aliasData.setSection(rs.getInt("section"));
				result.add(aliasData);

			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return result;
	}

}
