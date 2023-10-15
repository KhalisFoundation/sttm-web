
import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SearchForm from '@/components/SearchForm';
import { setIsModalOpen, setModalOpen } from '@/features/actions';
import SearchIcon from '@/components/Icons/Search';
import ClearSearchButton from '../ClearSearchButton';
import GurmukhiKeyboardToggleButton from '../GurmukhiKeyboardToggleButton';
import { toSearchURL } from '@/util';

interface Props {
    isModalOpen: boolean;
}

const AskSinghBotQuestionModal = (props: Props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = ({handleFormSubmit,...data}) => (e: FormEvent) => {
        e.preventDefault();
        handleFormSubmit();
        history.push(toSearchURL(data));
        dispatch(setModalOpen(false));
    }

    console.log(props.isModalOpen, 'PROPS. IS MODAL OPEN')

    return (
        <dialog open={props.isModalOpen} className='background-modal'>
        {/* <div className='add-fav-shabad'>
          <SearchForm defaultType={8}>
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
            <form
                className="search-form"
                action={action}
                onSubmit={handleSubmit({
                    handleFormSubmit: handleSubmit,
                    query,
                    type,
                    source,
                    writer,
                })}
            >
                <div className="search-container-wrapper">
                <div id="search-container" className={displayGurmukhiKeyboard ? "kb-active" : ''}>
                    <input
                        autoFocus={true}
                        name={name}
                        id="search"
                        type={inputType}
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
                    {isShowKeyboard && <GurmukhiKeyboardToggleButton clickHandler={setGurmukhiKeyboardVisibilityAs} isVisible={displayGurmukhiKeyboard} />}
                    <button type="submit" disabled={disabled}>
                        <SearchIcon />
                    </button>
                </div>
                {!displayGurmukhiKeyboard && (
                    <a target='blank' rel="noopener noreferrer" href="https://support.khalisfoundation.org/support/solutions" className="question-icon-wrapper">
                        <span className='question-icon'>?</span>                
                    </a>
                )}
                </div>
            </form>
        )}
          </SearchForm>
        </div> */}
        <div className='add-fav-shabad'>Add fav shabad</div>
      </dialog>
    )
}

export default AskSinghBotQuestionModal;