import { StationStatus } from '../model'
import { Status } from '../model/StationStatusResponse'
import { filter } from 'lodash'

type AvailabilityTypeQuery = {
    classic: number,
    electric: number,
    smart: number
}

type StationStatusDatasource = {
    GetStationsStatus(): Promise<Status[]>,
}

type Mapper = {
    map(src: Status): StationStatus
}

export default async function GetAvailStationsStatusByAvailabilityHandler(datasource: StationStatusDatasource, mapper: Mapper, query: AvailabilityTypeQuery) {
    const stations = await datasource.GetStationsStatus()
        .then(stations => {
            let stationList: StationStatus[] = []
            stations.forEach(station => {
                stationList.push(mapper.map(station))
            })
            return stationList;
        })
    const filtered = filter(stations,
        ({ totalBikesAvailable, bikesAvailabilityType: { classic, electric, smart } }) => {
            return totalBikesAvailable > 0 &&
                classic >= query.classic &&
                electric >= query.electric &&
                smart >= query.smart
        })
    return filtered
}