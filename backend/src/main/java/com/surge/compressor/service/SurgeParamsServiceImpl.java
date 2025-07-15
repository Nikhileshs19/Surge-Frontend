package com.surge.compressor.service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.surge.compressor.model.TagValueDto;
import com.surge.compressor.utils.DataBaseUtility;

class SurgeParams {
	private float scm;
	private float recycleValveOpenning;

	public SurgeParams(float scm, float recycleValveOpenning) {
		super();
		this.scm = scm;
		this.recycleValveOpenning = recycleValveOpenning;
	}

//	public float getScm() {
//		return scm;
//	}
//
//	public void setScm(float scm) {
//		this.scm = scm;
//	}

	public float getRecycleValveOpenning() {
		return recycleValveOpenning;
	}

	public void setRecycleValveOpenning(float recycleValveOpenning) {
		this.recycleValveOpenning = recycleValveOpenning;
	}

}

@Service
public class SurgeParamsServiceImpl implements SurgeParamsService {
	@Value("${spring.datasource.url}")
	private String url;

	@Value("${spring.datasource.username}")
	private String user;

	@Value("${spring.datasource.password}")
	private String password;

	@Value("${spring.datasource.driver-class-name}")
	private String driver;

	@Override
	public List<TagValueDto> getScmValveOpening(int compressor) {
		List<TagValueDto> result = new ArrayList<>();
		try (Connection conn = DataBaseUtility.getConnection(driver, url, user, password);
				Statement stmt = conn.createStatement();) {

			String sql = DataBaseUtility.sqlQueryUtil("SCM", compressor, "OP");
			ResultSet rs = stmt.executeQuery(sql);

			while (rs.next()) {
				TagValueDto aliasData = new TagValueDto();
				aliasData.setAlias(rs.getString("alias"));
				aliasData.setTimestamp(rs.getString("timestamp"));
				aliasData.setDescription(rs.getString("description"));
				aliasData.setValue(rs.getFloat("value"));
				aliasData.setTag(rs.getInt("tag"));
				aliasData.setSection(rs.getInt("section"));
				aliasData.setCategory("SCM");
				result.add(aliasData);

			}

			sql = String.format("""
							SELECT a.*, b.id AS alias_id
							FROM isspde_005_v2.surge_ui_alias_mapping a
							JOIN icap_project_53.lbt_master_tags b ON a.alias = b.name
							where a.category='recycle-opening' and compressor=%d
					""", compressor);

			rs = stmt.executeQuery(sql);

			while (rs.next()) {
				TagValueDto aliasData = new TagValueDto();
				aliasData.setAlias(rs.getString("alias"));
				aliasData.setDescription(rs.getString("description"));
				aliasData.setTag(rs.getInt("alias_id"));
				aliasData.setSection(rs.getInt("section"));
				aliasData.setCategory("recycle-opening");
				getLatestFromRawTable(conn, aliasData);
				result.add(aliasData);

			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return result;
	}

	private void getLatestFromRawTable(Connection conn, TagValueDto aliasData) {

		try (Statement stmt = conn.createStatement();) {
			String sql = "select * from icap_raw_data where tag=" + aliasData.getTag()
					+ " order by timestamp desc limit 1";

			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
				aliasData.setValue(rs.getFloat("value"));
				aliasData.setTimestamp(rs.getString("timestamp"));
			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

	}

	@Override
	public List<TagValueDto> getSurgeGraphData(int compressor, String from, String to) {
		List<TagValueDto> result = new ArrayList<>();
		try (Connection conn = DataBaseUtility.getConnection(driver, url, user, password);
				Statement stmt = conn.createStatement();) {

			String sql = DataBaseUtility.surgeGrapSqlQuery("surge-graph", compressor, "OP", from, to);
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

}
