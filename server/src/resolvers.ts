import _ from 'lodash';

import { IStationInformation, IRegionInformation } from './model';
import {
  GetStationsInformation,
  GetStationStatus,
  GetRegionInformation
} from './api'
import {
  StationInformationResponseMapper,
  StationStatusResponseMapper,
  RegionInfoResponseMapper
} from './utility/mapper'

const resolvers = {
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
    filterAvailableStations: async (
      parent: any,
      args: { regionId: string, types: any }
    ) => {
      const filteredRegionList = await GetStationsInformation()
        .then((response) => {
          let stationList: IStationInformation[] = [];
          const { data } = response.data
          const { stations } = data
          const unMappedFilteredRegionList = _.filter(stations, { region_id: args.regionId })
          unMappedFilteredRegionList.forEach((station) => {
            stationList.push(StationInformationResponseMapper(station));
          });
          return stationList
        });

      const filteredAvailableList = await GetStationStatus()
        .then((response) => {
          const { data } = response.data;
          const { stations } = data;
          const filteredAvailableList = _.filter(stations, (item) => {
            const { classic, electric, smart } = item.num_bikes_available_types;
            const { types } = args

            if (types.viewAll) return item.num_bikes_available > 0;

            return item.num_bikes_available > 0 &&
              classic >= (types.classic || 0) &&
              electric >= (types.electric || 0) &&
              smart >= (types.smart || 0)
          });
          return filteredAvailableList;
        })

      return filteredRegionList.filter(station =>
        filteredAvailableList.some(status => status.station_id === station.id))
    },
    findEmptyDocks: async (parent: any, args: { regionId: string, numBikesReturn: number }) => {
      const stationInfolist = await GetStationsInformation()
        .then((response) => {
          let stationList: IStationInformation[] = [];
          const { data } = response.data
          const { stations } = data
          const filteredStations = _.filter(stations, { region_id: args.regionId })
          filteredStations.forEach((station) => {
            stationList.push(StationInformationResponseMapper(station));
          });
          return stationList
        });

      const emptyDocksList = await GetStationStatus()
        .then((response) => {
          const { data } = response.data;
          const { stations } = data;
          return _.filter(stations, (item) =>
            (item.num_docks_available > args.numBikesReturn));
        })

      return stationInfolist.filter(station =>
        emptyDocksList.some(status => status.station_id === station.id))
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
      stationInformation: IStationInformation) => {
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

export default resolvers;