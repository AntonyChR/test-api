import { FC, useContext } from 'react';
import { RequestContext } from '../../context';
import { Icon } from '../common';
import { RequestItem } from './request-item/RequestItem';
import classes from './RequestHistory.module.scss';

interface RequestHistoryProps {
    className: string;
}

export const RequestHistory: FC<RequestHistoryProps> = ({ className }) => {
    const { requestHistory, clearHistory } = useContext(RequestContext);
    return (
        <section className={`${className} ${classes.wrapper}`}>
            <div className={classes.title}>
                <h2>History</h2>
                {requestHistory.length > 0 && (
                    <Icon
                        icon='delete'
                        pointer
                        className={classes.delete}
                        onClick={() => clearHistory()}
                    />
                )}
            </div>
            <div className={classes.listWrapper}>
                <ul className={classes.list}>
                    {requestHistory?.map((request, index) => (
                        <RequestItem
                            key={`${request.method} ${index}`}
                            request={request}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
};
