import { FC, useContext } from 'react';
import { RequestContext } from '../../context';
import classes from './RequestHistory.module.scss';
//import './tooltip.css';
interface RequestHistoryProps {
    className: string;
}
export const RequestHistory: FC<RequestHistoryProps> = ({ className }) => {
    const { requestHistory, setResponse } = useContext(RequestContext);
    return (
        <section className={`${className}`}>
            <h2>History</h2>
            <ul className={classes.list}>
                {requestHistory?.map((request, index) => (
                    <li
                        key={`${request.method} ${index}`}
                        onClick={() => setResponse(request)}
                        className={`${classes.item} ${classes.tooltip}`}
                    >
                            {request.method}:{request.status} time:{' '}
                            {request.responseTimeInMiliseconds}ms status:{' '}
                            {request.statusText}
                            <span className={classes.tooltiptext}>{request.url}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};
