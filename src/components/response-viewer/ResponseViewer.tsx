import { FC, useContext } from 'react';
import { RequestContext } from '../../context';
import { Alert, Icon, useAlert } from '../common';
import classes from './ResponseViewer.module.scss';
interface ResponseViewerProps {
    className: string;
}
export const ResponseViewer: FC<ResponseViewerProps> = ({ className }) => {
    const { loading, request, abortRequest } = useContext(RequestContext);
    const { alertState, hideAlert, alertInfo } = useAlert();
    const stringify = () => JSON.stringify(request.responseData, null, 2);
    function copyResponseToClipboard() {
        alertInfo('Response data copied to clipboard');
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
                        <span
                            className={classes.copy}
                            onClick={copyResponseToClipboard}
                        >
                            copy data response
                        </span>
                    </h3>
                    <div className={classes.dataWrapper}>
                        <pre className={classes.data}>{stringify()}</pre>
                    </div>
                </>
            )}
            <Alert
                type={alertState.type}
                message={alertState.message}
                controller={alertState.show}
                timeOut='3s'
                unmount={hideAlert}
            />
        </section>
    );
};
