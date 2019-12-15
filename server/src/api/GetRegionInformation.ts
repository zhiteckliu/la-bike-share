import axios from 'axios';
import { IRegionInformationResponse } from '../model'

const REQUEST_URL = 'https://gbfs.bcycle.com/bcycle_lametro/system_regions.json';

interface ServerResponse {
    data: IRegionInformationResponse
}

export default (): Promise<ServerResponse> => {
    return axios.get(REQUEST_URL, { headers: { 'Accept-Encoding': 'gzip' } })
}