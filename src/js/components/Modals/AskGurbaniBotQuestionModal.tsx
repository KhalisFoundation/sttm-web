import React, { FormEvent, FormEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SearchForm from '@/components/SearchForm';
import { setModalOpen } from '@/features/actions';
import SearchIcon from '@/components/Icons/Search';
import { toSearchURL } from '@/util';

import Dialog from './Dialog';
import { SEARCH_TYPES, SOURCES } from '@/constants';

interface Props {
  isModalOpen: boolean;
}

const AskGurbaniBotQuestionModal = (props: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit =
    ({
      handleFormSubmit,
      query,
      source,
    }: {
      handleFormSubmit: FormEventHandler;
      query: string;
      source: string;
    }) =>
      (e: FormEvent) => {
        e.preventDefault();
        typeof handleFormSubmit === 'function' && handleFormSubmit();
        history.push(
          toSearchURL({
            query,
            type: SEARCH_TYPES.ASK_A_QUESTION,
            writer: 'all',
            source,
            offset: '',
          })
        );
        dispatch(setModalOpen(''));
      };

  return (
    <Dialog
      isModalOpen={props.isModalOpen}
      title="Ask a question to Khalis AI"
    >
      <div className="ask-gurbani-bot-question">
        <SearchForm
          defaultType={SEARCH_TYPES.ASK_A_QUESTION}
          defaultSource="all"
          defaultWriter={0}
        >
          {({
            pattern,
            disabled,
            title,
            className,
            displayGurmukhiKeyboard,
            query,
            action,
            name,
            placeholder,
            handleKeyDown,
            handleSearchChange,
            handleSubmit: handleFormSubmit,
            source,
            handleSearchSourceChange,
            isSourceChanged,
          }) => (
            <form
              className="search-form"
              action={action}
              onSubmit={handleSubmit({
                handleFormSubmit: handleFormSubmit,
                query,
                source,
              })}
            >
              <div className="search-container-wrapper">
                <div
                  id="search-container"
                  className={displayGurmukhiKeyboard ? 'kb-active' : ''}
                >
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
              <div className="search-options">
                <div className="search-option">
                  <select
                    name="source"
                    value={source}
                    className={[isSourceChanged ? 'selected' : null]}
                    onChange={handleSearchSourceChange}
                  >
                    {Object.entries(SOURCES).map(([value, children]) => (
                      <option key={value} value={value}>
                        {children}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          )
          }
        </SearchForm>
      </div>
    </Dialog>
  );
};

export default AskGurbaniBotQuestionModal;
