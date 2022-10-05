import {memo} from 'react';
import { ILibrary } from '../../../types/libraryTypes';

interface IProps {
    enrolledLibraries: ILibrary[];
    selectedLibraries: ILibrary[];
    searchValue: string;
    handleSearchValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

//////////////////////////////
// LIBRARY LIST CONTAINER ////
//////////////////////////////

const LibraryListContainer:React.FC<IProps> = ({
    enrolledLibraries,
    selectedLibraries,
    searchValue,
    handleSearchValueChange,
}) => {

    return (
        <div className='flex-1 flex flex-col justify-start items-start h-full border border-gray-400 rounded-lg shadow-lg bg-gray-200 p-3'>
            
            {/* SEARCH BAR */}
            <input 
                type="search"
                className="w-full focus:outline-none p-2 rounded-lg shadow-md"
                placeholder="Search for a library name..."
                value={searchValue}
                onChange={handleSearchValueChange}
            />

            {/* LIST CONTAINER */}
            {
                enrolledLibraries.length > 0 ?

                enrolledLibraries.map((library, index) => {


                    return (
                        <div
                            key={`library_list_container_${library.id}_${index}`}
                        >
                            {library.name}
                        </div>
                    );
                })
            
            :
            
                <div className='w-full flex-1 flex items-center justify-center'>
                    <span
                        className='font-bold text-[40px]'
                    >
                        You&apos;re not enrolled in any library yet :/
                    </span>
                </div>
            }

        </div>
    );
};

export default memo(LibraryListContainer);



