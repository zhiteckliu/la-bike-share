import _ from 'lodash';
import { gql } from 'apollo-server-express';
import { IBikeShareStation, IStationInformation, IRegionInformation } from '../model';
import { GetBikeShareStations, GetStationsInformation, GetStationStatus, GetRegionInformation } from '../api'
import BikeShareStationResponseMapper from '../mapper/BikeShareStationResponseMapper';
import StationInformationResponseMapper from '../mapper/StationInformationResponseMapper';
import StationStatusResponseMapper from '../mapper/StationStatusResponseMapper';
import RegionInformationResponseMapper from '../mapper/RegionInformationResponseMapper';

export const typeDefs = gql`
  type Query {
    bikeShareStationFull(id: Int): BikeShareStationFull,
    bikeShareStationsFull: [BikeShareStationFull],
    bikeShareStations:[StationInformation],
    regions:[RegionInformation],
  }

  ## Start: Full Query Schema ##
  ## no longer used
  type BikeShareStationFull {
    id: ID
    fullId: ID
    name: String
    address: Address
    latlong: LatLong
    totalAvailableBikes: Int
    bikesAvailabilityType: BikesAvailabilityType
    emptyDocks: Int
  }

  type Address {
    street: String
    city: String
    state: String
    zip: String
  }

  type LatLong {
    lat: Float
    long: Float
  }

  ## End: Full Query Schema ##

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
    bikeShareStationFull: async (parent: any, args: { id: number; }) => {
      return await GetBikeShareStations()
        .then((response) => {
          const { data } = response;
          const { features } = data;
          const selectedStation = _.find(features, (item) => (item.properties.kioskId === args.id));
          if (selectedStation) {
            return BikeShareStationResponseMapper(selectedStation.properties);
          }
          throw "Selected station is not avaiable or invalid id has been input";
        })
    },
    bikeShareStationsFull: async () => {
      let stations: IBikeShareStation[] = [];
      return await GetBikeShareStations()
        .then((response) => {
          const { data } = response;
          const { features } = data;
          features.forEach((feature) => {
            const { properties } = feature;
            stations.push(BikeShareStationResponseMapper(properties));
          });

          if (stations.length > 0) return stations;

          throw "An error has occured"
        })
    },
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
            regionsList.push(RegionInformationResponseMapper(region));
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
            return RegionInformationResponseMapper(selectedRegion);
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