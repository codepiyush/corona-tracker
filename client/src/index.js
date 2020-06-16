import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './elevation.css';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'https://corotrack-api.herokuapp.com/graphql',
});

ReactDOM.render(
  // <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);


