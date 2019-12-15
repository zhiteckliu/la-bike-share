import { gql } from 'apollo-boost'

const GetBikeShareStationsQuery = gql`
      {
          bikeShareStations{
            id
            status{
              totalBikesAvailable
            }
          }
      }
`;

export default GetBikeShareStationsQuery;