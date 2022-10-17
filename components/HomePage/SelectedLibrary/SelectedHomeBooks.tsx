import {memo} from 'react';
import { Circles } from 'react-loader-spinner';
import { IBook } from '../../../types/libraryTypes';
import { NORMAL_PURPLE } from '../../../utils/constants';



// PROPS INTERFACE
interface IProps {
    allBooks: IBook[] | null;
}

//////////////////////////
// SELECTED HOME BOOKS ///
//////////////////////////

const SelectedHomeBooks:React.FC<IProps> = ({
    allBooks,
}) => {



    //////////////
    // RENDER ////
    //////////////

    return (
        !allBooks ?

        (
            <div className="top-0 left-0 absolute backdrop-blur-[2px] flex justify-center items-center w-full h-full">

            {/* SPINNER */}
            <Circles
              color={NORMAL_PURPLE}
              height={150}
              width={150}
            />

          </div>
        )
        :
        
        <div className='w-full h-full flex flex-col justify-start items-start p-3'>
            {/* FILTER RADIO + ITEM NUM */}
            <div className='flex justify-start items-center w-full border p-3 bg-gray-200 rounded-lg'>

                {/* AVAILABLE FILTER */}
                <div>


                    <span>Available</span>
                </div>

                {/* ISSUED RADIO */}
                <div>

                    <span>Issued</span>
                </div>

                {/* LENGTH */}
                <span>
                    Number of books: {allBooks.length}
                </span>
            </div>      
        </div>
        
    );
};

// EXPORT
export default memo(SelectedHomeBooks);