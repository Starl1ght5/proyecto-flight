package com.stellargear.royal_airlines.Models.DTOs;

import lombok.Getter;
import lombok.Setter;
import org.joda.money.Money;

@Setter
@Getter
public class SeatDTO {

    private String seatID;
    private String seatNumber;
    private Money seatPrice;
    private boolean reserved;

    public SeatDTO () {}
}
