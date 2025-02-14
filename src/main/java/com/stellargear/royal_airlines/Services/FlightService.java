package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.DTOs.FlightDTO;
import com.stellargear.royal_airlines.Models.Entities.Flight;
import com.stellargear.royal_airlines.Repositories.FlightRepository;
import lombok.RequiredArgsConstructor;
import org.joda.money.CurrencyUnit;
import org.joda.money.Money;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

<<<<<<< HEAD
import java.time.LocalDateTime;
=======
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
>>>>>>> dde430b (More work)

@Service
@RequiredArgsConstructor
public class FlightService {

    private final FlightRepository flightRepository;
    private final LocationService locationService;
    private final SeatService seatService;


    public ResponseEntity<?> addNewFlight(String airlineName, double price, String departureID, String arrivalID) {
        Flight newFlight = new Flight();
        newFlight.setAirline(airlineName);
        newFlight.setTicketPrice(Money.of(CurrencyUnit.USD, price));
        newFlight.setDepartureLocation(locationService.searchByID(departureID));
        newFlight.setArrivalLocation(locationService.searchByID(arrivalID));
        newFlight.setDepartureDate(LocalDateTime.now());
        newFlight.setArrivalDate(LocalDateTime.now().plusHours(2));
        newFlight.setAvailableSeats(seatService.generateSeats());

        flightRepository.save(newFlight);

<<<<<<< HEAD
        return new ResponseEntity<>("Flight created!" ,HttpStatus.ACCEPTED);
=======
        return new ResponseEntity<>("Flight created!", HttpStatus.ACCEPTED);
    }

    public List<FlightDTO> searchFlights (String departureIataCode, String arrivalIataCode, LocalDateTime date) {
        LocalDateTime startOfDay = date.toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = date.toLocalDate().atTime(23, 59, 59, 999999999);

        return objectListToDto(flightRepository.searchFlights(locationService.searchByIataCode(departureIataCode), locationService.searchByIataCode(arrivalIataCode), startOfDay, endOfDay));
    }

    public String calculateTimeDifference(LocalDateTime start, LocalDateTime finish) {
        Duration timeBetween = Duration.between(start, finish);

        long hours = timeBetween.toHours() % 24;
        long minutes = timeBetween.toMinutes() % 60;

        return "h" + hours + " m" + minutes;
    }

    public FlightDTO objectToDto (Flight requestedObject) {
        FlightDTO returnedDto = new FlightDTO();

        returnedDto.setFlightID(requestedObject.getFlightID());
        returnedDto.setAirline(requestedObject.getAirline());
        returnedDto.setTicketPrice(requestedObject.getTicketPrice());
        returnedDto.setArrivalDate(requestedObject.getArrivalDate());
        returnedDto.setDepartureDate(requestedObject.getDepartureDate());
        returnedDto.setDepartureLocation(locationService.objectToDto(requestedObject.getDepartureLocation()));
        returnedDto.setArrivalLocation(locationService.objectToDto(requestedObject.getArrivalLocation()));
        returnedDto.setAvailableSeats(seatService.objectListToDto(requestedObject.getAvailableSeats()));
        returnedDto.setDuration(calculateTimeDifference(requestedObject.getDepartureDate(), requestedObject.getArrivalDate()));

        return returnedDto;
    }

    public List<FlightDTO> objectListToDto (List<Flight> requestedList) {
        List<FlightDTO> returnedList = new ArrayList<>();

        for (Flight flight : requestedList) {
            returnedList.add(objectToDto(flight));
        }

        return returnedList;
>>>>>>> dde430b (More work)
    }

}
