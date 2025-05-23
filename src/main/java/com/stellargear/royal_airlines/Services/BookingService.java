package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.DTOs.BookingDTO;
import com.stellargear.royal_airlines.Models.Entities.*;
import com.stellargear.royal_airlines.Repositories.BookingRepository;
import com.stellargear.royal_airlines.Utils.MoneyExchange;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SeatService seatService;
    private final FlightService flightService;
    private final FeeService feeService;
    private final MoneyExchange moneyExchange;
    private final BoardingPassService boardingPassService;
    private final static Logger logger = LoggerFactory.getLogger(BookingService.class);


    @Transactional(propagation = Propagation.REQUIRED)
    public ResponseEntity<?> bookFlight (BookingDTO bookingInfo) {
        Booking newBooking = new Booking();
        Flight flightInfo = flightService.searchFlightByID(bookingInfo.getFlightID());

        newBooking.setBookedFlightID(bookingInfo.getFlightID());
        newBooking.setUserID(bookingInfo.getUserID());
        newBooking.setBookedSeatIDs(bookingInfo.getSeatIDs());
        newBooking.setTicketCount(bookingInfo.getSeatIDs().size());
        newBooking.setSelectedFee(bookingInfo.getFeeID());
        newBooking.setBookingDate(LocalDateTime.now());
        newBooking.setTotalPrice(calculateTotalPrice(flightInfo.getFlightID(), bookingInfo.getSeatIDs(), bookingInfo.getFeeID()));
        newBooking.setStatus("Pending");

        bookingRepository.save(newBooking);

        logger.info("Flight successfully booked!, id: {}", newBooking.getBookingID());
        return new ResponseEntity<>(newBooking.getBookingID(), HttpStatus.CREATED);
    }


    @Transactional(propagation = Propagation.REQUIRED)
    public ResponseEntity<?> confirmBooking(String requestingBookingID) {
        Booking bookingToConfirm = bookingRepository.searchByID(requestingBookingID);

        bookingToConfirm.setStatus("Confirmed");
        bookingRepository.save(bookingToConfirm);
        seatService.updateSeats(bookingToConfirm.getBookedSeatIDs());
        searchAndSendDataToBoarding(bookingToConfirm);

        logger.info("Booking completed, id: {}", bookingToConfirm.getBookingID());
        return new ResponseEntity<>(HttpStatus.OK);
    }


    public void searchAndSendDataToBoarding (Booking dataToSend) {
        List<Seat> seats = seatService.searchForListOfIDs(dataToSend.getBookedSeatIDs());
        Flight flight = flightService.searchFlightByID(dataToSend.getBookedFlightID());
        Fee fee = feeService.searchByID(dataToSend.getSelectedFee());

        boardingPassService.createBoardingPass(dataToSend.getUserID(), seats, flight, fee);
    }


    @Transactional(propagation = Propagation.REQUIRED)
    public ResponseEntity<?> cancelBooking (String requestingBookingID) {
        Booking bookingToCancel = bookingRepository.searchByID(requestingBookingID);

        bookingToCancel.setStatus("Canceled");
        bookingRepository.save(bookingToCancel);

        logger.info("Booking canceled, id: {}", bookingToCancel.getBookingID());
        return new ResponseEntity<>(HttpStatus.OK);
    }


    public double calculateTotalPrice (String flight, List<String> seats, String fee) {
        Flight requestedFlight = flightService.searchFlightByID(flight);
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


    public BookingDTO searchAndReturnObject (String requestedID) {
        return objectToDto(searchByID(requestedID));
    }


    public Booking searchByID (String requestedID) {
        return bookingRepository.searchByID(requestedID);
    }


    public BookingDTO objectToDto (Booking requestedObject) {
        BookingDTO returnedDTO = new BookingDTO();

        returnedDTO.setBookingID(requestedObject.getBookingID());
        returnedDTO.setBookedFight(flightService.searchAndConvertObject(requestedObject.getBookedFlightID()));
        returnedDTO.setBookedSeats(seatService.searchAndConvertList(requestedObject.getBookedSeatIDs()));
        returnedDTO.setTicketCount(requestedObject.getTicketCount());
        returnedDTO.setTotalPrice(moneyExchange.convertUSDtoCOP(requestedObject.getTotalPrice()));
        returnedDTO.setUserID(requestedObject.getUserID());
        returnedDTO.setSelectedFee(feeService.searchAndConvertObject(requestedObject.getSelectedFee()));

        return returnedDTO;
    }
}
