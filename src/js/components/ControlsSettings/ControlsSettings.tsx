import React from 'react';
import Collapsible from 'react-collapsible';
import Checkboxes, { Collection as CollectionProps } from '@/components/Checkboxes/Checkboxes';
import ClickableListItem from './ClickableListItem';
import Times from '../Icons/Times';
import { ADVANCED_SETTINGS, HEADER_SETTINGS, QUICK_SETTINGS } from './ControlSettings';
import { AlignLeftIcon, MinusIcon, PlusIcon, SplitViewIcon, GlobeIcon, LarivaarIcon, MicrophoneIcon, SolidArrowRight, DarkModeIcon, VishraamIcon, SteekIcon, AkhandPaathIcon, AutoPlayIcon, LarivaarAssistIcon, AlignCenterIcon, ParagraphIcon, VishraamStyleIcon, } from "../Icons/CustomIcons";
import {
  TEXTS,
  FONT_OPTIONS,
  VISRAAM,
} from '../../constants';
import { clearVisraamClass } from '@/util';

const ControlsSettings = (props: any) => {
  const wrapperRef = React.useRef(null);
  const headerSettings = HEADER_SETTINGS(props);
  const quickSettings = QUICK_SETTINGS(props);
  const advancedSettings = ADVANCED_SETTINGS(props);
  const {
    fontFamily,
    resetDisplayOptions,
    changeFont,
    visraams,
    visraamSource,
    visraamStyle,
    closeSettingsPanel,
    settingsRef
  } = props;

  React.useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target) && !settingsRef.current.contains(e.target)) {
        closeSettingsPanel();
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  React.useEffect(() => {
    clearVisraamClass();
    document.body.classList[visraams ? 'add' : 'remove'](
      VISRAAM.CLASS_NAME,
      VISRAAM.SOURCE_CLASS(visraamSource),
      VISRAAM.TYPE_CLASS(visraamStyle)
    );
  }, [visraams, visraamSource, visraamStyle])

  const renderIcon = (itemName: any) => {
    switch (itemName) {
      case 'Steek':
        return (
          <SteekIcon />
        )
      case 'Reading [Akhand Paath]':
        return (
          <AkhandPaathIcon />
        )
      case 'Auto Scroll':
        return (
          <AutoPlayIcon />
        )
      case 'Transliteration':
        return (
          <MicrophoneIcon />
        )
      case 'Translation':
        return (
          <GlobeIcon />
        )
      case 'Dark Mode':
        return (
          <DarkModeIcon />
        )
      case 'Vishraams':
        return (
          <VishraamIcon />
        )
      case 'Split':
        return (
          <SplitViewIcon className="settings-action-icon" />
        )
      case 'Larivaar':
        return (
          <LarivaarIcon className="tiny-font" />
        )
      case 'Larivaar Assist':
        return (
          <LarivaarAssistIcon className="tiny-font" />
        )
      case 'Text Align Left':
        return (
          <AlignLeftIcon className="settings-action-icon" />
        )
      case 'Text Align Center':
        return (
          <AlignCenterIcon className="settings-action-icon" />
        )
      case 'Paragraph':
        return (
          <ParagraphIcon className="settings-action-icon" />
        )
      case 'Short':
        return (
          <>S</>
        )
      case 'Medium':
        return (
          <>M</>
        )
      case 'Long':
        return (
          <>L</>
        )
      case 'Extra Long':
        return (
          <>XL</>
        )
      case 'Vishraams - Colored':
        return (
          <VishraamStyleIcon className="colored">Colored</VishraamStyleIcon>
        )
      case 'Vishraams - Gradient':
        return (
          <VishraamStyleIcon className="gradient">Gradient</VishraamStyleIcon>
        )
      default:
        return (
          <Times />
        )
    }
  }
  const bakeSettings = (settingsObj: any) => {
    switch (settingsObj.type) {
      case 'header':
        return (
          <>
            <p className="settings-heading">{settingsObj.label}</p>
            <a className="settings-times" onClick={settingsObj.action}><Times /></a>
          </>
        )
      case 'collapsible_item':
        return (
          <Collapsible trigger={(
            <div className="settings-item active-setting">
              <span className="settings-action-icon">{renderIcon(settingsObj.label)}</span>
              <span className="settings-text">{settingsObj.label}</span>
              <div className="flex-spacer" />
              <span className="settings-chevron-icon">
                <SolidArrowRight />
              </span>
            </div>
          )}>
            <Checkboxes collections={settingsObj.collections} />
          </Collapsible>
        )
      case 'icon-toggle':
        return (
          <>
            <button className="font-size-control" onClick={settingsObj.controlsList[0].action}><MinusIcon className="minus-icon" /></button>
            <span>{settingsObj.label}</span>
            <button className="font-size-control" onClick={settingsObj.controlsList[2].action}><PlusIcon className="plus-icon" /></button>
          </>
        )
      case 'font-update':
        return (
          <>
            <button className="font-size-control" onClick={settingsObj.controlsList[0].action}><MinusIcon className="minus-icon" /></button>
            <select
              className="font-family-dropdown"
              value={fontFamily}
              onChange={e => changeFont(e.currentTarget.value)}
            >
              {Object.keys(FONT_OPTIONS).map(key => (
                <option key={key} value={key}>
                  {FONT_OPTIONS[key]}
                </option>
              ))}
            </select>
            <button className="font-size-control" onClick={settingsObj.controlsList[2].action}><PlusIcon className="plus-icon" /></button>
          </>
        )
      case 'toggle-option':
        return (
          <div className={`settings-item ${settingsObj.checked ? 'active-setting' : ''}`} onClick={settingsObj.action}>
            <span className="settings-action-icon">{renderIcon(settingsObj.label)}</span>
            <span className="settings-text">{settingsObj.label}</span>
          </div>
        )
      case 'collapsible_formatting_item':
        return (
          <Collapsible trigger={(
            <div className="settings-item active-setting">
              <span className="settings-action-icon">{renderIcon(settingsObj.label)}</span>
              <span className="settings-text">{settingsObj.label}</span>
              <div className="flex-spacer" />
              <span className="settings-chevron-icon">
                <SolidArrowRight />
              </span>
            </div>
          )}>
            <ClickableListItem controlsList={settingsObj} />
          </Collapsible>
        )
      case 'label-options':
        return (
          <div className="settings-item">
            <span className="settings-text active-setting">{settingsObj.label}</span>
            <div className="flex-spacer"></div>
            <div className="settings-options">
              {
                settingsObj.collections?.map((collection: CollectionProps, index: number) => (
                  <span
                    key={index}
                    className={`settings-action-icon ${collection.checked ? 'active-setting' : ''}`}
                    onClick={collection.action}>
                    {renderIcon(collection.label)}
                  </span>
                ))
              }
            </div>
          </div>
        )
      case 'label-options-custom':
        return (
          <div className="settings-item">
            <span className={`settings-text ${settingsObj.checked ? 'active-setting' : ''}`}>{settingsObj.label}</span>
            <div className="flex-spacer"></div>
            <div className="settings-options">
              {
                settingsObj.collections?.map((collection: CollectionProps, index: number) => (
                  <span
                    key={index}
                    data-options={collection.options}
                    className={`${collection.checked ? 'active-setting' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      collection.action(e.currentTarget.getAttribute("data-options"));
                    }}>
                    {renderIcon(collection.label)}
                  </span>
                ))
              }
            </div>
          </div >
        )
      case 'two-columns':
        return (
          <div className="settings-2cols">
            {
              settingsObj.collections?.map((collection: CollectionProps, index: number) => (
                <div key={index} className={`settings-item ${collection.checked ? 'active-setting' : ''}`} onClick={collection.action}>
                  <span className="settings-text">{collection.label}</span>
                  <div className="flex-spacer"></div>
                  <span className="settings-action-icon">{renderIcon(collection.label)}</span>
                </div>
              ))
            }
          </div>
        )
    }
  }

  return (
    <div ref={wrapperRef}>
      <>
        {headerSettings.map((element: any, i: any) => {
          if (element.type) {
            return (
              <div
                data-cy={element.label}
                key={`settings-${i}`}
                className={`settings-header ${element.type}`}>
                {bakeSettings(element)}
              </div>
            )
          }
          return null;
        })}
      </>
      <div className="settings-items settings-border">
        {quickSettings.map((element: any, i: any) => {
          if (element.type) {
            return (
              <div
                data-cy={element.label}
                key={`settings-${i}`}
                className={`${element.type}`}>
                {bakeSettings(element)}
              </div>
            )
          }
          return null;
        })}
      </div>
      <div className="settings-advance">
        <div className="settings-item">
          <span className="settings-heading">Fonts & Sizes</span>
        </div>
        <div className="settings-items pt-0">
          <>
            {advancedSettings.map((element: any, i: any) => {
              if (element.type) {
                return (
                  <div
                    data-cy={element.label}
                    key={`settings-${i}`}
                    className={`settings-item font-item ${element.type}`}>
                    {bakeSettings(element)}
                  </div>
                )
              }
              return null;
            })}
          </>
          <div className="settings-item font-item">
            <button className="settings-reset-button" onClick={resetDisplayOptions}>{TEXTS.RESET}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlsSettings;