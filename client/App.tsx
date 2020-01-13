import React from 'react';
import ApolloClient from 'apollo-boost'
import { useScreens } from 'react-native-screens';
import { ApolloProvider } from '@apollo/react-hooks'
import Navigator from './routes'


useScreens();

const client = new ApolloClient({
  uri: 'http://HOST:4000/graphql'
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigator />
    </ApolloProvider>
  );
}
