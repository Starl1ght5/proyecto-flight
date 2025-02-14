package com.stellargear.royal_airlines.Models.DTOs;

import lombok.Getter;
import lombok.Setter;
import org.joda.money.Money;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class FlightDTO {

    private String flightID;
    private String airline;
    private Money ticketPrice;
    private String duration;

    private LocationDTO departureLocation;
    private LocationDTO arrivalLocation;

    private LocalDateTime departureDate;
    private LocalDateTime arrivalDate;

    private List<SeatDTO> availableSeats;

    public FlightDTO ()  {}
}
