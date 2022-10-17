import {memo, useCallback, useState} from 'react';
import { IBook, ILibrary } from '../../../types/libraryTypes';
import { TAB_OPTIONS } from '../../../utils/constants';
import SelectedHomeBooks from './SelectedHomeBooks';


// PROPS INTERFACE
interface IProps {
    selectedLibrary: ILibrary;
    allBooks: IBook[] | null;
}

/////////////////////
// SELECTED HOME ////
/////////////////////
const SelectedHome:React.FC<IProps> = ({
    selectedLibrary,
    allBooks,
}) => {

    ////////////
    // STATE ///
    ////////////
    
    const [state, setState] = useState({
        selectedTab: TAB_OPTIONS.books,
    });

    /////////////////
    // FUNCTIONS ////
    /////////////////

    const handleSelectTab = useCallback((newTab:string) => {
        if(newTab !== state.selectedTab) {
            setState((prevState) => {
                return {
                    ...prevState,
                    selectedTab: newTab,
                };
            });
        }
    }, [state.selectedTab]);

    /////////////
    // STYLES ///
    /////////////

    const normalTabBtnStyle = 'bg-gray-300 border border-gray-400 px-10 py-1 text-[20px] rounded-lg cursor-pointer hover:scale-[1.1] transition hover:bg-blue-400 hover:text-white';

    const selectedTabBtnStyle = 'bg-blue-400 cursor-default rounded-lg text-[20px] py-1 px-10 text-white';

    //////////////
    // RENDER ////
    //////////////

    return (
        <div className='w-full flex-1 flex flex-col mt-3'>

            {/* BOOKS / USERS TAB OPTIONS */}
            <div className='w-full flex justify-center items-center gap-[100px] py-3'>
                {/* BOOKS TAB */}
                <div 
                    className={state.selectedTab === TAB_OPTIONS.books ? selectedTabBtnStyle : normalTabBtnStyle}
                    onClick={() => handleSelectTab(TAB_OPTIONS.books)}
                >
                    Books
                </div>
                
                {/* USERS TAB */}
                <div 
                    className={state.selectedTab === TAB_OPTIONS.users ? selectedTabBtnStyle : normalTabBtnStyle}
                    onClick={() => handleSelectTab(TAB_OPTIONS.users)}
                >
                    Users
                </div>
            </div>

            {/* BOOKS/USERS CONTENT */}
            <div className='flex-1 w-full relative'>
                
                {
                    state.selectedTab === TAB_OPTIONS.books ?

                    (
                        <SelectedHomeBooks 
                            allBooks={allBooks}
                        />
                    )
                    :
                    (
                        <div>
                            Users
                        </div>
                    )
                }

            </div>
        </div>
    )
};

// EXPORT
export default memo(SelectedHome);