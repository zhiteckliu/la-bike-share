import axios from 'axios';
import { StationInformationResponse } from '../model'

const REQUEST_URL = 'https://gbfs.bcycle.com/bcycle_lametro/station_information.json';

type ServerResponse = {
    data: StationInformationResponse
}

export default (): Promise<ServerResponse> => {
    return axios.get(REQUEST_URL, { headers: { 'Accept-Encoding': 'gzip' } })
}