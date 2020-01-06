import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    filterAvailableStations(
      regionId: String,
      types: BikeTypeAvailable,
      first: Int,
      offset: Int
    ):Response,
    findEmptyDocks(
      regionId: String,
      numBikesReturn: Int,
      first: Int,
      offset: Int
    ):Response,
  }

  type Response {
    total: Int
    stations: [StationInformation]
  }

  input BikeTypeAvailable {
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