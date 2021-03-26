package com.shelfcrawler.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "BOOKSHELF")
@Data
public class BookShelf implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Long id;
	
	private String name;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	private Double reachRate;

}
