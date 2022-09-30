import { memo } from 'react';

interface Props {
    txt?: string;
    icon?: string;
    bgColor?: string;
    txtColor?: string;
    iconCss?: string;
    txtCss?: string;
    btnCss?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    onClick:Function;
}

const Button: React.FC<Props> = ({
    txt,
    icon,
    bgColor,
    txtColor,
    iconCss,
    txtCss,
    btnCss,
    width,
    height,
    onClick,
    borderRadius,
}) => {

    return (
        <button 
            className={`${btnCss ? btnCss : 'w-10 h-6 p-6 border-x-neutral-500 bg-white text-black transition-all hover:bg-[#3492eb] hover:text-white hover:shadow-sm hover:scale-[1.1]'} 
            flex justify-center items-center
            `}
            style={{
                width: width ? width : '',
                height: height ? height : '',
                backgroundColor: bgColor ? bgColor : '',
                borderRadius: borderRadius ? borderRadius : '',
            }}
            onClick={(e) => onClick(e)}
        >
            {/* ICON */}
            {
                icon &&
                <div 
                    className={`material-icons 
                        ${iconCss ? iconCss : null}
                    `}
                >
                    {icon}
                </div>
            }

            {/* TXT */}
            {
                txt && txt.length > 0 && 
                <span 
                    className={`
                        ${txtCss ? txtCss : null}
                    `}
                    style={{
                        color: txtColor ? txtColor : '',
                    }}
                >
                    {txt}
                </span>

            }
            

        </button>
    );
} 

export default memo(Button);