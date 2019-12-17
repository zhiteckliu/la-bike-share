interface IStationStatusResponse {
    data: Stations
    last_updated: number;
}

interface Stations {
    stations: Status[]
}

interface BikesAvailabilityTypes {
    electric: number;
    smart: number;
    classic: number;
}

export interface Status {
    station_id: string;
    num_docks_available: number;
    num_bikes_available: number;
    num_bikes_available_types: BikesAvailabilityTypes;
}

export default IStationStatusResponse