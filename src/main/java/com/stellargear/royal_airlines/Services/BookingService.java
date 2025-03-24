package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.DTOs.BookingDTO;
import com.stellargear.royal_airlines.Models.Entities.Booking;
import com.stellargear.royal_airlines.Models.Entities.Fee;
import com.stellargear.royal_airlines.Models.Entities.Flight;
import com.stellargear.royal_airlines.Models.Entities.Seat;
import com.stellargear.royal_airlines.Repositories.BookingRepository;
import com.stellargear.royal_airlines.Utils.GlobalLogger;
import com.stellargear.royal_airlines.Utils.MoneyExchange;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SeatService seatService;
    private final FlightService flightService;
    private final FeeService feeService;
    private final MoneyExchange moneyExchange;
    private final TravelService travelService;

    @Transactional(propagation = Propagation.REQUIRED)
    public ResponseEntity<?> bookFlight (BookingDTO bookingInfo) {
        Booking nwe = new Booking();

        nwe.setBookedTravelID(bookingInfo.getTravelID());
        nwe.setUserID(bookingInfo.getUserID());
        nwe.setBookedSeatIDs(bookingInfo.getSeatIDs());
        nwe.setTicketCount(bookingInfo.getSeatIDs().size());
        nwe.setSelectedFee(bookingInfo.getFeeID());
        nwe.setTotalPrice(calculateTotalPrice(travelService.getFlightFromTravel(bookingInfo.getTravelID()), bookingInfo.getSeatIDs(), bookingInfo.getFeeID()));
        nwe.setStatus("Pending");

        bookingRepository.save(nwe);

        GlobalLogger.getLogger().info("Flight successfully booked!");
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    public double calculateTotalPrice (String flight, List<String> seats, String fee) {
        Flight requestedFlight = flightService.searchFlight(flight);
        List<Seat> requestedSeats = seatService.searchForListOfIDs(seats);
        Fee requestedFee = feeService.searchByID(fee);
        int ticketQuantity = seats.size();
        double totalSeatPrice = 0;

        for (Seat requestedSeat : requestedSeats) {
            totalSeatPrice += requestedSeat.getSeatPrice();
        }

        double totalPrice = ( ( requestedFlight.getTicketPrice() * requestedFee.getPriceDifference() ) * ticketQuantity ) + totalSeatPrice;
        BigDecimal bigDecimalTotal = new BigDecimal(totalPrice).setScale(2, RoundingMode.HALF_UP);

        return bigDecimalTotal.doubleValue();
    }

    public BookingDTO searchAndReturnBookingInfo (String requestedID) {
        return objectToDto(searchByID(requestedID));
    }

    public Booking searchByID (String requestedID) {
        return bookingRepository.searchByID(requestedID);
    }

    public BookingDTO objectToDto (Booking requestedObject) {
        BookingDTO returnedDTO = new BookingDTO();

        returnedDTO.setBookingID(requestedObject.getBookingID());
        returnedDTO.setBookedTravelID(travelService.searchAndConvertObject(requestedObject.getBookedTravelID()));
        returnedDTO.setBookedSeatIDs(seatService.searchAndConvertList(requestedObject.getBookedSeatIDs()));
        returnedDTO.setTicketCount(requestedObject.getTicketCount());
        returnedDTO.setTotalPrice(moneyExchange.convertUSDtoCOP(requestedObject.getTotalPrice()));
        returnedDTO.setUserID(requestedObject.getUserID());
        returnedDTO.setSelectedFee(feeService.searchAndConvertObject(requestedObject.getSelectedFee()));

        return returnedDTO;
    }
}
