package com.stellargear.royal_airlines.Repositories;

import com.stellargear.royal_airlines.Models.Entities.Location;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LocationRepository extends MongoRepository<Location, String> {
}
