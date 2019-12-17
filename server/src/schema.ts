import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    stations:[StationInformation],
    filterAvailableStations(regionId: String, types: BikeTypeAvailable):[StationInformation],
    regions:[RegionInformation],
  }

  input BikeTypeAvailable {
    viewAll: Boolean, 
    electric: Int
    classic: Int
    smart: Int
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

export default typeDefs;