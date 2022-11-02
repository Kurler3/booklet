import {memo, useMemo} from 'react';
import { ILibrary } from '../../../types/libraryTypes';
import { BTN_BLUE, COLOR_GOOD, TOOLTIP_POSITION } from '../../../utils/constants';
import SideBarBtn from '../../Common/SideBarBtn';

interface IProps {
    selectedLibraries: ILibrary[];
    handleCreateLibraryClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
    handleDeleteLibrariesClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
    handleSelectLibrary: (e:React.MouseEvent<HTMLButtonElement>) => void;
    loggedUserId: string;
}

//////////////////////////////
// SELECT LIBRARY SIDE BAR ///
//////////////////////////////

const SelectLibrarySideBar:React.FC<IProps> = ({
    handleCreateLibraryClick,
    handleDeleteLibrariesClick,
    handleSelectLibrary,
    selectedLibraries,
    loggedUserId,
}) => {

    const canDelete = useMemo(() => {
        if(selectedLibraries.length === 0) return false;

        for(let library of selectedLibraries) {
            if(library.admins.findIndex((userId) => userId === loggedUserId) === -1) {
                return false;
            }
        }

        return true;
    }, [loggedUserId, selectedLibraries]);


    return (
        <div 
            className='w-[5%] min-w-[80px] h-full bg-gray-200 rounded-lg shadow-lg border-gray-400 border flex flex-col justify-start items-center p-2 gap-3'
        >

            {/* ADD BTN */}
            <SideBarBtn 
                icon="add"
                iconColor="white"
                bgColor={BTN_BLUE}
                handleClick={handleCreateLibraryClick}
                tooltip={true}
                tooltipId="select_library_add_btn"
                tooltipPosition={TOOLTIP_POSITION.BOTTOM}
                tooltipTxt="Create a new library"
            />

            {/* DELETE BTN */}
            {
                selectedLibraries.length > 0 && canDelete && 
                <SideBarBtn 
                    icon="delete"
                    iconColor="white"
                    bgColor='red'
                    handleClick={handleDeleteLibrariesClick}
                    tooltip={true}
                    tooltipId="select_library_delete_btn"
                    tooltipPosition={TOOLTIP_POSITION.BOTTOM}
                    tooltipTxt="Delete selected libraries"
                />
            }
            

            {/* SELECT BTN */}
            {
                selectedLibraries.length === 1 &&

                <SideBarBtn 
                    icon="check"
                    iconColor="white"
                    bgColor={COLOR_GOOD}
                    handleClick={handleSelectLibrary}
                    tooltip={true}
                    tooltipId="select_library_select_btn"
                    tooltipPosition={TOOLTIP_POSITION.BOTTOM}
                    tooltipTxt="Select library"
                />
            }
            
        </div>
    );
};

export default memo(SelectLibrarySideBar);