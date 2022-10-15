import React, {memo, useEffect} from 'react';
import useAuthStore from '../../store/authStore';
import useMainStore from '../../store/mainStore';
import { UserType } from '../../types/userTypes';
import SelectedLibrary from './SelectedLibrary/SelectedLibrary';
import SelectLibrary from './SelectLibrary/SelectLibrary';



interface IProps {
    userProfile: UserType;
}

////////////////
// HOME ////////
////////////////

const MainPage:React.FC<IProps> = ({
    userProfile,
}) => {

    const {allUsers} = useAuthStore();

    // MAIN STORE
    const {
        selectedLibrary, 
        allLibraries, 
        fetchAllLibraries,
        loading,
    } = useMainStore(); 

    // FETCH ENROLLED LIBRARIES IF HASN'T YET
    useEffect(() => {
        if(allLibraries === null) {
            fetchAllLibraries();    
        }
    }, [allLibraries, allUsers, fetchAllLibraries, userProfile]);
    
    ////////////////
    // RENDER //////
    ////////////////
    return (
        <div className='relative w-full h-full'>
            {
                !selectedLibrary ?

                <SelectLibrary 
                    loading={loading}
                    allLibraries={allLibraries}
                />
                :
                <SelectedLibrary 
                    selectedLibrary={selectedLibrary}
                />
            }
        </div>
    );
};

export default memo(MainPage);
