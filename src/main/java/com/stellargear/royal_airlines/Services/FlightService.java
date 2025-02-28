package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.DTOs.FlightDTO;
import com.stellargear.royal_airlines.Models.DTOs.LocationDTO;
import com.stellargear.royal_airlines.Models.Entities.Flight;
import com.stellargear.royal_airlines.Models.Entities.Location;
import com.stellargear.royal_airlines.Repositories.FlightRepository;
import com.stellargear.royal_airlines.Utils.GlobalLogger;
import com.stellargear.royal_airlines.Utils.MoneyExchange;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class FlightService {

    private final FlightRepository flightRepository;
    private final LocationService locationService;
    private final SeatService seatService;
    private final MoneyExchange moneyExchange;
    private final FeeService feeService;


    @Transactional(propagation = Propagation.REQUIRED)
    public ResponseEntity<?> addNewFlight(String airlineName, double price, String departureID, String arrivalID) {
        Flight newFlight = new Flight();
        newFlight.setAirline(airlineName);
        newFlight.setTicketPrice(price);
        newFlight.setDepartureLocation(locationService.searchByID(departureID));
        newFlight.setArrivalLocation(locationService.searchByID(arrivalID));
        newFlight.setDepartureDate(LocalDateTime.now());
        newFlight.setArrivalDate(LocalDateTime.now().plusHours(2));
        newFlight.setAvailableSeats(seatService.generateSeats());
        newFlight.setAvailableFees(feeService.getFees());

        flightRepository.save(newFlight);

        GlobalLogger.getLogger().info("Flight successfully created!, id: {}", newFlight.getFlightID());
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    public List<FlightDTO> searchFlights (String departureIataCode, String arrivalIataCode, String date) {
        LocalDate convertedDate = LocalDate.parse(date);

        LocalDateTime startOfDay = convertedDate.atStartOfDay();
        LocalDateTime endOfDay = convertedDate.atTime(23, 59, 59, 999999999);

        Location start = locationService.searchByIataCode(departureIataCode);
        Location end = locationService.searchByIataCode(arrivalIataCode);

        return objectListToDto(flightRepository.searchFlights(start, end, startOfDay, endOfDay));
    }

    public String calculateTimeDifference(LocalDateTime start, LocalDateTime finish) {
        Duration timeBetween = Duration.between(start, finish);

        long hours = timeBetween.toHours() % 24;
        long minutes = timeBetween.toMinutes() % 60;

        return  hours + "h " + minutes + "m";
    }

    public List<LocationDTO> getLocationsWithCheapestPrice (int nOfLocations) {
        List<Location> locationsToSearch = locationService.searchXLocations(nOfLocations);
        List<LocationDTO> returnedList = new ArrayList<>();

        for (Location toSearch : locationsToSearch) {
            List<Flight> flightsToSearch = flightRepository.searchFlightsForLocation(toSearch.getLocationID());

            if (!flightsToSearch.isEmpty()) {
                Flight cheapestFlightForLocation = calculateCheapest(flightsToSearch);

                Location locationInfo = cheapestFlightForLocation.getArrivalLocation();
                LocationDTO returnedInfo = locationService.objectToDto(locationInfo);
                returnedInfo.setCheapestPrice(moneyExchange.convertUSDtoCOP(cheapestFlightForLocation.getTicketPrice()));

                returnedList.add(returnedInfo);

            } else {
                GlobalLogger.getLogger().error("No flights were found for location: {}", toSearch.getCityName());
            }

        }

        return returnedList;
    }

    public Flight calculateCheapest (List<Flight> listToSearch) {
        return listToSearch.stream()
                .min(Comparator.comparingDouble(Flight::getTicketPrice))
                .orElseThrow(NoSuchElementException::new);
    }

    public FlightDTO objectToDto (Flight requestedObject) {
        FlightDTO returnedDto = new FlightDTO();

        returnedDto.setFlightID(requestedObject.getFlightID());
        returnedDto.setAirline(requestedObject.getAirline());
        returnedDto.setTicketPrice(moneyExchange.convertUSDtoCOP(requestedObject.getTicketPrice()));
        returnedDto.setArrivalDate(requestedObject.getArrivalDate());
        returnedDto.setDepartureDate(requestedObject.getDepartureDate());
        returnedDto.setDepartureLocation(locationService.objectToDto(requestedObject.getDepartureLocation()));
        returnedDto.setArrivalLocation(locationService.objectToDto(requestedObject.getArrivalLocation()));
        returnedDto.setAvailableSeats(seatService.objectListToDto(requestedObject.getAvailableSeats()));
        returnedDto.setAvailableFees(feeService.objectListToDto(requestedObject.getAvailableFees(), requestedObject.getTicketPrice()));
        returnedDto.setDuration(calculateTimeDifference(requestedObject.getDepartureDate(), requestedObject.getArrivalDate()));

        return returnedDto;
    }

    public List<FlightDTO> objectListToDto (List<Flight> requestedList) {
        List<FlightDTO> returnedList = new ArrayList<>();

        for (Flight flight : requestedList) {
            returnedList.add(objectToDto(flight));
        }

        return returnedList;
    }

}
