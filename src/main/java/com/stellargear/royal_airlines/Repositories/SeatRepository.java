package com.stellargear.royal_airlines.Repositories;

import com.stellargear.royal_airlines.Models.Entities.Seat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface SeatRepository extends MongoRepository<Seat, String> {

    @Query("{ 'seatID' : ?0 }")
    Seat searchByID (String requestedID);
}
