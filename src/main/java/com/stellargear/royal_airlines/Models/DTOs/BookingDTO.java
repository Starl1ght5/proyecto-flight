package com.stellargear.royal_airlines.Models.DTOs;

import lombok.Getter;
import lombok.Setter;
import org.joda.money.Money;

import java.util.List;

@Setter
@Getter
public class BookingDTO {

    private String bookingID;

    private String userID;
    private FlightDTO bookedFight;

    private List<SeatDTO> bookedSeats;
    private FeeDTO selectedFee;

    private Money totalPrice;
    private String status;
    private int ticketCount;

    private List<String> seatIDs;
    private String flightID;
    private String feeID;

    public BookingDTO () {}
}
