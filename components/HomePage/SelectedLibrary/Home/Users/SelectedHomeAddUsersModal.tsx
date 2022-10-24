import {memo, useCallback, useState, useMemo} from 'react';
import Select, { ActionMeta, MultiValue } from 'react-select';
import { UserType } from '../../../../../types/userTypes';
import Modal from '../../../../Common/Modal';

// PROPS INTERFACE
interface IProps {
    handleShowHideAddUsersModal: () => void;
    availableUsers: UserType[];
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
}) => {

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

            return stateStaff.findIndex((staff) => staff.value === user.id) !== -1;
        }).map((user) => {
            return {
                label: user.username,
                value: user.id,
            }
        });
    }, [availableUsers, state.admins, state.librarians]);

    ////////////////
    // FUNCTIONS ///
    ////////////////

    const handleConfirm = useCallback(
      () => {
 
      },
      [],
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
                        Admins <span className='text-[15px] font-medium'>(can be empty)</span>
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
                        Librarians <span className='text-[15px] font-medium'>(can be empty)</span>
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