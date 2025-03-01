package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document(collection = "Fees")
public class Fee {

    @Id
    private String feeID;
    private String feeName;
    private double priceDifference;

    public Fee () {}
}
