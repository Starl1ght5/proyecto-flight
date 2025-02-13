
interface Flight {
    flight: FlightInfo;
}

interface Money {
    currency: Currency;
    amount: string;
}

interface Currency {
    code: string;
    numericCode: number;
    decimalPlaces: number;
}

interface Seat {
    seatID: string;
    seatNumber: string;
    seatPrice: Money;
    reserved: boolean;
}

interface FlightInfo {
    flightID: string;
    airline: string;
    ticketPrice: Money;
    arrivalLocation: Location;
    departureLocation: Location;
    arrivalDate: Date;
    departureDate: Date;
    seatList: Array<Seat>;
}

interface Location {
    locationID: string;
    cityName: string;
    countryName: string;
    iataCode: string;
    airportName: string;
}


export const FlightCard: React.FC<Flight> = ({  }) => {

    return (
        <div className="w-7xl px-8 py-6 rounded-lg shadow-xl bg-white flex flex-row justify-between" >

            <div className="flex flex-col items-center" >
                <h2 className="text-2-5xl">02:18 p.m.</h2>
                <div className="flex flex-row gap-2 font-extralight">
                    <p>Cartagena</p>
                    <p>CTG</p>
                </div>
            </div>

            <div>

            </div>

            <div className="flex flex-col items-center" >
                <h2 className="text-2-5xl">02:18 p.m.</h2>
                <div className="flex flex-row gap-2 font-extralight">
                    <p>Cartagena</p>
                    <p>CTG</p>
                </div>
            </div>

            <div className="flex flex-col">
                <p className="text-sm">Por persona desde</p>
                <h1 className="text-2xl" >COP 1.000.000</h1>
            </div>
        </div>
    )
}