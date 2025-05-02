package com.stellargear.royal_airlines.Models.DTOs;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ModelDataDTO {

    private String id;
    private double price;
    private int temperature;
    private int popularity;
    private boolean beach;
    private boolean mountain;
    private boolean jungle;
    private boolean desert;
    private boolean historic;
    private boolean cultural;
    private boolean gastronomic;
    private boolean night_life;
    private boolean eco_tourism;
    private boolean adventure;

    private String userID;
    private String result;

    public ModelDataDTO () {}

}
