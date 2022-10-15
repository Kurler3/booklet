import {memo} from 'react';
import { ILibrary } from '../../../types/libraryTypes';


// PROPS INTERFACE
interface IProps {
    selectedLibrary: ILibrary;
}

/////////////////////
// SELECTED HOME ////
/////////////////////
const SelectedHome:React.FC<IProps> = ({
    selectedLibrary,
}) => {


    // STYLES

    const normalTabBtnStyle = 'bg-gray-300 border border-gray-400 px-10 py-1 text-[20px] rounded-lg cursor-pointer hover:scale-[1.1] transition hover:bg-blue-400 hover:text-white';

    //////////////
    // RENDER ////
    //////////////

    return (
        <div className='w-full flex-1 flex flex-col mt-3'>

            {/* BOOKS / USERS TAB OPTIONS */}
            <div className='w-full flex justify-center items-center gap-[100px] py-3'>
                {/* BOOKS TAB */}
                <div className={normalTabBtnStyle}>
                    Books
                </div>
                
                {/* USERS TAB */}
                <div>
                    Users
                </div>
            </div>

            {/* BOOKS/USERS CONTENT */}
            <div className='bg-red-400 flex-1 w-full'>

            </div>
        </div>
    )
};

// EXPORT
export default memo(SelectedHome);