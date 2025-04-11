package com.stellargear.royal_airlines.Controllers;

import com.stellargear.royal_airlines.Models.DTOs.FlightDTO;
import com.stellargear.royal_airlines.Models.DTOs.LocationDTO;
import com.stellargear.royal_airlines.Models.DTOs.SeatDTO;
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


    @PostMapping(path = "/api/v1/debug/flights/create")
    public ResponseEntity<?> createNewFlight (@RequestParam String airline, @RequestParam String price, @RequestParam String depID, @RequestParam String arrID ) {
        double convPrice = (double) Integer.parseInt(price);
        return flightService.addNewFlight(airline, convPrice, depID, arrID);
    }

    @PostMapping(path = "/api/v1/debug/locations/create")
    public ResponseEntity<?> createNewLocation(@RequestBody LocationDTO newLocationInfo) {
        return locationService.addNewLocation(newLocationInfo);
    }

    @GetMapping(path = "/api/v1/flights/search")
    public List<FlightDTO> searchFlights (@RequestParam String origin, @RequestParam String destination, @RequestParam String departure) {
        return flightService.searchFlights(origin, destination, departure);
    }

    @GetMapping(path = "/api/v1/locations/search")
    public List<LocationDTO> searchLocations (@RequestParam String number) {
        int n = Integer.parseInt(number);
        return flightService.getLocationsWithCheapestPrice(n);
    }

    @GetMapping(path = "/api/v1/seats/search")
    public List<SeatDTO> searchSeats (@RequestParam String flightID) {
        return flightService.getSeatsForFlight(flightID);
    }
}
