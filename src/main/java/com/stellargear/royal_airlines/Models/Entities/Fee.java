package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Setter
@Getter
public class Fee {

    @Id
    private String feeID;
    private String feeName;
    private double priceDifference;

    public Fee () {}
}
