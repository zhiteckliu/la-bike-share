import axios from 'axios';
import { IStationStatusResponse } from '../model'

const REQUEST_URL = 'https://gbfs.bcycle.com/bcycle_lametro/station_status.json';

interface ServerResponse {
    data: IStationStatusResponse
}

export default (): Promise<ServerResponse> => {
    return axios.get(REQUEST_URL, { headers: { 'Accept-Encoding': 'gzip' } })
}