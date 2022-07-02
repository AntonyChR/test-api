import { FC, useContext } from "react";
import { RequestContext } from "../../context";
import classes from './ResponseViewer.module.scss';
interface ResponseViewerProps{
    className: string;
}
export const ResponseViewer:FC<ResponseViewerProps> = ({className}) => {
    const {loading,request} = useContext(RequestContext);
    return (
        <div className={`${className} ${classes.responseViewer}`}>
            {!loading && 
            <>
                <h3><>status: {request.status}, time:{request.responseTimeInMiliseconds}ms</></h3>
                <pre className={classes.pre}>{JSON.stringify(request.responseData, null, 2)}</pre>
            </>
            }
        </div>
    );
};
