import axios from 'axios';
import StationStatusResponse, { Status } from '../model/StationStatusResponse'

const REQUEST_URL = 'https://gbfs.bcycle.com/bcycle_lametro/station_status.json';

type ServerResponse = {
    data: StationStatusResponse
}

export function GetStationsStatus(): Promise<Status[]> {
    let promise: Promise<Status[]> = new Promise(async (resolve, reject) => {
        await axios.get<any, ServerResponse>(REQUEST_URL, { headers: { 'Accept-Encoding': 'gzip' } })
            .then((res) => {
                resolve(res.data.data.stations)
            })
    })
    return promise;
}