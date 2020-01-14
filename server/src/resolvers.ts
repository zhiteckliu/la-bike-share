import _ from 'lodash';

import { StationInformation, RegionInformation } from './model';
import {
  GetStationsInformation,
  GetStationStatus,
  GetRegionInformation
} from './datasource'
import {
  StationInformationResponseMapper,
  StationStatusResponseMapper,
  RegionInfoResponseMapper
} from './utility/mapper'

import GetAvailStationsStatusByAvailabilityHandler from './ApplicationServices/GetAvailableStationsByAvailabilityTypeQuery'
import { GetStationsStatus } from './Infrastructure/StationDatasource'
import StationStatusMapper from './Infrastructure/StationStatusMapper'

const resolvers = {
  Query: {
    filterAvailableStations: async (
      parent: any,
      args: { regionId: string, types: any, first: number, offset: number }
    ) => {
      const { regionId, types, first, offset = 0 } = args;
      GetAvailStationsStatusByAvailabilityHandler({ GetStationsStatus }, { map: StationStatusMapper }, { classic: 0, electric: 0, smart: 5 })
        .then(res => {
          console.log(res)
          console.log(res.length)
        })
      const filteredRegionList = await GetStationsInformation()
        .then((response) => {
          let stationList: StationInformation[] = [];
          const { data } = response.data
          const { stations } = data
          const unMappedFilteredRegionList = _.filter(stations, { region_id: regionId })
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

            return item.num_bikes_available > 0 &&
              classic >= (types.classic || 0) &&
              electric >= (types.electric || 0) &&
              smart >= (types.smart || 0)
          });
          return filteredAvailableList;
        })

      const filteredList = filteredRegionList.filter(station =>
        filteredAvailableList.some(status => status.station_id === station.id));


      const offsetList = first === undefined ?
        filteredList.slice(offset) :
        filteredList.slice(offset, offset + first);

      return { total: filteredList.length, stations: offsetList }
    },
    findEmptyDocks: async (parent: any, args: { regionId: string, numBikesReturn: number, first: number, offset: number }) => {
      const { regionId, numBikesReturn, first, offset = 0 } = args
      const stationInfolist = await GetStationsInformation()
        .then((response) => {
          let stationList: StationInformation[] = [];
          const { data } = response.data
          const { stations } = data
          const filteredStations = _.filter(stations, { region_id: regionId })
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
            (item.num_docks_available > numBikesReturn));
        })

      const filteredList = stationInfolist.filter(station =>
        emptyDocksList.some(status => status.station_id === station.id))

      const offsetList = first === undefined ?
        filteredList.slice(offset) :
        filteredList.slice(offset, offset + first);


      return { total: filteredList.length, stations: offsetList }
    }
  },
  StationInformation: {
    region: async (stationInformation: StationInformation) => {
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
      stationInformation: StationInformation) => {
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
}

export default resolvers;