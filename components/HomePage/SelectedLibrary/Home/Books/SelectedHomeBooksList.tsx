import {memo, useCallback} from 'react';
import { IBook } from '../../../../../types/libraryTypes';
import { UserType } from '../../../../../types/userTypes';
import SelectedHomeBooksListItem from './SelectedHomeBooksListItem';


// PROPS INTERFACE
interface IProps {
    filteredBooks: IBook[];
    allUsers: UserType[] | null;
    canUserEditLibrary: boolean;
}

////////////////////////////////
// SELECTED HOME BOOKS LIST ////
////////////////////////////////

const SelectedHomeBooksList:React.FC<IProps> = ({
    filteredBooks,
    allUsers,
    canUserEditLibrary,
}) => {
    
    ////////////////
    // FUNCTIONS ///
    ////////////////
    
    const handleRequestIssue = useCallback((bookId: string) => {    
        try {
            
        } catch (error) {
            console.log('Error requesting book issue...', error);
        }
    }, []);
 

    //////////////
    // RENDER ////
    //////////////
    return (
        <div className='flex-1 w-full border p-2 rounded-lg shadow-md overflow-auto overflow-x-hidden mt-2 gap-4 flex flex-col'>
                    {
                      filteredBooks.length > 0 ?  filteredBooks.map((book, index) => {
                            

                            const creator = allUsers?.find((user) => user.id === book.addedBy);

                            return (
                                <SelectedHomeBooksListItem 
                                    key={`selected_home_book_${book.id}_${index}`}
                                    creator={creator}
                                    book={book}
                                    canUserEditLibrary={canUserEditLibrary}
                                    handleRequestIssue={handleRequestIssue}
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