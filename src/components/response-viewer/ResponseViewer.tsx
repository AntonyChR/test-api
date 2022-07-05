import { FC, useContext } from 'react';
import { RequestContext } from '../../context';
import classes from './ResponseViewer.module.scss';
interface ResponseViewerProps {
    className: string;
}
export const ResponseViewer: FC<ResponseViewerProps> = ({ className }) => {
    const { loading, request } = useContext(RequestContext);
    const stringify = () => JSON.stringify(request.responseData, null, 2);
    function copyResponseToClipboard() {
        navigator.clipboard.writeText(stringify());
    }
    return (
        <section className={`${className} ${classes.responseViewer}`}>
            {!loading && (
                <>
                    <h3 className={classes.statusBar}>
                        <>
                            status: {request.status} | time:{' '}
                            {request.responseTimeInMiliseconds}ms{' '}
                        </>
                    </h3>
                    <div className={classes.dataWrapper}>
                        <pre className={classes.data}>{stringify()}</pre>
                        <span
                            className={classes.copy}
                            onClick={copyResponseToClipboard}
                        >
                            copy
                        </span>
                    </div>
                </>
            )}
        </section>
    );
};
