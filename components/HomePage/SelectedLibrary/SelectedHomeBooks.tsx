import { memo, useCallback, useMemo, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import { IBook } from '../../../types/libraryTypes';
import { NORMAL_PURPLE } from '../../../utils/constants';



// PROPS INTERFACE
interface IProps {
    allBooks: IBook[] | null;
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
}) => {

    //////////////
    // STATE /////
    //////////////

    const [state, setState] = useState({
        optionBtnOption: OPTION_BTN_OPTIONS.available,
    });



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

    //////////////
    // MEMO //////
    //////////////

    const filteredBooks = useMemo(() => {
        
    }, []);

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
                        Number of books: <span className='text-gray-400'>{allBooks.length}</span>
                    </span>
                </div>

                {/* LIST OF BOOKS */}

            </div>

    );
};

// EXPORT
export default memo(SelectedHomeBooks);