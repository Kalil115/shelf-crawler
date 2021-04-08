package com.shelfcrawler.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelfcrawler.entities.TvSeries;

public interface TvSeriesRepository extends JpaRepository<TvSeries, Long> {

}
