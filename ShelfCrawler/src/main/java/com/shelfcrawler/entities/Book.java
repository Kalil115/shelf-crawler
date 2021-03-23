package com.shelfcrawler.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="BOOK")
@Data
public class Book implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	private Long id;
	
	private String title;
	
	private String author;
	
	private String descriptoin;
	
	private Integer year;
	
	private String imageUrl;
	
	private Boolean active;
	
	private Date lastUpdate;

}
