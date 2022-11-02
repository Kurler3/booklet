import { memo, useMemo } from 'react';
import {
    AiOutlineMenu,
    AiFillNotification,
} from 'react-icons/ai';
import {
    FaExchangeAlt,
} from 'react-icons/fa';
import useMainStore from '../../store/mainStore';
import { ILibrary } from '../../types/libraryTypes';
import { MENU_OPTIONS } from '../../utils/constants';


// PROPS INTERFACE
interface IProps {
    selectedLibrary: ILibrary;
    loggedUserId: string;
}

/////////////////////////
// LEFT SIDE BAR MENU ///
/////////////////////////

const LeftSideBarMenu:React.FC<IProps> = ({
    selectedLibrary,
    loggedUserId,
}) => {

    // GET SELECTED MENU OPTION
    const { menuOptionSelected, changeSelectedMenuOption} = useMainStore();

    const menuBtnContainerStyle = 'flex items-center justify-start gap-2 cursor-pointer p-2 transition rounded-md border w-full text-black bg-[#f1f1f1] hover:scale-[1.1] ';

    const selectedMenuBtnStyle = 'flex items-center justify-start gap-2 cursor-default p-2 w-full text-white bg-blue-400 rounded-md border';

    // IS ADMIN OR LIBRARIAN
    const hasPermissionForIssueRequests = useMemo(() => {
        const staffIds = [
            ...selectedLibrary.admins,
            ...selectedLibrary.librarians,
        ];

        return staffIds.includes(loggedUserId);
    }, [loggedUserId, selectedLibrary.admins, selectedLibrary.librarians]);

    return (
        <div className='w-full text-white p-10 flex flex-col items-start justify-start flex-1 mt-20 gap-4'>

            {/* MENU BTN */}
            <div 
                className={
                    menuOptionSelected === MENU_OPTIONS.home ? selectedMenuBtnStyle : menuBtnContainerStyle
                }
                onClick={() => changeSelectedMenuOption(MENU_OPTIONS.home)}
            >
                {/* ICON */}
                <AiOutlineMenu className='text-md' />

                {/* LABEL */}
                <span
                    className='text-md font-bold text-[13px]'
                >
                    Home
                </span>
            </div>

            {/* ISSUE REQUESTS */}
            {
                hasPermissionForIssueRequests && 
                (
                    <div 
                        className={
                            menuOptionSelected === MENU_OPTIONS.issueRequests ? selectedMenuBtnStyle : menuBtnContainerStyle
                        }
                        onClick={() => changeSelectedMenuOption(MENU_OPTIONS.issueRequests)}
                    >
                        {/* ICON */}
                        <AiFillNotification className='text-md' />

                        {/* LABEL */}
                        <span
                            className='text-md font-bold text-[13px]'
                        >
                            Issue Requests
                        </span>
                    </div>
                )
            }

            {/* CHANGE LIBRARY */}
            <div 
                className={
                    menuOptionSelected === MENU_OPTIONS.changeLibrary ? selectedMenuBtnStyle : menuBtnContainerStyle
                }
                onClick={() => changeSelectedMenuOption(MENU_OPTIONS.changeLibrary)}
            >
                {/* ICON */}
                <FaExchangeAlt className='text-md' />

                {/* LABEL */}
                <span
                    className='text-[13px] font-bold flex-1'
                >
                    Change Library
                </span>
            </div>

        </div>
    );
};

export default memo(LeftSideBarMenu);