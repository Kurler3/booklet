import {memo} from 'react';
import {
    AiOutlineMenu,
    AiFillNotification,
} from 'react-icons/ai';
import {
    FaExchangeAlt,
} from 'react-icons/fa';
import useAuthStore from '../../../store/authStore';
import useMainStore from '../../../store/mainStore';


/////////////////////////
// LEFT SIDE BAR MENU ///
/////////////////////////

const LeftSideBarMenu = () => {

    const menuBtnContainerStyle = 'flex items-center justify-start gap-2 cursor-pointer p-2 transition rounded-md border w-full text-black bg-[#f1f1f1] hover:scale-[1.1]';

    return (
        <div className='w-full text-white p-10 flex flex-col items-start justify-start flex-1 mt-20 gap-4'>
            
            {/* MENU BTN */}
            <div className={menuBtnContainerStyle}>   
                {/* ICON */}
                <AiOutlineMenu className='text-md'/>

                {/* LABEL */}
                <span
                    className='text-md font-bold'
                >
                    Home
                </span>
            </div>

            {/* ISSUE REQUESTS */}
            <div className={menuBtnContainerStyle}>   
                {/* ICON */}
                <AiFillNotification className='text-md'/>

                {/* LABEL */}
                <span
                    className='text-md font-bold'
                >
                    Issue Requests
                </span>
            </div>

            {/* CHANGE LIBRARY */}
            <div className={menuBtnContainerStyle}>   
                {/* ICON */}
                <FaExchangeAlt className='text-md'/>

                {/* LABEL */}
                <span
                    className='text-md font-bold'
                >
                    Change Library
                </span>
            </div>

        </div>
    );
};

export default memo(LeftSideBarMenu);