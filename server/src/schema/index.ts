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
    stations:[StationInformation],
    regions:[RegionInformation],
  }

  type StationInformation {
    id: String
    name: String
    address: String
    lat: Float
    long: Float
    region: RegionInformation
    availability: Availability
  }

  type RegionInformation {
    id: String
    name: String
    stations: [StationInformation]
  }

  type Availability {
    emptyDocks: Int
    total: Int
    type: AvailabilityType
  }

  type AvailabilityType {
    classic: Int
    electric: Int
    smart: Int
  }
`;

export const resolvers = {
  Query: {
    stations: async () => {
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
    regions: async (parent: any, args: any) => {
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
    region: async (stationInformation: IStationInformation) => {
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
    availability: async (
      stationInformation: IStationInformation,
      args: { regionId: string, viewAll: boolean, types: any }) => {
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