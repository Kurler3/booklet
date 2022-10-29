import { useMutation } from '@apollo/client';
import {memo, useCallback} from 'react';
import { CreateIssueRequest, DeleteIssueRequest } from '../../../../../graphql/issueRequests/mutations';
import useAppStore from '../../../../../store/appStore';
import useMainStore from '../../../../../store/mainStore';
import { IIssueRequest } from '../../../../../types/issueRequestTypes';
import { IBook, ILibrary } from '../../../../../types/libraryTypes';
import { UserType } from '../../../../../types/userTypes';
import { TOAST_TYPE_OPTIONS } from '../../../../../utils/constants';
import { showToast } from '../../../../../utils/functions';
import SelectedHomeBooksListItem from './SelectedHomeBooksListItem';


// PROPS INTERFACE
interface IProps {
    filteredBooks: IBook[];
    allUsers: UserType[] | null;
    canUserEditLibrary: boolean;
    selectedLibraryIssueRequests: IIssueRequest[];
    userProfile: UserType;
    selectedLibrary: ILibrary;
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
    selectedLibrary,
}) => {

    ////////////////
    // ZUSTAND /////
    ////////////////
    
    const {setAppLoading} = useAppStore();
    const {updateIssueRequest, deleteIssueRequest} = useMainStore(); 

    ////////////////
    // MUTATION ////
    ////////////////

    // CREATE ISSUE REQUEST MUTATION HOOK
    const [createIssueRequest, {}] = useMutation(
        // MUTATION STRING
        CreateIssueRequest,
        // OPTIONS
        {   
            // SUCCESS
            update(_, result) {

                // UPDATE MAIN STORE STATE
                updateIssueRequest(result.data.createLibraryIssueRequest);

                // SHOW TOAST   
                showToast(
                    TOAST_TYPE_OPTIONS.success,
                    "Issue request was created successfully!",
                );
            },
            // ON ERROR
            onError(error) {
                // LOG ERROR
                console.log("Error while creating issue request...", error);

                // SHOW ERROR TOAST
                showToast(
                    // ERROR TYPE
                    TOAST_TYPE_OPTIONS.error,
                    // MESSAGE
                    "Error creating issue request...",
                );
            }
        }
    );

    // DELETE ISSUE REQUEST MUTATION HOOK
    const [deleteIssueRequestMutation, {}] = useMutation(
        // MUTATION STRING
        DeleteIssueRequest,
        // OPTIONS
        {
            update(_, result) {
                // UPDATE MAIN STORE 
                deleteIssueRequest(result.data.deleteLibraryIssueRequest);

                // SHOW SUCCESS TOAST
                showToast(
                    TOAST_TYPE_OPTIONS.success,
                    "Issue request closed!"
                );
            },
            onError(error) {
                // LOG
                console.log("Error closing issue request...", error);
                // SHOW TOAST
                showToast(
                    TOAST_TYPE_OPTIONS.error,
                    "Error closing issue request..."
                );
            }
        }
    );

    ////////////////
    // FUNCTIONS ///
    ////////////////
    
    const handleRequestIssue = useCallback(async (bookId: string) => {    
        try {
            setAppLoading(true);

            await createIssueRequest(
                {
                    variables: {
                        libraryId: selectedLibrary.id,
                        userId: userProfile.id,
                        bookId: bookId,
                    }
                }
            );
            setAppLoading(false);
        } catch (error) {
            console.log('Error requesting book issue...', error);
        }
    }, [createIssueRequest, selectedLibrary.id, setAppLoading, userProfile.id]);
    
    // HANDLE CLOSE ISSUE REQUEST 
    const handleRemoveIssueRequest = useCallback(async (issueRequest:IIssueRequest) => {
        try {
            setAppLoading(true);

            await deleteIssueRequestMutation(
                {
                    variables: {
                        issueRequestId: issueRequest.id,
                        userId: userProfile.id,
                        issueRequestCreatorId: issueRequest.requestingUserId,
                    }
                }
            );

            setAppLoading(false);
        } catch (error) {   
            console.log('Error closing issue request...', error);
            setAppLoading(false);
        }
    },[deleteIssueRequestMutation, setAppLoading, userProfile.id]);
    
    //////////////
    // RENDER ////
    //////////////
    return (
        <div className='w-full border p-2 rounded-lg shadow-md overflow-auto overflow-x-hidden mt-2 gap-4 flex flex-col'>
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
                                    issueRequest={issueRequest ?? null}
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