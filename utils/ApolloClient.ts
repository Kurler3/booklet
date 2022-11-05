// WILL EXPORT A JSX ELEMENT THAT WRAPS THE ENTIRE APP
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

// APOLLO AUTH CONTEXT
import {setContext} from '@apollo/client/link/context';
import { BASE_URL, USER_TOKEN } from './constants';

const GRAPHQL_URI = `/api/graphql`;

// AUTH
export const authLink = setContext((_, {headers}) => {
    // let token;
    // if(localStorage) {
    //     token = localStorage.getItem(USER_TOKEN);
    // }
    

    // SET AUTH HEADER
    return {
        headers: {
            ...headers,
            // Authorization: token ? `Bearer: ${token}` : '',
            Authorization: "",
        }
    };
});

// HTTP LINK
const httpLink = createHttpLink({
    fetch,
    credentials: 'same-origin',
    uri: GRAPHQL_URI,
    headers: {
        Origin: '*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    } 
    // fetchOptions: {
    //     mode: 'no-cors'
    // }
});


const client = new ApolloClient({
    // SET SERVER SIDE RENDERING 
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink) as any,
    cache: new InMemoryCache(),
});

export default client;