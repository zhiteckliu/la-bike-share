import _ from 'lodash';
import { gql } from 'apollo-server-express';
import { IStationInformation, IRegionInformation } from '../model';
import {
  GetStationsInformation,
  GetStationStatus,
  GetRegionInformation
} from '../api'
import {
  StationInformationResponseMapper,
  StationStatusResponseMapper,
  RegionInfoResponseMapper
} from '../utility/mapper'

export const typeDefs = gql`
  type Query {
    bikeShareStations:[StationInformation],
    regions:[RegionInformation],
  }

  type StationInformation {
    lat: Float
    long: Float
    regionId: String
    regionInfo: RegionInformation
    address: String
    name: String
    id: String
    status: StationStatus
  }

  type StationStatus {
    id: String
    emptyDocks: Int
    totalBikesAvailable: Int
    bikesAvailabilityType: BikesAvailabilityType
  }

  type BikesAvailabilityType {
    classic: Int
    electric: Int
    smart: Int
  }

  type RegionInformation {
    id: String
    name: String
    stations: [StationInformation]
  }
`;

export const resolvers = {
  Query: {
    bikeShareStations: async () => {
      let stationsList: IStationInformation[] = [];
      return await GetStationsInformation()
        .then((response) => {
          const { data } = response.data
          const { stations } = data
          stations.forEach((station) => {
            stationsList.push(StationInformationResponseMapper(station));
          });

          if (stationsList.length > 0) return stationsList;

          throw "An error has occured"
        })
    },
    regions: async () => {
      let regionsList: IRegionInformation[] = [];
      return await GetRegionInformation()
        .then((response) => {
          const { data } = response.data
          const { regions } = data
          regions.forEach((region) => {
            regionsList.push(RegionInfoResponseMapper(region));
          });

          if (regions.length > 0) return regionsList;

          throw "An error has occured fetching all regions"
        })

    }
  },
  StationInformation: {
    status: async (stationInformation: IStationInformation) => {
      return await GetStationStatus()
        .then((response) => {
          const { data } = response.data
          const { stations } = data
          const selectedStationStatus = _.find(stations, (item) => (item.station_id === stationInformation.id));
          if (selectedStationStatus) {
            return StationStatusResponseMapper(selectedStationStatus);
          }
          throw "Selected station status is not avaiable"
        })
    },
    regionInfo: async (stationInformation: IStationInformation) => {
      return await GetRegionInformation()
        .then((response) => {
          const { data } = response.data
          const { regions } = data
          const selectedRegion = _.find(regions, (item) => (item.region_id === stationInformation.regionId));
          if (selectedRegion) {
            return RegionInfoResponseMapper(selectedRegion);
          }
          throw "Selected region is not avaiable"
        })
    },
  },
  RegionInformation: {
    stations: async (regionInformation: IRegionInformation) => {
      return await GetStationsInformation()
        .then((response) => {
          let stationsList: IStationInformation[] = [];
          const { data } = response.data
          const { stations } = data
          const unMappedStations = _.filter(stations, (item) => (item.region_id === regionInformation.id));
          unMappedStations.forEach((station) => {
            stationsList.push(StationInformationResponseMapper(station));
          });

          if (stationsList.length > 0) return stationsList;
        })
    }
  }
}