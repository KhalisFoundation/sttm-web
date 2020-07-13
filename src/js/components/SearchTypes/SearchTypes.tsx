import React, { useEffect, useState } from 'react';
import {
  TYPES,
  SOURCES,
  LOCAL_STORAGE_KEY_FOR_SEARCH_SOURCE,
  LOCAL_STORAGE_KEY_FOR_SEARCH_TYPE,
  LOCAL_STORAGE_KEY_FOR_SEARCH_RAAG,
  LOCAL_STORAGE_KEY_FOR_SEARCH_WRITER,
  PLACEHOLDERS,
  DEFAULT_SEARCH_TYPE,
  DEFAULT_SEARCH_SOURCE,
  DEFAULT_SEARCH_RAAG,
  DEFAULT_SEARCH_WRITER,
  SEARCH_TYPES,
  SOURCES_WITH_ANG,
} from '@/constants';
import { useFetchSearchLists } from './hooks';
import { SearchOptions } from './SearchOptions';


interface ISearchTypesProps {
  isShowSearchByRaags?: boolean,
  isShowSearchByWriters?: boolean,
  searchType: string
  searchSource: string
  searchRaagId?: string | number
  searchWriterId?: string | number
  handleSearchTypeChange: (e: React.ChangeEvent) => {}
  handleSearchSourceChange: (e: React.ChangeEvent) => {}
  handleSearchRaagIdChange?: (e: React.ChangeEvent) => {}
  handleSearchWriterIdChange?: (e: React.ChangeEvent) => {}
}

export const SearchTypes: React.FC<ISearchTypesProps> = ({
  isShowSearchByRaags = true,
  isShowSearchByWriters = true,
  searchType,
  searchSource,
  searchRaagId,
  searchWriterId,
  handleSearchTypeChange,
  handleSearchSourceChange,
  handleSearchRaagIdChange,
  handleSearchWriterIdChange,
}) => {
  const { isFetching, raags, writers } = useFetchSearchLists({ isShowSearchByRaags, isShowSearchByWriters })
  const isSearchTypeAng = parseInt(searchType) === SEARCH_TYPES['ANG'];
  const allSearchSourcesAng = Object.keys(SOURCES_WITH_ANG);

  return (
    <div>
      {/* DIFFERENT SEARCH TYPES */}
      <select
        name="type"
        id="search-type"
        value={searchType}
        onChange={handleSearchTypeChange}
      >
        <SearchOptions list={TYPES} />
      </select>

      {/* BAANI SOURCE SEARCH TYPE */}
      <select
        name="source"
        value={isSearchTypeAng && !allSearchSourcesAng.includes(searchSource) ? 'G' : searchSource}
        onChange={handleSearchSourceChange}
      >
        <SearchOptions list={isSearchTypeAng ? SOURCES_WITH_ANG : SOURCES} />
      </select>

      {/*RAAG SEARCH TYPE*/}
      {isShowSearchByRaags &&
        <select
          name="raag"
          value={searchRaagId} onChange={handleSearchRaagIdChange}
        >
          <SearchOptions list={raags} />
        </select>}

      {/*WRITER SEARCH TYPE*/}
      {isShowSearchByWriters &&
        <select
          name="writer"
          value={searchWriterId}
          onChange={handleSearchWriterIdChange}
        >
          <SearchOptions list={writers} />
        </select>}
    </div>
  )
};
