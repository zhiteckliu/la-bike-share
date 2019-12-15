interface IStationInformationResponse {
    data: Stations
    last_updated: Number;
}

interface Stations {
    stations: StationInformation[]
}

export interface StationInformation {
    lon: Number;
    lat: Number;
    region_id: String;
    address: String;
    name: String;
    station_id: String;
}

export default IStationInformationResponse