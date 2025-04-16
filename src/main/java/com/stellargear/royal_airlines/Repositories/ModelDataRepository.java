package com.stellargear.royal_airlines.Repositories;

import com.stellargear.royal_airlines.Models.Utils.ModelData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ModelDataRepository extends MongoRepository<ModelData, String> {
}
