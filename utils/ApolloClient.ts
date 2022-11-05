// WILL EXPORT A JSX ELEMENT THAT WRAPS THE ENTIRE APP
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

// APOLLO AUTH CONTEXT
import {setContext} from '@apollo/client/link/context';
import { BASE_URL, USER_TOKEN } from './constants';

const GRAPHQL_URI = `${BASE_URL}/api/graphql`;

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
    // fetchOptions: {
    //     mode: 'no-cors'
    // }
});


const client = new ApolloClient({
    // SET SERVER SIDE RENDERING 
    ssrMode: true,
    link: authLink.concat(httpLink) as any,
    cache: new InMemoryCache(),
});

export default client;