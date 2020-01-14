import { Status } from '../model/StationStatusResponse'
import StationStatus from '../model/StationStatus'

export default function StationStatusMapper(src: Status): StationStatus {
    const {
        station_id,
        num_docks_available,
        num_bikes_available,
        num_bikes_available_types: {
            classic,
            electric,
            smart
        }
    } = src

    return {
        id: station_id,
        emptyDocks: num_docks_available,
        totalBikesAvailable: num_bikes_available,
        bikesAvailabilityType: {
            classic,
            electric,
            smart
        }
    }
}