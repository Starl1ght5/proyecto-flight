import miami from './assets/miami.webp';
import bogota from './assets/bogota.webp';
import cali from './assets/cali.webp';
import monteria from './assets/monteria.webp';
import nuevayork from './assets/nuevayork.webp';
import paris from './assets/paris.webp';
import pasto from './assets/pasto.webp';
import pereira from './assets/pereira.webp';
import armenia from './assets/armenia.webp';
import londres from './assets/londres.webp';
import sidney from './assets/sidney.webp';
import tokyo from './assets/tokyo.webp';
import ottawa from './assets/ottawa.webp';
import medellin from './assets/medellin.webp';

export const ImagePaths = new Map<string, string>([
    [ "miami", miami ],
    [ "bogota", bogota ],
    [ "cali", cali ],
    [ "monteria", monteria ],
    [ "nueva york", nuevayork ],
    [ "paris", paris ],
    [ "pasto", pasto ],
    [ "pereira", pereira ],
    [ "armenia", armenia ],
    [ "londres", londres ],
    [ "sidney", sidney ],
    [ "tokyo", tokyo ],
	[ "ottawa", ottawa ],
    [ "medellin", medellin ]
])

export interface Flight {
    flight: FlightInfo;
    returnInfo: (flight: ReservedFlight) => void;
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