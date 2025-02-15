package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.joda.money.Money;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
public class Flight {

    @Id
    private String flightID;
    private String airline;
    private double ticketPrice;

    private Location departureLocation;
    private Location arrivalLocation;

    private LocalDateTime departureDate;
    private LocalDateTime arrivalDate;

    private List<Seat> availableSeats;

    public Flight () {}
}
