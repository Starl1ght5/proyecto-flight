package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Document(collection = "Booking")
public class Booking {

    @Id
    private String bookingID;

    private String userID;
    private String userGender;
    private int userAge;

    private String bookedFlightID;
    private String departureCountry;
    private String departureCity;
    private String arrivalCountry;
    private String arrivalCity;

    private List<String> bookedSeatIDs;
    private String selectedFee;

    private LocalDateTime bookingDate;

    private double totalPrice;
    private int ticketCount;

    private String status;

    public Booking () {}
}
