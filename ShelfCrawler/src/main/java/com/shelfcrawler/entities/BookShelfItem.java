package com.shelfcrawler.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="BOOKSHELF_ITEM")
@Data
public class BookShelfItem implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	private Long id;
	
	private Long bookShelfId;
	
	private Long bookId;
	
	private String comment;
	
	private Float rating;
	
	private String reason;
	
	private String status;
	


}
