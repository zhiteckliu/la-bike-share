type StationStatus = {
    id: string;
    emptyDocks: number;
    totalBikesAvailable: number;
    bikesAvailabilityType: BikesAvailabilityTypes
}

type BikesAvailabilityTypes = {
    electric: number;
    smart: number;
    classic: number;
}

export default StationStatus