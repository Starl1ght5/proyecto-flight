package com.stellargear.royal_airlines.Controllers;

import com.stellargear.royal_airlines.Models.DTOs.BookingDTO;
import com.stellargear.royal_airlines.Services.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class BookingController {

    private final BookingService bookingService;

    @PostMapping(path = "/api/booking/new")
    public ResponseEntity<?> bookNewFlight (@RequestBody BookingDTO bookingDTO) {
        return bookingService.bookFlight(bookingDTO);
    }

    @GetMapping(path = "/api/booking/get")
    public BookingDTO getBookingInfo (@RequestParam String bookingID) {
        return bookingService.searchAndReturnBookingInfo(bookingID);
    }
}
