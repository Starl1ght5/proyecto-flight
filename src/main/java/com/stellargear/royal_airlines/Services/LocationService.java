package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.DTOs.LocationDTO;
import com.stellargear.royal_airlines.Models.Entities.Location;
import com.stellargear.royal_airlines.Repositories.LocationRepository;
import com.stellargear.royal_airlines.Utils.MoneyExchange;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;
    private final MoneyExchange moneyExchange;
    private final static Logger logger = LoggerFactory.getLogger(LocationService.class);

    private static final List<String> DESTINATIONS = List.of("Cartagena", "Bogota", "Medellin", "Monteria", "Pereira", "Cali", "Barranquilla", "Narino", "Bucaramanga", "Armenia", "New York", "Chicago", "Miami", "Los Angeles", "London", "Manchester", "Edinburgh", "Cancun", "Ottawa", "Paris", "Rome", "Sidney");


    @Transactional(propagation = Propagation.REQUIRED)
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


    @Transactional(propagation = Propagation.REQUIRED)
    public void updateLocationCheapest (String locationID, double cheapest) {
        Location locationToUpdate = locationRepository.searchByID(locationID);

        if (locationToUpdate.getCheapestPrice() != cheapest) {
            locationToUpdate.setCheapestPrice(cheapest);
            locationRepository.save(locationToUpdate);
            logger.info("Updated {} cheapest!", locationToUpdate.getCityName());
        }
    }


    /// Search Methods
    public LocationDTO findAndConvertObject (String requestedID) {
        Location searchedObject = searchByID(requestedID);
        return objectToDto(searchedObject);
    }


    public Location searchByID (String requestedID) {
        return locationRepository.searchByID(requestedID);
    }


    public String searchByIataCode (String requestedCode) {
        Location returnedLocation = locationRepository.searchByIataCode(requestedCode);
        return returnedLocation.getLocationID();
    }


    public List<Location> searchAll () {
        return locationRepository.findAll();
    }


    /// Checks for existing location
    public boolean locationAlreadyPresent (LocationDTO infoToCheck) {
        return locationRepository.checkForExistingLocation(infoToCheck.getCityName(), infoToCheck.getAirportName(), infoToCheck.getIataCode()) != null;
    }


    /// Conversion Methods
    public List<LocationDTO> objectListToDto (List<Location> listToConvert) {
        List<LocationDTO> returnedList = new ArrayList<>();

        for (Location location : listToConvert) {
            returnedList.add(objectToDto(location));
        }

        return returnedList;
    }


    public LocationDTO objectToDto (Location requestedObject) {
        LocationDTO returnedDto = new LocationDTO();
        returnedDto.setLocationID(requestedObject.getLocationID());
        returnedDto.setCityName(requestedObject.getCityName());
        returnedDto.setCountryName(requestedObject.getCountryName());
        returnedDto.setIataCode(requestedObject.getIataCode());
        returnedDto.setAirportName(requestedObject.getAirportName());
        returnedDto.setFeatured(requestedObject.isFeatured());
        returnedDto.setCheapestPrice(moneyExchange.convertUSDtoCOP(requestedObject.getCheapestPrice()));

        return returnedDto;
    }


    /// Searches locations based on the DESTINATIONS list
    public String searchDestination (String cityName) {
        String destinationToSearch = "";

        for (String destination : DESTINATIONS) {
            if (cityName.equals("Narino")) {
                destinationToSearch = "Nariño";
                break;

            } else {
                if (destination.equals(cityName)) {
                    destinationToSearch = destination;
                    break;
                }
            }
        }

        Location searchedLocation = locationRepository.searchByCityName(cityName);
        return searchedLocation.getLocationID();
    }
}
