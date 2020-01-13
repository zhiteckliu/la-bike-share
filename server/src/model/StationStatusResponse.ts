type StationStatusResponse = {
    data: Stations
    last_updated: number;
}

type Stations = {
    stations: Status[]
}

type BikesAvailabilityTypes = {
    electric: number;
    smart: number;
    classic: number;
}

export type Status = {
    station_id: string;
    num_docks_available: number;
    num_bikes_available: number;
    num_bikes_available_types: BikesAvailabilityTypes;
}

export default StationStatusResponse