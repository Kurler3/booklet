import {memo} from 'react';
import { IBook } from '../../../../types/libraryTypes';
import { UserType } from '../../../../types/userTypes';
import { FUNC_DATE_TO_TXT } from '../../../../utils/functions';
import Button from '../../../Common/Button';
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
    

    //////////////
    // RENDER ////
    //////////////
    return (
        <div className='flex-1 w-full border p-2 rounded-lg shadow-md overflow-auto overflow-x-hidden mt-2 gap-2'>
                    {
                      filteredBooks.length > 0 ?  filteredBooks.map((book, index) => {
                            

                            const creator = allUsers?.find((user) => user.id === book.addedBy);

                            return (
                                <SelectedHomeBooksListItem 
                                    key={`selected_home_book_${book.id}_${index}`}
                                    creator={creator}
                                    book={book}
                                    canUserEditLibrary={canUserEditLibrary}
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