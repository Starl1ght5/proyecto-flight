package com.stellargear.royal_airlines.Repositories;

import com.stellargear.royal_airlines.Models.Entities.Fee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface FeeRepository extends MongoRepository<Fee, String> {

    @Query("{ 'feeID' : ?0 }")
    Fee searchByID (String requestedID);
}
