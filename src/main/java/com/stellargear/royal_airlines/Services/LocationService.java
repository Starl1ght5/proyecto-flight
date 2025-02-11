package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.DTOs.LocationDTO;
import com.stellargear.royal_airlines.Models.Entities.Location;
import com.stellargear.royal_airlines.Repositories.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;


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
