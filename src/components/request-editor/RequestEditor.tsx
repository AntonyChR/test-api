import { FC, useContext, useEffect, useRef } from 'react';
import { RequestContext } from '../../context';

import classes from './RequestEditor.module.scss';

interface RequestEditorProps {
    className: string;
}

export const RequestEditor: FC<RequestEditorProps> = ({ className }) => {
    const {  loading, request, makeRequest} =
        useContext(RequestContext);
    const methodRef = useRef<HTMLSelectElement>(null);
    const urlRef = useRef<HTMLInputElement>(null);

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const method = event.target[0].value;
        const url = event.target[1].value;
        if (!url) return;
        await makeRequest(url, method)
    };

    useEffect(() => {
        if (methodRef.current && urlRef.current) {
            methodRef.current.value = request.method;
            urlRef.current.value = request.url;
        }
    }, [request]);
    return (
        <section className={`${className} ${classes.requestEditor}`}>
            <form
                defaultValue='GET'
                onSubmit={onSubmit}
                className={classes.form}
            >
                <select id='method' defaultValue='GET' ref={methodRef}>
                    <option value='GET'>GET</option>
                    <option value='POST'>POST</option>
                    <option value='PUT'>PUT</option>
                    <option value='DELETE'>DELETE</option>
                </select>
                <input
                    id='url'
                    required
                    placeholder='url: www.example.com'
                    ref={urlRef}
                />
                <button type='submit' disabled={loading}>
                    Send
                </button>
            </form>
        </section>
    );
};
