package com.surge.compressor.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.List;
import java.util.stream.Collectors;

public class DataBaseUtility {

//	returns a connection to the database
	public static Connection getConnection(String driver, String url, String user, String password) throws Exception {
		Class.forName(driver);
		return DriverManager.getConnection(url, user, password);

	}

	public static String sqlQueryUtil(String category, int compressor, String table) {
		String tableName = "icap_project_53.icap_output_table_plq_exp_01";
		String aliasTable = "icap_project_53.icap_alias_master";
		if (table.equalsIgnoreCase("ID")) {
			tableName = "icap_project_53.icap_independent_table_plq_exp_01";
		} else if (table.equalsIgnoreCase("ID_CALC")) {
			tableName = "icap_project_53.icap_independent_table_plq_exp_01_calculation_result";
		} else if (table.equalsIgnoreCase("raw")) {
			tableName = "icap_project_53.icap_raw_data";
			aliasTable = "icap_project_53.lbt_master_tags";
		}
		String compressorCondition = (compressor != 0) ? String.format(" AND compressor = %d", compressor) : "";

		return String.format("""
				WITH alias_mapping AS (
				    SELECT a.*, b.id AS alias_id
				    FROM isspde_005_v2.surge_ui_alias_mapping a
				    JOIN %s b ON a.alias = b.name
				),
				latest_output AS (
				    SELECT *
				    FROM %s
				    WHERE timestamp = (
				        SELECT last_runtime
				        FROM icap_project_53.icap_business_logic_config
				        WHERE name = 'ICAP_PLQ_EXP_SURGE_CALC_BLC_01'
				    )
				)
				SELECT am.*, lo.*
				FROM alias_mapping am
				LEFT JOIN latest_output lo ON am.alias_id = lo.tag
				WHERE category = '%s' %s
				""", aliasTable, tableName, category, compressorCondition);

	}

	public static String sqlQueryUtil24hr(String category, int compressor) {

		return String.format("""
				WITH alias_mapping AS (
				    SELECT a.*, b.id AS alias_id
				    FROM isspde_005_v2.surge_ui_alias_mapping a
				    JOIN icap_project_53.icap_alias_master b ON a.alias = b.name
				),
				latest_output AS (
				    SELECT *
				    FROM icap_project_53.icap_output_table_plq_exp_01
				)
				SELECT am.*, lo.*
				FROM alias_mapping am
				LEFT JOIN latest_output lo ON am.alias_id = lo.tag
				WHERE category = '%s' AND compressor = %d order by timestamp desc limit 1
				""", category, compressor);
	}

	public static String sqlQueryUtilGraph(String category, int compressor, String table) {

		String tableName = "icap_project_53.icap_output_table_plq_exp_01";
		if (table.equalsIgnoreCase("ID")) {
			tableName = "icap_project_53.icap_independent_table_plq_exp_01";
		}
		return String.format("""
						WITH alias_mapping AS (
					    SELECT a.*, b.id AS alias_id
					    FROM isspde_005_v2.surge_ui_alias_mapping a
					    JOIN icap_project_53.icap_alias_master b ON a.alias = b.name
					),
					last_runtime_cte AS (
					    SELECT last_runtime
					    FROM icap_project_53.icap_business_logic_config
					    WHERE name = 'ICAP_PLQ_EXP_SURGE_CALC_BLC_01'
					),
					latest_output AS (
					    SELECT lo.*
					    FROM %s lo
					    JOIN last_runtime_cte lr
					      ON lo.timestamp BETWEEN DATE_SUB(lr.last_runtime, INTERVAL 20 minute) AND lr.last_runtime
					)
					SELECT am.*, lo.*
					FROM alias_mapping am
					LEFT JOIN latest_output lo ON am.alias_id = lo.tag
					WHERE am.category = '%s' AND am.compressor = %d order by timestamp ;

				""", tableName, category, compressor);
	}

	public static String surgeGrapSqlQuery(String category, int compressor, String table, String from, String to) {

		String tableName = "icap_project_53.icap_output_table_plq_exp_01";

		if (table.equalsIgnoreCase("ID")) {
			tableName = "icap_project_53.icap_independent_table_plq_exp_01";
		} else if (table.equalsIgnoreCase("ID_CALC")) {
			tableName = "icap_project_53.icap_independent_table_plq_exp_01_calculation_result";
		}
		String timeInterval = "DATE_SUB(lr.last_runtime, INTERVAL 20 minute) AND lr.last_runtime";
		if (from != null && to != null) {
			timeInterval = String.format("'%s' AND '%s'", from, to);
		}

		return String.format("""
					WITH alias_mapping AS (
				    SELECT a.*, b.id AS alias_id
				    FROM isspde_005_v2.surge_ui_alias_mapping a
				    JOIN icap_project_53.icap_alias_master b ON a.alias = b.name
				),
				last_runtime_cte AS (
				    SELECT last_runtime
				    FROM icap_project_53.icap_business_logic_config
				    WHERE name = 'ICAP_PLQ_EXP_SURGE_CALC_BLC_01'
				),
				latest_output AS (
				    SELECT lo.*
				    FROM %s lo
				    JOIN last_runtime_cte lr
				      ON lo.timestamp BETWEEN %S
				)
				SELECT am.*, lo.*
				FROM alias_mapping am
				JOIN latest_output lo ON am.alias_id = lo.tag
				WHERE am.category = '%s' AND am.compressor = %d order by timestamp ;

					""", tableName, timeInterval, category, compressor);
	}

	public static String sqlQueryTrend(List<Integer> aliasList, String table, int compressor, String timeCondition) {
		String aliasStr = aliasList.stream().map(String::valueOf).collect(Collectors.joining(", "));
		String tableName = "icap_project_53.icap_independent_table_plq_exp_01";
		if (table.equalsIgnoreCase("OP"))
			tableName = "icap_project_53.icap_output_table_plq_exp_01";
		return String.format(
				"""
						With alias_mapping as (
						 SELECT a.*, b.id AS alias_id
						   FROM isspde_005_v2.surge_ui_alias_mapping a
						   JOIN icap_project_53.icap_alias_master b ON a.alias = b.name where category='trend' and compressor = %d
							)

						select timestamp,alias,description,value from %s a join alias_mapping b on a.tag=b.alias_id
						where %s and tag in (%s) order by timestamp
						""",
				compressor, tableName, timeCondition, aliasStr);

	}

}
