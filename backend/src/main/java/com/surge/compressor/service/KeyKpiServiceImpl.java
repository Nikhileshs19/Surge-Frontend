package com.surge.compressor.service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.surge.compressor.model.CompressorAlertResult;
import com.surge.compressor.model.CompressorStatusDto;
import com.surge.compressor.model.TagValueDto;
import com.surge.compressor.utils.DataBaseUtility;

@Service
public class KeyKpiServiceImpl implements KeyKpiService {
	@Value("${spring.datasource.url}")
	private String url;

	@Value("${spring.datasource.username}")
	private String user;

	@Value("${spring.datasource.password}")
	private String password;

	@Value("${spring.datasource.driver-class-name}")
	private String driver;

	@Override
	public List<TagValueDto> getKeyKpis(int compressor) {
		List<TagValueDto> result = new ArrayList<>();
		try (Connection conn = DataBaseUtility.getConnection(driver, url, user, password);
				Statement stmt = conn.createStatement();) {

			String sql = DataBaseUtility.sqlQueryUtil("key-kpis", compressor, "OP");
			ResultSet rs = stmt.executeQuery(sql);

			while (rs.next()) {
				TagValueDto aliasData = new TagValueDto();
				aliasData.setAlias(rs.getString("alias"));
				aliasData.setTimestamp(rs.getString("timestamp"));
				aliasData.setDescription(rs.getString("description"));
				aliasData.setValue(rs.getFloat("value"));
				aliasData.setTag(rs.getInt("tag"));
				result.add(aliasData);

			}
			result.add(getKeyKpis24Hr(compressor));

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return result;

	}

	public TagValueDto getKeyKpis24Hr(int compressor) {

		TagValueDto result = new TagValueDto();
		try (Connection conn = DataBaseUtility.getConnection(driver, url, user, password);
				Statement stmt = conn.createStatement();) {

			String sql = DataBaseUtility.sqlQueryUtil24hr("key-kpis-24hr", compressor);
			ResultSet rs = stmt.executeQuery(sql);

			if (rs.next()) {
				result.setAlias(rs.getString("alias"));
				result.setTimestamp(rs.getString("timestamp"));
				result.setDescription(rs.getString("description"));
				result.setValue(rs.getFloat("value"));
				result.setTag(rs.getInt("tag"));

			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return result;

	}

	@Override
	public List<CompressorStatusDto> getCompressorStatus() {
		List<CompressorStatusDto> result = new ArrayList<>();
//		HashMap<String, String> aliasCompressorMap = new HashMap<>();

		try (Connection conn = DataBaseUtility.getConnection(driver, url, user, password);
				Statement stmt = conn.createStatement();) {

			String sql = DataBaseUtility.sqlQueryUtil("online-status", 0, "ID_CALC");
			System.out.println(sql);

			ResultSet rs = stmt.executeQuery(sql);

			while (rs.next()) {
				CompressorStatusDto compressor = new CompressorStatusDto();
				int id = rs.getInt("compressor");
				compressor.setCompressor(id);
				compressor.setName("Compressor " + id);
				compressor.setRunningStatus(rs.getInt("value"));
				compressor.setAlertCompressor(id);
				CompressorAlertResult status = getCompressorAlert(conn, id);
				compressor.setAlert(status.getCompressorAlert());
				compressor.setAlertSection(status.getAlertSectionList());
				result.add(compressor);

			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return result;

	}

	public CompressorAlertResult getCompressorAlert(Connection conn, int compressor) {
		List<Integer> alertSectionList = new ArrayList<>();
		boolean compressorAlert = false;

		try (Statement stmt = conn.createStatement()) {
			String sql = DataBaseUtility.sqlQueryUtil("SCM", compressor, "OP");
			ResultSet rs = stmt.executeQuery(sql);

			while (rs.next()) {
				float value = rs.getFloat("value");
//				SCM smaller than 10 
				if (value < 10) {
					alertSectionList.add(rs.getInt("section"));
					compressorAlert = true;
				}
			}

		} catch (Exception e) {
			System.out.println("Error in getCompressorAlert: " + e.getMessage());
		}

		return new CompressorAlertResult(alertSectionList, compressorAlert);
	}

	@Override
	public String getBlcLastRunTime() {
		String lrt = "";
		try (Connection conn = DataBaseUtility.getConnection(driver, url, user, password);
				Statement stmt = conn.createStatement();) {

			String sql = "Select * from icap_project_53.icap_business_logic_config where name = 'ICAP_PLQ_EXP_SURGE_CALC_BLC_01'";
			ResultSet rs = stmt.executeQuery(sql);

			if (rs.next()) {
				lrt = rs.getString("last_runtime");
			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return lrt;

	}

	@Override
	public List<TagValueDto> getAliasTrendData(int compressor, String from, String to) {

		List<TagValueDto> result = new ArrayList<>();
		try (Connection conn = DataBaseUtility.getConnection(driver, url, user, password);
				Statement stmt = conn.createStatement();) {

			String sql = String.format(
					"""
								SELECT a.*, b.id AS alias_id
									   FROM isspde_005_v2.surge_ui_alias_mapping a
									   JOIN icap_project_53.icap_alias_master b ON a.alias = b.name where category= 'trend' and compressor= %d
							""",
					compressor);

			ResultSet rs = stmt.executeQuery(sql);
			List<Integer> opAlias = new ArrayList<>();
			List<Integer> idAlias = new ArrayList<>();
			while (rs.next()) {
				String alias = rs.getString("alias");
				int aliasId = rs.getInt("alias_id");
				if (alias.toLowerCase().startsWith("op"))
					opAlias.add(aliasId);
				else
					idAlias.add(aliasId);
			}
			LocalDate today = LocalDate.now();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			String lastWeek = today.minusDays(7).format(formatter);
			String todayStr = today.format(formatter);
			String timeCondition = from != null && to != null
					? String.format("timestamp between '%s' and '%s'", from, to)
					: String.format("timestamp between '%s' and '%s'", lastWeek, todayStr);

			sql = DataBaseUtility.sqlQueryTrend(opAlias, "OP", compressor, timeCondition);
			rs = stmt.executeQuery(sql);
//			System.out.println(sql);
		
			while (rs.next()) {
				TagValueDto aliasData = new TagValueDto();
				aliasData.setAlias(rs.getString("alias"));
				aliasData.setTimestamp(rs.getString("timestamp"));
				aliasData.setDescription(rs.getString("description"));
				aliasData.setValue(rs.getFloat("value"));
				result.add(aliasData);

			}
			sql = DataBaseUtility.sqlQueryTrend(idAlias, "ID", compressor, timeCondition);
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				TagValueDto aliasData = new TagValueDto();
				aliasData.setAlias(rs.getString("alias"));
				aliasData.setTimestamp(rs.getString("timestamp"));
				aliasData.setDescription(rs.getString("description"));
				aliasData.setValue(rs.getFloat("value"));
				result.add(aliasData);

			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return result;
	}

}
