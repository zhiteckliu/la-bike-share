import { Status } from '../model/IStationStatusResponse'

var objectMapper = require('object-mapper')

var map = {
    "id": "station_id",
    "num_docks_available": "emptyDocks",
    "num_bikes_available": "totalBikesAvailable",
    "num_bikes_available_types.electric": "bikesAvailabilityType.electric",
    "num_bikes_available_types.smart": "bikesAvailabilityType.smart",
    "num_bikes_available_types.classic": "bikesAvailabilityType.classic",
}

const StationStatusResponseMapper = (src: Status) => {
    return objectMapper(src, map);
}

export default StationStatusResponseMapper