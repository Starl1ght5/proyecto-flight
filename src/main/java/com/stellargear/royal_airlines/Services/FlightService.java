package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.DTOs.FlightDTO;
import com.stellargear.royal_airlines.Models.Entities.Flight;
import com.stellargear.royal_airlines.Repositories.FlightRepository;
import com.stellargear.royal_airlines.Utils.MoneyExchange;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
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
    private final static Logger logger = LoggerFactory.getLogger(FlightService.class);


    @Transactional(propagation = Propagation.REQUIRED)
    public ResponseEntity<?> addNewFlight(String airlineName, double price, String departureID, String arrivalID, String flightNumber) {
        Flight newFlight = new Flight();

        newFlight.setAirline(airlineName);
        newFlight.setTicketPrice(price);
        newFlight.setFlightNumber(flightNumber);
        newFlight.setDepartureLocationID(departureID);
        newFlight.setArrivalLocationID(arrivalID);
        newFlight.setDepartureDate(LocalDateTime.now());
        newFlight.setArrivalDate(LocalDateTime.now().plusHours(2));
        newFlight.setAvailableSeatIDs(seatService.generateSeats());
        newFlight.setAvailableFeeIDs(feeService.getFees());
        newFlight.setStatus("Active");

        flightRepository.save(newFlight);

        logger.info("Flight successfully created!, id: {}", newFlight.getFlightID());
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


    public String calculateTimeDifference(LocalDateTime start, LocalDateTime finish) {
        Duration timeBetween = Duration.between(start, finish);

        long hours = timeBetween.toHours() % 24;
        long minutes = timeBetween.toMinutes() % 60;

        return  hours + "h " + minutes + "m";
    }


    /// Search Methods
    public double searchCheapestFromFlight (String locationForFlight) {
        List<Flight> flightsToSearch = flightRepository.searchFlightsForLocation(locationForFlight);
        return searchCheapestFromList(flightsToSearch).getTicketPrice();
    }


    public Flight searchCheapestFromList (List<Flight> listToSearch) {
        return listToSearch.stream()
                .min(Comparator.comparingDouble(Flight::getTicketPrice))
                .orElseThrow(NoSuchElementException::new);
    }


    public Flight searchFlightByID (String requestedID) {
        return flightRepository.searchByID(requestedID);
    }


    public List<Flight> searchFlightsForLocation (String locationID) {
        return flightRepository.searchFlightsForLocation(locationID);
    }


    public FlightDTO searchAndConvertObject (String requestedID) {
        return objectToDto(searchFlightByID(requestedID));
    }


    /// Conversion Methods
    public FlightDTO objectToDto (Flight requestedObject) {
        FlightDTO returnedDto = new FlightDTO();

        returnedDto.setFlightID(requestedObject.getFlightID());
        returnedDto.setAirline(requestedObject.getAirline());
        returnedDto.setTicketPrice(moneyExchange.convertUSDtoCOP(requestedObject.getTicketPrice()));
        returnedDto.setArrivalDate(requestedObject.getArrivalDate());
        returnedDto.setFlightNumber(requestedObject.getFlightNumber());
        returnedDto.setDepartureDate(requestedObject.getDepartureDate());
        returnedDto.setDepartureLocation(locationService.findAndConvertObject(requestedObject.getDepartureLocationID()));
        returnedDto.setArrivalLocation(locationService.findAndConvertObject(requestedObject.getArrivalLocationID()));
        returnedDto.setAvailableFees(feeService.searchAndConvertList(requestedObject.getAvailableFeeIDs(), requestedObject.getTicketPrice()));
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
