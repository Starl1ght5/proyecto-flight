package com.stellargear.royal_airlines.Controllers;

import com.stellargear.royal_airlines.Services.FlightService;
import com.stellargear.royal_airlines.Services.InformationService;
import com.stellargear.royal_airlines.Utils.MoneyExchange;
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
    private final MoneyExchange moneyExchange;

    @PostMapping(path = "/debug/create")
    public ResponseEntity<?> createNewFlight (@RequestParam String airline, @RequestParam String price, @RequestParam String depID, @RequestParam String arrID ) {
        double convPrice = (double) Integer.parseInt(price);
        return flightService.addNewFlight(airline, convPrice, depID, arrID);
    }

    @GetMapping(path = "/search")
    public ResponseEntity<?> searchFlights (@RequestParam String origin, @RequestParam String destination, @RequestParam String departure) {
        return informationService.searchFlights(origin, destination, departure);
    }

    @GetMapping(path = "/seats/search")
    public ResponseEntity<?>  searchSeats (@RequestParam String flightID) {
        return informationService.getSeatsForFlight(flightID);
    }

}
