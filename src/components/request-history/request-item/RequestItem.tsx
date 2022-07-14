import { FC, useContext } from 'react';
import { IRequest, RequestContext } from '../../../context';
import { colors } from '../../../styles';
import { Icon } from '../../common';
import classes from './RequestItem.module.scss';

interface Props {
    request: IRequest;
}

export const RequestItem: FC<Props> = ({ request }) => {
    const { method, status, url, responseTimeInMiliseconds, requestTime, ok } =
        request;
    const { setRequest } = useContext(RequestContext);
    const icons = {
        success: 'task_alt',
        error: 'error',
    };

    return (
        <li
            onClick={() => setRequest(request)}
            className={classes.item}
            title={ok ? 'Success' : 'Error'}
        >
            <div className={classes.icon}>
                <Icon
                    icon={ok ? icons.success : icons.error}
                    color={ok ? colors.methods.GET : colors.methods.DELETE}
                />
            </div>
            <div
                style={{ backgroundColor: colors.methods[method] }}
                className={classes.methodColor}
            ></div>
            <div className={classes.info}>
                <p>
                   <><em style={{ fontWeight: 'bold' }}><>{method}: {status}</></em> - {responseTimeInMiliseconds}ms</>
                </p>
                <p className={classes.url}>{url}</p>
            </div>
            <div className={classes.time}>{requestTime}</div>
        </li>
    );
};
