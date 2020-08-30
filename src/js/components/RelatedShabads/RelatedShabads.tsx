import React, { memo } from 'react';
import Fetch from '../Fetch';
import { TEXTS } from '@/constants';
import { IStore } from '@/features/types';
import Larivaar from '@/components/Larivaar';
import { clickEvent, ACTIONS } from '@/util/analytics';
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

interface IRelatedShabadsState {
  visibleShabads: number;
}

class RelatedShabads extends React.PureComponent<IRelatedShabadsProps, IRelatedShabadsState> {

  static showMoreShabads = 4;
  static maxVisibleShabads = 20;
  static shabadMatchingScoreScale = 1.5;

  constructor(props: Readonly<IRelatedShabadsProps>) {
    super(props);
    this.state = {
      visibleShabads: RelatedShabads.showMoreShabads //default value
    }
  }

  getClassnamesForShabadRatings = (avgScore: number): string => {
    if (avgScore >= 70) {
      return 'Excellent'
    } else if (avgScore >= 40) {
      return 'Good';
    }
    return 'Poor'
  }

  setVisibleShabadsState = (noOfShabads: number) => {
    this.setState(() => {
      return {
        ...this.state,
        visibleShabads: noOfShabads
      }
    })
  }

  getShabadScoreForTitle = (avgScore: number) => {
    const decimal = avgScore - parseInt(avgScore.toString(), 10);
    if (decimal >= 0.5) {
      return Math.ceil(avgScore).toString();
    }

    return Math.floor(avgScore).toString();
  }

  handleShabadClick = (shabadId: number) => () => {
    clickEvent({ action: ACTIONS.RELATED_SHABAD, label: String(shabadId) });
  };

  handleShowMore = (totalShabads: number) => () => {
    const shabadsToShow = Math.min(totalShabads, this.state.visibleShabads + RelatedShabads.showMoreShabads);

    this.setVisibleShabadsState(shabadsToShow)
  }

  render() {
    const {
      unicode,
      translationLanguages,
      // transliterationLanguages,
      larivaar,
      larivaarAssist,
      forShabadID,
      count = 20,
    } = this.props;

    const {
      visibleShabads
    } = this.state;

    return (
      <Fetch url={`${SYNC_API_URL}related/shabad/${forShabadID}`}>
        {({ data, loading, error }) => {
          if (loading || error || data.error) {
            return null;
          }

          const shabads = (data.rows as IRelatedShabadData[]).slice(0, count);
          const totalShabads = shabads.length;

          if (totalShabads === 0) {
            return null;
          }
          const sortedShabads = shabads.sort((s1, s2) => s2.AvgScore - s1.AvgScore);

          const fontClassName = unicode ? '' : 'gurbani-font';

          const englishTranslation = translationLanguages.includes('english');
          // const punjabiTranslation = translationLanguages.includes('punjabi');
          // const englishTrasliteration = transliterationLanguages.includes(
          //   'english'
          // );

          return (
            <div className="relatedShabadWrapper">
              <h3>{TEXTS.RELATED_SHABADS}</h3>
              <div className="relatedShabadContainer">
                {sortedShabads.map((s, idx) => {

                  if (idx + 1 > visibleShabads) {
                    return null;
                  }

                  const shabadScores = Math.min(s.AvgScore * RelatedShabads.shabadMatchingScoreScale, 100);
                  const shabadBarScale = shabadScores / 100;

                  return (
                    <a
                      key={s.ShabadID}
                      className="relatedShabad"
                      href={toShabadURL({ shabad: { shabadId: s.ShabadID } })}
                      target="_blank"
                      data-shabad-id={s.ShabadID}
                      onClick={this.handleShabadClick(s.ShabadID)}
                    >
                      <div className="relatedShabadInner">
                        <div
                          title={`${this.getShabadScoreForTitle(shabadScores)}% matches`}
                          className="relatedShabadAvgRating">
                          <div
                            style={{
                              transform: `scaleX(${shabadBarScale})`,
                            }}
                            className={`relatedShabadAvgRatingMeter relatedShabadAvgRating${this.getClassnamesForShabadRatings(
                              shabadScores
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
                                {unicode ? s.GurmukhiUni : s.Gurmukhi}
                              </Larivaar>
                            </h3>
                            {/*englishTrasliteration && (
                          <p className="relatedShabadTransliteration transliteration">
                            {s.Transliteration}
                          </p>
                        )*/}
                            {englishTranslation && (
                              <blockquote
                                className={
                                  'relatedShabadQuote translation english '
                                }
                              >
                                {s.English}
                              </blockquote>
                            )}
                            {/*punjabiTranslation && (
                            <blockquote
                              className={
                                'relatedShabadQuote translation punjabi ' +
                                fontClassName
                              }
                            >
                              {unicode ? s.PunjabiUni : s.Punjabi}
                            </blockquote>
                            )*/}
                          </div>
                          <p className="relatedShabadContentFooter">
                            <span
                              className={`relatedShabadSource ${fontClassName}`}
                            >
                              {unicode ? s.SourceUnicode : s.SourceGurmukhi}{' '}
                              {s.PageNo}
                            </span>
                            {englishTranslation && (
                              <span className="relatedShabadSource englishSource">
                                {' '}
                                {` |  ${s.SourceEnglish} ${s.PageNo}`}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </a>)
                })}
              </div>
              {visibleShabads < totalShabads
                &&
                (
                  <div className="relatedShabadShowMore">
                    <button
                      className="btn btn-primary"
                      onClick={this.handleShowMore(totalShabads)}>
                      More Related Results
                  </button>
                  </div>
                )}
            </div>
          );
        }}
      </Fetch>
    );
  }
}

export default memo(RelatedShabads);
