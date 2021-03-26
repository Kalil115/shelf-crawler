package com.shelfcrawler.entities;

import java.io.Serializable;

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
	
	private String isbn;
	
	private String title;
	
	private String description;
	
	private String author;
	
	private Integer published;
	
	private String imageUrl;

}
