package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.DTOs.FlightDTO;
import com.stellargear.royal_airlines.Models.DTOs.LocationDTO;
import com.stellargear.royal_airlines.Models.DTOs.SeatDTO;
import com.stellargear.royal_airlines.Models.Entities.Flight;
import com.stellargear.royal_airlines.Models.Entities.Location;
import com.stellargear.royal_airlines.Models.Entities.Recommendation;
import com.stellargear.royal_airlines.Utils.MoneyExchange;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
    private final static Logger logger = LoggerFactory.getLogger(InformationService.class);


    public List<FlightDTO> searchFlights (String departureIataCode, String arrivalIataCode, String date) {
        LocalDate convertedDate = LocalDate.parse(date);

        LocalDateTime startOfDay = convertedDate.atStartOfDay();
        LocalDateTime endOfDay = convertedDate.atTime(23, 59, 59, 999999999);

        String start = locationService.searchByIataCode(departureIataCode);
        String end = locationService.searchByIataCode(arrivalIataCode);

        return flightService.objectListToDto(flightService.searchFlights(start, end, startOfDay, endOfDay));
    }

    public List<LocationDTO> searchXLocations (int number) {
        List<Location> locations = locationService.searchAll();
        List<Location> returnedList = new ArrayList<>();
        Random numberPicker = new Random();

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
        return locationService.objectListToDto(returnedList);
    }

    public List<LocationDTO> searchXLocationsWithRecommended (int number, String userID) {
        List<Location> locations = locationService.searchAll();
        List<LocationDTO> recommendedLocations = searchRecommendedForUser(userID);
        List<LocationDTO> returnedList = new ArrayList<>();
        Random numberPicker = new Random();

        for (LocationDTO recommendedLocation : recommendedLocations) {
            if (returnedList.size() < number / 2) {
                returnedList.add(recommendedLocation);
            } else {
                break;
            }
        }

        for (Location location : locations) {
            if (location.isFeatured()) {
                if (returnedList.size() < number) {
                    if (!returnedList.contains(locationService.objectToDto(location))) {
                        returnedList.add(locationService.objectToDto(location));
                    }
                } else {
                    break;
                }
            }
        }

        if (returnedList.size() < number) {
            int missingEntries = number - returnedList.size();

            for (int i = 0; i < missingEntries; i++) {
                LocationDTO newEntry = locationService.objectToDto(locations.remove(numberPicker.nextInt(1, locations.size() - 1)));

                if (!returnedList.contains(newEntry)) {
                    returnedList.add(newEntry);
                }
            }
        }
        return returnedList;
    }

    public List<LocationDTO> searchRecommendedForUser (String userID) {
        List<Recommendation> recommendations = recommendationService.searchRecommendationForUser(userID);
        List<LocationDTO> locationsForUser = new ArrayList<>();

        for (Recommendation recommendation : recommendations) {
            LocationDTO returned = locationService.findAndConvertObject(recommendation.getLocationID());
            returned.setRecommended(true);
            locationsForUser.add(returned);
        }

        return locationsForUser;
    }

    public List<LocationDTO> searchLocationsWithCheapestPrice (int nOfLocations) {
        List<LocationDTO> locationsToSearch = searchXLocations(nOfLocations);
        List<LocationDTO> returnedList = new ArrayList<>();

        for (LocationDTO toSearch : locationsToSearch) {
            List<Flight> flightsToSearch = flightService.searchFlightsForLocation(toSearch.getLocationID());

            if (!flightsToSearch.isEmpty()) {
                Flight cheapestFlightForLocation = flightService.calculateCheapest(flightsToSearch);

                Location locationInfo = locationService.searchByID(cheapestFlightForLocation.getArrivalLocationID());
                LocationDTO returnedInfo = locationService.objectToDto(locationInfo);
                returnedInfo.setCheapestPrice(moneyExchange.convertUSDtoCOP(cheapestFlightForLocation.getTicketPrice()));

                returnedList.add(returnedInfo);

            } else {
                logger.error("No flights were found for location: {}", toSearch.getCityName());
            }

        }

        return returnedList;
    }

    public List<LocationDTO> searchLocationsWithCheapestPriceAndRecommended (int nOfLocations, String userID) {
        List<LocationDTO> locationsToSearch = searchXLocationsWithRecommended(nOfLocations, userID);
        List<LocationDTO> returnedList = new ArrayList<>();

        for (LocationDTO toSearch : locationsToSearch) {
            List<Flight> flightsToSearch = flightService.searchFlightsForLocation(toSearch.getLocationID());

            if (!flightsToSearch.isEmpty()) {
                Flight cheapestFlightForLocation = flightService.calculateCheapest(flightsToSearch);

                Location locationInfo = locationService.searchByID(cheapestFlightForLocation.getArrivalLocationID());
                LocationDTO returnedInfo = locationService.objectToDto(locationInfo);
                returnedInfo.setCheapestPrice(moneyExchange.convertUSDtoCOP(cheapestFlightForLocation.getTicketPrice()));

                returnedList.add(returnedInfo);

            } else {
                logger.error("No flights were found for location: {}", toSearch.getCityName());
            }

        }

        return returnedList;
    }

    public List<SeatDTO> getSeatsForFlight (String flightID) {
        Flight searchedFlight = flightService.searchFlight(flightID);

        return seatService.searchAndConvertList(searchedFlight.getAvailableSeatIDs());
    }

}
