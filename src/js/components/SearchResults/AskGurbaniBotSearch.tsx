import React, { FormEvent, FormEventHandler } from 'react';
import SearchForm from "@/components/SearchForm"
import SearchIcon from '@/components/Icons/Search';
import { useHistory } from 'react-router-dom';
import { toSearchURL } from '@/util';

interface Props {
  query: string;
}

function AskGurbaniBotSearch(props: Props) {
  const { query } = props;
  const history = useHistory();

  const handleSubmit = ({ handleFormSubmit, query }: { handleFormSubmit: FormEventHandler, query: string }) => (e: FormEvent) => {
    e.preventDefault();
    typeof handleFormSubmit === 'function' && handleFormSubmit();
    history.push(toSearchURL({
      query,
      type: 8,
      writer: 'all',
      source: 'all',
      offset: ''
    }));
  }

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
  )
}

export default AskGurbaniBotSearch
