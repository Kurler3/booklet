import React, {memo, useCallback, useMemo, useState} from 'react';
import { Circles } from 'react-loader-spinner';
import useAppStore from '../../../store/appStore';
import { ISelectOption } from '../../../types/inputTypes';
import { ILibrary } from '../../../types/libraryTypes';
import { NORMAL_PURPLE } from '../../../utils/constants';
import LibraryListContainer from './LibraryListContainer';
import SelectLibraryCreateModal from './SelectLibraryCreateModal';
import SelectLibrarySideBar from './SelectLibrarySideBar';



interface IProps {
    loading: boolean;
    enrolledLibraries: null | ILibrary[];
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

    ///////////////
    // STATE //////
    ///////////////

    const [state, setState] = useState({
        selectedLibraries: [],
        searchValue: '',
        isShowCreateModal: false,
        isLoadingCreate: false,
    });

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


    // HANDLE CLOSE CREATE MODAL
    const handleCloseCreateModal = useCallback(() => {
        setState((prevState) => {
            return {
                ...prevState,
                isShowCreateModal: false,
            };
        });
    }, []);

    // HANDLE CREATE LIBRARY
    const handleConfirmCreateNewLibrary = useCallback((
        name:string,
        admins:ISelectOption[],
        librarians:ISelectOption[],
    ) => {

        try {
            // SET APP STORE LOADING TO TRUE
            setAppLoading(true);

            // SET APP STORE LOADING TO FALSE
            // setAppLoading(false);
        } catch (error) {
            console.log('Error creating library...', error);

            // SET APP STORE LOADING TO FALSE
            setAppLoading(false);
        }
    }, [setAppLoading])

    ///////////////
    // MEMO ///////
    ///////////////

    const filteredEnrolledLibraries = useMemo(() => {
        if(enrolledLibraries) {
            return enrolledLibraries.filter((library) => library.name.includes(state.searchValue));
        }
        else return [];
    }, [enrolledLibraries, state.searchValue]);

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
                            
                        />
                    )
                }

            </div>

    );
};

export default memo(SelectLibrary);
