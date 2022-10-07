import {memo} from 'react';
// import ReactTooltip, { Place } from 'react-tooltip';
import Tooltip from './Tooltip';


interface IProps {
    icon: string;
    iconColor: string;
    bgColor: string;
    handleClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
    tooltip?: boolean;
    tooltipTxt?: string;
    tooltipPosition?:string;
    tooltipId?:string;
}

////////////////////
// SIDE BAR BTN ////
////////////////////

const SideBarBtn:React.FC<IProps> = ({
    icon,
    iconColor,
    handleClick,
    bgColor,
    tooltip,
    tooltipTxt,
    tooltipPosition,
    tooltipId,
}) => {


    return (
        <button
            className='flex justify-center items-center
            rounded-md hover:scale-[1.1] transition p-1 relative hover:z-10'
            onClick={handleClick}

            style={{
                backgroundColor: bgColor,
            }}

            data-tip={tooltip}
            data-for={tooltipId}
            id={tooltipId}
        >
            <span className='material-icons'
                style={{
                    color: iconColor,
                    fontSize: '28px'
                }}
                
            >
                {icon}
            </span>

            {/* {
                    tooltip &&

                    <Tooltip 
                        tooltipId={tooltipId!}
                        tooltipPosition={tooltipPosition!}
                        tooltipTxt={tooltipTxt!}
                    />
                }
           */}

        </button>
    );
};

export default memo(SideBarBtn);