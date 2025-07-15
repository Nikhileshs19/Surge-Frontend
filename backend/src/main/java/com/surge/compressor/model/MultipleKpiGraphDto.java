package com.surge.compressor.model;

public class MultipleKpiGraphDto {
	private String timestamp;
	private float y;
	private float x;
	
	public MultipleKpiGraphDto() {
		super();
		
	}
	public MultipleKpiGraphDto(String timestamp, float y, float x) {
		super();
		this.timestamp = timestamp;
		this.y = y;
		this.x = x;
	}
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	public float getY() {
		return y;
	}
	public void setY(float y) {
		this.y = y;
	}
	public float getX() {
		return x;
	}
	public void setX(float x) {
		this.x = x;
	}
	@Override
	public String toString() {
		return "MultipleKpiGraphDto [timestamp=" + timestamp + ", y=" + y + ", x=" + x + "]";
	}
	
	
	

}
