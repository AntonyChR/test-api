import { FC, useContext, useEffect, useRef } from 'react';
import { RequestContext } from '../../context';
import { Loading } from './loading/Loading';
import classes from './ResponseViewer.module.scss';
import { StatusBar } from './status-bar/StatusBar';
interface ResponseViewerProps {
    className: string;
}
export const ResponseViewer: FC<ResponseViewerProps> = ({ className }) => {
    const { loading, request } = useContext(RequestContext);
    const dataToDisplay = () => {
        if(request.responseData !== null){
            return JSON.stringify(request.responseData, null, 2);
        }
        return request.statusText;
    };
    return (
        <section className={`${className} ${classes.responseViewer}`}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <StatusBar dataToDisplay={dataToDisplay()}/>
                    <div className={classes.dataWrapper}>
                        <pre className={classes.data}>{dataToDisplay()}</pre>
                    </div>
                </>
            )}

        </section>
    );
};
