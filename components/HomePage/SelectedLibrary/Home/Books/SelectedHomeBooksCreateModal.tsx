import { memo, useState, useCallback, useMemo } from 'react';
import Modal from '../../../../Common/Modal';


// PROPS INTERFACE
interface IProps {
    handleCloseModal: () => void;
    handleConfirmCreateNewBook: () => void;
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) => void;
    title: string;
    description: string;
}

//////////////////////////////
// CREATE BOOK MODAL /////////
//////////////////////////////

const SelectedHomeBooksCreateModal: React.FC<IProps> = ({
    handleCloseModal,
    handleConfirmCreateNewBook,
    handleInputChange,
    title,
    description,
}) => {

    //////////////
    // STATE /////
    //////////////

    ////////////////
    // FUNCTIONS ///
    ////////////////

    ////////////////
    // MEMO ////////
    ////////////////

    const canSave = useMemo(() => {

        return title.length > 0 && description.length > 0;

    }, [description.length, title.length]);

    ////////////////
    // RENDER //////
    ////////////////

    return (
        <Modal
            handleCloseModal={handleCloseModal}
            handleConfirm={handleConfirmCreateNewBook}
            icon="add"
            modalTitle="Create a book"
            canSave={canSave}
            confirmText="Create"
        >
            <>
                {/* TITLE */}
                <span
                    className="text-[18px] font-semibold"
                >
                    Title
                </span>
                {/* TITLE INPUT */}
                <input
                    type="text"
                    value={title}
                    name="title"
                    className="focus:outline-none border-2 border-gray-200 w-full rounded-lg p-2"
                    placeholder="Enter a title..."
                    onChange={handleInputChange}
                />

                {/* DESCRIPTION */}
                <span
                    className="text-[18px] font-semibold"
                >
                    Description
                </span>
                <textarea 
                    name="description"
                    className='focus:outline-none border-2 border-gray-200 w-full rounded-lg p-2'
                    placeholder='Enter a description...'
                    onChange={handleInputChange}
                    value={description}
                />
            </>
        </Modal>
    );
};

export default memo(SelectedHomeBooksCreateModal);

