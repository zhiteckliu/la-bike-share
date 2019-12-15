interface IRegionInformationResponse {
    data: Regions;
    last_updated: Number;
}

interface Regions {
    regions: RegionInformation[]
}

export interface RegionInformation {
    region_name: String;
    region_id: String;
}

export default IRegionInformationResponse