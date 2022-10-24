import { memo, useState, useCallback, useMemo } from 'react';
import { ILibrary } from '../../../../../types/libraryTypes';
import { UserType } from '../../../../../types/userTypes';
import Button from '../../../../Common/Button';
import { normalOptionBtnStyle, selectedOptionBtnStyle } from '../Books/SelectedHomeBooks';
import SelectedHomeAddUsersModal from './SelectedHomeAddUsersModal';


interface IProps {
    allUsers: UserType[];
    userProfile: UserType;
    selectedLibrary: ILibrary;
}

// RADIO OPTIONS
const RADIO_OPTIONS = {
    all: 'ALL',
    admins: 'ADMINS',
    librarians: 'LIBRARIANS',
}

//////////////////////////////////
// SELECTED HOME USERS ///////////
//////////////////////////////////

const SelectedHomeUsers: React.FC<IProps> = ({
    allUsers,
    userProfile,
    selectedLibrary,
}) => {

    /////////////////
    // STATE ////////
    /////////////////
    const [state, setState] = useState({
        radioOption: RADIO_OPTIONS.all,
        isShowAddUsersModal: false,
    });

    /////////////////
    // MEMO /////////
    /////////////////

    // ARRAY OF USERS THAT ARE EITHER ADMINS OR LIBRARIANS OF THIS LIBRARY
    const filteredUsers = useMemo(() => {

        let staffIds: string[] = [];

        switch (state.radioOption) {
            case RADIO_OPTIONS.all:
                staffIds = [
                    ...selectedLibrary.admins,
                    ...selectedLibrary.librarians,
                ];
                break;
            case RADIO_OPTIONS.admins:
                staffIds = selectedLibrary.admins;
                break;
            default:
                staffIds = selectedLibrary.librarians;
                break;
        };

        return allUsers.filter((user) => staffIds.includes(user.id));
    }, [allUsers, selectedLibrary.admins, selectedLibrary.librarians, state.radioOption]);

    // ARRAY OF USERS THAT ARE NOT STAFF IN THIS LIBRARY
    const availableUsers = useMemo(() => {
        const staffIds = [
            ...selectedLibrary.admins,
            ...selectedLibrary.librarians,
        ];
        return allUsers.filter((user) => !staffIds.includes(user.id));
    }, [allUsers, selectedLibrary.admins, selectedLibrary.librarians]);

    // IS CURRENT USER ADMIN OF THIS LIBRARY
    const isCurrentUserAdmin = useMemo(() => {
        return selectedLibrary.admins.includes(userProfile.id);
    }, [selectedLibrary.admins, userProfile.id]);

    /////////////////
    // FUNCTIONS ////
    /////////////////

    // HANDLE CLICK ON RADIO OPTION
    const handleSelectOption = useCallback((newOption: string) => {
        if (newOption !== state.radioOption) {
            setState((prevState) => {
                return {
                    ...prevState,
                    radioOption: newOption,
                }
            })
        }
    }, [state.radioOption]);

    // HANDLE SHOW/HIDE ADD USERS MODAL
    const handleShowHideAddUsersModal = useCallback(() => { 
        setState((prevState) => {
            return {
                ...prevState,
                isShowAddUsersModal: !prevState.isShowAddUsersModal,
            }
        })
    }, []);

    // HANDLE REMOVE USER
    const handleRemoveUser = useCallback((userIdToRemove:string) => {

    }, []);



    /////////////////
    // RENDER ///////
    /////////////////

    return (
        <div className='w-full h-full flex flex-col justify-start items-start p-3'>
            {/* FILTER RADIO + USERS NUM */}
            <div
                className='flex justify-between items-center w-full border p-3 bg-gray-200 rounded-lg'
            >
                {/* RADIOS */}
                <div className='flex justify-start items-center gap-4'>
                    {/* ALL */}
                    <div
                        className='flex items-center justify-center cursor-pointer'
                        onClick={() => handleSelectOption(RADIO_OPTIONS.all)}
                    >
                        <span className={state.radioOption === RADIO_OPTIONS.all ? selectedOptionBtnStyle : normalOptionBtnStyle}></span>
                        <span className='font-medium'>All</span>
                    </div>

                    {/* ADMINS */}
                    <div
                        className='flex items-center justify-center cursor-pointer'
                        onClick={() => handleSelectOption(RADIO_OPTIONS.admins)}
                    >
                        <span className={state.radioOption === RADIO_OPTIONS.admins ? selectedOptionBtnStyle : normalOptionBtnStyle}></span>
                        <span className='font-medium'>Admins</span>
                    </div>

                    {/* LIBRARIANS */}
                    <div
                        className='flex items-center justify-center cursor-pointer'
                        onClick={() => handleSelectOption(RADIO_OPTIONS.librarians)}
                    >
                        <span className={state.radioOption === RADIO_OPTIONS.librarians ? selectedOptionBtnStyle : normalOptionBtnStyle}></span>
                        <span className='font-medium'>Librarians</span>
                    </div>

                </div>

                {/* NUM USERS */}
                <span
                    className='font-semibold'
                >
                    Number of users: 
                    <span
                        className='text-gray-400 ml-1'
                    >
                        {filteredUsers.length}
                    </span>
                </span>
            </div>

            {/* LIST CONTAINER */}
            <div className='flex-1 flex flex-col w-full border p-2 rounded-lg shadow-md overflow-auto overflow-x-hidden mt-2 gap-4'>
                {
                    filteredUsers.length > 0 ?
                        filteredUsers.map((user, index) => {

                            // CHECK IF USER IS ADMIN OR LIBRARIAN
                            const isAdmin = selectedLibrary.admins.includes(user.id);

                            // CHECK IF LOGGED USER IS ADMIN
                            const isLoggedUserAdmin = selectedLibrary.admins.includes(userProfile.id);

                            return (
                                <div
                                    key={`selected_home_user_item_${user.id}_${index}`}
                                    className="flex items-center justify-between w-full bg-gray-200 p-3 rounded-lg shadow-md"
                                >
                                    {/* USERNAME + EMAIL */}
                                    <div
                                        className='flex flex-col'
                                    >
                                        <span className='text-capitalize font-bold text-lg'>
                                            {user.username}
                                            <span className='ml-1 font-medium text-sm text-gray-500'>
                                                {user.id === userProfile.id ? "(you)" : ""}
                                            </span>
                                        </span>
                                        <span className='text-gray-400 text-sm'>
                                            {user.email}
                                        </span>
                                    </div>

                                    {/* ADMINS/LIBRARIAN TAG */}
                                    <div className='flex justify-start items-center gap-3'>
                                        {/* DELETE BTN (IF ADMIN AND NOT THIS USER) */}
                                        {
                                            isLoggedUserAdmin && !isAdmin && user.id !== userProfile.id ?
                                            (
                                                <Button 
                                                    onClick={() => handleRemoveUser(user.id)}
                                                    icon="delete"
                                                    borderRadius="12px"
                                                    iconColor="red"
                                                />
                                            )
                                        :null}

                                        {/* TAG */}
                                        <div
                                            className={`
                                        p-2 ${isAdmin ? "bg-purple-500" : "bg-blue-400"} text-white font-bold rounded-md
                                         `}
                                        >
                                            {
                                                isAdmin ? "Admin" : "Librarian"
                                            }
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                        :
                        <div className='w-full h-full items-center justify-center flex'>
                            <span className='text-[35px] font-bold'>No users for this option!</span>
                        </div>
                }
            </div>

            {/* ADD USERS TO LIBRARY (IF ADMIN) */}
            {
                isCurrentUserAdmin &&
                <div
                    className='flex justify-start items-center p-2 w-full'
                >
                    {/* ADD USERS BTN */}
                    <Button
                        onClick={handleShowHideAddUsersModal}
                        txt="Add users"
                        icon="add"
                        btnCss='p-2 border bg-green-400 text-white cursor-pointer rounded-md transition hover:shadow-lg hover:bg-green-500 w-full font-bold text-xl'
                    />
                </div>
            }

            {/* ADD USERS MODAL */}
            {
                state.isShowAddUsersModal &&
                (
                    <SelectedHomeAddUsersModal 
                        handleShowHideAddUsersModal={handleShowHideAddUsersModal}
                        availableUsers={availableUsers}
                    />
                )
            }
        </div>
    );
};

export default memo(SelectedHomeUsers);