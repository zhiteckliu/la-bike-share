import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import Navigator from './routes'

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
