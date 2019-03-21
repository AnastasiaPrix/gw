package ru.smarteps.greenwhistle.model;

import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;


import lombok.Data;

@Data
// @Document(collection="nodes")
@SuppressWarnings("unused")
public class Node {
	@Id
	private String id;
	private double lanUsed;
	private double cpuUsed;
	private double lanCapacity;
	private double cpuCapacity;
	private long timeStamp;
	private String state;
	
	public Node() {
		
	}
	
	public Node(String id) {
		this.id = id;
	}

	public long getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(long timeStamp) {
		this.timeStamp = timeStamp;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public double getCpuUsed() {
		return cpuUsed;
	}

	public void setCpuUsed(double cpuUsed) {
		this.cpuUsed = cpuUsed;
	}

	public double getCpuCapacity() {
		return cpuCapacity;
	}

	public void setCpuCapacity(double cpuCapacity) {
		this.cpuCapacity = cpuCapacity;
	}
}
