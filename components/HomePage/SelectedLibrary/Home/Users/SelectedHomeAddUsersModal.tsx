import { useMutation } from '@apollo/client';
import {memo, useCallback, useState, useMemo} from 'react';
import Select, { ActionMeta, MultiValue } from 'react-select';
import { ADD_USERS_TO_LIBRARY } from '../../../../../graphql/libraries/mutations';
import useAppStore from '../../../../../store/appStore';
import useAuthStore from '../../../../../store/authStore';
import useMainStore from '../../../../../store/mainStore';
import { UserType } from '../../../../../types/userTypes';
import { TOAST_TYPE_OPTIONS } from '../../../../../utils/constants';
import { showToast } from '../../../../../utils/functions';
import Modal from '../../../../Common/Modal';

// PROPS INTERFACE
interface IProps {
    handleShowHideAddUsersModal: () => void;
    availableUsers: UserType[];
    selectedLibraryId: string;
    loggedUserId: string;
}

// STATE INTERFACE
interface IState {
    admins: {
        label: string;
        value: string;
    }[];
    librarians: {
        label: string;
        value: string;
    }[];
}

////////////////////////////
// ADD USERS MODAL /////////
////////////////////////////

const SelectedHomeAddUsersModal:React.FC<IProps> = ({
    handleShowHideAddUsersModal,
    availableUsers,
    selectedLibraryId,
    loggedUserId,
}) => {

    ////////////////
    // ZUSTAND /////
    ////////////////
    const {addUsersToSelectedLibrary} = useMainStore();
    const {updateUsersLibraryEnrolled} = useAuthStore();
    const {setAppLoading} = useAppStore();

    ////////////////
    // STATE ///////
    ////////////////
    
    const [state, setState] = useState<IState>({
        admins: [],
        librarians: [],
    });

    ////////////////
    // MEMO ////////
    ////////////////

    // SELECTABLE USERS
    const selectableUsers = useMemo(()=> {
        return availableUsers.filter((user) => {
            const stateStaff = [
                ...state.admins,
                ...state.librarians,
            ];

            return stateStaff.find((staffObj) => staffObj.value === user.id) === undefined;
        }).map((user) => {
            return {
                label: user.username,
                value: user.id,
            }
        });
    }, [availableUsers, state.admins, state.librarians]);

    /////////////////
    // MUTATION /////
    /////////////////

    // ADD USERS TO LIBRARY MUTATION HOOK
    const [addUsersToLibraryMutation, {}] = useMutation(
        // MUTATION STRING
        ADD_USERS_TO_LIBRARY,
        // OPTIONS
        {
            update(_, result) {
                showToast(
                    // SUCCESS TYPE
                    TOAST_TYPE_OPTIONS.success,
                    // MESSAGE
                    "Users added to library!",
                );

                    
                // ADD USERS TO SELECTED LIBRARY IN MAIN STORE
                addUsersToSelectedLibrary(result.data.addUsersToLibrary.admins, result.data.addUsersToLibrary.librarians);

                // AUTH STORE
                updateUsersLibraryEnrolled(
                    [
                        ...state.admins.map((adminObj) => adminObj.value),
                        ...state.librarians.map((librarianObj) => librarianObj.value),
                    ],
                    selectedLibraryId,
                );

                // HIDE MODAL   
                handleShowHideAddUsersModal();
            },
            onError(error) {
                // LOG ERROR
                console.log("Error while adding users to library...", error);
                // SHOW TOAST
                showToast(
                    TOAST_TYPE_OPTIONS.error,
                    "Error adding users to library...",
                );
            },
            variables: {
                libraryId: selectedLibraryId,
                admins: state.admins.map((adminObj) => adminObj.value),
                librarians: state.librarians.map((librarianObj) => librarianObj.value),
                userId: loggedUserId,
            }
        }
    );

    /////////////////
    // FUNCTIONS ////
    /////////////////

    const handleConfirm = useCallback(
      async () => {
        try {
            setAppLoading(true);

            await addUsersToLibraryMutation();

            setAppLoading(false);
        } catch (error) {
            console.log("Error adding users...", error);
            setAppLoading(false);
        }
      },
      [addUsersToLibraryMutation, setAppLoading],
    )
    
     // HANDLE SELECT CHANGE
     const handleSelectChange = useCallback((newValue: MultiValue<unknown>, actionMeta: ActionMeta<unknown>) => {
       
        setState((prevState) => {
            return {
                ...prevState,
                [actionMeta.name as string]: newValue,
            };
        });
    }, []);

    //////////////
    // RENDER ////
    //////////////
    
    return (
        <Modal
            icon="add"
            handleCloseModal={handleShowHideAddUsersModal}
            handleConfirm={handleConfirm}
            modalTitle="Add Users"
            canSave={state.admins.length > 0 || state.librarians.length > 0}
            confirmText="Add"
        >
            <>
                 {/* ADMINS */}
                 <span className="text-[18px] font-semibold mt-3">
                        Admins 
                    </span>
                    <Select
                        key={`select_library_create_modal_admin_select`}
                        isMulti={true}
                        name="admins"
                        value={state.admins}
                        onChange={handleSelectChange}
                        options={selectableUsers}
                        inputValue={''}
                        isClearable={true}            
                        className="w-full" 
                        placeholder="Select admins..."
                    />

                    {/* LIBRARIANS */}
                    <span className="text-[18px] font-semibold mt-3">
                        Librarians 
                    </span>
                    <Select
                        key={`select_library_create_modal_librarian_select`}
                        isMulti={true}
                        name="librarians"
                        value={state.librarians}
                        onChange={handleSelectChange}
                        options={selectableUsers}
                        inputValue={''}
                        isClearable={true}            
                        className="w-full" 
                        placeholder="Select librarians..."
                    />
            </>
        </Modal>
    );  
};

export default memo(SelectedHomeAddUsersModal);