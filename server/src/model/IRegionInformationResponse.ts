interface IRegionInformationResponse {
    data: Regions;
    last_updated: number;
}

interface Regions {
    regions: RegionInformation[]
}

export interface RegionInformation {
    region_name: string;
    region_id: string;
}

export default IRegionInformationResponse