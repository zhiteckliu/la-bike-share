import axios from 'axios';
import { IStationInformationResponse } from '../model'

const REQUEST_URL = 'https://gbfs.bcycle.com/bcycle_lametro/station_information.json';

interface ServerResponse {
    data: IStationInformationResponse
}

export default (): Promise<ServerResponse> => {
    return axios.get(REQUEST_URL, { headers: { 'Accept-Encoding': 'gzip' } })
}