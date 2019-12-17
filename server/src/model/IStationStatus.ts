interface IStationStatus {
    id: string;
    emptyDocks: number;
    totalBikesAvailable: number;
    bikesAvailabilityType: BikesAvailabilityTypes
}

interface BikesAvailabilityTypes {
    electric: number;
    smart: number;
    classic: number;
}

export default IStationStatus