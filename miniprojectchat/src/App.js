import logo from './logo.svg';
import './App.css';
import {useAuth0} from "@auth0/auth0-react"
import { Button, CircularProgress } from '@material-ui/core';
import Main from './pages/Main';
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import {useState} from "react";
import {  RecoilRoot } from 'recoil';

function App() {
  const {loginWithRedirect, getIdTokenClaims, logout, isAuthenticated, isLoading} = useAuth0();
  const [token, setToken] = useState("");

  if(isLoading){
    return <CircularProgress/>
  }

  getIdTokenClaims().then(resp => {
    console.log(resp);
    if(resp){
      setToken(resp.__raw);
    }
  });

  
const wsLink = new WebSocketLink({
  uri: "wss://chat-app-miniproject.herokuapp.com/v1/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  },
});
const httpLink = new HttpLink({
  uri: "https://chat-app-miniproject.herokuapp.com/v1/graphql",
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local cookie if it exists
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, splitLink]),
});
// const client = new ApolloClient({
//   uri: "https://chat-app-miniproject.herokuapp.com/v1/graphql",
//   headers: {
//     "x-hasura-admin-secret": "aryadeva123",
//   },
//   cache: new InMemoryCache(),
// });




//   if(true)
// {
//   return <Main/>
  // console.log(Auth0());
  return (
    <ApolloProvider client={client}>
      {isAuthenticated ? (<RecoilRoot><Main/></RecoilRoot>) : (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button
          className="App-link"
          onClick={() => {loginWithRedirect()}}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined" color="primary"
        >
          Login
        </Button>
        <button
          className="App-link"
          onClick={() => {logout()}}
          target="_blank"
          rel="noopener noreferrer"
        >
          Logout
        </button>
      </header>
    </div>)}

    </ApolloProvider>
    
  );
}



export default App;
