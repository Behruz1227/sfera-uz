import React from 'react';
import DefTitles from '../Text/DefText';
import { bgColor, BorderColor, TitleTextColor } from '../Colors';

interface ButtonProps {
    size: 'small' | 'medium' | 'large'; 
    text: any;
    isScrolled?: boolean;
    onclick: () => void,
}

const Button: React.FC<ButtonProps> = ({ size, text, isScrolled,  onclick}) => {
    // Construct dynamic class names using template literals
    const borderColorClass = `border-[#16423C]`;
    const textColorClass = `text-${TitleTextColor}`;
    const hoverBgColorClass = `hover:bg-${BorderColor}`;

    return (
        <div>
            <button
                onClick={onclick}
                className={`px-6 md:px-10 py-1 border-2 ${borderColorClass} rounded-lg ${textColorClass} ${hoverBgColorClass} hover:text-white transition-all duration-300 ${isScrolled ? 'bg-[#C4DAD2] border-[#C4DAD2]' : bgColor}`}
            > 
                <span>
                    <DefTitles text={text} size={size} />
                </span> 
            </button>
        </div>
    );
}

export default Button;
