import { FC, useContext } from 'react';
import { RequestContext } from '../../context';

interface RequestHistoryProps {
    className: string;
}
export const RequestHistory: FC<RequestHistoryProps> = ({ className }) => {
    const { requestHistory, setResponse } = useContext(RequestContext);
    return (
        <div className={`${className}`}>
            {requestHistory?.map((r,i) => (
                <h3 key={`${r.method} ${i}`} onClick={()=>setResponse(r)}>
                    {r.method}:{r.status} time:{r.responseTimeInMiliseconds}ms
                </h3>
            ))}

        </div>
    );
};
