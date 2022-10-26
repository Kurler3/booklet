import {memo, useMemo} from 'react';
import {  ILibrary } from '../../../../types/libraryTypes';
import { FUNC_SORT_LIBRARIES_BY_USER_ROLE } from '../../../../utils/functions';

// PROPS INTERFACE 
interface IProps {
    selectedLibrary:ILibrary;
    allLibraries: ILibrary[];
    loggedUserId: string;
}

//////////////////////////////
// SELECTED CHANGE LIBRARY ///
//////////////////////////////

const SelectedChangeLibrary:React.FC<IProps> = ({
    selectedLibrary,
    allLibraries,
    loggedUserId,
}) => {


    //////////////
    // MEMO //////
    //////////////

    const selectableLibraries = useMemo(() => {
        const filteredLibraries = allLibraries.filter((library) => library.id !== selectedLibrary.id);

        return FUNC_SORT_LIBRARIES_BY_USER_ROLE(filteredLibraries, loggedUserId);
    }, [allLibraries, loggedUserId, selectedLibrary.id]);
    
    
    //////////////
    // RENDER ////
    //////////////

    return (
        <div className='flex flex-1 w-full p-4 overflow-x-hidden overflow-y-auto flex-col justify-start items-start'>
            {
                selectableLibraries.length > 0 ?
                
                selectableLibraries.map((library, index) => {

                    return (
                        <div 
                            key={`selected_change_library_library_row_${library.id}_${index}`}
                            className='p-2 flex items-center w-full bg-white mt-2 border rounded-md cursor-pointer
                                
                            '
                        >
                            <span className='flex-1 truncate font-semibold'>
                                {library.name}
                            </span>
                        </div>   
                    )
                })
                :
                <div className='w-full h-full flex items-center justify-center'>
                    <span className='font-bold text-[30px]'>
                        No other available libraries
                    </span>
                </div>
            }
        </div>
    );
};

// EXPORT
export default memo(SelectedChangeLibrary);