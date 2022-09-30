import { useContext, useEffect, useState } from 'react';
import { RequestContext } from '../../../../context';
import { useForm } from '../../../../hooks';
import classes from './BodyEditor.module.css';
export const BodyEditor = () => {
    const { setBody, request } = useContext(RequestContext);
    const [invalidFormat, setInvalidFormat] = useState(false);
    const { formValues, handleChange, setFormValues } = useForm({ body: '{}' });

    useEffect(() => {
        const str = JSON.stringify(request.body, null, 2);
        setFormValues({ body: str });
    }, []);
    useEffect(() => {
        try {
            const parsed = JSON.parse(formValues.body);
            setInvalidFormat(false);
            setBody(parsed);
        } catch (error) {
            setInvalidFormat(true);
        }
    }, [formValues.body]);
    return (
        <div className={classes.wrapper}>
            <textarea
                id='body'
                value={formValues.body}
                onChange={handleChange}
                className={classes.textArea}
            />
            {invalidFormat && (
                <span className={classes.error}>Invalid JSON format</span>
            )}
        </div>
    );
};
