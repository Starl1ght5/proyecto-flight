package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document (collection = "Recommendations")
public class Recommendation {

    private String recommendationID;
    private String userID;
    private String locationID;
    private String recommendation;
    private String confidence;

    public Recommendation() {}

}
