import {memo, useEffect} from 'react';
import useMainStore from '../../../store/mainStore';
import { ILibrary } from '../../../types/libraryTypes';
import { MENU_OPTIONS } from '../../../utils/constants';
import { FUNC_DATE_TO_TXT } from '../../../utils/functions';
import SelectedChangeLibrary from './SelectedChangeLibrary';
import SelectedHome from './SelectedHome';
import SelectedIssueRequests from './SelectedIssueRequests';



// PROPS INTERFACE
interface IProps {
    selectedLibrary: ILibrary;
}

/////////////////////////
// SELECTED LIBRARY /////
/////////////////////////

const SelectedLibrary:React.FC<IProps> = ({
    selectedLibrary,
}) => {

    //////////////////
    // MAIN STORE ////
    //////////////////

    const {
        menuOptionSelected,
        allBooks,
        fetchAllBooks,
    } = useMainStore();


    // FETCH BOOKS
    useEffect(() => {
        if(!allBooks) {
            fetchAllBooks();    
        }
    }, [allBooks, fetchAllBooks]);

    /////////////
    // RENDER ///
    /////////////
    
    return (
        <div className='w-full h-full flex flex-col justify-start items-center'>

            <div className='border-b border-b-gray-500 p-10 pb-4 flex flex-col justify-start items-center w-full'>

                {/* LIBRARY NAME */}
                <span
                    className='font-bold text-[30px]'
                >
                    {selectedLibrary.name}
                </span>

                {/* CREATED AT */}
                <span
                    className='text-gray-500 text-[12px] mt-3'
                >
                  Created at: 
                    <span className='font-bold'>
                        {FUNC_DATE_TO_TXT(new Date(selectedLibrary.createdAt), '/')}
                    </span>
                </span>

            </div>
            
            {/* OPTIONS */}
            {
                menuOptionSelected === MENU_OPTIONS.home ?

                (
                    <SelectedHome 
                        selectedLibrary={selectedLibrary}
                        allBooks={allBooks}
                    />
                )
                :
                menuOptionSelected === MENU_OPTIONS.issueRequests ?
                (
                    <SelectedIssueRequests 
                        selectedLibrary={selectedLibrary}
                    />
                )
                :
                (
                    <SelectedChangeLibrary 
                        selectedLibrary={selectedLibrary}
                    />
                )
                
            }
        </div>
    );
};

export default memo(SelectedLibrary);