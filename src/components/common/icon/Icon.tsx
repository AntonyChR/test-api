import { FC } from 'react';

interface IconProps {
    icon      : string;
    color?    : string;
    size?     : string;
    pointer?  : boolean;
    image?    : string;
    alt?      : string;
    onClick?  : () => void;
    className?: string;
    title?: string;
}
export const Icon: FC<IconProps> = ({
    alt,
    icon,
    size,
    color     = 'inherit',
    pointer   = false,
    onClick   = () => {},
    className = 'google-icon',
    title = ''
}) => {
    const iconIsImage = /https/i.test(icon);
    if (iconIsImage) {
        return (
            <img
                style={{
                    width: size,
                    height: size,
                    cursor: pointer ? 'pointer' : 'default',
                }}
                src={icon}
                alt={alt}
                onClick={onClick}
                className={className}
                title={title}
            ></img>
        );
    }
    return (
        <span
            onClick={onClick}
            className={`material-icons ${className}`}
            style={{
                color: color,
                cursor: pointer ? 'pointer' : 'default',
                fontSize: size,
            }}
        >
            {icon}
        </span>
    );
};
