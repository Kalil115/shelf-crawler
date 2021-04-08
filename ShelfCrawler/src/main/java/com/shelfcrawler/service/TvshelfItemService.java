package com.shelfcrawler.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shelfcrawler.dto.AddTvshelfItem;
import com.shelfcrawler.dto.UpdateTvshelfItem;
import com.shelfcrawler.entities.ItemStatus;
import com.shelfcrawler.entities.Tvshelf;
import com.shelfcrawler.entities.TvshelfItem;
import com.shelfcrawler.repository.TvshelfItemRepository;
import com.shelfcrawler.repository.TvshelfRepository;

@Service
public class TvshelfItemService {

	@Autowired
	TvshelfItemRepository tvshelfItemRepository;
	
	@Autowired
	TvshelfRepository tvshelfRepository;
	
	
	public List<Tvshelf> updateTvshelfItem(UpdateTvshelfItem updateTvshelfItem) {
		Long currentTvshelfId = updateTvshelfItem.getTvshelfId();
		TvshelfItem newItem = updateTvshelfItem.getTvshelfItem();
		
		Tvshelf currentTvshelf = tvshelfRepository.findById(currentTvshelfId).get();
		TvshelfItem old = tvshelfItemRepository.findById(newItem.getId()).get();
		newItem.setTvSeries(old.getTvSeries());
		newItem.setTvshelf(currentTvshelf);
		newItem.setDateCreated(old.getDateCreated());
		tvshelfItemRepository.save(newItem);
		
		
		List<Tvshelf> res = new ArrayList<>();
		res.add(tvshelfRepository.findById(currentTvshelfId).get());
		return tvshelfRepository.findAllById(Arrays.asList(currentTvshelfId, updateTvshelfItem.getTodoTvshelfId()));
		
	}
	
	public TvshelfItem addTvshelfItem(AddTvshelfItem addtvshelfItem) {
		Tvshelf todoList = tvshelfRepository.findById(addtvshelfItem.getTvshelfId()).get();
		Set<TvshelfItem> existingTvshelfItems = todoList.getTvshelfItems();
		TvshelfItem tvshelfItem = addtvshelfItem.getTvshelfItem();
		tvshelfItem.setTvshelf(todoList);
		
		if(!existingTvshelfItems.contains(tvshelfItem)) {
			return tvshelfItemRepository.save(tvshelfItem);
		}
		return tvshelfItem;
	}

	public Tvshelf deleteTvshelfItemOfListingStatus(Long id) {
		TvshelfItem toBeDeleted = tvshelfItemRepository.findById(id).get();
		toBeDeleted.getTvshelf().getId();
		if(toBeDeleted.getStatus() == ItemStatus.LISTING) {
			tvshelfItemRepository.deleteById(id);
		}
		return tvshelfRepository.findById(toBeDeleted.getTvshelf().getId()).get();
		
	}
}
