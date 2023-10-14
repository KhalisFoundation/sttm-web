
import React from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import BotSinghIcon from '../Icons/BotSinghIcon';

interface ModalOpenState {
    isModalOpen: boolean
}

const AskSinghBotQuestion = () => {
    const dispatch = useDispatch()
    const typedUseSelector: TypedUseSelectorHook<ModalOpenState> = useSelector;
    const isModalOpen = typedUseSelector(state => state.isModalOpen)
  
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
    }
  
    return (
        {isModalOpen && <AskSinghBotQuestionModal />}
        <button className="fp-buttons apps-item" onClick={onClick}>
            <div className="apps-icon-container">
                <BotSinghIcon />
            </div>
        </button>
    )
}

export default AskSinghBotQuestion