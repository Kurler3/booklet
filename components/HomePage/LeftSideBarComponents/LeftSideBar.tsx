import {memo} from 'react';
import { IUser } from '../../../types/userTypes';
import LeftSideBarMenu from './LeftSideBarMenu';





// PROPS INTERFACE
interface IProps {
    userProfile: IUser | null;
}

////////////////////
// LEFT SIDE BAR ///
////////////////////

const LeftSideBar:React.FC<IProps> = ({
    userProfile,
}) => {

    /////////////////
    // RENDER ///////
    /////////////////

    return (
        <div className='w-[15%] h-full leftSideBarBg flex flex-col items-center justify-start gap-10 min-w-[250px]'>

            {/* APP TITLE */}
            <span className='text-white mt-20 text-[40px] font-bold'>
                Booklet
            </span>

            {/* SHOW MENU IF LOGGED IN */}
            {
                userProfile ?
                <LeftSideBarMenu />
                :
                <div className='text-white'>Not Logged :/</div>
            }

            {/* SETTINGS */}

        </div>  
    );
};

export default memo(LeftSideBar);


