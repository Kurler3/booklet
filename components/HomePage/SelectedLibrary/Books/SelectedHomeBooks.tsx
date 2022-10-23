import { useMutation } from '@apollo/client';
import { memo, useCallback, useMemo, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import { CreateBookMutation } from '../../../../graphql/books/mutations';
import useAppStore from '../../../../store/appStore';
import useAuthStore from '../../../../store/authStore';
import useMainStore from '../../../../store/mainStore';
import { IBook, ILibrary } from '../../../../types/libraryTypes';
import { NORMAL_PURPLE, TOAST_TYPE_OPTIONS } from '../../../../utils/constants';
import { FUNC_DATE_TO_TXT, showToast } from '../../../../utils/functions';
import Button from '../../../Common/Button';
import SelectedHomeBooksCreateModal from './SelectedHomeBooksCreateModal';
import SelectedHomeBooksList from './SelectedHomeBooksList';
import SelectedHomeExistingBooksModal from './SelectedHomeExistingBooksModal';



// PROPS INTERFACE
interface IProps {
    allBooks: IBook[] | null;
    selectedLibrary: ILibrary;
}

// NORMAL OTPION BTN STYLE
const normalOptionBtnStyle = "w-[20px] h-[20px] bg-gray-300 rounded-full mr-2 hover:bg-blue-400 transition cursor-pointer";

// SELECTED OPTION BTN STYLE
const selectedOptionBtnStyle = "w-[20px] h-[20px] rounded-full mr-2 bg-blue-400 cursor-default ";

// OPTION BTN OPTIONS
const OPTION_BTN_OPTIONS = {
    available: 'AVAILABLE',
    issued: 'ISSUED',
}

//////////////////////////
// SELECTED HOME BOOKS ///
//////////////////////////


const SelectedHomeBooks: React.FC<IProps> = ({
    allBooks,
    selectedLibrary,
}) => {
    
    //////////////
    // ZUSTAND ///
    //////////////
    
    const {userProfile, allUsers} = useAuthStore();
    const {addBook} = useMainStore();
    const {setAppLoading} = useAppStore();


    //////////////
    // STATE /////
    //////////////

    const [state, setState] = useState({
        optionBtnOption: OPTION_BTN_OPTIONS.available,
        isShowCreateBookModal: false,
        isShowAddExistingBooksModal: false,

        // NEW BOOK PROPERTIES
        title: '',
        description: '',
    });

    ////////////////
    // MUTATIONS ///
    ////////////////

    const [createBookMutation, {}] = useMutation(
        // CREATE BOOK MUTATION
        CreateBookMutation,
        // OPTIONS
        {
            update(proxy, result) {
                // SHOW SUCCESS TOAST
                showToast(
                    // SUCCESS TYPE
                    TOAST_TYPE_OPTIONS.success,
                    // MESSAGE 
                    "Book created!",
                );

                // UPDATE MAIN STORE STATE
                addBook(result.data.createBook);

                // SET NEW STATE
                setState((prevState) => {
                    return {
                        ...prevState,
                        isShowCreateBookModal: false,
                    };
                });
            },
            onError(error) {
                console.log('Error creating book...', error);
                showToast(
                    // ERROR TYPE
                    TOAST_TYPE_OPTIONS.error,
                    // MESSAGE
                    "Error creating book...",
                );
            },
            variables: {
                libraryId: selectedLibrary.id,
                userId: userProfile?.id,
                title: state.title,
                description: state.description,
            }
        }
    );

    ////////////////
    // FUNCTIONS ///
    ////////////////

    const handleSelectOption = useCallback((newOption: string) => {
        if (newOption !== state.optionBtnOption) {
            setState((prevState) => {
                return {
                    ...prevState,
                    optionBtnOption: newOption,
                }
            })
        }
    }, [state.optionBtnOption]);

    // HANDLE SHOW/HIDE CREATE BOOK MODAL
    const handleShowHideCreateBookModal = useCallback(() => {
        setState((prevState) => {
            return {
                ...prevState,
                isShowCreateBookModal: !prevState.isShowCreateBookModal,
            }
        });
    }, []);

    // HANDLE CONFIRM CREATE NEW BOOK
    const handleConfirmCreateNewBook = useCallback(() => {
        try {   
            // SET APP LOADING
            setAppLoading(true);

            // CALL MUTATION
            createBookMutation();

            // HIDE MODAL
            setState((prevState) => {
                return {
                    ...prevState,
                    isShowCreateBookModal: false,
                    title: '',
                    description: '',
                };
            });

            // UNSET APP LOADING
            setAppLoading(false);
        } catch (error) {
            console.log('Error creating book...', error);
            // UNSET APP LOADING
            setAppLoading(false);
        }
    }, [createBookMutation, setAppLoading]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
        setState((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    }, []);

    // SHOW/HIDE ADD EXISTING BOOKS MODAL
    const handleShowHideAddExistingBooksModal = useCallback(() => {
        setState((prevState) => {
            return {
                ...prevState,
                isShowAddExistingBooksModal: !prevState.isShowAddExistingBooksModal,
            };
        });
    }, []);

    //////////////
    // MEMO //////
    //////////////

    // FILTER BOOKS ACCORDING TO THE TAB CHOSEN
    const filteredBooks = useMemo(() => {
        // FILTER BOOKS OF THIS LIBRARY
        let currentLibraryBooks = allBooks?.filter((book) => book.libraryId && book.libraryId === selectedLibrary.id);

        // FILTER BY AVAILABLE 
        if(state.optionBtnOption === OPTION_BTN_OPTIONS.available) {
            currentLibraryBooks = currentLibraryBooks?.filter((book) => book.issuedBy === null);
        }
        // FILTER BY ISSUED
        else {
            currentLibraryBooks = currentLibraryBooks?.filter((book) => book.issuedBy !== null);
        }

        // RETURN
        return currentLibraryBooks ?? [];
    }, [allBooks, selectedLibrary.id, state.optionBtnOption]);
    
    // AVAILABLE BOOKS TO ADD
    const availableBooksToAdd = useMemo(() => {
        return allBooks ? allBooks.filter((book) => book.libraryId === null) : [];
    }, [allBooks]);

    // IF CURRENT USER HAS PERMISSION TO ADD/CREATE A BOOK
    const canUserEditLibrary = useMemo(() => {

        const wholeStaffIds = [
            ...selectedLibrary.admins,
            ...selectedLibrary.librarians,
        ];

        return wholeStaffIds.includes(userProfile?.id!);
    }, [selectedLibrary.admins, selectedLibrary.librarians, userProfile?.id]);

    //////////////
    // RENDER ////
    //////////////
    
    return (
        !allBooks ?

            (
                <div className="top-0 left-0 absolute backdrop-blur-[2px] flex justify-center items-center w-full h-full">

                    {/* SPINNER */}
                    <Circles
                        color={NORMAL_PURPLE}
                        height={150}
                        width={150}
                    />

                </div>
            )
            :

            <div className='w-full h-full flex flex-col justify-start items-start p-3'>
                {/* FILTER RADIO + ITEM NUM */}
                <div className='flex justify-between items-center w-full border p-3 bg-gray-200 rounded-lg'>
                    <div className='flex justify-start items-center gap-4'>
                        {/* AVAILABLE FILTER */}
                        <div className='flex items-center justify-center cursor-pointer' onClick={() => handleSelectOption(OPTION_BTN_OPTIONS.available)}>
                            <span className={state.optionBtnOption === OPTION_BTN_OPTIONS.available ? selectedOptionBtnStyle : normalOptionBtnStyle}></span>
                            <span className='font-medium'>Available</span>
                        </div>

                        {/* ISSUED RADIO */}
                        <div className='flex items-center justify-center cursor-pointer' onClick={() => handleSelectOption(OPTION_BTN_OPTIONS.issued)}>
                            <span className={state.optionBtnOption === OPTION_BTN_OPTIONS.issued ? selectedOptionBtnStyle : normalOptionBtnStyle}></span>
                            <span className='font-medium'>Issued</span>
                        </div>
                    </div>


                    {/* LENGTH */}
                    <span className='font-semibold'>
                        Number of books: <span className='text-gray-400'>{selectedLibrary.books?.length}</span>
                    </span>
                </div>

                {/* LIST OF BOOKS */}
                <SelectedHomeBooksList 
                    filteredBooks={filteredBooks}
                    allUsers={allUsers}
                    canUserEditLibrary={canUserEditLibrary}
                /> 

                {/* CREATE/ADD BOOK (IF ADMIN/LIBRARIAN) */}
                {
                    canUserEditLibrary &&
                    <div 
                        className='flex items-center justify-start w-full p-2 gap-3' 
                    >

                        {/* CREATE BOOK BTN */}
                        <div className='flex items-center justify-start bg-blue-400 text-white p-2 rounded-lg cursor-pointer font-bold hover:scale-[1.1] transition'
                            onClick={handleShowHideCreateBookModal}
                        >
                            <span className='material-icons'>
                                add
                            </span>
                            <div>Create book</div>
                        </div>

                        {/* ADD EXISTING BOOK BTN */}
                        <div className='flex items-center justify-start bg-green-400 text-white p-2 rounded-lg cursor-pointer font-bold hover:scale-[1.1] transition'
                            onClick={handleShowHideAddExistingBooksModal}
                        >
                            <span className='material-icons'>
                                list
                            </span>
                            <div>Add existing books</div>
                        </div>
                    </div>
                }

                {/* IF SHOWING CREATE BOOK MODAL */}
                {
                    state.isShowCreateBookModal &&
                    <SelectedHomeBooksCreateModal 
                        handleCloseModal={handleShowHideCreateBookModal}
                        handleConfirmCreateNewBook={handleConfirmCreateNewBook}
                        handleInputChange={handleInputChange}
                        title={state.title}
                        description={state.description}
                    />
                }

                {/* IF SHOWING ADD EXISTING BOOKS MODAL */}
                {
                    state.isShowAddExistingBooksModal &&

                    (
                        <SelectedHomeExistingBooksModal 
                            availableBooksToAdd={availableBooksToAdd}
                            handleShowHideAddExistingBooksModal={handleShowHideAddExistingBooksModal}
                            selectedLibraryId={selectedLibrary.id}
                            loggedUserId={userProfile?.id!}
                        />
                    )
                }
            </div>

    );
};

// EXPORT
export default memo(SelectedHomeBooks);