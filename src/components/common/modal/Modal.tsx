import { FC, ReactNode } from "react"

import classes from './Modal.module.scss'
interface Props{
    children: ReactNode;
    onClose: ()=>void;
}

export const Modal:FC<Props> = ({children, onClose}) => {
    return (
        <div className={classes.background} >
            <div className={classes.clicker} onClick={onClose}></div>
            <div className={classes.wrapper}>
                {children}
            </div>
        </div>
    )
}


