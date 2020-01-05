type RegionInformationResponse = {
    data: Regions;
    last_updated: number;
}

type Regions = {
    regions: RegionInformation[]
}

export type RegionInformation = {
    region_name: string;
    region_id: string;
}

export default RegionInformationResponse