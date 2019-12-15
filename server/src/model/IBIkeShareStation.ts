interface IBikeShareStation {
    id: string;
    fullId: string
    name: string;
    address: IAddress;
    latlong: ILatLong;
    totalAvailableBikes: number,
    availableBikesType: IAvailableBikesType;
    emptyDocks: number;
}

interface IAvailableBikesType {
    classic: number;
    electric: number;
    smart: number;
}

interface IAddress {
    street: string;
    city: string;
    state: string;
    zip: string;
}

interface ILatLong {
    lat: number;
    long: number;
}

export default IBikeShareStation;