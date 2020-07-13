import React, { useMemo, useEffect } from 'react';
import {
  TYPES,
  SOURCES,
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
  searchRaag?: string | number
  searchWriter?: string | number
  onSearchTypeChange: (e: React.ChangeEvent) => {}
  onSearchSourceChange: (e: React.ChangeEvent) => {}
  onSearchRaagChange?: (e: React.ChangeEvent) => {}
  onSearchWriterChange?: (e: React.ChangeEvent) => {}
}

export const SearchTypes: React.FC<ISearchTypesProps> = React.memo(({
  isShowSearchByRaags = true,
  isShowSearchByWriters = true,
  searchType,
  searchSource,
  searchRaag,
  searchWriter,
  onSearchTypeChange,
  onSearchSourceChange,
  onSearchRaagChange,
  onSearchWriterChange,
}) => {
  const { isFetching, raags: searchRaagsList, writers: searchWritersList } = useFetchSearchLists({ isShowSearchByRaags, isShowSearchByWriters })
  const isSearchTypeAng = parseInt(searchType) === SEARCH_TYPES['ANG'];
  const allSearchSourcesAng = Object.keys(SOURCES_WITH_ANG);

  // Just converting it to [{key: value}] format
  const searchTypesList = useMemo(() => TYPES.map((type, idx) => ({ [idx]: type })), [TYPES]);
  const searchSourcesList = useMemo(() => Object.entries(isSearchTypeAng ? SOURCES_WITH_ANG : SOURCES).map(([key, value]) => ({ [key]: value })), [isSearchTypeAng]);

  useEffect(() => {
    return () => console.log('DISMANTLE<<<<<<<<<<<<<,,')
  }, []);

  if (isFetching) {
    return <div className="spinner"></div>
  }

  return (
    <div>
      {/* DIFFERENT SEARCH TYPES */}
      {searchTypesList
        && <select
          name="type"
          id="search-type"
          value={searchType}
          onChange={onSearchTypeChange}
        >
          <SearchOptions list={searchTypesList} />
        </select>}

      {/* BAANI SOURCE SEARCH TYPE */}
      <select
        name="source"
        value={isSearchTypeAng && !allSearchSourcesAng.includes(searchSource) ? 'G' : searchSource}
        onChange={onSearchSourceChange}
      >
        <SearchOptions list={searchSourcesList} />
      </select>

      {/*RAAG SEARCH TYPE*/}
      {isShowSearchByRaags &&
        <select
          name="raag"
          value={searchRaag} onChange={onSearchRaagChange}
        >
          <SearchOptions list={searchRaagsList} />
        </select>}

      {/*WRITER SEARCH TYPE*/}
      {isShowSearchByWriters &&
        <select
          name="writer"
          value={searchWriter}
          onChange={onSearchWriterChange}
        >
          <SearchOptions list={searchWritersList} />
        </select>}
    </div>
  )
});
