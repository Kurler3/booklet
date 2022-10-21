import {memo} from 'react';
import { IBook } from '../../../../types/libraryTypes';


// PROPS INTERFACE
interface IProps {
    availableBooksToAdd: IBook[];
}

/////////////////////////////////////////////////
// SELECTED HOME EXISTING BOOKS MODAL ///////////
/////////////////////////////////////////////////

const SelectedHomeExistingBooksModal:React.FC<IProps> = ({
    availableBooksToAdd,
}) => {

    /////////////
    // RENDER ///
    /////////////

    return (
        <div>

        </div>
    );
};

export default memo(SelectedHomeExistingBooksModal);