import classes from './CookiesEditor.module.css';
export const CookiesEditor = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.row}>
                <input type='text' placeholder='key' />
                <input type='text' placeholder='value'/>
            </div>
            <div className={classes.row}>
                <input type='text' placeholder='key' />
                <input type='text' placeholder='value'/>
            </div>
            <div className={classes.row}>
                <input type='text' placeholder='key' />
                <input type='text' placeholder='value'/>
            </div>
        </div>
    );
};
