package com.stellargear.royal_airlines.Models.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
public class BoardingPassDTO {

    private String boardingPassID;

    private String passengerInfo;
    private List<String> seats;
    private String seatClass;

    private String gate;
    private String group;
    private String flightNumber;
    private String airline;
    private String departureIataCode;
    private String arrivalIataCode;
    private LocalDateTime departureDate;

    public BoardingPassDTO () {}
}
