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
@Table(name = "TVSHELF")
@Getter
@Setter
public class Tvshelf implements Serializable {
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

	@OneToMany(mappedBy = "tvshelf", cascade = CascadeType.ALL)
	private Set<TvshelfItem> tvshelfItems = new HashSet<>();

	public Tvshelf() {
	}

	public Tvshelf(User user) {
		this.user = user;
		this.name = "todo";
		this.goal = 0;
		this.reachRate = 0.0;
	}
}
