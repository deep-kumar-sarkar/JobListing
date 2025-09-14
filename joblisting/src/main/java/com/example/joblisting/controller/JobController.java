package com.example.joblisting.controller;

import com.example.joblisting.model.Post;
import com.example.joblisting.repository.JobRepository;
import com.example.joblisting.repository.SearchRepoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class JobController {

	@Autowired
	private JobRepository jobRepository;

	@Autowired
	private SearchRepoImpl searchRepo;

	@GetMapping("/Alljobs")
	public List<Post> getAllJobs() {
		return jobRepository.findAll();
	}
	@GetMapping("/jobs")
	public List<Post> getAllJobs(@RequestParam String profile) {
		return jobRepository.findAllByProfile(profile);
	}
	@GetMapping("/jobs/{text}")
	public List<Post> searchJobs(@PathVariable String text) {
		return searchRepo.searchByText(text);
	}

	@PostMapping("/jobs")
	public Post createJob(@RequestBody Post post) {
		return jobRepository.save(post);
	}


}
