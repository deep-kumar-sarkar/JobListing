package com.example.joblisting.repository;

import com.example.joblisting.model.Post;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;
@Component
public class SearchRepoImpl implements SearchRepo{
	@Autowired
	MongoClient mongoClient;
	
	@Autowired
	MongoConverter mongoConverter;

	@Override
	public List<Post> searchByText(@RequestParam String searchText) {
		MongoDatabase database = mongoClient.getDatabase("SpringBoot");
		MongoCollection<Document> collection = database.getCollection("JobListing");
		AggregateIterable<Document> result = collection.aggregate(Arrays.asList(new Document("$search",
						new Document("text",
								new Document("query", searchText)
										.append("path", Arrays.asList("desc", "profile", "exp", "techs")))),
				new Document("$sort",
						new Document("exp", 1L)),
				new Document("$limit", 4L)));

		List<Post> posts = new ArrayList<>();
		// Convert the result to a list of Post objects
		
		
		for (Document doc : result)
			posts.add(mongoConverter.read(Post.class, doc));

		return posts;
	}

}
