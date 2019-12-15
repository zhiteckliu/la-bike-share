import axios from 'axios';
import { IBikeShareStationResponse } from '../model'

const REQUEST_URL = 'https://bikeshare.metro.net/stations/json/';

interface ServerResponse {
    data: IBikeShareStationResponse
}

export default (): Promise<ServerResponse> => {
    return axios.get(REQUEST_URL, { headers: { 'Accept-Encoding': 'gzip' } })
}