import React, { memo, MouseEventHandler } from 'react';
import Fetch from '../Fetch';
import { TEXTS } from '@/constants';
import { IStore } from '@/features/types';
import Larivaar from '@/components/Larivaar';
import { clickEvent, ACTIONS } from '@/util/analytics';
import { toShabadURL, getClassnamesForShabadRatings } from '@/util';

export interface IRelatedShabadData {
  ShabadID: number;
  AvgScore: number;
  Gurmukhi: string;
  GurmukhiUni: string;
  English: string;
  Punjabi: string;
  PunjabiUni: string;
  Spanish: string;
  PageNo: number;
  SourceID: string;
  Transliteration: string;
  WriterEnglish: string;
  RaagGurmukhi: string;
  RaagUnicode: string;
  RaagEnglish: string;
  SourceGurmukhi: string;
  SourceUnicode: string;
  SourceEnglish: string;
}

export interface IRelatedShabadsProps
  extends Pick<
  IStore,
  | 'translationLanguages'
  | 'larivaar'
  | 'larivaarAssist'
  | 'unicode'
  | 'transliterationLanguages'
  > {
  forShabadID: number;
  count?: number;
}

const handleShabadClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
  const id = e.currentTarget.dataset.shabadId;

  clickEvent({ action: ACTIONS.RELATED_SHABAD, label: String(id) });
};

function RelatedShabads({
  unicode,
  translationLanguages,
  transliterationLanguages,
  larivaar,
  larivaarAssist,
  forShabadID,
  count = 4,
}: IRelatedShabadsProps) {
  return (
    <Fetch url={`${SYNC_API_URL}related/shabad/${forShabadID}`}>
      {({ data, loading, error }) => {
        if (loading) {
          return null;
        }

        if (error) {
          return null;
        }

        const items = (data.rows as IRelatedShabadData[]).slice(0, count);

        if (items.length === 0) {
          return null;
        }

        const fontClassName = unicode ? '' : 'gurbani-font';

        const englishTranslation = translationLanguages.includes('english');
        const punjabiTranslation = translationLanguages.includes('punjabi');
        const englishTrasliteration = transliterationLanguages.includes(
          'english'
        );

        return (
          <div className="relatedShabadWrapper">
            <h3>{TEXTS.RELATED_SHABADS}</h3>
            <div className="relatedShabadContainer">
              {items.map((i) => (
                <a
                  key={i.ShabadID}
                  className="relatedShabad"
                  href={toShabadURL({ shabad: { shabadId: i.ShabadID } })}
                  target="_blank"
                  data-shabad-id={i.ShabadID}
                  onClick={handleShabadClick}
                >
                  <div className="relatedShabadInner">
                    <div className="relatedShabadAvgRating">
                      <div
                        style={{
                          transform: `scaleY(${i.AvgScore / 100})`,
                        }}
                        className={`relatedShabadAvgRatingMeter relatedShabadAvgRating${getClassnamesForShabadRatings(
                          i.AvgScore
                        )}`}
                      />
                    </div>
                    <div className="relatedShabadContent">
                      <div className="relatedShabadContentBody">
                        <h3 className={'relatedShabadTitle ' + fontClassName}>
                          <Larivaar
                            enable={larivaar}
                            larivaarAssist={larivaarAssist}
                            unicode={unicode}
                          >
                            {unicode ? i.GurmukhiUni : i.Gurmukhi}
                          </Larivaar>
                        </h3>
                        {englishTrasliteration && (
                          <p className="relatedShabadTransliteration transliteration">
                            {i.Transliteration}
                          </p>
                        )}
                        {englishTranslation && (
                          <blockquote
                            className={
                              'relatedShabadQuote translation english '
                            }
                          >
                            {i.English}
                          </blockquote>
                        )}
                        {punjabiTranslation && (
                          <blockquote
                            className={
                              'relatedShabadQuote translation punjabi ' +
                              fontClassName
                            }
                          >
                            {unicode ? i.PunjabiUni : i.Punjabi}
                          </blockquote>
                        )}
                      </div>
                      <p className="relatedShabadContentFooter">
                        <span
                          className={`relatedShabadSource ${fontClassName}`}
                        >
                          {unicode ? i.SourceUnicode : i.SourceGurmukhi}{' '}
                          {i.PageNo}
                        </span>
                        {englishTranslation && (
                          <span className="relatedShabadSource englishSource">
                            {' '}
                            {` |  ${i.SourceEnglish} ${i.PageNo}`}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
      }}
    </Fetch>
  );
}

export default memo(RelatedShabads);
