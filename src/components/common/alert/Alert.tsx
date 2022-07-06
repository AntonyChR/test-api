import { FC, useEffect, useState } from 'react';
import classes from './Alert.module.scss';
import { Icon } from '..';
import { alertTypes } from './alertTypes';

interface IProps {
    type: alertTypes;
    message: string;
    timeOut?: time | 'ever';
    controller?: boolean;
    unmount?: () => void;
}
type time = `${number}s` | 'ever';

export const Alert: FC<IProps> = ({
    type,
    message,

    timeOut = 'ever',
    controller,
    unmount,
}) => {
    const [show, setShow] = useState(false);
    const icons = {
        success: 'task_alt',
        info   : 'info',
        warning: 'warning',
        error  : 'error',
    };
    const iconColors = {
        error  : '#f44336',
        warning: '#ffa726',
        info   : '#29b6f6',
        success: '#66bb6a',
    };
    const bg = {
        error  : '#160b0b',
        success: '#0c130d',
        info   : '#071318',
        warning: '#191207',
    };

    const isUnmountFunction = unmount !== undefined;

    const unmountWithTimeOut = () => {
        const seconds = Number(timeOut.replace('s', ''));
        setTimeout(() => {
            if (isUnmountFunction) unmount();
            else setShow(false);
        }, seconds * 1000);
    };

    useEffect(() => {
        setShow(controller!)
        if (controller === true && timeOut !== 'ever') {
            unmountWithTimeOut();
        }
        if(controller === false){
            setShow(false);
        }
    }, [controller]);

    return (
        <>
            {show && (
                <div
                    className={classes.wrapper}
                    style={{
                        display: 'flex',
                        backgroundColor: bg[`${type}`],
                    }}
                >
                    <Icon
                        icon={icons[`${type}`]}
                        color={iconColors[`${type}`]}
                    />
                    <span>{message}</span>
                </div>
            )}
        </>
    );
};
