package com.stellargear.royal_airlines.Models.Utils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document (collection = "ModelData")
public class ModelData {

    @Id
    private String id;
    private double price;
    private double temperature;
    private double popularity;
    private int beach;
    private int mountain;
    private int jungle;
    private int desert;
    private int historic;
    private int cultural;
    private int gastronomic;
    private int night_life;
    private int eco_tourism;
    private int adventure;

    private String userID;
    private String result;

    public ModelData () {}

}
