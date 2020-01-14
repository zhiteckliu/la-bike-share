import axios from 'axios';
import { RegionInformationResponse } from '../model'

const REQUEST_URL = 'https://gbfs.bcycle.com/bcycle_lametro/system_regions.json';

type ServerResponse = {
    data: RegionInformationResponse
}

export default (): Promise<ServerResponse> => {
    return axios.get(REQUEST_URL, { headers: { 'Accept-Encoding': 'gzip' } })
}