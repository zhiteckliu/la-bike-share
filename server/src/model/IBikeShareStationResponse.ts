interface IBikeShareStationResponse {
    features: Properties[]
}

interface Properties {
    properties: StationDetail
}

export interface StationDetail {
    addressStreet: String;
    addressCity: String;
    addressState: String
    addressZipCode: String;
    latitude: Number;
    longtitude: Number;
    bikesAvailable: Number;
    docksAvailable: Number;
    kioskId: Number;
    name: String;
    classicBikesAvailable: Number;
    smartBikesAvailable: Number;
    electricBikesAvailable: Number;
}

export default IBikeShareStationResponse