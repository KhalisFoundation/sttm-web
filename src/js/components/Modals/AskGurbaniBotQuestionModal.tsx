
import React, { FormEvent, FormEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SearchForm from '@/components/SearchForm';
import { setModalOpen } from '@/features/actions';
import SearchIcon from '@/components/Icons/Search';
import { toSearchURL } from '@/util';

import Dialog from './Dialog';

interface Props {
    isModalOpen: boolean;
}

const AskGurbaniBotQuestionModal = (props: Props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = ({handleFormSubmit,query}: {handleFormSubmit: FormEventHandler, query: string}) => (e: FormEvent) => {
        e.preventDefault();
        typeof handleFormSubmit === 'function' && handleFormSubmit();
        history.push(toSearchURL({
            query,
            type: 8,
            writer: 'all',
            source: 'all',
            offset: ''
        }));
        dispatch(setModalOpen(''));
    }
    
    return (
        <Dialog isModalOpen={props.isModalOpen} title="Ask gurbani your questions !">
          <div className='ask-gurbani-bot-question'>
          <SearchForm defaultType={8} defaultSource='all' defaultWriter={0}>
            {({
                pattern,
                disabled,
                title,
                className,
                displayGurmukhiKeyboard,
                query,
                type,
                inputType,
                source,
                writer,
                writers,
                action,
                name,
                placeholder,
                isShowKeyboard,
                setGurmukhiKeyboardVisibilityAs,
                setQueryAs,
                isSourceChanged,
                isWriterChanged,
                handleKeyDown,
                handleSearchChange,
                handleSearchSourceChange,
                handleSubmit: handleFormSubmit,
                handleSearchTypeChange,
                handleSearchWriterChange,
                handleReset,
            }) => (
                <form
                    className="search-form"
                    action={action}
                    onSubmit={handleSubmit({
                        handleFormSubmit: handleFormSubmit,
                        query,
                    })}
                >
                    <div className="search-container-wrapper">
                        <div id="search-container" className={displayGurmukhiKeyboard ? "kb-active" : ''}>
                            <input
                                autoFocus
                                name={name}
                                id="search"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck={false}
                                required
                                value={query}
                                onKeyDown={handleKeyDown}
                                onChange={handleSearchChange}
                                className={className}
                                placeholder={placeholder}
                                title={title}
                                pattern={pattern}
                            />
                            
                            <button type="submit" disabled={disabled}>
                                <SearchIcon />
                            </button>
                        </div>
                    </div>
                </form>
            )}
          </SearchForm>
        </div>
      </Dialog>
    )
}

export default AskGurbaniBotQuestionModal;