import { FC, FormEvent, useContext, useEffect, useState } from 'react';
import { HTTPMethod, RequestContext } from '../../context';
import { useForm } from '../../hooks';
import { colors } from '../../styles';
import { PayloadRequestEditor } from './payload/Payload';

import classes from './RequestEditor.module.scss';

interface RequestEditorProps {
    className: string;
}

export const RequestEditor: FC<RequestEditorProps> = ({ className }) => {
    const { loading, request, makeRequest } = useContext(RequestContext);

    const { formValues, handleChange, setFormValues } = useForm<{
        url: string;
        method: HTTPMethod;
    }>({ url: '', method: 'GET' });

    const onSend = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!formValues.url) return;
        await makeRequest(formValues.url, formValues.method);
    };

    useEffect(() => {
        setFormValues({ url: request.url, method: request.method });
    }, [request]);
    return (
        <section className={`${className} ${classes.requestEditor}`}>
            <form
                className={classes.form}
                onSubmit={onSend}
            >
                <select
                    onChange={handleChange}
                    id='method'
                    value={formValues.method}
                    style={{backgroundColor:colors.methods[formValues.method]}}
                >
                    <option value='GET'>GET</option>
                    <option value='POST'>POST</option>
                    <option value='PUT'>PUT</option>
                    <option value='DELETE'>DELETE</option>
                </select>
                <input
                    onChange={handleChange}
                    id='url'
                    value={formValues.url}
                    required
                    autoFocus
                    placeholder='url: www.example.com'
                />
                <button type='submit' disabled={loading}>
                    Send
                </button>
            </form>
            <PayloadRequestEditor/>
        </section>
    );
};
