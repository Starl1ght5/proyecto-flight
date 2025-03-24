package com.stellargear.royal_airlines.Repositories;

import com.stellargear.royal_airlines.Models.Entities.TravelInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface TravelInformationRepository extends MongoRepository<TravelInfo, String> {

    @Query("{ 'tripInfoID' : ?0 }")
    TravelInfo searchByID(String requestedID);
}
