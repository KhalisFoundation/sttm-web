
import React from 'react';
import { useDispatch } from 'react-redux';
import SearchForm from '@/components/SearchForm';
import { setIsModalOpen } from '@/features/actions';
import SearchIcon from '@/components/Icons/Search';
import ClearSearchButton from '../ClearSearchButton';
import GurmukhiKeyboardToggleButton from '../GurmukhiKeyboardToggleButton';
import Autocomplete from '../Autocomplete';
import { MAX_ANGS } from '@/constants';
import { getShabadList } from '@/util';

interface Props {
    isModalOpen: boolean;
}

const AskSinghBotQuestionModal = (props: Props) => {
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(setIsModalOpen(false));
    }
    return (
        <dialog open={props.isModalOpen} className='background-modal'>
        <div className='add-fav-shabad'>
          <SearchForm>
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
                        required="required"
                        value={query}
                        onKeyDown={handleKeyDown}
                        onChange={handleSearchChange}
                        className={className}
                        placeholder={placeholder}
                        title={title}
                        pattern={pattern}
                        min={name === 'ang' ? 1 : undefined}
                        max={name === 'ang' ? MAX_ANGS[source] : undefined}
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
            </>
        )}
          </SearchForm>
        </div>
      </dialog>
    )
}