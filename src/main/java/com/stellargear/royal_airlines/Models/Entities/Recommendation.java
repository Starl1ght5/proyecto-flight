package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Setter
@Getter
@Document (collection = "Recommendations")
public class Recommendation {

    private String recommendationID;
    private String userID;
    private List<String> locationIDs;
    private List<String> recommendations;
    private List<Double> confidences;

    public Recommendation() {}

}
