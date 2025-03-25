package com.stellargear.royal_airlines.Models.DTOs;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TravelInfoDTO {

    private String travelInfoID;

    private FlightDTO departureFlight;
    private FlightDTO arrivalFlight;

    private boolean roundTrip;

    private boolean discounted;

    private String status;

    public TravelInfoDTO () {}
}
