package com.stellargear.royal_airlines.Repositories;

import com.stellargear.royal_airlines.Models.Entities.Flight;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FlightRepository extends MongoRepository<String, Flight> {
}
