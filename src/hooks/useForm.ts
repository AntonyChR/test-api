import { useState } from 'react';
import { isInDevelopment } from '../helpers';

export function useForm<T>(initialState: T, onChangeLog: boolean = false): {
    formValues: T;
    setFormValues: (formValues: T) => void;
    handleChange: (e: any) => void;
} {
    const [formValues, setFormValues] = useState<T>(initialState);

    const handleChange = (event: any) => {
        if (onChangeLog && isInDevelopment) { 
            console.log({ 
                formValues, 
                emiter: { 
                    value: event.target.value, 
                    id: event.target.id, 
                    target: event.target
                } 
            }); 
        }
        const { id, value } = event.target;
        setFormValues({ ...formValues, [id]: value });
    };
    return { formValues, handleChange, setFormValues };
}
