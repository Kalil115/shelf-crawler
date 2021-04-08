package com.shelfcrawler.dto;

import com.shelfcrawler.entities.TvshelfItem;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddTvshelfItem {
	
	private Long tvshelfId;
	private TvshelfItem tvshelfItem;

}
