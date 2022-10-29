import {memo, useEffect} from 'react';
import useMainStore from '../../../store/mainStore';
import { IIssueRequest } from '../../../types/issueRequestTypes';
import { IBook, ILibrary } from '../../../types/libraryTypes';
import { UserType } from '../../../types/userTypes';
import { MENU_OPTIONS } from '../../../utils/constants';
import { FUNC_DATE_TO_TXT } from '../../../utils/functions';
import SelectedChangeLibrary from './ChangeLibrary/SelectedChangeLibrary';
import SelectedHome from './Home/SelectedHome';
import SelectedIssueRequests from './IssueRequests/SelectedIssueRequests';



// PROPS INTERFACE
interface IProps {
    selectedLibrary: ILibrary;
    fetchAllBooks: any;
    allBooks: IBook[] | null;
    menuOptionSelected: string;
    userProfile: UserType;
    allUsers: UserType[]|null;
    allLibraries: ILibrary[];
    selectedLibraryIssueRequests: IIssueRequest[];
}

/////////////////////////
// SELECTED LIBRARY /////
/////////////////////////

const SelectedLibrary:React.FC<IProps> = ({
    selectedLibrary,
    fetchAllBooks,
    allBooks,
    menuOptionSelected,
    userProfile,
    allUsers,
    allLibraries,
    selectedLibraryIssueRequests,
}) => {

    //////////////////
    // MAIN STORE ////
    //////////////////


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

            <div className='h-[15%] border-b border-b-gray-500 p-10 pb-4 flex flex-col justify-start items-center w-full'>

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
                        userProfile={userProfile}
                        allUsers={allUsers}
                        selectedLibraryIssueRequests={selectedLibraryIssueRequests}
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
                        allLibraries={allLibraries}
                        userProfile={userProfile}
                        allUsers={allUsers}
                    />
                )
                
            }
        </div>
    );
};

export default memo(SelectedLibrary);