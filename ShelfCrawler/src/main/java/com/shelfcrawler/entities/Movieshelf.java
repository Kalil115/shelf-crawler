package com.shelfcrawler.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "MOVIEHELF")
@Getter
@Setter
public class Movieshelf implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonBackReference
	private User user;

	private Integer goal;
	
	private Double reachRate;

	@OneToMany(mappedBy = "movieshelf", cascade = CascadeType.ALL)
	private Set<MovieshelfItem> movieshelfItems = new HashSet<>();

	public void add(MovieshelfItem movieshelfItem) {
		if(movieshelfItem != null) {
			if(movieshelfItems == null) {
				movieshelfItems = new HashSet<>();
			}
			movieshelfItems.add(movieshelfItem);
			movieshelfItem.setMovieshelf(this);
		}

	}
	

}
