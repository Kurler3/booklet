import {memo} from 'react';
import { createPortal } from 'react-dom';
import ReactTooltip, { Place } from 'react-tooltip';

interface IProps {
    tooltipId: string;
    tooltipTxt: string;
    tooltipPosition: string;
}

const Tooltip:React.FC<IProps> = ({
    tooltipId,
    tooltipPosition,
    tooltipTxt,
}) => {


    return (    
            <ReactTooltip 
                id={tooltipId}
                type="dark"
                place={tooltipPosition as Place}
                effect="solid"  
                className='tooltipCommon'  
            >
                {tooltipTxt}
            </ReactTooltip>
    );
};

export default memo(Tooltip);