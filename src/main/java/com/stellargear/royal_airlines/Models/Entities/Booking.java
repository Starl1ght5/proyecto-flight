package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document(collection = "Booking")
public class Booking {

    @Id
    private String bookingID;
    private String bookedTravelID;
    private String bookedSeatID;
    private double totalPrice;

    public Booking () {}
}
