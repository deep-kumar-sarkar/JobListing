package com.example.joblisting.repository;

import com.example.joblisting.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface JobRepository extends MongoRepository<Post, String> {

	List<Post> findAllByProfile(String profile);
}

