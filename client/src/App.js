import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import SearchPlaces from './components/Wishlist/SearchWishlist';
import SavedPlaces from './components/Wishlist/SavedWishlist';
import Home from './pages/Home';
import Expenses from './pages/Expenses';
import Dashboard from './pages/Dashboard';
import Wishlist from './pages/Wishlist';
import SingleThought from './pages/SingleThought';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  // Construct request middleware that will attach the JWT token to every request as an `authorization` header
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <>
                    <Navbar />
                    <Route exact path='/' component={Home} />
                    <Switch>
                        <Route exact path='/dashboard' component={Dashboard} />
                        <Route exact path='/search' component={SearchPlaces} />
                        <Route exact path='/saved' component={SavedPlaces} />
                        <Route exact path='/expenses' component={Expenses} />
                        <Route exact path='/searchBooks' component={SearchBooks} />
                        <Route exact path='/savedBooks' component={SavedBooks} />
                        <Route exact path='/wishlist' component={Wishlist} />
                        <Route exact path="/thoughts/:thoughtId">
              <SingleThought />
            </Route>


                    
                    </Switch>
                    <Footer />
                </>
            </Router>
        </ApolloProvider>
    );
}

export default App;