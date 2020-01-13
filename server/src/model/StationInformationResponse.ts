type StationInformationResponse = {
    data: Stations
    last_updated: number;
}

type Stations = {
    stations: StationInformation[]
}

export type StationInformation = {
    lon: number;
    lat: number;
    region_id: string;
    address: string;
    name: string;
    station_id: string;
}

export default StationInformationResponse