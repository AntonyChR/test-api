import { FC, useContext } from 'react';
import { RequestContext } from '../../../context';
import { Alert, useAlert } from '../../common';
import classes from './StatusBar.module.scss';

interface Props {
    dataToDisplay: string;
}
export const StatusBar: FC<Props> = ({ dataToDisplay }) => {
    const { request } = useContext(RequestContext);

    const { alertState, hideAlert, alertInfo } = useAlert();

    function copyResponseToClipboard() {
        alertInfo('Response data copied to clipboard');
        navigator.clipboard.writeText(dataToDisplay);
    }

    return (
        <>
            {(request.statusText !== '' && request.statusText !== 'canceled') && (
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
