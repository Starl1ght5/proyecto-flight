package com.stellargear.royal_airlines.Models.Utils;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RecommendationResult {

    private String location;
    private double probability;

    public RecommendationResult () {}
}
