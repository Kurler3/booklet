import create from "zustand";
import {persist} from 'zustand/middleware';
import { IAuth } from "../types/authTypes";

const authStore = (set:any):IAuth => ({
    userProfile: null,
    allUsers: null,

    // ADD USER FUNCTION
    addUser: (user: any) => set({userProfile: user}),
    // LOGOUT USER
    logout: () => set({userProfile: null}),
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