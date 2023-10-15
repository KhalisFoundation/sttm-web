
import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SearchForm from '@/components/SearchForm';
import { setModalOpen } from '@/features/actions';
import SearchIcon from '@/components/Icons/Search';
import { toSearchURL } from '@/util';

import Dialog from './Dialog';
import ClearSearchButton from '../ClearSearchButton';

interface Props {
    isModalOpen: boolean;
}

const AskSinghBotQuestionModal = (props: Props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = ({handleFormSubmit,...data}) => (e: FormEvent) => {
        e.preventDefault();
        handleFormSubmit();
        console.log(data,'DATA HANDLE SUBMIT')
        history.push(toSearchURL(data));
        dispatch(setModalOpen(false));
    }
    
    return (
        <Dialog isModalOpen={props.isModalOpen} title="Ask gurbani your questions !">
          <div className='ask-singh-bot-question'>
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
                handleSubmit,
                handleSearchTypeChange,
                handleSearchWriterChange,
                handleReset,
            }) => (
            <>
                <form
                    className="search-form"
                    action={action}
                    onSubmit={handleSubmit({
                        handleFormSubmit: handleSubmit,
                        query,
                        type: 8,
                        writer: 'all',
                        source: 'all'
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
                            <ClearSearchButton clickHandler={setQueryAs} />
                            
                            <button type="submit" disabled={disabled}>
                                <SearchIcon />
                            </button>
                        </div>
                    </div>
                </form>
            </>
            )}
          </SearchForm>
        </div>
      </Dialog>
    )
}

export default AskSinghBotQuestionModal;