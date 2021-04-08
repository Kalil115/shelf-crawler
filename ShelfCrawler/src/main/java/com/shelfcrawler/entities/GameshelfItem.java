package com.shelfcrawler.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "GAMESHELF_ITEM")
@Getter
@Setter
public class GameshelfItem implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "gameshelf_id")
	@JsonBackReference
	private Gameshelf gameshelf;

	@OneToOne
	private Game game;

	private String comment;

	private Float rating;

	private String reason;

	@Enumerated(EnumType.STRING)
	private ItemStatus status;

	@CreationTimestamp
	private Date dateCreated;

	@UpdateTimestamp
	private Date lastUpdated;

	@Override
	public boolean equals(Object o) {

		if (o == this)
			return true;
		
		if (!(o instanceof GameshelfItem)) {
			return false;
		}
		
		GameshelfItem gameshelfItem = (GameshelfItem) o;
		
		return game.getId() == gameshelfItem.game.getId();
	}

	@Override
	public int hashCode() {
		return Objects.hash(game);
	}

}
