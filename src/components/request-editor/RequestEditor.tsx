import { FC, useContext, useEffect, useState } from 'react';
import { HTTPMethod, RequestContext } from '../../context';
import { makeRequest } from '../../helpers';
import classes from './RequestEditor.module.scss';

interface RequestEditorProps {
    className: string;
}

export const RequestEditor: FC<RequestEditorProps> = ({ className }) => {

    const {setLoading, setResponse,loading, addRequestToHistory} = useContext(RequestContext);
    const [requestConfig, setRequestConfig] = useState<{
        method: HTTPMethod;
        url: string;
    }>({ method: 'GET', url: '' });

    const onChangeRequestConfig = (event:any) => {
        const {id, value} = event.target;
        setRequestConfig({...requestConfig, [id]:value})
    }

    const onSubmit = async (event:any) => {
        event.preventDefault();
        setLoading(true);
        const reponse =await makeRequest(requestConfig);  
        setLoading(false);    
        setResponse(reponse);
        addRequestToHistory(reponse);
    }
    useEffect(()=>{
        console.log(loading)
    },[loading])
    return (
        <div className={`${className} ${classes.requestEditor}`}>
            <form defaultValue='GET' onSubmit={onSubmit} className={classes.form}>
                <select id='method' value={requestConfig.method} onChange={onChangeRequestConfig}>
                    <option value='GET'>GET</option>
                    <option value='POST'>POST</option>
                    <option value='PUT'>PUT</option>
                    <option value='DELETE'>DELETE</option>
                </select>
                <input id='url' type='url' placeholder='URL: http://www.example.com' onChange={onChangeRequestConfig} />
                <button type='submit' disabled={loading}>Send</button>
            </form>
        </div>
    );
};
