package com.stellargear.royal_airlines.Repositories;

import com.stellargear.royal_airlines.Models.Entities.Location;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface LocationRepository extends MongoRepository<Location, String> {

    Location findByLocationID(String locationID);
    Location findByIataCode(String iataCode);
    Location findByCityName(String cityName);
    Page<Location> findBySecretFalse(Pageable pageable);
    Page<Location> findBySecretFalseAndFeaturedTrue(Pageable pageable);

    @Query("{ 'cityName' : ?0, 'airport': ?1, 'iataCode': ?2 }")
    Location checkForExistingLocation(String city, String airport, String iataCode);
}
