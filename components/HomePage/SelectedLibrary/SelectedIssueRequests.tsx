import {memo} from 'react';
import { ILibrary } from '../../../types/libraryTypes';


// PROPS INTERFACE
interface IProps {
    selectedLibrary:ILibrary;
}

////////////////////////////////
// SELECTED ISSUE REQUESTS /////
////////////////////////////////

const SelectedIssueRequests:React.FC<IProps> = ({
    selectedLibrary,
}) => {

    ////////////////
    // RENDER //////
    ////////////////
    
    return (
        <div>
            Issue Requests :D
        </div>
    );
};

// EXPORT
export default memo(SelectedIssueRequests);
