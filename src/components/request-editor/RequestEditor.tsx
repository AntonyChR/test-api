import { FC } from "react";
import classes from './RequestEditor.module.scss'

interface RequestEditorProps{
    className:string
}

export const RequestEditor:FC<RequestEditorProps> = ({className}) => {
    return (
        <div className={`${className} ${classes.requestEditor}`}>
            <form className={classes.form}>
                <select defaultValue={'GET'}>
                    <option value='GET'>GET</option>
                    <option value='POST'>POST</option>
                    <option value='PUT'>PUT</option>
                    <option value='DELETE'>DELETE</option>
                </select>
                <input type="text" placeholder="URL: http://www.example.com"/>
                <button type='submit'>Send</button>
            </form>
        </div>
    );
};
