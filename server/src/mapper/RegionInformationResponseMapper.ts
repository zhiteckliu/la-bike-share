import { RegionInformation } from '../model/IRegionInformationResponse'

var objectMapper = require('object-mapper')

var map = {
    "region_name": "name",
    "region_id": "id",
}

const RegionStatusResponseMapper = (src: RegionInformation) => {
    return objectMapper(src, map);
}

export default RegionStatusResponseMapper