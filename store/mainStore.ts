import { ApolloClient } from "@apollo/client";
import _ from "lodash";
import create from "zustand";
import { GetAllBooksQuery } from "../graphql/books/queries";
import { GetLibraryIssueRequests } from "../graphql/issueRequests/queries";
import { getAllLibrariesQuery } from "../graphql/libraries/queries";
import { IIssueRequest } from "../types/issueRequestTypes";
import { IBook, ILibrary } from "../types/libraryTypes";
import { UserType } from "../types/userTypes";
import client from "../utils/ApolloClient";
import { MENU_OPTIONS } from "../utils/constants";

// TYPE
interface IMainStore {
  // MENU OPTION SELECTED
  menuOptionSelected: string;

  // SELECTED LIBRARY
  selectedLibrary: ILibrary | null;

  // SELECTED LIBRARY ISSUE REQUESTS
  selectedLibraryIssueRequests: IIssueRequest[]|null;

  // ALL LIBRARIES
  allLibraries: ILibrary[] | null;

  // ALL BOOKS
  allBooks: IBook[] | null;

  // FETCH LIBRARIES THAT CURRENT LOGGED USER IS ENROLLED IN
  fetchAllLibraries: any;

  // FETCH ALL BOOKS
  fetchAllBooks: any;

  // SET NEW SELECTED LIBRARY
  setNewSelectedLibrary: any;

  // ADD LIBRARY
  addLibrary: any;

  // ADD BOOK
  addBook: any;

  // ADD EXISTING BOOKS
  addExistingBooks: any;

  // LOADING
  loading: boolean;

  // REMOVE LIBRARIES
  removeLibraries: any;

  // REMOVE BOOK
  removeBook: any;

  // CHANGE SELECTED MENU OPTION
  changeSelectedMenuOption: any;

  // ADD USERS TO SELECTED LIBRARY
  addUsersToSelectedLibrary: any;

  // REMOVE USER FROM SELECTED LIBRARY
  removeUserFromSelectedLibrary: any;

  // UPDATE ISSUE REQUEST
  updateIssueRequest: any;

  // RESET MAIN STORE STATE FUNCTION
  resetMainStoreState: any;

  // DELETE ISSUE REQUEST
  deleteIssueRequest: any;

  fetchSelectedLibraryIssueRequests: any;

  returnBookFromMainStore: any;
}

// STORE
const mainStore = (set: any): IMainStore => ({
  // MENU OPTION SELECTED
  menuOptionSelected: MENU_OPTIONS.home,

  // SELECTED LIBRARY
  selectedLibrary: null,

  // SELECTED LIBRARY ISSUE REQUESTS
  selectedLibraryIssueRequests: null,

  // ALL LIBRARIES
  allLibraries: null,

  // ALL BOOKS
  allBooks: null,

  // LOADING
  loading: false,

  // FETCH ENROLLED LIBRARIES
  fetchAllLibraries: async () => {
    // SET LOADING
    set({ loading: true });

    try {
      // FETCH LIBRARIES THAT THIS USER IS ENROLLED IN
      const { data } = await client.query({
        // QUERY
        query: getAllLibrariesQuery,
      });

      // SET ENROLLED LIBRARIES + LOADING = FALSE
      set({
        allLibraries: data.getAllLibraries,
        loading: false,
      });
    } catch (error) {
      console.log("Error fetching enrolled libraries...", error);
    }
  },

  // FETCH ALL BOOKS
  fetchAllBooks: async () => {
    try {
      // FETCH LIBRARIES THAT THIS USER IS ENROLLED IN
      const { data } = await client.query({
        // QUERY
        query: GetAllBooksQuery,
      });

      // SET ENROLLED LIBRARIES + LOADING = FALSE
      set({
        allBooks: data.getAllBooks,
      });
    } catch (error) {
      console.log("Error fetching enrolled libraries...", error);
    }
  },

  // FETCH ISSUE REQUESTS
  fetchSelectedLibraryIssueRequests: async (libraryId: string) => {
    try {
       // FETCH ISSUE REQUESTS RELATED TO THE SELECTED LIBRARY
        const issueRequestResult = await client.query({
          query: GetLibraryIssueRequests,
          variables: {
            libraryId: libraryId,
          }
        });

      // SET ENROLLED LIBRARIES + LOADING = FALSE
      set({
        selectedLibraryIssueRequests: issueRequestResult.data.getLibraryIssueRequests,
      });
    } catch (error) {
      console.log("Error fetching enrolled libraries...", error);
    }
  },

  // SET NEW SELECTED LIBRARY
  setNewSelectedLibrary: async (newLibrary: ILibrary) => {

    set({ selectedLibrary: newLibrary, menuOptionSelected: MENU_OPTIONS.home,});
  },

  addLibrary: (newLibrary: ILibrary) => {
    set((state: IMainStore) => ({
      ...state,
      allLibraries: [newLibrary, ...state.allLibraries!],
    }));
  },

  // ADD BOOK
  addBook: (newBook: IBook) => {
    // ADD IT TO ALL BOOKS + ADD IT'S ID TO THE SELECTED LIBRARY BOOK IDS ARRAY
    set((state: IMainStore) => ({
      ...state,
      allBooks: [...state.allBooks!, newBook],
      selectedLibrary: {
        ...state.selectedLibrary!,
        books: [newBook.id, ...state.selectedLibrary?.books!],
      },
    }));
  },

  // ADD EXISTING BOOKS
  addExistingBooks: (booksToAdd: IBook[]) => {
    set((state: IMainStore) => {
      let newAllBooks = _.cloneDeep(state.allBooks);

      for (let book of booksToAdd) {
        const findIndex = newAllBooks?.findIndex(
          (bookFromState) => bookFromState.id === book.id
        );

        if (findIndex !== -1) {
          newAllBooks![findIndex!] = {
            ...newAllBooks![findIndex!],
            libraryId: book.libraryId,
            addedAt: book.addedAt,
            addedBy: book.addedBy,
          };
        }
      }

      return {
        ...state,
        allBooks: newAllBooks,
        seelctedLibrary: {
          ...state.selectedLibrary,
          books: [
            ...state.selectedLibrary?.books!,
            ...booksToAdd.map((book) => book.id),
          ],
        },
      };
    });
  },

  // REMOVE BOOK
  removeBook: (bookIdToDelete: string) => {
    set((state: IMainStore) => {
      let newSelectedLibraryBooks = _.cloneDeep(state.selectedLibrary!.books);

      newSelectedLibraryBooks = newSelectedLibraryBooks.filter(
        (bookId: string) => bookId !== bookIdToDelete
      );

      // NEW ALL BOOKS
      let newAllBooks = _.cloneDeep(state.allBooks);

      let newAllSelectedLibraryIssueRequests = _.cloneDeep(state.selectedLibraryIssueRequests);

      const findIndex = newAllBooks?.findIndex(
        (book) => book.id === bookIdToDelete
      );
      if (findIndex !== -1) {
        newAllBooks![findIndex!] = {
          ...newAllBooks![findIndex!],
          libraryId: null,
          issuedAt: null,
          issuedTo: null,
          issueDueDate: null,
          issuedBy: null,
          addedBy: null,
          addedAt: null,
          returnedAt: null,
        };

        // REMOVE ALL ISSUE REQUESTS THAT HAVE THIS BOOK ID
        newAllSelectedLibraryIssueRequests = newAllSelectedLibraryIssueRequests!.filter((issueRequest) => issueRequest.bookId === bookIdToDelete);
      }

      return {
        ...state,
        selectedLibrary: {
          ...state.selectedLibrary!,
          books: newSelectedLibraryBooks,
        },
        allBooks: newAllBooks,
        selectedLibraryIssueRequests: newAllSelectedLibraryIssueRequests,
      };
    });
  },

  // REMOVE LIBRARY
  removeLibraries: (libraryIds: string[]) => {
    set((state: IMainStore) => {
      let newAllLibraries = _.cloneDeep(state.allLibraries);
      let newAllBooks = _.cloneDeep(state.allBooks);

      newAllLibraries = newAllLibraries!.filter(
        (library: ILibrary) => !libraryIds.includes(library.id as string)
      );
      
      if(newAllBooks) {
        for(let i = 0, len = newAllBooks.length; i < len; i++){
          if(libraryIds.includes(newAllBooks[i].libraryId as string)) {
            newAllBooks[i] = {
              ...newAllBooks[i],
              libraryId: null,
              issuedAt: null,
              issueDueDate: null,
              issuedBy: null,
              addedBy: null,
              addedAt: null,
              returnedAt: null,
            }
          }
        }      
      }

      return {
        ...state,
        allLibraries: newAllLibraries,
      };
    });
  },

  // CHANGE SELECTED MENU OPTION
  changeSelectedMenuOption: (newOption: string) => {
    set((prevState: IMainStore) => {
      // IF CHOOSING NEW ONE

      return {
        ...prevState,
        menuOptionSelected:
          prevState.menuOptionSelected !== newOption
            ? newOption
            : prevState.menuOptionSelected,
      };
    });
  },

  // ADD USERS TO SELECTED LIBRARY
  addUsersToSelectedLibrary: (
    newAdmins: string[],
    newLibrarians: string[],
  ) => {

    set((state:IMainStore) => {

      let newSelectedLibrary = _.cloneDeep(state.selectedLibrary);

      newSelectedLibrary!.admins = newAdmins;
      newSelectedLibrary!.librarians = newLibrarians;

      return {
        ...state,
        selectedLibrary: newSelectedLibrary,
      }
    });
  },

  // REMOVE USER FROM SELECTED LIBRARY
  removeUserFromSelectedLibrary: (
    // USER ID TO REMOVE
    userIdToRemove:string,
  ) => {
    set((state:IMainStore) => {

      let newSelectedLibrary = _.cloneDeep(state.selectedLibrary);

      const findIndex = newSelectedLibrary!.librarians.findIndex((librarianId) => librarianId === userIdToRemove);

      newSelectedLibrary!.librarians.splice(findIndex, 1);

      // FROM ALL LIBRARIES NOW
      let newAllLibraries = _.cloneDeep(state.allLibraries);

      const globalIndex = newAllLibraries!.findIndex((library) => library.id === newSelectedLibrary!.id);

      newAllLibraries![globalIndex!] = newSelectedLibrary!;

      return {
        ...state,
        allLibraries: newAllLibraries,
        selectedLibrary: newSelectedLibrary,
      }

    })
  },

  // UPDATE ISSUE REQUEST
  updateIssueRequest: async (newIssueRequest:IIssueRequest) => {
    set((state:IMainStore) => {

      let newSelectedLibraryIssueRequests = _.cloneDeep(state.selectedLibraryIssueRequests!);

      // FIND INDEX
      const findIndex = newSelectedLibraryIssueRequests.findIndex((issueRequest) => issueRequest.id === newIssueRequest.id);

      if(findIndex !== -1) {
        newSelectedLibraryIssueRequests[findIndex] = newIssueRequest;
      }
      else {
        newSelectedLibraryIssueRequests.push(newIssueRequest);
      }

      return {
        ...state,
        selectedLibraryIssueRequests: newSelectedLibraryIssueRequests,
      };
    });
  },

  // RESET MAIN STORE STATE
  resetMainStoreState: () => {
    set((state: IMainStore) => {
      return {
        ...state,
        menuOptionSelected: MENU_OPTIONS.home,
        selectedLibrary: null,
        loading: false,
      }
    })
  },

  // DELETE ISSUE REQUEST
  deleteIssueRequest: (issueRequestId: string, isAccepting: boolean, userId: string) => {
    set((state: IMainStore) => {

      let newSelectedLibraryIssueRequests = _.cloneDeep(state.selectedLibraryIssueRequests);

      const findIndex = newSelectedLibraryIssueRequests!.findIndex((issueRequest) => issueRequest.id === issueRequestId);

      let newAllBooks = _.cloneDeep(state.allBooks);

      if(isAccepting) {
        const findBookIndex = newAllBooks!.findIndex((book) => book.id === newSelectedLibraryIssueRequests![findIndex].bookId);

        newAllBooks![findBookIndex] = {
          ...newAllBooks![findBookIndex],
          issuedAt: new Date().toISOString(),
          issueDueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          issuedBy: userId,
          issuedTo: newSelectedLibraryIssueRequests![findIndex].requestingUserId,
        };
      }

      newSelectedLibraryIssueRequests!.splice(findIndex, 1);

      return {
        ...state,
        selectedLibraryIssueRequests: newSelectedLibraryIssueRequests,
        allBooks: newAllBooks,
      };
    })
  },


  returnBookFromMainStore: (
    newBook: IBook,
  ) => {
    set((state:IMainStore) => {
      let newAllBooks = _.cloneDeep(state.allBooks);

      // FIND INDEX
      const findIndex = newAllBooks!.findIndex((book) => book.id === newBook.id);

      newAllBooks![findIndex] = newBook;

      return {
        ...state,
        allBooks: newAllBooks,
      };
    });
  },
});

const useMainStore = create(mainStore);

export default useMainStore;
