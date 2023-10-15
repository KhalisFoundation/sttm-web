
import React from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setModalOpen } from '@/features/actions';

import BotSinghIcon from '../Icons/BotSinghIcon';
import {AskGurbaniBotQuestionModal} from '@/components/Modals';

interface ModalOpenState {
    modalOpened: string
}

const AskGurbaniBotQuestion = () => {
    const dispatch = useDispatch()
    const typedUseSelector: TypedUseSelectorHook<ModalOpenState> = useSelector;
    const modalOpened = typedUseSelector(state => state.modalOpened)
  
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(setModalOpen('AskGurbaniBotQuestion'));
    }

    const isAskGurbaniBotQuestionModalOpened = modalOpened === 'AskGurbaniBotQuestion';
    
    return (
        <>
            {isAskGurbaniBotQuestionModalOpened && <AskGurbaniBotQuestionModal isModalOpen={isAskGurbaniBotQuestionModalOpened} />}
            <button className="fp-buttons apps-item" onClick={handleClick}>
                <div className="apps-icon-container">
                    <BotSinghIcon />
                </div>
            </button>
        </>
    )
}

export default AskGurbaniBotQuestion