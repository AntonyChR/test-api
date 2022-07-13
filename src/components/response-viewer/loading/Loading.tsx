import { useContext } from 'react';
import { RequestContext } from '../../../context';
import classes from './Loading.module.scss';

export const Loading = () => {
    const {abortRequest} = useContext(RequestContext);
    return (
        <div className={classes.wrapper}>
            <span className={classes.spinner}></span>
            <span onClick={()=>abortRequest()} className={classes.cancel}>Cancel</span>
        </div>
    );
};
