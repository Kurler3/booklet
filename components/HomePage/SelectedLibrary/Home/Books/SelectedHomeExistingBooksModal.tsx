import { useMutation } from '@apollo/client';
import _ from 'lodash';
import { memo, useCallback, useState, useMemo } from 'react';
import { AddExistingBooksMutation } from '../../../../../graphql/books/mutations';
import useAppStore from '../../../../../store/appStore';
import useMainStore from '../../../../../store/mainStore';
import { IBook } from '../../../../../types/libraryTypes';
import { UserType } from '../../../../../types/userTypes';
import { TOAST_TYPE_OPTIONS } from '../../../../../utils/constants';
import { showToast } from '../../../../../utils/functions';
import Button from '../../../../Common/Button';
import Modal from '../../../../Common/Modal';


// PROPS INTERFACE
interface IProps {
    availableBooksToAdd: IBook[];
    handleShowHideAddExistingBooksModal: () => void;
    selectedLibraryId:string|number;
    loggedUserId: string;
}

// STATE INTERFACE
interface IState {
    selectedBooks: IBook[];
    searchValue: string;
}

/////////////////////////////////////////////////
// SELECTED HOME EXISTING BOOKS MODAL ///////////
/////////////////////////////////////////////////

const SelectedHomeExistingBooksModal: React.FC<IProps> = ({
    availableBooksToAdd,
    handleShowHideAddExistingBooksModal,
    selectedLibraryId,
    loggedUserId
}) => {

    /////////////////
    // MAIN STORE ///
    /////////////////
    const {addExistingBooks} = useMainStore();
    const {setAppLoading} = useAppStore();

    /////////////
    // STATE ////
    /////////////

    const [state, setState] = useState<IState>({
        selectedBooks: [],
        searchValue: '',
    });

    /////////////
    // MEMO /////
    /////////////

    const filteredBooks = useMemo(() => {
        return availableBooksToAdd.filter((book) => {

            const isPassSearchFilter = state.searchValue.length > 0 ? book.title.includes(state.searchValue) : true;

            return isPassSearchFilter;
        });
    }, [availableBooksToAdd, state.searchValue]);

    /////////////////
    // MUTATION /////
    /////////////////

    const [addExistingBooksMutation, {}] = useMutation(
        // ADD EXISTING BOOKS MUTATION
        AddExistingBooksMutation,
        // OPTIONS
        {
            update(_, result) {

                // SHOW SUCCESS TOAST
                showToast(
                    // SUCCESS TYPE
                    TOAST_TYPE_OPTIONS.success,
                    // MESSAGE
                    `Book${state.selectedBooks.length > 1 ? "s" : ""} added!`,
                );

                // UPDATE MAIN STORE
                addExistingBooks(result.data.addExistingBooks);

                // CLOSE MODAL
                handleShowHideAddExistingBooksModal(); 
            },
            onError(error) {
                console.log('Error adding existing books...', error);
                showToast(
                    // ERROR TYPE
                    TOAST_TYPE_OPTIONS.error,
                    // MESSAGE
                    "Error adding existing books...",
                );
            },
            variables: {
                bookIds: state.selectedBooks.map((book) => book.id),
                libraryId: selectedLibraryId,
                userId: loggedUserId,
            }
        }
    );

    /////////////////
    // FUNCTIONS ////
    /////////////////

    // HANDLE CLICK GLOBAL CHECKBOX
    const handleClickGlobalCheckbox = useCallback(() => {
        setState((prevState) => {
            return {
                ...prevState,
                selectedBooks: prevState.selectedBooks.length === filteredBooks.length ? [] : filteredBooks,
            };
        });
    }, [filteredBooks]);

    // HANDLE SEARCH INPUT VALUE CHANGE
    const handleSearchValueChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => {
            return {
                ...prevState,
                searchValue: e.target.value,
            }
        })
    }, []);

    // HANDLE CLICK BOOK ROW CHECKBOX
    const handleClickCheckbox = useCallback((book:IBook) => {
        setState((prevState) => {

            let newSelectedBooks = _.cloneDeep(prevState.selectedBooks);

            const findIndex = newSelectedBooks.findIndex((selectedBook) => selectedBook.id === book.id);

            if(findIndex > -1) {
                newSelectedBooks.splice(findIndex, 1);
            }
            else {
                newSelectedBooks.push(book);
            }


            return {
                ...prevState,
                selectedBooks: newSelectedBooks,
            };
        });
    }, []);

    // HANDLE CONFIRM ADD SELECTED BOOKS
    const handleConfirm = useCallback(async () => {
        try {   
            setAppLoading(true);

            await addExistingBooksMutation();

            setAppLoading(false);
        } catch (error) {
            console.log('Error adding existing books...', error);
            setAppLoading(false);
        }
    }, [addExistingBooksMutation, setAppLoading]); 

    /////////////
    // RENDER ///
    /////////////

    return (
        <Modal
            handleCloseModal={handleShowHideAddExistingBooksModal}
            handleConfirm={handleConfirm}
            icon="add"
            modalTitle="Add existing books"
            canSave={state.selectedBooks.length > 0 && availableBooksToAdd.length > 0 && filteredBooks.length > 0}
            confirmText="Add"
        >       
        {
            availableBooksToAdd.length > 0 ?
            <div className='flex flex-col justify-start items-start w-full h-full'>
                    {/* SELECT ALL CHECKBOX + SEARCH INPUT */}
                    <div className='flex justify-start items-center border-b w-full py-4 px-2'>
                        {/* ALL CHECKBOX */}
                        <Button 
                            onClick={handleClickGlobalCheckbox}
                            btnCss={`
                                w-[20px] h-[20px]
                                ${state.selectedBooks.length === filteredBooks.length && state.selectedBooks.length > 0 ? "bg-blue-400" : "bg-gray-300"} hover:bg-blue-400 transition hover:scale-[1.1] shadow-md rounded-md mr-2
                            `}
                        />
                        {/* SEARCH INPUT */}
                        <input 
                            type="search"
                            className="flex-1 transition focus:outline-none focus:shadow-lg bg-gray-200 p-2 rounded-lg shadow-md"
                            placeholder='Search for a book...'
                            value={state.searchValue}
                            onChange={handleSearchValueChange}
                        />
                    </div>
                    

                    {/* LIST */}
                    <div className='flex flex-col justify-start items-start w-full flex-1 gap-4 overflow-auto'>
                        {
                            filteredBooks.map((book, index) => {

                                const isSelected = state.selectedBooks.find((selectedBook)=>selectedBook.id === book.id);

                                return (
                                    <div
                                        key={`selected_home_existing_books_modal_item_${book.id}_${index}`}
                                        className="flex items-center justify-start w-full bg-gray-200 p-2 rounded-lg shadow-md opacityIn"
                                    >

                                        {/* CHECK BOX */}
                                        <Button 
                                            onClick={() => handleClickCheckbox(book)}
                                            btnCss={`
                                                w-[20px] h-[20px]
                                                ${isSelected ? "bg-blue-400" : "bg-gray-300"} hover:bg-blue-400 transition hover:scale-[1.1] shadow-md rounded-md mr-2
                                            `}
                                        />

                                        {/* TITLE */}
                                        <span className='font-semibold'>
                                            {book.title}
                                        </span>

                                    </div>
                                )
                            })
                        }
                    </div>
                    
                </div>
                :
                <div className='w-full h-full flex justify-center items-center'>
                    <span className='font-bold text-[35px]'>
                        No Books Available to Add
                    </span>
                </div>
                    
        }
                
        </Modal>
    );
};

export default memo(SelectedHomeExistingBooksModal);