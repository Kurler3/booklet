import {memo} from 'react';
import {
    AiOutlineMenu
} from 'react-icons/ai';


/////////////////////////
// LEFT SIDE BAR MENU ///
/////////////////////////

const LeftSideBarMenu = () => {



    return (
        <div className='w-full text-white p-10 mt-20 flex items-center justify-center'>
            
            {/* MENU BTN */}
            <div className='flex items-center justify-start gap-2 cursor-pointer p-2 transition rounded-md'>   
                {/* ICON */}
                <AiOutlineMenu className='text-md'/>

                {/* LABEL */}
                <span
                    className='text-md font-bold'
                >
                    Home
                </span>
            </div>

        </div>
    );
};

export default memo(LeftSideBarMenu);