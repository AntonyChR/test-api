import { useForm } from '../../../../hooks';
import classes from './BodyEditor.module.css';
export const BodyEditor = () => {
    const { formValues, handleChange } = useForm({body:'{\n    \n}'});

    return (
        <div className={classes.wrapper}>
            <textarea
                id='body'
                value={formValues.body}
                onChange={handleChange}
                className={classes.textArea}
            />
        </div>
    );
};
