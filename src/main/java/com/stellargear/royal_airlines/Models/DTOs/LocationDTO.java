package com.stellargear.royal_airlines.Models.DTOs;

import lombok.Getter;
import lombok.Setter;
import org.joda.money.Money;

import java.util.ArrayList;

@Setter
@Getter
public class LocationDTO {

    private String locationID;
    private String cityName;
    private String countryName;
    private String iataCode;
    private String airportName;
    private Money cheapestPrice;
    private boolean featured;
    private String climate;
    private String bestDate;
    private ArrayList<String> activities;
    private double rating;

    public LocationDTO () {}

}
