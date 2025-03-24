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
    private TravelInfoDTO bookedTravelID;

    private List<SeatDTO> bookedSeatIDs;
    private FeeDTO selectedFee;

    private Money totalPrice;
    private String status;
    private int ticketCount;

    private List<String> seatIDs;
    private String travelID;
    private String feeID;

    public BookingDTO () {}
}
