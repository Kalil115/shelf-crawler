package com.shelfcrawler.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "USER")
@Data
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Long id;

	private String username;

	private String password;

	private String email;
	
	private String role;

	@OneToMany(mappedBy = "user")
	private List<BookShelf> bookLists;
}
