import { RequestEditor, RequestHistory,ResponseViewer } from "../";
import classes from './Page.module.scss';
export const Page = () => {
    return (
        <div className={classes.page}>
            <RequestEditor className={classes.requestEditor}/>
            <RequestHistory className={classes.requestHistory}/>
            <ResponseViewer className={classes.responseViewer}/>
        </div>
    );
};
