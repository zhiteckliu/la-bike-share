var objectMapper = require('object-mapper')
import { StationInformation } from '../model/IStationInformationResponse'
import { RegionInformation } from '../model/IRegionInformationResponse'
import { Status } from '../model/IStationStatusResponse'

export const StationInformationResponseMapper = (src: StationInformation) => {
    var map = {
        "lon": "long",
        "lat": "lat",
        "region_id": "regionId",
        "address": "address",
        "name": "name",
        "station_id": "id",
    }
    return objectMapper(src, map);
}

export const StationStatusResponseMapper = (src: Status) => {
    var map = {
        "id": "station_id",
        "num_docks_available": "emptyDocks",
        "num_bikes_available": "total",
        "num_bikes_available_types.electric": "type.electric",
        "num_bikes_available_types.smart": "type.smart",
        "num_bikes_available_types.classic": "type.classic",
    }
    return objectMapper(src, map);
}

export const RegionInfoResponseMapper = (src: RegionInformation) => {
    var map = {
        "region_name": "name",
        "region_id": "id",
    }
    return objectMapper(src, map);
}