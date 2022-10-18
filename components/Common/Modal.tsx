import { memo, useState, useCallback } from 'react';
import Button from './Button';

// PROPS INTERFACE
interface IProps {
    handleCloseModal: () => void;
    handleConfirm: () => void;
    icon?: string;
    modalTitle: string;
    canSave: boolean;
    confirmText: string;
    children: JSX.Element;
}

////////////////////
// MODAL ///////////
////////////////////

const Modal: React.FC<IProps> = ({
    handleCloseModal,
    handleConfirm,
    icon,
    modalTitle,
    canSave,
    confirmText,
    children,
}) => {

    //////////////
    // STATE  ////
    //////////////

    const [state, setState] = useState({
        isConfirmCancel: false,
    })

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
        <div
            className='h-full w-full flex justify-center items-center top-0 left-0 bg-[#00000096] fixed'
            onClick={
                state.isConfirmCancel ? handleCloseModal : handleAskConfirmCancel
            }
        >
            {/* INNER CONTAINER */}
            <div
                className='opacity-1 h-[80%] min-w-[500px] w-[50%] bg-white rounded-lg shadow-lg z-2000 fromDownAnim flex flex-col items-start justify-start'
                onClick={(e) => e.stopPropagation()}
            >

                {/* HEADERS */}
                <div
                    className='w-full p-3 bg-gray-200 border-b  flex justify-between items-center rounded-t-lg'
                >
                    {/* ICON + TITLE */}
                    <div className="flex items-center justify-center">
                        {/* ICON */}
                        {
                            icon &&
                            (
                                <span className="material-icons text-[30px]">
                                    {icon}
                                </span>
                            )
                        }

                        {/* TITLE */}
                        <span className="font-semibold text-[18px]">
                            {modalTitle}
                        </span>
                    </div>

                    {/* CLOSE ICON */}
                    <span
                        className="material-icons cursor-pointer hover:text-red-600 transition"
                        onClick={state.isConfirmCancel ? handleCloseModal : handleAskConfirmCancel}
                    >
                        close
                    </span>
                </div>


                {/* BODY */}
                <div
                    className='w-full gap-2 p-4 flex-1 flex flex-col justify-start items-start'
                >
                    {/* CHILDREN */}
                    {children}
                </div>

                {/* FOOTER */}
                <div
                    className='p-3 border-t border-t-gray-200 w-full flex justify-end items-center'
                >

                    {/* CANCEL BTN */}
                    <Button
                        onClick={state.isConfirmCancel ? handleCloseModal : handleAskConfirmCancel}
                        txt={`${state.isConfirmCancel ? "Are you sure?" : "Cancel"}`}
                        btnCss={`bg-red-500 text-white p-2 rounded-lg hover:scale-[1.1] transition ${state.isConfirmCancel ? "font-bold" : ""}`}
                    />

                    {/* CONFIRM BTN */}
                    <Button
                        onClick={
                            () => canSave ? handleConfirm() : {}
                        }
                        txt={confirmText}
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

export default memo(Modal);