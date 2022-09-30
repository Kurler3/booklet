import create from "zustand";
// import {persist} from 'zustand/middleware';
import { IAuth } from "../types/authTypes";
import { USER_TOKEN } from "../utils/constants";

const authStore = (set:any):IAuth => ({
    userProfile: null,
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