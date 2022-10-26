import { useMutation } from '@apollo/client';
import {memo, useCallback} from 'react';
import { CreateIssueRequest } from '../../../../../graphql/issueRequests/mutations';
import { IIssueRequest } from '../../../../../types/issueRequestTypes';
import { IBook } from '../../../../../types/libraryTypes';
import { UserType } from '../../../../../types/userTypes';
import SelectedHomeBooksListItem from './SelectedHomeBooksListItem';


// PROPS INTERFACE
interface IProps {
    filteredBooks: IBook[];
    allUsers: UserType[] | null;
    canUserEditLibrary: boolean;
    selectedLibraryIssueRequests: IIssueRequest[];
    userProfile: UserType;
}

////////////////////////////////
// SELECTED HOME BOOKS LIST ////
////////////////////////////////

const SelectedHomeBooksList:React.FC<IProps> = ({
    filteredBooks,
    allUsers,
    canUserEditLibrary,
    selectedLibraryIssueRequests,
    userProfile,
}) => {
    
    ////////////////
    // MUTATION ////
    ////////////////

    // const [createIssueRequest, {}] = useMutation(
    //     // MUTATION STRING
    //     CreateIssueRequest,
    //     // OPTIONS
    //     {
    //         update(_, result)
    //     }
    // );

    ////////////////
    // FUNCTIONS ///
    ////////////////
    
    const handleRequestIssue = useCallback((bookId: string) => {    
        try {
            
        } catch (error) {
            console.log('Error requesting book issue...', error);
        }
    }, []);
    
    // HANDLE CLOSE ISSUE REQUEST 
    const handleRemoveIssueRequest = useCallback((issueRequestId:string) => {
        try {
            
        } catch (error) {
            console.log('Error closing issue request...', error);
        }
    },[]);

    //////////////
    // RENDER ////
    //////////////
    return (
        <div className='flex-1 w-full border p-2 rounded-lg shadow-md overflow-auto overflow-x-hidden mt-2 gap-4 flex flex-col'>
                    {
                      filteredBooks.length > 0 ?  filteredBooks.map((book, index) => {
                            
                            // TRY TO FIND A ISSUE REQUEST FOR THIS LIBRARY + THIS BOOK + THIS USER
                            let issueRequest = selectedLibraryIssueRequests.find((issueRequest) => issueRequest.requestingUserId === userProfile.id && issueRequest.bookId === book.id);

                            const creator = allUsers?.find((user) => user.id === book.addedBy); 

                            return (
                                <SelectedHomeBooksListItem 
                                    key={`selected_home_book_${book.id}_${index}`}
                                    creator={creator}
                                    book={book}
                                    canUserEditLibrary={canUserEditLibrary}
                                    handleRequestIssue={handleRequestIssue}
                                    issueRequestId={issueRequest ? issueRequest.id : null}
                                    handleRemoveIssueRequest={handleRemoveIssueRequest}
                                />
                            )
                        })

                        :
                        <div className='w-full h-full items-center justify-center flex'>
                            <span className='text-[35px] font-bold'>No Books Yet</span>
                        </div>
                    }
                    
                </div>  
    );
};

export default memo(SelectedHomeBooksList);