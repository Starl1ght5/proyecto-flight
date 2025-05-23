package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document(collection = "Destinations")
public class Location {

    @Id
    private String locationID;
    private String cityName;
    private String countryName;
    private String iataCode;
    private double cheapestPrice;
    private String airportName;
    private boolean featured;

    public Location () {}

}
