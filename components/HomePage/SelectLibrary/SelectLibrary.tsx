import { useMutation } from '@apollo/client';
import React, {memo, useCallback, useMemo, useState} from 'react';
import { Circles } from 'react-loader-spinner';
import { ActionMeta, MultiValue } from 'react-select';
import { CREATE_LIBRARY } from '../../../graphql/users/mutations';
import useAppStore from '../../../store/appStore';
import useAuthStore from '../../../store/authStore';
import useMainStore from '../../../store/mainStore';
import { ISelectOption } from '../../../types/inputTypes';
import { IDefaultLibrary, ILibrary } from '../../../types/libraryTypes';
import { DEFAULT_LIBRARY_OBJECT, NORMAL_PURPLE, TOAST_TYPE_OPTIONS } from '../../../utils/constants';
import { showToast } from '../../../utils/functions';
import LibraryListContainer from './LibraryListContainer';
import SelectLibraryCreateModal from './SelectLibraryCreateModal';
import SelectLibrarySideBar from './SelectLibrarySideBar';



interface IProps {
    loading: boolean;
    enrolledLibraries: null | ILibrary[];
}
interface IState {
    selectedLibraries: ILibrary[];
    searchValue:string;
    isShowCreateModal:boolean;
    isLoadingCreate:boolean;
    newLibrary: IDefaultLibrary;
}
/////////////////////
// SELECT LIBRARY ///
/////////////////////

const SelectLibrary:React.FC<IProps> = ({
    loading,
    enrolledLibraries,
}) => {

    /////////////////
    // SET LOADING //
    /////////////////

    const {setAppLoading} = useAppStore();
    const {userProfile, allUsers} = useAuthStore();
    const {addLibrary} = useMainStore();
    
    ///////////////
    // STATE //////
    ///////////////

    const [state, setState] = useState<IState>({
        selectedLibraries: [],
        searchValue: '',
        isShowCreateModal: false,
        isLoadingCreate: false,
        newLibrary: DEFAULT_LIBRARY_OBJECT,
    });
 
    ////////////////
    // MUTATION ////
    ////////////////

    const [createLibraryMutation, {}] = useMutation(
        // CREATE LIBRARY MUTATION
        CREATE_LIBRARY,
        // OPTIONS
        {
            update(proxy, result) {

                // SHOW TOAST
                showToast(
                    TOAST_TYPE_OPTIONS.success,
                    "Library created!",
                );

                // ADD LIBRARY
                addLibrary(result.data.createLibrary);


                // SET NEW STATE
                setState(prevState => {
                    return {
                        ...prevState,
                        isShowCreateModal: false,
                        newLibrary: DEFAULT_LIBRARY_OBJECT,
                    }
                })
            },
            onError(err) {
                // HANDLE ERRORS
                console.log('Error creating library...', err);

                showToast(
                    TOAST_TYPE_OPTIONS.error,
                    "Error creating library...",
                );
            },
            variables: {
                userId: userProfile?.id,
                name: state.newLibrary.name,
                admins: [
                    userProfile?.id,
                    ...state.newLibrary.admins.map((adminObj) => {
                        return adminObj.value;
                    }),
                ],
                librarians: [
                    ...state.newLibrary.librarians.map((librarianObj) => {
                        return librarianObj.value;
                    }),
                ]
            }
        }
    ); 

    ///////////////
    // FUNCTIONS //
    ///////////////

    // HANDLE SEARCH VALUE CHANGE
    const handleSearchValueChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => {
            return {
                ...prevState,
                searchValue: e.target.value,
            }
        });
    }, []);

    // HANDLE ADD NEW LIBRARY
    const handleCreateLibraryClick = useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
        setState((prevState) => {
            return {
                ...prevState,
                isShowCreateModal: !prevState.isShowCreateModal,
            };
        });
    }, []);

    //TODO HANDLE DELETE SELECTED LIBRARIES
    const handleDeleteLibrariesClick = useCallback((e:React.MouseEvent<HTMLButtonElement>) => {

    }, []);

    //TODO HANDEL SELECT LIBRARY
    const handleSelectLibrary = useCallback((e:React.MouseEvent<HTMLButtonElement>) => {}, []);


    ////////////////////////////
    // CREATE LIBRARY MODAL ////
    ////////////////////////////

    // HANDLE INPUT TEXT CHANGE
    const handleCreateModalInputChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => {
            return {
                ...prevState,
                newLibrary: {
                    ...prevState.newLibrary,
                    [e.target.name]: e.target.value,
                },
            };
        });
    }, []);

    // HANDLE SELECT CHANGE
    const handleSelectChange = useCallback((newValue: MultiValue<unknown>, actionMeta: ActionMeta<unknown>) => {
        setState((prevState) => {
            return {
                ...prevState,
                [actionMeta.name as string]: newValue,
            };
        });
    }, []);

    // HANDLE CLOSE CREATE MODAL
    const handleCloseCreateModal = useCallback(() => {
        setState((prevState) => {
            return {
                ...prevState,
                isShowCreateModal: false,
                newLibrary: DEFAULT_LIBRARY_OBJECT,
            };
        });
    }, []);

    // HANDLE CREATE LIBRARY
    const handleConfirmCreateNewLibrary = useCallback(async () => {

        try {
            // SET APP STORE LOADING TO TRUE
            setAppLoading(true);

            await createLibraryMutation();

            // SET APP STORE LOADING TO FALSE
            setAppLoading(false);
        } catch (error) {
            console.log('Error creating library...', error);

            // SET APP STORE LOADING TO FALSE
            setAppLoading(false);
        }
    }, [createLibraryMutation, setAppLoading])

    ///////////////
    // MEMO ///////
    ///////////////

    const filteredEnrolledLibraries = useMemo(() => {
        if(enrolledLibraries) {
            return enrolledLibraries.filter((library) => library.name.includes(state.searchValue));
        }
        else return [];
    }, [enrolledLibraries, state.searchValue]);


    // HANDLE CLICK LIBRARY CHECKBOX
    const handleClickLibraryCheckbox = useCallback((library?: ILibrary) => {

        setState((prevState) => {

            let newSelected = prevState.selectedLibraries;

            // IF CLICKING IN TOP MOST SELECTED THING
            if(!library) {
                if(newSelected.length > 0) newSelected = [];
                else newSelected = filteredEnrolledLibraries;
            }
            // ELSE IF LIBRARY WAS PROVIDED
            else {
                // TRY TO FIND INDEX
                const findIndex =  newSelected.findIndex((selected) => selected.id === library.id);
                console.log("Index:", findIndex)
                // IF WAS FOUND, THEN REMOVE
                if(findIndex > -1) {
                    newSelected.splice(findIndex, 1);
                }   
                // ELSE ADD
                else {
                    newSelected.push(library);
                }
            }


            return {
                ...prevState,
                selectedLibraries: newSelected,
            }
        })

    }, [filteredEnrolledLibraries]);
    console.log('Selected: ', state.selectedLibraries)
    ///////////////
    // RENDER /////
    ///////////////

    return (
        loading ?
            <div className="top-0 left-0 absolute backdrop-blur-[2px] flex flex-col justify-center items-center w-full h-full">

                {/* SPINNER */}
                <Circles
                    color={NORMAL_PURPLE}
                    height={100}
                    width={100}
                />

                <span className='mt-10 font-semibold text-[20px]'>Fetching enrolled libraries...</span>
            </div>
        :
        
            <div className='flex h-full w-full p-10 gap-4 relative'>

                {/* LIBRARY LIST CONTAINER */}
                <LibraryListContainer 
                    enrolledLibraries={filteredEnrolledLibraries}
                    selectedLibraries={state.selectedLibraries}
                    handleSearchValueChange={handleSearchValueChange}
                    searchValue={state.searchValue}
                    loggedUserId={userProfile?.id!}
                    handleClickLibraryCheckbox={handleClickLibraryCheckbox}
                />
                
                
                <SelectLibrarySideBar 
                   selectedLibraries={state.selectedLibraries}
                   handleCreateLibraryClick={handleCreateLibraryClick}
                   handleDeleteLibrariesClick={handleDeleteLibrariesClick}
                   handleSelectLibrary={handleSelectLibrary}
                />

                {/* CREATE MODAL */}
                {
                    state.isShowCreateModal &&
                    (
                        <SelectLibraryCreateModal 
                            handleCloseCreateModal={handleCloseCreateModal}
                            handleConfirmCreateNewLibrary={handleConfirmCreateNewLibrary}
                            newLibrary={state.newLibrary}
                            handleInputChange={handleCreateModalInputChange}
                            handleSelectChange={handleSelectChange}
                        />
                    )
                }

            </div>

    );
};

export default memo(SelectLibrary);
