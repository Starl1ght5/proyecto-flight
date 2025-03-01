package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Document(collection = "Flights")
public class Flight {

    @Id
    private String flightID;
    private String airline;
    private double ticketPrice;

    private String departureLocationID;
    private String arrivalLocationID;

    private LocalDateTime departureDate;
    private LocalDateTime arrivalDate;

    private List<String> availableSeatIDs;
    private List<String> availableFeeIDs;

    public Flight () {}
}
