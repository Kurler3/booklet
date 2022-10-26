import { useMutation } from '@apollo/client';
import { memo, useCallback } from 'react';
import { RemoveBookMutation } from '../../../../../graphql/books/mutations';
import useAppStore from '../../../../../store/appStore';
import useMainStore from '../../../../../store/mainStore';
import { IBook } from '../../../../../types/libraryTypes';
import { UserType } from '../../../../../types/userTypes';
import { TOAST_TYPE_OPTIONS } from '../../../../../utils/constants';
import { FUNC_DATE_TO_TXT, showToast } from '../../../../../utils/functions';
import Button from '../../../../Common/Button';

// PROPS INTERFACE
interface IProps {
    creator: UserType | undefined;
    book: IBook;
    canUserEditLibrary: boolean;
    handleRequestIssue: (bookId:string) => void;
}

//////////////////////////////////////////
// SELECTED HOME BOOKS LIST ITEM /////////
//////////////////////////////////////////

const SelectedHomeBooksListItem: React.FC<IProps> = ({
    creator,
    book,
    canUserEditLibrary,
    handleRequestIssue,
}) => {
    
    const {setAppLoading} = useAppStore();
    const {removeBook} = useMainStore();

    //////////////////
    // MUTATION //////
    //////////////////

    const [removeBookMutation, {}] = useMutation(
        // REMOVE BOOK MUTATION
        RemoveBookMutation,
        // OPTIONS
        {
            update(_, result) {
                // SHOW SUCCESS TOAST
                showToast(
                    // SUCCESS TYPE
                    TOAST_TYPE_OPTIONS.success,
                    "Book removed!",
                );
                
                // UPDATE MAIN STORE STATE
                removeBook(result.data.removeBook);
            },
            // ON ERROR
            onError(error) {
                console.log('Error removing book...', error);
                showToast(
                    TOAST_TYPE_OPTIONS.error,
                    "Error removing book...",
                );
            },
            variables: {
                libraryId: book.libraryId,
                bookId: book.id,
            },
        }
    );


    //////////////////
    // FUNCTIONS /////
    //////////////////
    
    const handleDeleteBook = useCallback(async () => {
        try {
            // SET LOADING
            setAppLoading(true);

            // CALL REMOVE BOOK MUTATION HOOK
            await removeBookMutation();

            // SET LOADING FALSE
            setAppLoading(false);
        } catch (error) {
            console.log('Error removing book...', error);
            // SET LOADING FALSE
            setAppLoading(false);
        }
    }, [removeBookMutation, setAppLoading]);
   
    //////////////////
    // RENDER ////////
    //////////////////
    return (
        <div
            className='flex items-center justify-between w-full bg-gray-200 p-3 rounded-lg shadow-md'
        >
            <div className="flex flex-col items-start justify-start">
                <span className="font-bold">
                    {book.title}
                </span>
                {
                    creator &&
                    <span className="text-[12px] text-gray-400">
                        Added by:
                        <span className='font-bold ml-1'>
                            {creator.username}
                        </span>

                    </span>
                }
                <span className='text-[12px] text-gray-400'>
                    Added at: <span className='font-bold'>{FUNC_DATE_TO_TXT(new Date(book.addedAt), '/')}</span>
                </span>
            </div>
            {/* IF LOGGED USER IS NOT STAFF AND BOOK HAS NOT BEEN ISSUED TO SOMEONE YET */}
            {
                !canUserEditLibrary && book.issuedTo === null ?

                <Button 
                    icon="download"
                    onClick={() => handleRequestIssue(book.id)}
                    borderRadius="10px"
                    iconCss="text-green-400"
                />

            :null}

            {/* IF LOGGED USER IS ADMIN/LIBRARIAN */}
            {
                canUserEditLibrary &&
                <Button
                    icon="delete"
                    onClick={handleDeleteBook}
                    borderRadius="10px"
                    iconCss="text-red-400 hover:text-red-600"
                />
            }
        </div>
    );
};

export default memo(SelectedHomeBooksListItem);