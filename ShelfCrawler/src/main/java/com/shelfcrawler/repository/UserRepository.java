package com.shelfcrawler.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelfcrawler.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
