import {memo} from 'react';
import useAuthStore from '../../store/authStore';
import Button from '../Common/Button';
import LeftSideBarMenu from './LeftSideBarMenu';
import Link from 'next/link';
import useMainStore from '../../store/mainStore';


// PROPS INTERFACE
interface IProps {
    // userProfile: IUser | null;
}

////////////////////
// LEFT SIDE BAR ///
////////////////////

const LeftSideBar:React.FC<IProps> = () => {

    /////////////////
    // ZUSTAND //////
    /////////////////

    const {logout, userProfile} = useAuthStore();

    const {selectedLibrary} = useMainStore();

    /////////////////
    // RENDER ///////
    /////////////////

    return (
        <div className='w-[250px] h-full leftSideBarBg flex flex-col items-center justify-between py-10 gap-10 shadow-xl'>

            {/* APP TITLE */}
            <Link href="/">
                <span className='text-white text-[40px] font-bold transition cursor-pointer hover:scale-[1.1]'>
                    Booklet
                </span>
            </Link>
            

            {/* SHOW MENU IF LOGGED IN */}
            {
                userProfile && selectedLibrary ?
                <LeftSideBarMenu />
                :
                <div className='text-white'>{!userProfile ? "Not Logged :/" : "Select a library!"}</div>
            }

            {/* SETTINGS */}

            {/* LOGOUT BTN */}
            {
                userProfile &&

                <Button 
                    onClick={logout}
                    txt="Logout"
                    icon="logout"
                    width="80%"
                    borderRadius='8px'
                    txtCss='font-semibold ml-3'
                />
            }
        </div>  
    );
};

export default memo(LeftSideBar);


