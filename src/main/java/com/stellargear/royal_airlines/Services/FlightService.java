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

import java.time.LocalDateTime;

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

        return new ResponseEntity<>("Flight created!" ,HttpStatus.ACCEPTED);
    }

}
