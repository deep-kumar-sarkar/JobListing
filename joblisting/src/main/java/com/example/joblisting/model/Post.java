package com.example.joblisting.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "JobListing")
public class Post {
	private String desc;
	private String profile;
	private int exp;
	private String[] techs;
}
