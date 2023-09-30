/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs'
import { toMultipleShabadsURL } from '@/util/url/to-multiple-shabad-url';
import BarsIcon from '../Icons/Bars';
import { TEXTS } from '@/constants';

import { clearMultipleShabads, removeMultipleShabads, setMultiViewPanel, setMultipleShabads } from '@/features/actions';
import { IMultipleShabadsProps } from '@/types/multiple-shabads';
import { RemoveShabadButton } from '../RemoveShabadButton';
import { useEscapeKeyEventHandler } from '@/hooks';

interface Props {
  multipleShabads: IMultipleShabadsProps[];
  showMultiViewPanel: boolean;
  clearMultipleShabads: () => {};
  setMultiViewPanel: (bool: boolean) => {};
  setMultipleShabads: (shabad: IMultipleShabadsProps) => {}
}

const MultipleShabadsDisplay = ({
  multipleShabads,
  showMultiViewPanel,
  setMultipleShabads,
  clearMultipleShabads,
  setMultiViewPanel,
}: Props) => {
  const [sortableState, setSortableState] = useState<IMultipleShabadsProps[]>(multipleShabads);
  const [history, setHistory] = useState<IMultipleShabadsProps[]>(multipleShabads);
  const urlHistory = useHistory();
  const wrapperRef = React.useRef(null);

  useEscapeKeyEventHandler(() => setMultiViewPanel(false))

  const undoMultipleShabads = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const setA = new Set(multipleShabads);
    const difference = new Set(history.filter(x => !setA.has(x)));
    const undoShabad = difference.size ? difference.values().next().value : null;
    setMultipleShabads(undoShabad)
  }

  const onClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    clearMultipleShabads()
    setHistory([])
  }

  const handleDisplayShabads = () => {
    const shabadData = sortableState.map(state => [state.shabadId, state.id])
    urlHistory.push(toMultipleShabadsURL({ shabadData }));
  }

  // Update Local State {sortableState} after shabads get Updated
  useEffect(() => {
    setSortableState(multipleShabads)
    // Don't update history on delete
    if (multipleShabads.length > history.length) {
      setHistory(multipleShabads)
    }
  }, [multipleShabads])

  return (
    <div className="multiple-shabads-display" ref={wrapperRef} tabIndex="-1" role="dialog" data-testid="multi-view">
      <div className={`multiple-shabads-display--wrapper ${showMultiViewPanel ? 'enable' : ''}`}>
        <div className="multiple-shabads-display--header">
          <h3 className="multiple-shabads-display--heading">{TEXTS.MULTIPLE_SHABADS_HEADING}</h3>
          <p>{TEXTS.MULTIPLE_SHABADS_INTRO}</p>
        </div>

        {
          !multipleShabads.length
          && <div className="notification">
            {TEXTS.MULTIPLE_SHABADS_NOTIFICATION}
          </div>
        }

        <ReactSortable tag="ul" list={sortableState} setList={setSortableState}>
          {sortableState?.map(({ verse, id, url }) => (
            <li key={id}>
              <BarsIcon fill="#fff" />
              <a href={url} title={`Go to shabad: ${verse}`}>{verse}</a>
              <RemoveShabadButton id={id} />
            </li>
          ))}
        </ReactSortable>

        <div className="multiple-shabads-display--footer">
          {
            history.length > multipleShabads.length
            && (<button className="btn btn-primary" onClick={undoMultipleShabads}>Undo</button>)
          }
          <button className="btn btn-secondary" onClick={onClear}>Clear</button>
          <button className="btn btn-primary" disabled={sortableState.length === 0} onClick={handleDisplayShabads}>Display</button>
        </div>

        <button title="Close" className="close" onClick={() => setMultiViewPanel(false)}>×</button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ multipleShabads, showMultiViewPanel }: any) => ({ multipleShabads, showMultiViewPanel })

const mapDispatchToProps = {
  removeMultipleShabads,
  clearMultipleShabads,
  setMultipleShabads,
  setMultiViewPanel,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultipleShabadsDisplay);