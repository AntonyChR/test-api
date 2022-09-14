import { useState } from 'react';
import { Modal } from '../../common';
import { BodyEditor } from './body/BodyEditor';
import { CookiesEditor } from './cookies/CookiesEditor';

import classes from './Payload.module.scss';

const modals = {
    body: <BodyEditor />,
    cookies: <CookiesEditor />,
};

enum ModalTypes {
    body = 'body',
    cookies = 'cookies',
}

export const PayloadRequestEditor = () => {
    const [editorIsOpen, setEditorIsOpen] = useState<boolean>(false);
    const [modalTypeToShow, setModalTypeToShow] = useState<ModalTypes>(ModalTypes.body);
    const selectModal = (modalType: ModalTypes) => {
        setEditorIsOpen(true);
        setModalTypeToShow(modalType);
    };
    return (
        <>
            <div className={classes.wrapper}>
                <ul className={classes.list}>
                    <li onClick={() => selectModal(ModalTypes.body)}>Body</li>
                    <li onClick={() => selectModal(ModalTypes.cookies)}>
                        Cookies
                    </li>
                </ul>
            </div>
            {editorIsOpen && (
                <Modal onClose={() => setEditorIsOpen(false)}>
                    {modals[modalTypeToShow]}
                </Modal>
            )}
        </>
    );
};
