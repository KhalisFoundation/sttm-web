import React from 'react';
import { useDispatch } from 'react-redux';
import Times from '../Icons/Times';
import { setModalOpen } from '@/features/actions';

interface Props {
    isModalOpen: boolean;
    title: string;
    content?: React.ReactNode; 
    children?: React.ReactNode;
    onClose?: () => void;
}

const Dialog = (props: Props) => {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setModalOpen(''));
        props.onClose?.();
    }
    return (
        <dialog open={props.isModalOpen} className="background-modal">
            <div className='modal'>
                <div className='header'>
                    <span>{props.title}</span>
                    <button className='settings-times' aria-label="close" onClick={handleClose}><Times /></button>
                </div>
                <div className='content'>
                    {props.children}
                </div>
            </div>
        </dialog>
    )
}

export default Dialog;