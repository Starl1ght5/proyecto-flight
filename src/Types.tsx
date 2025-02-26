
export interface Flight {
    flight: FlightInfo;
    returnInfo: (flight: ReservedFlight) => void;
}

export interface ReservedFlight {
    flight: FlightInfo;
    fee: Fee;
}


export interface Money {
    currency: Currency;
    amount: string;
}

export interface Currency {
    code: string;
    numericCode: number;
    decimalPlaces: number;
}

export interface Seat {
    seatID: string;
    seatNumber: string;
    seatPrice: Money;
    reserved: boolean;
}

export interface FlightInfo {
    flightID: string;
    airline: string;
    ticketPrice: Money;
    duration: string;
    arrivalLocation: Location;
    departureLocation: Location;
    arrivalDate: Array<number>;
    departureDate: Array<number>;
    seatList: Array<Seat>;
    availableFees: Array<Fee>;
}

export interface Location {
    locationID: string;
    cityName: string;
    countryName: string;
    iataCode: string;
    airportName: string;
}

export interface Fee {
    feeID: string;
    feeName: string;
    priceDifference: number;
    price: Money;
}