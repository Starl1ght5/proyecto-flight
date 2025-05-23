package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.DTOs.FlightDTO;
import com.stellargear.royal_airlines.Models.DTOs.LocationDTO;
import com.stellargear.royal_airlines.Models.DTOs.ModelDataDTO;
import com.stellargear.royal_airlines.Models.Entities.Flight;
import com.stellargear.royal_airlines.Models.Entities.Location;
import com.stellargear.royal_airlines.Models.Entities.Recommendation;
import com.stellargear.royal_airlines.Models.Utils.ModelData;
import com.stellargear.royal_airlines.Utils.ClassifierUtils;
import com.stellargear.royal_airlines.Utils.MoneyExchange;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class InformationService {

    private final LocationService locationService;
    private final FlightService flightService;
    private final SeatService seatService;
    private final RecommendationService recommendationService;
    private final MoneyExchange moneyExchange;
    private final ClassifierUtils classifierUtils;
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


    public ResponseEntity<?> searchXLocations (int number) {
        List<Location> locations = locationService.searchAll();
        List<Location> returnedList = new ArrayList<>();
        Random numberPicker = new Random();

        locations.removeIf(location -> location.getLocationID().equals("67f5e9480977642481ce25e5"));

        for (Location location : locations) {

            if (location.isFeatured()) {
                if (returnedList.size() < number) {
                    returnedList.add(location);
                } else {
                    break;
                }
            }
        }

        if (returnedList.size() < number) {
            int missingEntries = number - returnedList.size();

            for (int i = 0; i < missingEntries; i++) {
                Location newEntry = locations.remove(numberPicker.nextInt(1, locations.size() - 1));

                if (!returnedList.contains(newEntry)) {
                    returnedList.add(newEntry);
                }
            }
        }
        return new ResponseEntity<>(locationService.objectListToDto(returnedList), HttpStatus.OK);
    }


    /// RecommendationService Methods
    public ResponseEntity<?> searchAndRecommend (ModelDataDTO requestingData) throws Exception {
        double usdValue = moneyExchange.getAmountFromMoney(requestingData.getPrice());
        requestingData.setPrice(usdValue);

        List<LocationDTO> locations = new ArrayList<>();

        ModelData data = classifierUtils.dtoToObject(requestingData);
        Recommendation recommendationData = recommendationService.recommendDestination(data, "");

        for (int i = 0; i < recommendationData.getLocationIDs().size(); i++) {

            LocationDTO recommended = locationService.findAndConvertObject(recommendationData.getLocationIDs().get(i));
            recommended.setRecommended(true);
            locations.add(recommended);
        }

        return new ResponseEntity<>(locations, HttpStatus.OK);
    }


    ///  SeatService Methods
    public ResponseEntity<?> getSeatsForFlight (String flightID) {
        Flight searchedFlight = flightService.searchFlightByID(flightID);

        return new ResponseEntity<>(seatService.searchAndConvertList(searchedFlight.getAvailableSeatIDs()), HttpStatus.OK);
    }

}
