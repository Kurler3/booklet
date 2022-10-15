import _ from "lodash";
import create from "zustand";
import { 
    getAllLibrariesQuery, 
    // getEnrolledLibrariesQuery 
} from "../graphql/users/queries";
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
    allLibraries: ILibrary[] | null;

    // FETCH LIBRARIES THAT CURRENT LOGGED USER IS ENROLLED IN
    fetchAllLibraries: any;

    // SET NEW SELECTED LIBRARY
    setNewSelectedLibrary: any;

    // ADD LIBRARY
    addLibrary: any;

    // LOADING
    loading: boolean;

    // REMOVE LIBRARIES
    removeLibraries: any;

    // CHANGE SELECTED MENU OPTION
    changeSelectedMenuOption: any;
}

// STORE
const mainStore = (set: any):IMainStore => ({
    // MENU OPTION SELECTED
    menuOptionSelected: MENU_OPTIONS.home,

    // SELECTED LIBRARY
    selectedLibrary: null,

    // ENROLLED LIBRARIES
    allLibraries: null,

    // LOADING
    loading: false,

    // FETCH ENROLLED LIBRARIES
    fetchAllLibraries: async () => {
        // SET LOADING
        set({loading: true});

        try {
           
            // FETCH LIBRARIES THAT THIS USER IS ENROLLED IN
            const {data} = await client.query({
                // QUERY
                query: getAllLibrariesQuery,
            });
    
            // SET ENROLLED LIBRARIES + LOADING = FALSE    
            set({
                allLibraries: data.getAllLibraries,
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
        set((state:IMainStore) => ({...state, allLibraries: [newLibrary, ...state.allLibraries!]}));
    },

    // REMOVE LIBRARY
    removeLibraries: (libraryIds: string[]) => {
        set((state:IMainStore) => {

            let newAllLibraries = _.cloneDeep(state.allLibraries);

            newAllLibraries = newAllLibraries!.filter((library:ILibrary) => !libraryIds.includes(library.id as string));

            return {
                ...state,
                allLibraries: newAllLibraries,
            };
        });
    },

    // CHANGE SELECTED MENU OPTION
    changeSelectedMenuOption: (newOption: string) => {
        set((prevState:IMainStore) => {
            // IF CHOOSING NEW ONE
            if(prevState.menuOptionSelected !== newOption) {
                return {
                    ...prevState,
                    menuOptionSelected: newOption,
                };
            } 
        });
    }
});

const useMainStore = create(mainStore);

export default useMainStore;
