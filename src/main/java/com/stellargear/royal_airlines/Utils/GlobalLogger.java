package com.stellargear.royal_airlines.Utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GlobalLogger {

    private static final Logger LOGGER = LoggerFactory.getLogger("Logger");

    private GlobalLogger () {}

    public static Logger getLogger () {
        return LOGGER;
    }
}
