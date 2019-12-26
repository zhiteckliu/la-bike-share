import { gql } from 'apollo-boost'

export const FilterAvailableStationQuery = gql`
query FilterAvailableStation($region: String!, $classic: Int!, $electric: Int!, $smart: Int!)
  {
    filterAvailableStations(
      regionId: $region,
      types: {
        viewAll: false,
        classic: $classic,
        electric: $electric,
        smart: $smart
      }
    ){
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
`;

export const FindEmptyDocksQuery = gql`
query FindEmptyDocks($region: String!, $total: Int!)
  {
    findEmptyDocks(
      regionId: $region,
      numBikesReturn: $total
    ){
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
`;