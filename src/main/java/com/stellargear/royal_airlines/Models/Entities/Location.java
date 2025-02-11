package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Setter
@Getter
public class Location {

    @Id
    private String locationID;
    private String cityName;
    private String countryName;
    private String iataCode;
    private String airportName;

    public Location () {}
}
