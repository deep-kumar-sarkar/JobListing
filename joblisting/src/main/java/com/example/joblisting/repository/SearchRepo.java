package com.example.joblisting.repository;

import com.example.joblisting.model.Post;

import java.util.List;

public interface SearchRepo {
	public List<Post> searchByText(String text);
}
