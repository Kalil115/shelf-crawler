package com.shelfcrawler.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "USER")
@Getter
@Setter
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String username;

	private String password;

	@Email
	private String email;
	
	private String role;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private Set<Bookshelf> bookshelves = new HashSet<>();
	
	public User() {}
	
	public User(String username, String password, String email, String role) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
	}
	
	public void add(Bookshelf bookshelf) {
		if (bookshelf != null) {
			if (bookshelves == null) {
				bookshelves = new HashSet<>();
			}
			bookshelves.add(bookshelf);
			bookshelf.setUser(this);
		}
	}
}
