package com.surge.compressor.model;

public class TagValueDto {
	private int tag;
	private String timestamp;
	private float value;
	private String alias;
	private String description;
	private String category;
	private int section;

	public TagValueDto() {
		super();

	}

	public TagValueDto(int tag, String timestamp, float value, String alias, String description, int section,
			String category) {
		super();
		this.tag = tag;
		this.timestamp = timestamp;
		this.value = value;
		this.alias = alias;
		this.description = description;
		this.section = section;
		this.category = category;
	}

	public int getSection() {
		return section;
	}

	public void setSection(int section) {
		this.section = section;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getTag() {
		return tag;
	}

	public void setTag(int tag) {
		this.tag = tag;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public float getValue() {
		return value;
	}

	public void setValue(float value) {
		this.value = value;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
