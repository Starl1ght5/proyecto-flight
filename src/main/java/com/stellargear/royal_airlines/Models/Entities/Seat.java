package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.joda.money.Money;
import org.springframework.data.annotation.Id;

@Getter
@Setter
public class Seat {

    @Id
    private String seatID;
    private Money seatPrice;
    private boolean reserved;

    public Seat () {}
}
