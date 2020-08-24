import React, { useMemo, useEffect } from 'react';
import { TYPES, SOURCES, SEARCH_TYPES, SOURCES_WITH_ANG } from '@/constants';
import { FilterOptions } from './FilterOptions';
import { useFetchFilterLists } from './hooks';

interface FilterTypesProps {
  isShowFilterByRaags?: boolean;
  isShowFilterByWriters?: boolean;
  filterType: string;
  filterSource: string;
  filterRaag?: string | number;
  filterWriter?: string | number;
  onFilterTypeChange: (e: React.ChangeEvent) => {};
  onFilterSourceChange: (e: React.ChangeEvent) => {};
  onFilterRaagChange?: (e: React.ChangeEvent) => {};
  onFilterWriterChange?: (e: React.ChangeEvent) => {};
}

export const FilterTypes: React.FC<FilterTypesProps> = React.memo(
  ({
    isShowFilterByRaags = true,
    isShowFilterByWriters = true,
    filterType,
    filterSource,
    filterRaag,
    filterWriter,
    onFilterTypeChange,
    onFilterSourceChange,
    onFilterRaagChange,
    onFilterWriterChange,
  }) => {
    const {
      isFetching,
      raags: filterRaagsList,
      writers: filterWritersList,
    } = useFetchFilterLists({ isShowFilterByRaags, isShowFilterByWriters });
    const isFilterTypeAng = parseInt(filterType) === SEARCH_TYPES['ANG'];
    const allFiltersAng = Object.keys(SOURCES_WITH_ANG);

    // Just converting it to [{key: value}] format
    const filterTypesList = useMemo(
      () => TYPES.map((type, idx) => ({ [idx]: type })),
      [TYPES]
    );
    const filterSourcesList = useMemo(
      () =>
        Object.entries(
          isFilterTypeAng ? SOURCES_WITH_ANG : SOURCES
        ).map(([key, value]) => ({ [key]: value })),
      [isFilterTypeAng]
    );

    useEffect(() => {
      return () => console.log('DISMANTLE<<<<<<<<<<<<<,,');
    }, []);

    if (isFetching) {
      return <div className="spinner"></div>;
    }

    return (
      <>
        {/* SEARCH FILTER TYPE */}
        {filterTypesList && (
          <select
            name="type"
            id="search-type"
            value={filterType}
            onChange={onFilterTypeChange}
          >
            <FilterOptions list={filterTypesList} />
          </select>
        )}

        {/* BAANI SOURCE FILTER TYPE */}
        <select
          name="source"
          value={
            isFilterTypeAng && !allFiltersAng.includes(filterSource)
              ? 'G'
              : filterSource
          }
          onChange={onFilterSourceChange}
        >
          <FilterOptions list={filterSourcesList} />
          filterSourceList{' '}
        </select>

        {/*RAAG FILTER TYPE*/}
        {isShowFilterByRaags && (
          <select name="raag" value={filterRaag} onChange={onFilterRaagChange}>
            <FilterOptions list={filterRaagsList} />
          </select>
        )}

        {/*WRITER FILTER TYPE*/}
        {isShowFilterByWriters && (
          <select
            name="writer"
            value={filterWriter}
            onChange={onFilterWriterChange}
          >
            <FilterOptions list={filterWritersList} />
          </select>
        )}
      </>
    );
  }
);
