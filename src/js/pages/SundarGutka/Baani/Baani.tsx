/* globals BANIS_API_URL */
import React from 'react';
import { Redirect } from 'react-router-dom';

import { versesToGurbani } from '@/util';
import ShabadContent from '@/components/ShabadContent';
import Fetch from '@/components/Fetch';
import { pageView } from '@/util/analytics';
import { State } from '@/features/types';
import { Gurbani } from '@/types';

export interface IBaaniProps {
  paragraphView: State['paragraphView'];
  match: {
    params: {
      currentBaaniId: string;
    };
    url: string;
  };
}

export default class Baani extends React.PureComponent<IBaaniProps> {
  public render() {
    const {
      match: {
        params: { currentBaaniId },
        url,
      },
      paragraphView,
    } = this.props;

    return (
      <div className="baani">
        <Fetch url={`${BANIS_API_URL}/${currentBaaniId}`}>
          {({ data, error, loading }) => {
            if (error) {
              return <Redirect to={url} />;
            }
            if (loading) {
              return <div className="spinner" />;
            }

            const gurbaniFromVerses = versesToGurbani(
              data.verses.filter(
                (v: { mangalPosition: string }) => v.mangalPosition !== 'above'
              )
            );

            const gurbani = paragraphView
              ? gurbaniFromVerses.reduce(
                  (paragraphed: Gurbani[], currentGurbani: Gurbani) => {
                    const index = Number(currentGurbani.shabad.paragraph! - 1);

                    if (paragraphed[index] === undefined) {
                      paragraphed[index] = currentGurbani;
                      return paragraphed;
                    }

                    const previousBani = paragraphed[index].shabad;

                    paragraphed[index] = {
                      shabad: {
                        gurbani: {
                          unicode:
                            previousBani.gurbani.unicode +
                            ' ' +
                            currentGurbani.shabad.gurbani.unicode,
                          gurmukhi:
                            previousBani.gurbani.gurmukhi +
                            ' ' +
                            currentGurbani.shabad.gurbani.gurmukhi,
                        },
                        id: previousBani.id + currentGurbani.shabad.id,
                        shabadid:
                          previousBani.shabadid +
                          currentGurbani.shabad.shabadid,
                        transliteration:
                          previousBani.transliteration +
                          ' ' +
                          currentGurbani.shabad.transliteration,
                        translation: {
                          english: {
                            ssk:
                              previousBani.translation.english.ssk +
                              ' ' +
                              currentGurbani.shabad.translation.english.ssk,
                          },
                          punjabi: {
                            bms: {
                              unicode:
                                previousBani.translation.punjabi.bms.unicode +
                                ' ' +
                                currentGurbani.shabad.translation.punjabi.bms
                                  .unicode,
                              gurmukhi:
                                previousBani.translation.punjabi.bms.gurmukhi +
                                ' ' +
                                currentGurbani.shabad.translation.punjabi.bms
                                  .gurmukhi,
                            },
                          },
                          spanish:
                            previousBani.translation.spanish +
                            ' ' +
                            currentGurbani.shabad.translation.spanish,
                        },
                      },
                    };

                    return paragraphed;
                  },
                  []
                )
              : gurbaniFromVerses;

            return (
              <ShabadContent
                type="shabad"
                info={data.baniInfo}
                nav={data.nav}
                gurbani={gurbani}
                hideMeta
                controlProps={{
                  disableSplitView: true,
                  disableParagraphView: false,
                }}
              />
            );
          }}
        </Fetch>
      </div>
    );
  }

  public componentDidMount() {
    const {
      match: {
        params: { currentBaaniId },
      },
    } = this.props;

    pageView(`/sundar-gutka/${currentBaaniId}`);
  }
}
