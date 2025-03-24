package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Setter
@Getter
@Document(collection = "Booking")
public class Booking {

    @Id
    private String bookingID;

    private String userID;
    private String bookedTravelID;

    private List<String> bookedSeatIDs;
    private String selectedFee;

    private double totalPrice;
    private String status;
    private int ticketCount;

    public Booking () {}
}
