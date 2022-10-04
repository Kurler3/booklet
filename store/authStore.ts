import create from "zustand";
import { getAllUsersQuery } from "../graphql/users/queries";
// import {persist} from 'zustand/middleware';
import { IAuth } from "../types/authTypes";
import client from "../utils/ApolloClient";
import { USER_TOKEN } from "../utils/constants";

const authStore = (set:any):IAuth => ({
    
    // LOGGED USER 
    userProfile: null,
    // ALL USERS
    allUsers: null,
    // ADD USER/LOGIN FUNCTION
    addUser: (user: any) => {

        // SET LOCAL STORAGE TOKEN
        localStorage.setItem(USER_TOKEN, user.token);

        set({userProfile: user})
    },
    // LOGOUT USER
    logout: () => {
        
        // SET TOKEN TO EMPTY
        localStorage.setItem(USER_TOKEN, '');

        set({userProfile: null})
    },
    // FETCH ALL USERS FUNCTION
    fetchAllUsers: async () => {
        // MAKE GRAPHQL REQUEST
        const {data} = await client.query({
            query: getAllUsersQuery,
        }); 

        set({allUsers: data.getUsers});
    },
});

// CREATE PERSISTENT STORE HOOK
const useAuthStore = create(
    // WRAP IN PERSIS
    // persist(
    //     authStore,
    //     {
    //         name: "auth",
    //     }
    // ),
    authStore  
);

export default useAuthStore;