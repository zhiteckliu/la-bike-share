interface IStationStatusResponse {
    data: Stations
    last_updated: Number;
}

interface Stations {
    stations: Status[]
}

interface BikesAvailabilityTypes {
    electric: Number;
    smart: Number;
    classic: Number;
}

export interface Status {
    station_id: String;
    num_bikes_available: Number;
    num_bikes_available_types: BikesAvailabilityTypes;
}

export default IStationStatusResponse