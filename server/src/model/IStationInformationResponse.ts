interface IStationInformationResponse {
    data: Stations
    last_updated: number;
}

interface Stations {
    stations: StationInformation[]
}

export interface StationInformation {
    lon: number;
    lat: number;
    region_id: string;
    address: string;
    name: string;
    station_id: string;
}

export default IStationInformationResponse