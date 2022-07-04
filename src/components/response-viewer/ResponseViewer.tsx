import { FC, useContext } from 'react';
import { RequestContext } from '../../context';
import classes from './ResponseViewer.module.scss';
interface ResponseViewerProps {
    className: string;
}
export const ResponseViewer: FC<ResponseViewerProps> = ({ className }) => {
    const { loading, request } = useContext(RequestContext);
    function stringify(){
        return JSON.stringify(request.responseData, null, 2);
    }
    function copyResponseToClipboard(){
        navigator.clipboard.writeText(stringify())
    }
    return (
        <section className={`${className} ${classes.responseViewer}`}>
            {!loading && (
                <>
                    <h3>
                        <>
                            status: {request.status}, time:
                            {request.responseTimeInMiliseconds}ms
                        </>{' '}
                        <span
                            style={{
                                outline: '1px solid grey',
                                borderRadius: '5px',
                                float:'right'
                            }}
                            onClick={copyResponseToClipboard}
                        >
                            copy
                        </span>
                    </h3>
                    <pre className={classes.pre}>
                        {stringify()}
                    </pre>
                </>
            )}
        </section>
    );
};

