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
        try {
            // MAKE GRAPHQL REQUEST
            const {data} = await client.query({
                query: getAllUsersQuery,
            }); 

            set({allUsers: data.getUsers});     
        } catch (error) {
            console.log("Error fetching all users...", error);
        }
       
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

    // REMOVE LIBRARY FROM USER ENROLLED LIBRARIES
    removeLibraryFromUser: async (
        userId: string,
        libraryId: string,
    ) => {

        set((state: IAuth) => {

            let newAllUsers = _.cloneDeep(state.allUsers);

            // FIND INDEX
            const findIndex = newAllUsers!.findIndex((user) => user.id === userId);

            let user = _.cloneDeep(newAllUsers![findIndex]);

            // REMOVE LIBRARY ID    
            const libraryIdIndex = user.librariesEnrolled.findIndex((enrolledLibraryId) => enrolledLibraryId === libraryId);

            user.librariesEnrolled.splice(libraryIdIndex, 1);

            newAllUsers![findIndex] = user;

            return {
                ...state,
                allUsers: newAllUsers,
            }

        })

    }
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