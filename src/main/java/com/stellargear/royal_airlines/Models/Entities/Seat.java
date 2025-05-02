package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document(collection = "Seats")
public class Seat {

    @Id
    private String seatID;
    private String seatNumber;
    private double seatPrice;
    private boolean reserved;

    public Seat () {}

}
