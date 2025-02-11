package com.stellargear.royal_airlines.Models.DTOs;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LocationDTO {

    private String locationID;
    private String cityName;
    private String countryName;
    private String iataCode;
    private String airportName;

    public LocationDTO () {}
}
