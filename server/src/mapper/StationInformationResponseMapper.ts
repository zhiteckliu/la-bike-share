import { StationInformation } from '../model/IStationInformationResponse'

var objectMapper = require('object-mapper')

var map = {
    "lon": "long",
    "lat": "lat",
    "region_id": "regionId",
    "address": "address",
    "name": "name",
    "station_id": "id",
}

const StationInformationResponseMapper = (src: StationInformation) => {
    return objectMapper(src, map);
}

export default StationInformationResponseMapper

