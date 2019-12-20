import { gql } from 'apollo-boost'

const GetBikeShareStationsQuery = gql`
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
      name
      address
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

export default GetBikeShareStationsQuery;