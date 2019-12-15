import { StationDetail } from '../model/IBikeShareStationResponse'

var objectMapper = require('object-mapper');

var map = {
  "addressStreet": "address.street",
  "addressCity": "address.city",
  "addressState": "address.state",
  "addressZipCode": "address.zip",
  "latitude": "latlong.lat",
  "longitude": "latlong.long",
  "bikesAvailable": "totalAvailableBikes",
  "docksAvailable": "emptyDocks",
  "kioskId": [
    {
      key: "id",
      transform: function (value: number) { return value }
    },
    {
      key: "fullId",
      transform: function (value: number) { return `bcycle_lametro_${value}` }
    },
  ],
  "name": "name",
  "classicBikesAvailable": "availableBikesType.classic",
  "smartBikesAvailable": "availableBikesType.smart",
  "electricBikesAvailable": "availableBikesType.electric",
}

const BikeShareStationResponseMapper = (src: StationDetail) => {
  return objectMapper(src, map);
}

export default BikeShareStationResponseMapper

