
import React from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setModalOpen } from '@/features/actions';

import BotSinghIcon from '../Icons/BotSinghIcon';
import {AskSinghBotQuestionModal} from '@/components/Modals';

interface ModalOpenState {
    modalOpened: string
}

const AskSinghBotQuestion = () => {
    const dispatch = useDispatch()
    const typedUseSelector: TypedUseSelectorHook<ModalOpenState> = useSelector;
    const modalOpened = typedUseSelector(state => state.modalOpened)
  
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(setModalOpen('askSinghBotQuestion'));
    }

    const isAskSinghBotQuestionModalOpened = modalOpened === 'askSinghBotQuestion';
    console.log(isAskSinghBotQuestionModalOpened, 'is Ask singh bot question')
    return (
        <>
            {isAskSinghBotQuestionModalOpened && <AskSinghBotQuestionModal isModalOpen={isAskSinghBotQuestionModalOpened} />}
            <button className="fp-buttons apps-item" onClick={handleClick}>
                <div className="apps-icon-container">
                    <BotSinghIcon />
                </div>
            </button>
        </>
    )
}

export default AskSinghBotQuestion