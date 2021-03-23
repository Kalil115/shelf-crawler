package com.shelfcrawler.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

@Entity
@Table(name = "SHELF")
@Data
public class Shelf implements Serializable {
	private static final long serialVersionUID = 1L;

	private enum ItemStatus {
		LISTING, PROGRESS, DNF, FINISHED
	}

	@Id
	private Long id;
	
	private String name;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonBackReference
	private User user;

	private Long book_id;

	private Double rate;

	private String reason;

	@Enumerated(EnumType.STRING)
	private ItemStatus Status;

}
