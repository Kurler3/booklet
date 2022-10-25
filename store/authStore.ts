import _ from "lodash";
import create from "zustand";
import { getAllUsersQuery } from "../graphql/users/queries";
// import {persist} from 'zustand/middleware';
import { IAuth } from "../types/authTypes";
import { UserType } from "../types/userTypes";
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

    // UPDATE USERS LIBRARIES ENROLLED
    updateUsersLibraryEnrolled: async (
        userIds: string[],
        libraryId: string,
    ) => {
        set((state:IAuth) => {
            let newAllUsers = _.cloneDeep(state.allUsers);

            // FOR EACH OF THE USER ID BEING ADDED, ADD THE LIBRARY ID TO THE librariesEnrolled
            for(let userBeingAdded of userIds) {
                const findIndex = newAllUsers!.findIndex((user:UserType) => user.id === userBeingAdded);
                
                newAllUsers![findIndex] = {
                    ...newAllUsers![findIndex],
                    librariesEnrolled: [
                        ...newAllUsers![findIndex].librariesEnrolled,
                        libraryId,
                    ]
                };
            }
            return {
                ...state,
                allUsers: newAllUsers,
            }
        })
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