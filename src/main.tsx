import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ApolloProvider} from '@apollo/react-hooks';
import {client} from './apollo-client.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
