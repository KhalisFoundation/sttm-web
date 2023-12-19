import React from 'react';
import { useDispatch } from 'react-redux';
import Times from '../Icons/Times';
import { setModalOpen } from '@/features/actions';

interface Props {
    isModalOpen: boolean;
    title: string;
    content?: React.ReactNode; 
    children?: React.ReactNode;
}

const Dialog = (props: Props) => {
    const dispatch = useDispatch();
    return (
        <dialog open={props.isModalOpen} className="background-modal">
            <div className='modal'>
                <div className='header'>
                    <span>{props.title}</span>
                    <button className='settings-times' aria-label="close" onClick={() => dispatch(setModalOpen(''))}><Times /></button>
                </div>
                <div className='content'>
                    {props.children}
                </div>
            </div>
        </dialog>
    )
}

export default Dialog;