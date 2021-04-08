package com.shelfcrawler.dto;

import com.shelfcrawler.entities.TvshelfItem;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTvshelfItem {
	private Long todoTvshelfId;
	private Long tvshelfId;
	private TvshelfItem tvshelfItem;
}
