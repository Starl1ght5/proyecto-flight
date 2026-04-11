package com.stellargear.royal_airlines.Controllers;

import com.stellargear.royal_airlines.Models.DTOs.LocationDTO;
import com.stellargear.royal_airlines.Services.InformationService;
import com.stellargear.royal_airlines.Services.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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


    @GetMapping(path = "/")
    public ResponseEntity<?> searchLocations (@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "false") String featured) {
        if (featured.equals("true")) {
            return new ResponseEntity<>(locationService.getFeaturedLocations(page, size), HttpStatus.OK);
        }
        return new ResponseEntity<>(locationService.getLocations(page, size), HttpStatus.OK);
    }
}
