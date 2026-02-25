import React, { FormEvent, FormEventHandler } from 'react';
import SearchForm from "@/components/SearchForm"
import SearchIcon from '@/components/Icons/Search';
import { useHistory } from 'react-router-dom';
import { toSearchURL } from '@/util';
import { SEARCH_TYPES, SOURCES } from '@/constants';

interface Props {
  query: string;
  source: string;
}

function AskGurbaniBotSearch(props: Props) {
  const { query, source } = props;
  const history = useHistory();

  const handleSubmit = ({ handleFormSubmit, query, source }: { handleFormSubmit: FormEventHandler, query: string, source: string }) => (e: FormEvent) => {
    e.preventDefault();
    typeof handleFormSubmit === 'function' && handleFormSubmit();
    history.push(toSearchURL({
      query,
      type: SEARCH_TYPES.ASK_A_QUESTION,
      writer: 'all',
      source,
      offset: ''
    }));
  }

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    history.push(toSearchURL({
      query,
      type: SEARCH_TYPES.ASK_A_QUESTION,
      writer: 'all',
      source: e.target.value,
      offset: '',
    }));
  };

  return (
    <div className='ask-gurbani-bot-question-search'>
      <SearchForm defaultQuery={query && decodeURIComponent(query)} defaultType={8} defaultSource='all' defaultWriter={0}>
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
            <div className="search-options">
              <div className="search-option">
                <select
                  name="source"
                  value={source}
                  onChange={handleSourceChange}
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
        )}
      </SearchForm>
    </div>
  )
}

export default AskGurbaniBotSearch
