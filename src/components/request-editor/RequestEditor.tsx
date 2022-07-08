import { FC, useContext, useEffect, useState } from 'react';
import { RequestContext } from '../../context';

import classes from './RequestEditor.module.scss';

interface RequestEditorProps {
    className: string;
}

export const RequestEditor: FC<RequestEditorProps> = ({ className }) => {
    const {  loading, request, makeRequest} =
        useContext(RequestContext);

    const [requestConfig, setRequestConfig] = useState({url:'',method:'GET'});
    const handleChange = (event: any) => {
        const id = event.target.id;
        const value = event.target.value;
        setRequestConfig({...requestConfig, [id]:value})
    }
    const onSubmit = async (event: any) => {
        event.preventDefault();
        const method = event.target[0].value;
        const url = event.target[1].value;
        if (!url) return;
        await makeRequest(url, method)
    };

    useEffect(() => {
        setRequestConfig({url:request.url,method:request.method})
    }, [request]);
    return (
        <section className={`${className} ${classes.requestEditor}`}>
            <form
                defaultValue='GET'
                onSubmit={onSubmit}
                className={classes.form}
            >
                <select onChange={handleChange} id='method' value={requestConfig.method} defaultValue='GET'>
                    <option value='GET'>GET</option>
                    <option value='POST'>POST</option>
                    <option value='PUT'>PUT</option>
                    <option value='DELETE'>DELETE</option>
                </select>
                <input
                    onChange={handleChange}
                    id='url'
                    value={requestConfig.url}
                    required
                    autoFocus
                    placeholder='url: www.example.com'
                />
                <button type='submit' disabled={loading}>
                    Send
                </button>
            </form>
        </section>
    );
};
