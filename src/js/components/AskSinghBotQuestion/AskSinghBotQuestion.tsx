
import React from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import BotSinghIcon from '../Icons/BotSinghIcon';
import AskSinghBotQuestionModal from './AskSinghBotQuestionModal';
import { setIsModalOpen } from '@/features/actions';

interface ModalOpenState {
    isModalOpen: boolean
}

const AskSinghBotQuestion = () => {
    const dispatch = useDispatch()
    const typedUseSelector: TypedUseSelectorHook<ModalOpenState> = useSelector;
    const isModalOpen = typedUseSelector(state => state.isModalOpen)
  
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(setIsModalOpen(true));
    }
  
    return (
        <>
            {isModalOpen && <AskSinghBotQuestionModal isModalOpen={isModalOpen} />}
            <button className="fp-buttons apps-item" onClick={handleClick}>
                <div className="apps-icon-container">
                    <BotSinghIcon />
                </div>
            </button>
        </>
    )
}

export default AskSinghBotQuestion