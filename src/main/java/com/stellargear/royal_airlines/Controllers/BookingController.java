package com.stellargear.royal_airlines.Controllers;

import com.stellargear.royal_airlines.Models.DTOs.BookingDTO;
import com.stellargear.royal_airlines.Services.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping( path = "/api/v1/booking" )
public class BookingController {

    private final BookingService bookingService;


    @PostMapping( path = "/create")
    public ResponseEntity<?> bookNewFlight (@RequestBody BookingDTO bookingDTO) {
        return bookingService.bookFlight(bookingDTO);
    }


    @GetMapping( path = "/{id}" )
    public BookingDTO getBookingInfo (@PathVariable String id) {
        return bookingService.searchAndReturnObject(id);
    }


    @PatchMapping( path = "/confirm" )
    public ResponseEntity<?> confirmBooking (@RequestParam String id) {
        return bookingService.confirmBooking(id);
    }


    @PatchMapping( path = "/cancel" )
    public ResponseEntity<?> cancelBooking (@RequestParam String id) {
        return bookingService.cancelBooking(id);
    }

}
