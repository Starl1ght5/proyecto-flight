package com.stellargear.royal_airlines.Controllers;

import com.stellargear.royal_airlines.Services.FlightService;
import com.stellargear.royal_airlines.Services.InformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping(path = "/api/v1/flights")
public class FlightController {

    private final InformationService informationService;
    private final FlightService flightService;


    @PostMapping(path = "/debug/create")
    public ResponseEntity<?> createNewFlight (@RequestParam String airline, @RequestParam String price, @RequestParam String depID, @RequestParam String arrID, @RequestParam String flightNum ) {
        double convPrice = (double) Integer.parseInt(price);
        return flightService.addNewFlight(airline, convPrice, depID, arrID, flightNum);
    }


    @GetMapping(path = "/search")
    public ResponseEntity<?> searchFlights (@RequestParam String destination) {
        return informationService.searchFlights(destination);
    }


    @GetMapping(path = "/seats/search")
    public ResponseEntity<?>  searchSeats (@RequestParam String flightID) {
        return informationService.getSeatsForFlight(flightID);
    }

}
