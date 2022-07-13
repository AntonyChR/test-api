import { FC, useContext } from 'react';
import { IResponse, RequestContext } from '../../../context';
import { colors } from '../../../styles';
import { Icon } from '../../common';
import classes from './RequestItem.module.scss';

interface Props {
    request: IResponse;
}

export const RequestItem: FC<Props> = ({ request }) => {
    const {
        method,
        status,
        url,
        responseTimeInMiliseconds,
        requestTime,
        ok,
    } = request;
    const { setResponse } = useContext(RequestContext);
    const icons = {
        success: 'task_alt',
        error: 'error',
    };

    return (
        <li onClick={() => setResponse(request)} className={classes.item} title={ok?'Success':'Error'}>
            <div
                style={{ backgroundColor: ok ? colors.bg.success : colors.bg.error }}
                className={classes.icon}
            >
                <Icon
                    icon={ok ? icons.success : icons.error}
                    color={ok ? colors.methods.GET : colors.methods.DELETE}
                />
            </div>
            <div
                style={{ backgroundColor: colors.methods[method] }}
                className={classes.methodColor}
            ></div>
            <div className={classes.info} style={{ backgroundColor: 'black' }}>
                <p>
                    <>
                        <em style={{fontWeight:'bold'}}>{method}: {status}</em> - {responseTimeInMiliseconds}
                        ms
                    </>
                </p>
                <p className={classes.url}>{url}</p>
            </div>
        </li>
    );
};
