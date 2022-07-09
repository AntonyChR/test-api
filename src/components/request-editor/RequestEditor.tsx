import { FC, useContext, useEffect, useState } from 'react';
import { HTTPMethod, RequestContext } from '../../context';
import { useForm } from '../../hooks';

import classes from './RequestEditor.module.scss';

interface RequestEditorProps {
    className: string;
}

export const RequestEditor: FC<RequestEditorProps> = ({ className }) => {
    const { loading, request, makeRequest } = useContext(RequestContext);

    const { formValues, handleChange, setFormValues } = useForm<{
        url: string;
        method: HTTPMethod;
    }>({ url: '', method: 'GET' }, true);

    const onSubmit = async (event: any) => {
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
                defaultValue='GET'
                onSubmit={onSubmit}
                className={classes.form}
            >
                <select
                    onChange={handleChange}
                    id='method'
                    value={formValues.method}
                    defaultValue='GET'
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
        </section>
    );
};
