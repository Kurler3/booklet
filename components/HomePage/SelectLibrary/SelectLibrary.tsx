import React, {memo, useCallback, useMemo, useState} from 'react';
import { Circles } from 'react-loader-spinner';
import { ILibrary } from '../../../types/libraryTypes';
import { NORMAL_PURPLE } from '../../../utils/constants';
import LibraryListContainer from './LibraryListContainer';



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

    ///////////////
    // STATE //////
    ///////////////

    const [state, setState] = useState({
        selectedLibraries: [],
        searchValue: '',
    });

    ///////////////
    // FUNCTIONS //
    ///////////////

    const handleSearchValueChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => {
            return {
                ...prevState,
                searchValue: e.target.value,
            }
        });
    }, []);

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
        
            <div className='flex h-full w-full p-10'>

                {/* LIBRARY LIST CONTAINER */}
                <LibraryListContainer 
                    enrolledLibraries={filteredEnrolledLibraries}
                    selectedLibraries={state.selectedLibraries}
                    handleSearchValueChange={handleSearchValueChange}
                    searchValue={state.searchValue}
                />
                
                

            </div>
        
    );
};

export default memo(SelectLibrary);
