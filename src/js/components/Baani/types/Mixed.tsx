import React, { memo } from 'react';

import { IGurbani, IShabad } from '@/types';
import { IStore } from '@/features/types';

import { transliterationMap, translationMap } from '../helpers';

import BaaniLine from '@/components/BaaniLine';
import Transliteration from '@/components/Transliteration';
import Translation from '@/components/Translation';
import BaaniLineActions from '@/components/BaaniLineActions';
import Actions from '../Actions';

export interface IMixedProps
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

function Mixed(props: IMixedProps) {
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
    <div className="mixed-view-baani">
      {gurbani.map(({ shabad }) => (
        <div
          key={shabad.id}
          id={`line-${shabad.id}`}
          className="line"
          ref={highlight === parseInt(shabad.id, 10) ? innerRef : null}
        >
          <div className="baaniLine">
            <BaaniLine
              className="baaniLineContent"
              text={shabad.gurbani}
              unicode={unicode}
              shouldHighlight={highlight === parseInt(shabad.id, 10)}
              larivaar={larivaar}
              larivaarAssist={larivaarAssist}
              fontSize={fontSize}
            />
            <Actions
              className="baaniLineActionsWrapper"
              shabad={
                disabledActions.includes('openshabad') ? undefined : shabad
              }
              onFacebookClick={onFacebookClick(shabad)}
              onCopyClick={onCopyClick(shabad)}
            />
          </div>

          {transliterationLanguages.map(language => (
            <Transliteration key={shabad.id + language}>
              {transliterationMap[language](shabad)}
            </Transliteration>
          ))}

          {translationLanguages.map(language => (
            <Translation
              key={shabad.id + language}
              type={language}
              {...Translation.getTranslationProps({
                translationMap,
                language,
                shabad,
                unicode,
              })}
            />
          ))}

          <BaaniLineActions
            disabledActions={disabledActions}
            shabad={shabad}
            onFacebookClick={onFacebookClick(shabad)}
            onCopyClick={onCopyClick(shabad)}
          />

          <br />
        </div>
      ))}
    </div>
  );
}

export default memo(Mixed);
