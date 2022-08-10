import { FC, useContext } from 'react';
import { RequestContext } from '../../../context';
import { Alert, useAlert } from '../../common';
import classes from './StatusBar.module.scss';

interface Props {
    dataToCopyToClipboard: string;
}

export const StatusBar: FC<Props> = ({ dataToCopyToClipboard }) => {
    const { request } = useContext(RequestContext);

    const { alertState, hideAlert, alertInfo } = useAlert();

    function copyResponseToClipboard() {
        navigator.clipboard.writeText(dataToCopyToClipboard);
        alertInfo('Response data copied to clipboard');
    }

    return (
        <>
            {request.responseData != 'Canceled' && (
                <h3 className={classes.statusBar}>
                    <>
                        status: {request.status} | time:{' '}
                        {request.responseTimeInMiliseconds}ms{' '}
                    </>
                    <span
                        className={classes.copy}
                        onClick={copyResponseToClipboard}
                    >
                        copy data
                    </span>
                </h3>
            )}
            <Alert
                type={alertState.type}
                message={alertState.message}
                controller={alertState.show}
                timeOut='3s'
                unmount={hideAlert}
            />
        </>
    );
};
