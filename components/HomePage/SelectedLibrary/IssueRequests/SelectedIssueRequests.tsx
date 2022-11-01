import { useMutation } from '@apollo/client';
import { memo, useMemo, useCallback} from 'react';
import { Circles } from 'react-loader-spinner';
import { DeleteIssueRequest } from '../../../../graphql/issueRequests/mutations';
import useAppStore from '../../../../store/appStore';
import useMainStore from '../../../../store/mainStore';
import { IIssueRequest } from '../../../../types/issueRequestTypes';
import { IBook, ILibrary } from '../../../../types/libraryTypes';
import { UserType } from '../../../../types/userTypes';
import { NORMAL_PURPLE, TOAST_TYPE_OPTIONS } from '../../../../utils/constants';
import { FUNC_DATE_TO_TXT, showToast } from '../../../../utils/functions';
import Button from '../../../Common/Button';


// PROPS INTERFACE
interface IProps {
    selectedLibrary: ILibrary;
    selectedLibraryIssueRequests: IIssueRequest[];
    allBooks: IBook[] | null;
    allUsers: UserType[] | null;
    userProfile: UserType;
}

////////////////////////////////
// SELECTED ISSUE REQUESTS /////
////////////////////////////////

const SelectedIssueRequests: React.FC<IProps> = ({
    selectedLibrary,
    selectedLibraryIssueRequests,
    allBooks,
    allUsers,
    userProfile,
}) => {
    ////////////////
    // ZUSTAND /////
    ////////////////

    const {deleteIssueRequest} = useMainStore();
    const {setAppLoading} = useAppStore();

    ////////////////
    // MEMOS ///////
    ////////////////

    // FILTER BOOKS FOR ONLY BOOKS OF THE SELECTED LIBRARY
    const filteredBooks = useMemo(() => {
        return allBooks ? allBooks.filter((book) => {

            const isFromLibrary = book.libraryId === selectedLibrary.id;

            // const hasIssueRequest = selectedLibraryIssueRequests.findIndex((issueRequest) => issueRequest.bookId === book.id) !== -1;

            return isFromLibrary 
            // && hasIssueRequest;

        }) : [];
    }, [allBooks, selectedLibrary.id]);

    ////////////////
    // MUTATIONS ///
    ////////////////

     // DELETE ISSUE REQUEST MUTATION HOOK
     const [deleteIssueRequestMutation, {}] = useMutation(
        // MUTATION STRING
        DeleteIssueRequest,
        // OPTIONS
        {
            update(_, result, options) {
                // UPDATE MAIN STORE 
                deleteIssueRequest(
                    result.data.deleteLibraryIssueRequest,
                    options!.variables!.isAccepting,
                    userProfile.id,
                );

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

    // HANDLE ACCEPT REQUEST
    const handleAcceptCloseRequest = useCallback(
      async (issueRequestId: string,isAccepting:boolean) => {
        try {
            setAppLoading(true);

            await deleteIssueRequestMutation(
                {
                    variables: {
                        issueRequestId: issueRequestId,
                        userId: userProfile.id,
                        isAccepting: isAccepting,
                    }
                }
            );

            setAppLoading(false);
        } catch (error) {
            console.log(`Error ${isAccepting ? "accepting" : "declining"} issue request...`, error);
            setAppLoading(false);
        }
      },
      [deleteIssueRequestMutation, setAppLoading, userProfile.id],
    );
    

    ////////////////
    // RENDER //////
    ////////////////
    
    return (
        allBooks ?
            <div className='w-full h-full  flex flex-col justify-start items-start overflow-auto overflow-x-hidden gap-2 p-4'>
                {
                    selectedLibraryIssueRequests.length > 0 ?

                    selectedLibraryIssueRequests.map((issueRequest, index) => {

                            const book = filteredBooks.find((book) => book.id === issueRequest.bookId);
                            const requestedBy = allUsers ? allUsers.find((user) => user.id === issueRequest.requestingUserId) : null;
                            

                            return book ? (
                                <div
                                    key={`book_issue_resquest_item_${book.id}_${index}`}
                                    className="flex items-center justify-between w-full bg-gray-200 p-3 rounded-lg shadow-md"
                                >
                                    {/* BOOK INFO */}
                                    <div className="flex flex-col items-start justify-start">
                                        <span className="font-bold">
                                            {book.title}
                                        </span>
                                        {
                                            requestedBy &&
                                            <span className="text-[12px] text-gray-400">
                                                Requested by:
                                                <span className='font-bold ml-1'>
                                                    {requestedBy.username}
                                                </span>

                                            </span>
                                        }
                                        <span className='text-[12px] text-gray-400'>
                                            Requested at: <span className='font-bold'>{FUNC_DATE_TO_TXT(new Date(issueRequest.createdAt), '/')}</span>
                                        </span>
                                    </div>

                                    {/* ACCEPT/CANCEL ISSUE REQUEST */}
                                    <div className='flex justify-center items-center gap-4'>
                                        {/* ACCEPT BTN */}
                                        <Button 
                                            onClick={() => handleAcceptCloseRequest(issueRequest.id ,true)}
                                            icon="check"
                                            borderRadius='10px'
                                            iconColor='#1fcc27'
                                        />

                                        {/* REFUSE BTN */}
                                        <Button 
                                            onClick={() => handleAcceptCloseRequest(issueRequest.id , false)}
                                            icon="delete"
                                            borderRadius='10px'
                                            iconColor='red'
                                        />
                                    </div>
                                </div>
                            ) : null
                        })
                        :
                        <div
                            className="flex justify-center items-center w-full h-full"
                        >
                            <span className='font-bold text-[30px]'>
                                No Issue Requests Yet!
                            </span>
                        </div>
                }
            </div>
            :
            <div className="top-0 left-0 absolute backdrop-blur-[2px] flex flex-col justify-center items-center w-full h-full">

                {/* SPINNER */}
                <Circles
                    color={NORMAL_PURPLE}
                    height={100}
                    width={100}
                />

                <span className='mt-10 font-semibold text-[20px]'>Fetching enrolled libraries...</span>
            </div>
    );
};

// EXPORT
export default memo(SelectedIssueRequests);
