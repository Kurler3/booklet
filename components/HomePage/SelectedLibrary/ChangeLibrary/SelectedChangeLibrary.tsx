import {memo, useMemo} from 'react';
import {  ILibrary } from '../../../../types/libraryTypes';
import { UserType } from '../../../../types/userTypes';
import { FUNC_SORT_LIBRARIES_BY_USER_ROLE } from '../../../../utils/functions';
import SelectLibrary from '../../SelectLibrary/SelectLibrary';

// PROPS INTERFACE 
interface IProps {
    selectedLibrary:ILibrary;
    allLibraries: ILibrary[];
    userProfile: UserType;
    allUsers: UserType[]|null;
}

//////////////////////////////
// SELECTED CHANGE LIBRARY ///
//////////////////////////////

const SelectedChangeLibrary:React.FC<IProps> = ({
    selectedLibrary,
    allLibraries,
    userProfile,
    allUsers,
}) => {


    //////////////
    // MEMO //////
    //////////////

    const selectableLibraries = useMemo(() => {
        const filteredLibraries = allLibraries.filter((library) => library.id !== selectedLibrary.id);

        return FUNC_SORT_LIBRARIES_BY_USER_ROLE(filteredLibraries, userProfile.id);
    }, [allLibraries, selectedLibrary.id, userProfile.id]);
    
    
    //////////////
    // RENDER ////
    //////////////

    return (
        <div className='flex flex-1 justify-center items-center w-full bg-white'>
            <SelectLibrary 
                loading={false}
                allLibraries={selectableLibraries}
                userProfile={userProfile}
                allUsers={allUsers}
                padding="15px"
            />
        </div>
    );
};

// EXPORT
export default memo(SelectedChangeLibrary);