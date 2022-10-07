import {memo, useState} from 'react';


interface IProps {
    handleCloseCreateModal: () => void;
}

//////////////////////////////////
// SELECT LIBRARY CREATE MODAL ///
//////////////////////////////////

const SelectLibraryCreateModal:React.FC<IProps> = ({
    handleCloseCreateModal,
}) => {

    //////////////
    // STATE /////
    //////////////
    const [state, setState] = useState({
        name: '',
        admins: [],
        librarians: [],
    });

    //////////////
    // RENDER ////
    //////////////

    return (
        <div className="h-full w-full flex justify-center items-center top-0 left-0 bg-[#00000096] fixed"
            onClick={handleCloseCreateModal}
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
                    <span className="material-icons cursor-pointer hover:text-red-600 transition">
                        close
                    </span>
                </div>
                    

                {/* BODY */}
                <div className="w-full gap-2 p-4 flex-1 flex flex-col justify-start items-start">

                    <span className="text-[18px] font-semibold">Name</span>
                    <input 
                        type="text"
                        value={state.name}
                        name="name"
                        className='focus:outline-none border-2 border-gray-200 w-full rounded-lg p-2'
                        placeholder="Enter a name..."

                    />

                </div>

                {/* FOOTER */}
                <div className="p-3 border-t border-t-gray-200 w-full flex justify-end items-center">

                </div>
            </div>

        </div>
    );
};

export default memo(SelectLibraryCreateModal);