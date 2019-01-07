import React, { memo, MouseEventHandler } from 'react';
import Fetch from '../Fetch';
import { TEXTS } from '@/constants';
import { IStore } from '@/features/types';
import { toShabadURL } from '@/util';

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

const handleShabadClick: MouseEventHandler<HTMLAnchorElement> = e => {
  const id = e.currentTarget.dataset.shabadId;

  // TODO: Analytics?
};

function RelatedShabads({
  unicode,
  translationLanguages,
  transliterationLanguages,

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

        return (
          <div className="relatedShabadWrapper">
            <h3>{TEXTS.RELATED_SHABADS}</h3>
            <div className="relatedShabadContainer">
              {items.map(i => (
                <a
                  key={i.ShabadID}
                  className="relatedShabad"
                  href={toShabadURL({ shabad: { shabadid: i.ShabadID } })}
                  target="_blank"
                  data-shabad-id={i.ShabadID}
                  onClick={handleShabadClick}
                >
                  <div>
                    {unicode ? (
                      <h4>{i.GurmukhiUni}</h4>
                    ) : (
                      <h4 className="gurbani-font">{i.Gurmukhi}</h4>
                    )}
                    {transliterationLanguages.includes('english') && (
                      <h4>{i.Transliteration}</h4>
                    )}
                  </div>
                  {translationLanguages.includes('english') && (
                    <p>{i.English}</p>
                  )}
                  {translationLanguages.includes('punjabi') &&
                    (unicode ? (
                      <p>{i.PunjabiUni}</p>
                    ) : (
                      <p className="gurbani-font">{i.Punjabi}</p>
                    ))}
                  {unicode ? (
                    <p>
                      {i.SourceUnicode} {i.PageNo}
                    </p>
                  ) : (
                    <p className="gurbani-font">
                      {i.SourceGurmukhi} {i.PageNo}
                    </p>
                  )}
                  {translationLanguages.includes('english') && (
                    <p>
                      {i.SourceEnglish} {i.PageNo}
                    </p>
                  )}
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
