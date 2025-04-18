export const ImagePaths = new Map<string, string>([
    [ "miami", "/src/assets/miami.webp" ],
    [ "bogota", "/src/assets/bogota.webp" ],
    [ "cali", "/src/assets/cali.webp" ],
    [ "monteria", "/src/assets/monteria.webp" ],
    [ "nueva york", "/src/assets/nuevayork.webp" ],
    [ "paris", "/src/assets/paris.webp" ],
    [ "pasto", "/src/assets/pasto.webp" ],
    [ "pereira", "/src/assets/pereira.webp" ],
    [ "armenia", "/src/assets/armenia.webp" ],
    [ "londres", "/src/assets/londres.webp" ],
    [ "sidney", "/src/assets/sidney.webp" ],
    [ "tokyo", "/src/assets/tokyo.webp" ],
	[ "ottawa", "/src/assets/ottawa.webp" ],
    [ "medellin", "/src/assets/medellin.webp" ]
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

export interface CheckoutInfo {
    bookingID: string;
    userID: string;
    flightInfo: FlightInfo;
    fee: Fee;
    totalPrice: Money;
    status: string;
    ticketCount: number;
    bookedSeats: Array<Seat>;
}

export interface CheckoutAttemptInfo {
    flightID: string;
    userID: string;
    feeID: string;
    seatIDs: Array<string>;
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