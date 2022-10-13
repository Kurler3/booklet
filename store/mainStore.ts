import _ from "lodash";
import create from "zustand";
import { getEnrolledLibrariesQuery } from "../graphql/users/queries";
import { ILibrary } from "../types/libraryTypes";
import { UserType } from "../types/userTypes";
import client from "../utils/ApolloClient";
import { MENU_OPTIONS } from "../utils/constants";

// TYPE
interface IMainStore {
    
    // MENU OPTION SELECTED
    menuOptionSelected: string;

    // SELECTED LIBRARY
    selectedLibrary: ILibrary | null;

    // ALL LIBRARIES
    enrolledLibraries: ILibrary[] | null;

    // FETCH LIBRARIES THAT CURRENT LOGGED USER IS ENROLLED IN
    fetchEnrolledLibraries: any;

    // SET NEW SELECTED LIBRARY
    setNewSelectedLibrary: any;

    // ADD LIBRARY
    addLibrary: any;

    // LOADING
    loading: boolean;

    // REMOVE LIBRARIES
    removeLibraries: any;
}

// STORE
const mainStore = (set: any):IMainStore => ({
    // MENU OPTION SELECTED
    menuOptionSelected: MENU_OPTIONS.home,

    // SELECTED LIBRARY
    selectedLibrary: null,

    // ENROLLED LIBRARIES
    enrolledLibraries: null,

    // LOADING
    loading: false,

    // FETCH ENROLLED LIBRARIES
    fetchEnrolledLibraries: async (loggedUser:UserType) => {
        // SET LOADING
        set({loading: true});

        try {
           
            // FETCH LIBRARIES THAT THIS USER IS ENROLLED IN
            const {data} = await client.query({
                // QUERY
                query: getEnrolledLibrariesQuery,
                // VARIABLES
                variables: {
                    userId: loggedUser.id,
                }
            });
    
            // SET ENROLLED LIBRARIES + LOADING = FALSE    
            set({
                enrolledLibraries: data.getEnrolledLibraries,
                loading: false,
            });

        } catch (error) {
            console.log('Error fetching enrolled libraries...', error);
        }
        
        

    },  

    // SET NEW SELECTED LIBRARY
    setNewSelectedLibrary: (newLibrary: ILibrary) => {
        set({selectedLibrary: newLibrary, menuOptionSelected: MENU_OPTIONS.home});
    },

    addLibrary: (newLibrary: ILibrary) => {
        set((state:IMainStore) => ({...state, enrolledLibraries: [newLibrary, ...state.enrolledLibraries!]}));
    },

    // REMOVE LIBRARY
    removeLibraries: (libraryIds: string[], enrolledLibraries: ILibrary[]) => {
        let newEnrolled = _.cloneDeep(enrolledLibraries);

        // FILTER OUT
        newEnrolled = newEnrolled.filter((library:ILibrary) => !libraryIds.includes(library.id as string));

        set({enrolledLibraries: newEnrolled});
    }
});

const useMainStore = create(mainStore);

export default useMainStore;
