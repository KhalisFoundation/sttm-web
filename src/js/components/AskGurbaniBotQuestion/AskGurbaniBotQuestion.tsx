import React from 'react';

import BotSinghIcon from '../Icons/BotSinghIcon';

export const KHALIS_AI_URL = 'https://next.sikhitothemax.org/?mode=khalis-ai';

const AskGurbaniBotQuestion = () => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.open(KHALIS_AI_URL, '_blank', 'noopener,noreferrer');
    }

    return (
        <button className="fp-buttons apps-item" onClick={handleClick} aria-label="Khalis AI">
            <div className="apps-icon-container">
                <BotSinghIcon />
            </div>
        </button>
    )
}

export default AskGurbaniBotQuestion
