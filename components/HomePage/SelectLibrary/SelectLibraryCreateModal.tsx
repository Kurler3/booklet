import {memo, useCallback, useMemo, useState} from 'react';
import { ActionMeta, MultiValue } from 'react-select';
import Select from 'react-select';
import Button from '../../Common/Button';
import useAuthStore from '../../../store/authStore';
import { IDefaultLibrary } from '../../../types/libraryTypes';


interface IProps {
    handleCloseCreateModal: () => void;
    handleConfirmCreateNewLibrary: () => void;
    newLibrary: IDefaultLibrary;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (newValue: MultiValue<unknown>, actionMeta: ActionMeta<unknown>) => void;
};

//////////////////////////////////
// SELECT LIBRARY CREATE MODAL ///
//////////////////////////////////

const SelectLibraryCreateModal:React.FC<IProps> = ({
    handleCloseCreateModal,
    handleConfirmCreateNewLibrary,
    newLibrary,
    handleInputChange,
    handleSelectChange,
}) => {
    
    // LOGGED USER AND ALL USERS
    const {
        userProfile,
        allUsers,
    } = useAuthStore();

    //////////////
    // STATE /////
    //////////////
    const [state, setState] = useState({
        isConfirmCancel: false,
    });

    ////////////////
    // MEMO ////////
    ////////////////

    // SELECTABLE USERS
    const selectableUsers = useMemo(() => {
        return allUsers ? 
            allUsers.filter((user) => {

                const adminIndex = newLibrary.admins.findIndex((admin) => admin.value === user.id);
                const librarianIndex = newLibrary.librarians.findIndex((librarian) => librarian.value === user.id);

                return adminIndex === -1 && librarianIndex === -1 && userProfile?.id !== user.id;
            }).map((user) => {
                return {
                    label: user.username,
                    value: user.id,
                }
            })
        : [];
    }, [allUsers, newLibrary.admins, newLibrary.librarians, userProfile?.id]);


    // CAN SAVE OR NOT
    const canSave = useMemo(() => {
        return newLibrary.name!=="";
    }, [newLibrary.name]);

    ////////////////
    // FUNCTIONS ///
    ////////////////

    const handleAskConfirmCancel = useCallback(() => {
        setState((prevState) => {
            return {
                ...prevState,
                isConfirmCancel: !prevState.isConfirmCancel,
            };
        });
    }, []);


    //////////////
    // RENDER ////
    //////////////

    return (
        <div className="h-full w-full flex justify-center items-center top-0 left-0 bg-[#00000096] fixed"
            onClick={state.isConfirmCancel ? handleCloseCreateModal : handleAskConfirmCancel}
        >   

            {/* INNER CONTAINER */}
            <div className='opacity-1 h-[80%] min-w-[500px] w-[50%] bg-white rounded-lg shadow-lg z-2000 fromDownAnim flex flex-col items-start justify-start'
                onClick={(e) => e.stopPropagation()}
            >

                {/* HEADERS */}
                <div 
                    className="w-full p-3 bg-gray-200 border-b  flex justify-between items-center rounded-t-lg"
                >
                    {/* ICON + TITLE */}
                    <div className="flex items-center justify-center">
                        {/* ICON */}
                        <span className="material-icons text-[30px]">
                            add
                        </span>

                        {/* TITLE */}
                        <span className="font-semibold text-[18px]">
                            Create a new library
                        </span>
                    </div>
                    
                    {/* CLOSE ICON */}
                    <span 
                        className="material-icons cursor-pointer hover:text-red-600 transition"
                        onClick={handleCloseCreateModal}
                    >
                        close
                    </span>
                </div>
                    

                {/* BODY */}
                <div className="w-full gap-2 p-4 flex-1 flex flex-col justify-start items-start">
                    
                    {/* NAME */}
                    <span className="text-[18px] font-semibold">Name</span>
                    <input 
                        type="text"
                        value={newLibrary.name}
                        name="name"
                        className='focus:outline-none border-2 border-gray-200 w-full rounded-lg p-2'
                        placeholder="Enter a name..."
                        onChange={handleInputChange}
                    />

                    {/* ADMINS */}
                    <span className="text-[18px] font-semibold mt-3">
                        Admins <span className='text-[15px] font-medium'>(can be empty)</span>
                    </span>
                    <Select
                        key={`select_library_create_modal_admin_select`}
                        isMulti={true}
                        name="admins"
                        value={newLibrary.admins}
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
                        value={newLibrary.librarians}
                        onChange={handleSelectChange}
                        options={selectableUsers}
                        inputValue={''}
                        isClearable={true}            
                        className="w-full" 
                        placeholder="Select librarians..."
                    />
                </div>

                {/* FOOTER */}
                <div className="p-3 border-t border-t-gray-200 w-full flex justify-end items-center">

                    {/* CANCEL BTN */}
                    <Button 
                        onClick={state.isConfirmCancel ? handleCloseCreateModal : handleAskConfirmCancel}
                        txt={`${state.isConfirmCancel ? "Are you sure?" : "Cancel"}`}
                        btnCss={`bg-red-500 text-white p-2 rounded-lg hover:scale-[1.1] transition ${state.isConfirmCancel ? "font-bold" : ""}`}
                    />

                    {/* CREATE BTN */}
                    <Button 
                        onClick={
                            () => canSave ? handleConfirmCreateNewLibrary() : {}
                        }
                        txt="Create" 
                        btnCss={`bg-green-500 text-white p-2 rounded-lg ml-3 font-bold hover:scale-[1.1] transition
                            ${!canSave ? "bg-green-300 hover:scale-[1]" : ""} 
                        `}
                        disabled={!canSave}
                    />
                </div>
            </div>

        </div>
    );
};

export default memo(SelectLibraryCreateModal);