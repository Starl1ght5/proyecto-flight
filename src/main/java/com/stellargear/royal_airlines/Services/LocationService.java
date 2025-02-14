package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.DTOs.LocationDTO;
import com.stellargear.royal_airlines.Models.Entities.Location;
import com.stellargear.royal_airlines.Repositories.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;

    public ResponseEntity<?> addNewLocation (LocationDTO newLocationInfo) {

        boolean alreadyExists = locationAlreadyPresent(newLocationInfo);

        if (!alreadyExists) {
            Location newLocation = new Location();
            newLocation.setAirportName(newLocationInfo.getAirportName());
            newLocation.setCityName(newLocationInfo.getCityName());
            newLocation.setCountryName(newLocationInfo.getCountryName());
            newLocation.setIataCode(newLocationInfo.getIataCode());

            locationRepository.save(newLocation);

            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }

        return new ResponseEntity<>( "This airport already exists", HttpStatus.BAD_REQUEST);
    }


    public Location searchByID (String requestedID) {
        return locationRepository.searchByID(requestedID);
    }

    public Location searchByIataCode (String requestedCode) {
        return locationRepository.searchByIataCode(requestedCode);
    }

    public boolean locationAlreadyPresent (LocationDTO infoToCheck) {
        return locationRepository.checkForExistingLocation(infoToCheck.getCityName(), infoToCheck.getAirportName(), infoToCheck.getIataCode()) != null;
    }

    public LocationDTO objectToDto (Location requestedObject) {
        LocationDTO returnedDto = new LocationDTO();
        returnedDto.setLocationID(requestedObject.getLocationID());
        returnedDto.setCityName(requestedObject.getCityName());
        returnedDto.setCountryName(requestedObject.getCountryName());
        returnedDto.setIataCode(requestedObject.getIataCode());
        returnedDto.setAirportName(requestedObject.getAirportName());
        return returnedDto;
    }
}
