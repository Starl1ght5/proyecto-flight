package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document(collection = "TravelInfo")
public class TravelInfo {

    @Id
    private String tripInfoID;

    private String departureFlight;
    private String arrivalFlight;

    private boolean roundTrip;

    private boolean discounted;

    private String status;

    public TravelInfo () {}
}
