package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.DTOs.FlightDTO;
import com.stellargear.royal_airlines.Models.Entities.Flight;
import com.stellargear.royal_airlines.Models.Entities.Location;
import com.stellargear.royal_airlines.Utils.MoneyExchange;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class InformationService {

    private final LocationService locationService;
    private final FlightService flightService;
    private final SeatService seatService;
    private final MoneyExchange moneyExchange;
    private final static Logger logger = LoggerFactory.getLogger(InformationService.class);


    /// FlightService Methods
    public ResponseEntity<?> searchFlights (String arrivalIataCode) {
        logger.info("Flight search request started!");

        String end = locationService.searchByIataCode(arrivalIataCode);
        logger.info("Locations found successfully");

        List<FlightDTO> returnedList = flightService.objectListToDto(flightService.searchFlightsForLocation(end));

        if (returnedList.isEmpty()) {
            logger.warn("List returned Empty");
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);

        } else {
            logger.info("Flights searched completed");
            return new ResponseEntity<>(returnedList, HttpStatus.OK);
        }

    }

    ///  SeatService Methods
    public ResponseEntity<?> getSeatsForFlight (String flightID) {
        Flight searchedFlight = flightService.searchFlightByID(flightID);

        return new ResponseEntity<>(seatService.searchAndConvertList(searchedFlight.getAvailableSeatIDs()), HttpStatus.OK);
    }

}
