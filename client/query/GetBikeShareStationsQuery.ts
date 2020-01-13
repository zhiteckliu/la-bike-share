import { gql } from 'apollo-boost'

export const FilterAvailableStationQuery = gql`
query FilterAvailableStation($region: String!, $classic: Int!, $electric: Int!, $smart: Int!, $offset: Int, $first: Int)
  {
    filterAvailableStations(
      regionId: $region,
      types: {
        classic: $classic,
        electric: $electric,
        smart: $smart
      },
      offset: $offset,
      first: $first
    )
    {
      total
      stations{
        id
        name
        address
        long
        lat
        availability{
          total
          emptyDocks
          type{
            classic
            electric
            smart
          }
        }
      }
    }
  }
`;

export const FindEmptyDocksQuery = gql`
query FindEmptyDocks($region: String!, $numBikesReturn: Int!, $offset: Int, $first: Int)
  {
    findEmptyDocks(
      regionId: $region,
      numBikesReturn: $numBikesReturn,
      offset: $offset,
      first: $first
    ){
      total
      stations
      {
        id
        name
        address
        long
        lat
        availability{
          total
          emptyDocks
          type{
            classic
            electric
            smart
          }
        }
      }
    }
  }
`;