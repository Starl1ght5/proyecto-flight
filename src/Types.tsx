export const ImagePaths = new Map<string, string>([
    [ "miami", "/src/assets/miami.jpeg" ],
    [ "bogota", "/src/assets/bogota.jpg" ],
    [ "cali", "/src/assets/cali.jpg" ],
    [ "monteria", "/src/assets/monteria.jpg" ],
    [ "nueva york", "/src/assets/nuevayork.jpg" ],
    [ "paris", "/src/assets/paris.jpg" ],
    [ "pasto", "/src/assets/pasto.jpg" ],
    [ "pereira", "/src/assets/pereira.jpg" ],
    [ "armenia", "/src/assets/armenia.jpg" ],
    [ "londres", "/src/assets/londres.png" ],
    [ "sidney", "/src/assets/sidney.jpg" ],
    [ "tokyo", "/src/assets/tokyo.webp" ],
    [ "medellin", "/src/assets/medellin.jpg" ]
])

export interface Flight {
    flight: FlightInfo;
    returnInfo: (flight: ReservedFlight) => void;
}

export interface LocationInfo {
    location: Location;
}

export interface SeatInfo {
    seat: Seat;
    returnInfo: (seat: Seat) => void;
}

export interface ReservedFlight {
    flight: FlightInfo;
    fee: Fee;
    reset: () => void;
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
    featured: boolean;
    cheapestPrice: Money;
}

export interface Fee {
    feeID: string;
    feeName: string;
    priceDifference: number;
    price: Money;
}