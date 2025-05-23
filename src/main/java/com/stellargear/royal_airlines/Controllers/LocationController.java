package com.stellargear.royal_airlines.Controllers;

import com.stellargear.royal_airlines.Models.DTOs.LocationDTO;
import com.stellargear.royal_airlines.Services.InformationService;
import com.stellargear.royal_airlines.Services.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/locations")
public class LocationController {

    private final InformationService informationService;
    private final LocationService locationService;


    @PostMapping(path = "/debug/create")
    public ResponseEntity<?> createNewLocation(@RequestBody LocationDTO newLocationInfo) {
        return locationService.addNewLocation(newLocationInfo);
    }


    @GetMapping(path = "/search")
    public ResponseEntity<?> searchLocations (@RequestParam String number) {
        int n = Integer.parseInt(number);
        return informationService.searchXLocations(n);
    }
}
