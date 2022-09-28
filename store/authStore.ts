import create from "zustand";
import {persist} from 'zustand/middleware';
import { IUser } from "../types/userTypes";

interface IAuth {
    userProfile: IUser | null;
    allUsers: IUser[] | null;
    // CALLED AFTER REGISTERING NEW USER / LOGGING IN
    addUser: any;
    // LOGOUT USER
    logout: any;
    // FETCH ALL USERS FUNCTION
    fetchAllUsers: any;
}

const authStore = (set:any) => ({
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
    persist(
        authStore,
        {
            name: "auth",
        }
    ),  
);

export default useAuthStore;