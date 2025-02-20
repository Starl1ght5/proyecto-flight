package com.stellargear.royal_airlines.Models.DTOs;

import lombok.Getter;
import lombok.Setter;
import org.joda.money.Money;

@Setter
@Getter
public class FeeDTO {

    private String feeID;
    private String feeName;
    private double priceDifference;
    private Money price;

    public FeeDTO () {}
}
