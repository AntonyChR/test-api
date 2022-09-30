import { useContext, useEffect, useState } from 'react';

import { INITIAL_STATE, RequestContext, ICookies } from '../../../../context';

import { Icon } from '../../../common';

import classes from './CookiesEditor.module.css';

export const CookiesEditor = () => {
    const { request, addCookies } = useContext(RequestContext);
    const [cookies, setCookies] = useState<ICookies>(
        INITIAL_STATE.request.cookies
    );
    const addNewField = () => {
        const i = cookies.values.length;
        setCookies({
            send: cookies.send,
            values: [
                ...cookies.values,
                { [`cookieKey_${i}`]: '', [`cookieValue_${i}`]: '' },
            ],
        });
    };

    const onTextInputchange = (event: any) => {
        const id: string = event.target.id;
        const value: string = event.target.value;
        const newValues = cookies.values.map((v) => {
            if (Object.keys(v).includes(id)) {
                return { ...v, [id]: value };
            }
            return v;
        });
        setCookies({
            ...cookies,
            values: newValues,
        });
    };

    const onCheckBoxInputChange = (event: any) => {
        setCookies({
            ...cookies,
            send: !request.cookies.send,
        });
    };

    useEffect(() => {
        setCookies(request.cookies);
    }, []);

    useEffect(() => {
        addCookies(cookies);
    }, [cookies]);
    return (
        <div className={classes.wrapper}>
            <div className={classes.checkbox}>
                <label>Send Cookies</label>
                <input
                    id='send'
                    type='checkbox'
                    onChange={onCheckBoxInputChange}
                    defaultChecked={request.cookies.send}
                />
            </div>
            <ul>
                {cookies.values.map((v, i) => (
                    <li className={classes.row} key={`cookie - ${i}`}>
                        <input
                            id={`cookieKey_${i}`}
                            type='text'
                            placeholder='key'
                            onChange={onTextInputchange}
                            defaultValue={v[`cookieKey_${i}`]}
                        />
                        <input
                            id={`cookieValue_${i}`}
                            type='text'
                            placeholder='value'
                            onChange={onTextInputchange}
                            defaultValue={v[`cookieValue_${i}`]}
                        />
                    </li>
                ))}
            </ul>
            <div className={classes.add_button} onClick={addNewField}>
                <Icon icon='add' color='orange' />
            </div>
        </div>
    );
};
