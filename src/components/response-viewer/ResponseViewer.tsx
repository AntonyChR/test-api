import { FC, useContext } from 'react';
import { RequestContext } from '../../context';
import { Loading } from './loading/Loading';
import { StatusBar } from './status-bar/StatusBar';

import classes from './ResponseViewer.module.scss';

interface ResponseViewerProps {
    className: string;
}
export const ResponseViewer: FC<ResponseViewerProps> = ({ className }) => {
    const { loading, request } = useContext(RequestContext);
    const dataToDisplay = () => {
        if(request.responseData !== null){
            if(typeof request.responseData === 'string'){
                return request.responseData;
            }
            return JSON.stringify(request.responseData, null, 2);
        }
        return ''
    };
    return (
        <section className={`${className} ${classes.responseViewer}`}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <StatusBar dataToCopyToClipboard={dataToDisplay()}/>
                    <div className={classes.dataWrapper}>
                        <pre className={classes.data}>{dataToDisplay()}</pre>
                    </div>
                </>
            )}

        </section>
    );
};
