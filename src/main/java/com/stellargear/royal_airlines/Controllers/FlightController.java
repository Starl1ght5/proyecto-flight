package com.stellargear.royal_airlines.Controllers;

import com.stellargear.royal_airlines.Models.DTOs.FlightDTO;
import com.stellargear.royal_airlines.Models.DTOs.LocationDTO;
import com.stellargear.royal_airlines.Services.FlightService;
import com.stellargear.royal_airlines.Services.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class FlightController {

    private final FlightService flightService;
    private final LocationService locationService;


    @PostMapping(path = "/api/debug/flights/create")
    public ResponseEntity<?> createNewFlight (@RequestParam String airline, @RequestParam String price, @RequestParam String depID, @RequestParam String arrID ) {
        double convPrice = (double) Integer.parseInt(price);
        return flightService.addNewFlight(airline, convPrice, depID, arrID);
    }

    @PostMapping(path = "/api/debug/locations/create")
    public ResponseEntity<?> createNewLocation(@RequestBody LocationDTO newLocationInfo) {
        return locationService.addNewLocation(newLocationInfo);
    }

    @GetMapping(path = "/api/flights/search")
    public List<FlightDTO> searchFlights (@RequestParam String origin, @RequestParam String destination, @RequestParam String departure) {
        return flightService.searchFlights(origin, destination, departure);
    }
}
