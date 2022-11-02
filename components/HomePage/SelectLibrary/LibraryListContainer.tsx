import {memo, useMemo} from 'react';
import { ILibrary } from '../../../types/libraryTypes';
import { FUNC_SORT_LIBRARIES_BY_USER_ROLE } from '../../../utils/functions';
import Button from '../../Common/Button';

interface IProps {
    allLibraries: ILibrary[];
    selectedLibraries: ILibrary[];
    searchValue: string;
    handleSearchValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    loggedUserId: string;
    handleClickLibraryCheckbox: (library?: ILibrary) => void;
};

//////////////////////////////
// LIBRARY LIST CONTAINER ////
//////////////////////////////

const LibraryListContainer:React.FC<IProps> = ({
    allLibraries,
    selectedLibraries,
    searchValue,
    handleSearchValueChange,
    loggedUserId,
    handleClickLibraryCheckbox,
}) => {

    /////////////////
    // MEMO /////////
    /////////////////

    const isEverythingSelected = useMemo(() => {
        return selectedLibraries.length === allLibraries.length && selectedLibraries.length > 0;
    }, [allLibraries.length, selectedLibraries.length]);


    // SORTED LIBRARIES
    const sortedLibraries = useMemo(() => {
        return FUNC_SORT_LIBRARIES_BY_USER_ROLE(allLibraries, loggedUserId);
    }, [allLibraries, loggedUserId]);

    /////////////////
    // RENDER ///////
    /////////////////
    return (
        <div className='flex-1 flex flex-col justify-start items-start border border-gray-400 rounded-lg shadow-lg bg-gray-200'>
            
            {/* SEARCH BAR */}

            <div className='flex w-full justify-start items-center border-b border-b-gray-400'
                style={{
                    padding: '8px 8px 8px 15px'
                }}
            >

                <Button 
                    onClick={() => handleClickLibraryCheckbox()}
                    btnCss={`w-[20px] h-[20px] ${isEverythingSelected ? "bg-blue-400" : "bg-gray-300"} hover:bg-blue-400 transition hover:scale-[1.1] shadow-lg mr-2 rounded-md`}
                    key={`library_list_container_all_select_btn`}
                />

                <input 
                    type="search"
                    className="flex-1 focus:outline-none p-2 rounded-lg shadow-md"
                    placeholder="Search for a library name..."
                    value={searchValue}
                    onChange={handleSearchValueChange}
                />
            </div>

            {/* LIST CONTAINER */}
            {
                sortedLibraries.length > 0 ?
                <div
                className='w-full h-[90%] overflow-auto overflow-x-hidden flex flex-col justify-start items-start p-2 '
            >
                {sortedLibraries.map((library, index) => {

                    // CHECK IF LOGGED USER IS ADMIN OF THIS LIBRARY
                    const isAdmin = library.admins.includes(loggedUserId);
                    // CHECK IF LOGGED USER IS LIBRARIAN OF THIS LIBRARY
                    const isLibrarian = library.librarians.includes(loggedUserId);

                    // CHECK IF THIS LIBRARY IS SELECTED
                    const isSelected = selectedLibraries.findIndex((selected) => selected.id === library.id) > -1;
                    
                    return (
                        <div
                            key={`library_list_container_${library.id}_${index}`}
                            className="p-2 flex items-center w-full bg-white mt-2 shadow-md border-b-gray-400 rounded-md cursor-pointer transition hover:shadow-lg"
                            onClick={() => handleClickLibraryCheckbox(library)}
                        >
                            <Button 
                                onClick={() => {}}
                                btnCss={`w-[20px] h-[20px] ${isSelected ? "bg-blue-400" : "bg-gray-300"} hover:bg-blue-400 transition hover:scale-[1.1] shadow-lg mr-2 rounded-md`}
                                key={`library_list_container_select_btn_${library.id}`}
                            />
                            
                            <span className='flex-1 truncate font-semibold'>
                                {library.name}
                            </span>

                            {
                                isAdmin || isLibrarian ?

                                <div
                                    className={`
                                        p-2 ${isAdmin ? 'bg-purple-500' : 'bg-blue-400'} text-white font-bold rounded-md
                                    `}
                                >
                                    {
                                        isAdmin ? "Admin" : "Librarian"
                                    }
                                </div>

                            :null}
                        </div>
                    );
                })}
             </div>
            :
            
                <div className='w-full flex-1 flex items-center justify-center'>
                    <span
                        className='font-bold text-[40px]'
                    >
                        No libraries found
                    </span>
                </div>
            }

        </div>
    );
};

export default memo(LibraryListContainer);



