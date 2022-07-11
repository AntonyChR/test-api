import { FC, useContext } from 'react';
import { IResponse, RequestContext } from '../../../context';
import { colors } from '../../../styles';
import classes from './RequestItem.module.scss';

interface Props {
    request: IResponse;
}

export const RequestItem: FC<Props> = ({ request }) => {
    const {
        method,
        status,
        statusText,
        url,
        responseTimeInMiliseconds,
        requestTime,
    } = request;
    const { setResponse } = useContext(RequestContext);

    const dataToShow = `${method}:${status} ${responseTimeInMiliseconds}ms ${statusText}`;
    return (
        <li
            onClick={() => setResponse(request)}
            className={classes.item}
            style={{backgroundColor:colors[method]}}
        >
            <>
                <p title={requestTime} className={classes.dataAboutRequest}>
                    {dataToShow}{' '}
                    <span style={{ float: 'right' }}>{requestTime}</span>
                </p>
                <p className={classes.url}>{url}</p>
            </>
        </li>
    );
};
