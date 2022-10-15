import {memo} from 'react';
import { ILibrary } from '../../../types/libraryTypes';

// PROPS INTERFACE 
interface IProps {
    selectedLibrary:ILibrary;
}

//////////////////////////////
// SELECTED CHANGE LIBRARY ///
//////////////////////////////

const SelectedChangeLibrary:React.FC<IProps> = ({
    selectedLibrary
}) => {


    //////////////
    // RENDER ////
    //////////////

    return (
        <div>
            Change Library
        </div>
    );
};

// EXPORT
export default memo(SelectedChangeLibrary);