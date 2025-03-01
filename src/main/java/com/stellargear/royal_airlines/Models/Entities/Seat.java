package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.joda.money.Money;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Seats")
public class Seat {

    @Id
    private String seatID;
    private String seatNumber;
    private double seatPrice;
    private boolean reserved;

    public Seat () {}
}
