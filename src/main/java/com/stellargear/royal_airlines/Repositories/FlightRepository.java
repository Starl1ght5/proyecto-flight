package com.stellargear.royal_airlines.Repositories;

import com.stellargear.royal_airlines.Models.Entities.Flight;
<<<<<<< HEAD
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FlightRepository extends MongoRepository<Flight, String> {
=======
import com.stellargear.royal_airlines.Models.Entities.Location;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface FlightRepository extends MongoRepository<Flight, String> {

    @Query("{ 'departureLocation' : ?0, 'arrivalLocation' : ?1, 'departureDate' : { '$gte' : ?2, '$lt' : ?3 } }")
    List<Flight> searchFlights (Location departure, Location arrival, LocalDateTime startDate, LocalDateTime finishDate);
>>>>>>> dde430b (More work)
}
