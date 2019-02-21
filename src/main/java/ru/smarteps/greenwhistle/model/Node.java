package ru.smarteps.greenwhistle.model;

import org.springframework.data.annotation.Id;


import lombok.Data;

@Data
@SuppressWarnings("unused")
public class Node {
	@Id
	private String id;
	private double lanUsed;
	private double cpuUsed;
	private double lanCapacity;
	private double cpuCapacity;
	
	public Node() {
		
	}
	
	public Node(String id) {
		this.id = id;
	}
	
	@Override
	public String toString() {
		return "TEXT";
	}
}
