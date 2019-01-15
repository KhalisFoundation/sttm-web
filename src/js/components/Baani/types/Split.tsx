import React, { memo } from 'react';

import { IGurbani, IShabad } from '@/types';
import { IStore } from '@/features/types';

import { transliterationMap, translationMap } from '../helpers';

import BaaniLine from '@/components/BaaniLine';
import Transliteration from '@/components/Transliteration';
import Translation from '@/components/Translation';
import BaaniLineActions from '@/components/BaaniLineActions';

export interface ISplitProps
  extends Pick<
    IStore,
    | 'translationLanguages'
    | 'transliterationLanguages'
    | 'larivaarAssist'
    | 'larivaar'
    | 'unicode'
    | 'fontSize'
  > {
  gurbani: IGurbani;
  highlight?: number;
  innerRef: React.Ref<HTMLDivElement>;
  disabledActions: any;
  onFacebookClick: (shabad: IShabad) => () => void;
  onCopyClick: (shabad: IShabad) => () => void;
}

function Split(props: ISplitProps) {
  const {
    gurbani,
    highlight,
    unicode,
    larivaar,
    larivaarAssist,
    fontSize,
    transliterationLanguages,
    disabledActions,
    translationLanguages,
    onFacebookClick,
    onCopyClick,
    innerRef,
  } = props;

  return (
    <div className="split-view-baani">
      <div className="split-view-baani-wrapper">
        {gurbani.map(({ shabad }) => (
          <div
            key={shabad.id}
            className="line"
            ref={highlight === parseInt(shabad.id, 10) ? innerRef : null}
          >
            <BaaniLine
              text={shabad.gurbani}
              unicode={unicode}
              shouldHighlight={highlight === parseInt(shabad.id, 10)}
              larivaar={larivaar}
              larivaarAssist={larivaarAssist}
              fontSize={fontSize}
            />

            <BaaniLineActions
              disabledActions={disabledActions}
              shabad={shabad}
              onFacebookClick={onFacebookClick(shabad)}
              onCopyClick={onCopyClick(shabad)}
            />
          </div>
        ))}
      </div>
      {transliterationLanguages.map(language => (
        <div key={language} className="split-view-baani-wrapper">
          {gurbani.map(({ shabad }) => (
            <Transliteration key={shabad.id}>
              {transliterationMap[language](shabad)}
            </Transliteration>
          ))}
        </div>
      ))}
      {translationLanguages.map(language => (
        <div key={language} className="split-view-baani-wrapper">
          {gurbani.map(({ shabad }) => (
            <Translation
              key={shabad.id}
              type={language}
              {...Translation.getTranslationProps({
                translationMap,
                language,
                shabad,
                unicode,
              })}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default memo(Split);
