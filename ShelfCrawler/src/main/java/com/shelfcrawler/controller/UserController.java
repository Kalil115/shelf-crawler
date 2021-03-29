package com.shelfcrawler.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelfcrawler.entities.Bookshelf;
import com.shelfcrawler.entities.User;
import com.shelfcrawler.repository.BookshelfRepository;
import com.shelfcrawler.repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	BookshelfRepository bookshelfRepository;

	@GetMapping
	public List<User> findAllUser() {
		return userRepository.findAll();
	}
	
	@GetMapping("{id}")
	public User findUserById(@PathVariable("id") Long id) {
		return userRepository.findById(id).get();
	}

	@PostMapping
	public User saveUser(@RequestBody User user) {
		return userRepository.save(user);
	}

	@PutMapping
	public User updateUser(@RequestBody User user) {
		return userRepository.save(user);
	}
}
