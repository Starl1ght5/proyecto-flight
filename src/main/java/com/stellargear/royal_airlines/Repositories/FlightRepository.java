package com.stellargear.royal_airlines.Repositories;

import com.stellargear.royal_airlines.Models.Entities.Flight;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface FlightRepository extends MongoRepository<Flight, String> {

    @Query("{ 'departureLocationID' : ?0, 'arrivalLocationID' : ?1, 'departureDate' : { '$gte' : ?2, '$lte' : ?3 } }")
    List<Flight> searchFlights (String departureID, String arrivalID, LocalDateTime startDate, LocalDateTime endDate);

    @Query("{ 'arrivalLocationID' : ?0 }")
    List<Flight> searchFlightsForLocation (String arrivalID);

    @Query("{ 'flightID' : ?0 }")
    Flight searchByID(String flightID);
}
