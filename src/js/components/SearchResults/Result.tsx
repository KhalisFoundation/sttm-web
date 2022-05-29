import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Larivaar from '../../components/Larivaar';
import { toShabadURL, getHighlightIndices, multiviewFormattedShabad } from '../../util';
import { getHighlightString } from './util/get-highlight-string';

import {
  SEARCH_TYPES
} from '@/constants';

import {
  getQueryParams,
  toAngURL,
} from '@/util';

import {
  getAng,
  getSource,
  getSourceId,
  getUnicodeVerse,
  getGurmukhiVerse,
  translationMap,
  transliterationMap,
  getRaag,
  getWriter,
  getWriterId,
} from '@/util/api/shabad';
import { ShabadButtonWrapper } from '../ShabadButtonWrapper';
import { useRemoveFavouriteShabad } from '../FavouriteShabadButton/hooks/index'
import { StarIcon } from '../Icons/StarIcon'
import { isShabadExistMultiview } from '@/util/shabad';
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { IUser } from '@/types/user'
import { useGetUser } from '@/hooks';
import RaagIcon from '../Icons/RaagIcon'
import WriterIcon from '../Icons/WriterIcon'
import SourceIcon from '../Icons/SourceIcon'
import { Play } from '../Icons/controls/Play'
import PreviewShabad from '../PreviewShabad';

interface IShabadButtonWrapper {
  multipleShabads: IMultipleShabadsProps[]
}
interface IShabadResultProps {
  shabad: any
  q: string,
  type: number,
  source: string,
  translationLanguages: string[],
  transliterationLanguages: string[],
  larivaarAssist: boolean,
  larivaar: boolean,
  unicode: boolean,
  fontSize: number,
  fontFamily: string,
};

const SearchResult: React.FC<IShabadResultProps> = ({
  transliterationLanguages,
  translationLanguages,
  shabad,
  fontSize,
  fontFamily,
  q,
  type,
  source,
  unicode,
  larivaar,
  larivaarAssist,
}) => {
  const { user } = useGetUser<IUser>()
  const location = useLocation();
  const [isShabadPreview, setIsShabadPreview] = useState(false);
  const [verses, setVerses] = useState([])
  const pathName = location.pathname;
  const searchQuery = location.search;
  const isFavShabadPage = pathName === '/user/favourite-shabads'
  const _source = getSource(shabad);
  const sourceId = getSourceId(shabad);
  const writerId = getWriterId(shabad);
  const shabadPageNo = getAng(shabad) === null ? '' : getAng(shabad);

  const isSearchTypeEnglishWord = type === SEARCH_TYPES.ENGLISH_WORD;
  const shabadEnglishTranslation = translationMap['english'](shabad);

  // english-word search type we needs to highlight index for english translations.
  // romanized first letters we needs to highlight index for english transliterations

  const highlightIndex = getHighlightIndices(
    getHighlightString(type, shabad),
    q,
    type,
  );

  const formattedShabad = multiviewFormattedShabad(shabad)

  const remove = useRemoveFavouriteShabad()

  const getShabadUrl = (id) => `${API_URL}/shabads/${id}`

  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    remove.mutate(formattedShabad.shabadId)
  }
  const typedUseSelector: TypedUseSelectorHook<IShabadButtonWrapper> = useSelector;
  const multipleShabads = typedUseSelector(state => state.multipleShabads)
  const isShabadAdded = isShabadExistMultiview(multipleShabads, formattedShabad.verseId);

  const handleSourceClick = () => {
    const { source } = getQueryParams(searchQuery)
    const newSearchQuery = searchQuery.replace(`source=${source}`, `source=${sourceId}`)
    const newUrl = pathName + newSearchQuery;
    return newUrl
  }

  const handleWriterClick = () => {
    const { writer } = getQueryParams(searchQuery)
    const newSearchQuery = searchQuery.replace(`writer=${writer}`, `writer=${writerId}`)
    const newUrl = pathName + newSearchQuery;
    return newUrl
  }

  const handleMouseEnter = async (id) => {
    let response = await fetch(getShabadUrl(id));
    let shabad = await response.json();
    setVerses(shabad?.verses);
    setIsShabadPreview(true);
  }

  return (
    <React.Fragment key={shabad.id}>
      <li
        className="search-result">
        <div className="shabad-detail">
          <Link
            style={{
              fontSize: `${fontSize}em`,
              fontFamily: `${fontFamily}`
            }}
            to={toShabadURL({ shabad, q, type, source })}
            className="gurbani-font gurbani-display"
            onMouseEnter={() => handleMouseEnter(shabad.shabadId)}
            onMouseLeave={() => setIsShabadPreview(false)}
          >
            {unicode ? (
              <div className={`unicode ${larivaar ? 'larivaar' : ''}`}>
                <Larivaar
                  type={type}
                  larivaarAssist={larivaarAssist}
                  enable={larivaar}
                  unicode={unicode}
                  highlightIndex={isSearchTypeEnglishWord ? [] : highlightIndex}
                  query={q}
                  visraam={shabad.visraam}
                >
                  {getUnicodeVerse(shabad)}
                </Larivaar>
              </div>
            ) : (
              <div className={`gurlipi ${larivaar ? 'larivaar' : ''}`}>
                <Larivaar
                  type={type}
                  larivaarAssist={larivaarAssist}
                  enable={larivaar}
                  highlightIndex={isSearchTypeEnglishWord ? [] : highlightIndex}
                  query={q}
                  visraam={shabad.visraam}
                >
                  {getGurmukhiVerse(shabad)}
                </Larivaar>
              </div>
            )}
          </Link>

          {transliterationLanguages.includes('english') && (
            <p className="transliteration english">
              {transliterationMap['english'](shabad)}
            </p>
          )}

          {transliterationLanguages.includes('hindi') && (
            <p className="transliteration hindi">
              {transliterationMap['hindi'](shabad)}
            </p>
          )}

          {transliterationLanguages.includes('shahmukhi') && (
            <p className="transliteration shahmukhi">
              {transliterationMap['shahmukhi'](shabad)}
            </p>
          )}

          {transliterationLanguages.includes('IPA') && (
            <p className="transliteration IPA">
              {transliterationMap['IPA'](shabad)}
            </p>
          )}

          {translationLanguages.includes('punjabi') && (
            <blockquote className="translation punjabi gurbani-font">
              {unicode ? (
                <div className="unicode">
                  {translationMap['punjabi'](shabad).unicode}
                </div>
              ) : (
                <div className="gurlipi">
                  {translationMap['punjabi'](shabad).gurmukhi}
                </div>
              )}
            </blockquote>
          )}

          {translationLanguages.includes('english') && (
            <blockquote className="translation english">
              {isSearchTypeEnglishWord ?
                <Larivaar
                  larivaarAssist={false}
                  enable={false}
                  unicode={false}
                  highlightIndex={highlightIndex}
                  query={q}
                  type={type}
                >
                  {shabadEnglishTranslation}
                </Larivaar>

                : shabadEnglishTranslation
              }
            </blockquote>
          )}

          {translationLanguages.includes('spanish') && (
            <blockquote className="translation spanish">
              {translationMap['spanish'](shabad)}
            </blockquote>
          )}

          {translationLanguages.includes('hindi') && (
            <blockquote className="translation hindi">
              {translationMap['hindi'](shabad)}
            </blockquote>
          )}

          <div className="meta flex wrap">
            {_source &&
              <div className='search-result-icon-wrap' >
                <SourceIcon />
                <Link to={handleSourceClick}>{_source}</Link>
              </div>
            }
            {shabadPageNo &&
              <div className='search-result-icon-wrap' >
                <Play className='search-result-icon' />
                <Link to={toAngURL({ ang: shabadPageNo, source: sourceId })}>{shabadPageNo}</Link>
              </div>
            }
            <div className='search-result-icon-wrap'>
              <WriterIcon className='search-result-icon' />
              <Link to={handleWriterClick}>{getWriter(shabad)['english']}</Link>
            </div>
            {getRaag(shabad)['english'] === 'No Raag' ||
              getRaag(shabad)['english'] === null ? (
              ''
            ) : (
              <div className='search-result-icon-wrap'>
                <RaagIcon className='search-result-icon' />
                <p className='raag-title'>{getRaag(shabad)['english']}</p>
              </div>
            )}
          </div>
        </div>

        {isShabadPreview && <PreviewShabad verses={verses} />}

        <div className="favourite-shabad-wrap">
          {(user && isFavShabadPage) ? <div className="favourite-shabad-wrap icons">
            <button
              data-cy="favourite-shabad"
              onClick={handleRemoveClick}
              className="remove-fav-button"
            >
              <StarIcon />
            </button>
            <ShabadButtonWrapper shabad={formattedShabad} />
          </div> :
            <div className="favourite-shabad-wrap icons">
              {
                <ShabadButtonWrapper shabad={formattedShabad} />
              }
            </div>}
          <div className="favourite-shabad-wrap labels">
            {(user && isFavShabadPage) && <span className='remove-fav-title'>Remove favourite</span>}
            {isShabadAdded
              ? (<span className='multiview-title'>Remove from multiview</span>)
              : (<span className='multiview-title' >Add to multiview</span>)}
          </div>
        </div>
      </li>
    </React.Fragment>
  );
}

export default React.memo(SearchResult);
