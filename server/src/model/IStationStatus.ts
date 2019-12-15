interface IStationStatus {
    id: String;
    emptyDocks: Number;
    totalBikesAvailable: Number;
    bikesAvailabilityType: BikesAvailabilityTypes
}

interface BikesAvailabilityTypes {
    electric: Number;
    smart: Number;
    classic: Number;
}

export default IStationStatus