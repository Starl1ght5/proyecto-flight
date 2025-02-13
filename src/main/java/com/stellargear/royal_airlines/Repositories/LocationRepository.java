package com.stellargear.royal_airlines.Repositories;

import com.stellargear.royal_airlines.Models.Entities.Location;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface LocationRepository extends MongoRepository<Location, String> {

    @Query("{ 'locationID' : ?0 }")
    Location searchByID(String locationID);

    @Query("{ 'cityName' : ?0, 'airport': ?1, 'iataCode': ?2 }")
    Location checkForExistingLocation(String city, String airport, String iataCode);
}
