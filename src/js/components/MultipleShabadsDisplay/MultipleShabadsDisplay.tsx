/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs'
import { toMultipleShabadsURL } from '@/util/url/to-multiple-shabad-url';
import BarsIcon from '../Icons/Bars';
import { TEXTS } from '@/constants';
import { showToast } from '@/util'

import { clearMultipleShabads, removeMultipleShabads, setMultiViewPanel, setMultipleShabads } from '@/features/actions';
import { IMultipleShabadsProps } from '@/types/multiple-shabads';

interface IMultipleShabadsDisplayProps {
  multipleShabads: IMultipleShabadsProps[];
  showMultiViewPanel: boolean;
  clearMultipleShabads: () => {};
  removeMultipleShabads: (id: number) => {};
  setMultiViewPanel: (bool: boolean) => {};
  setMultipleShabads: (shabad: IMultipleShabadsProps) => {}
}

const MultipleShabadsDisplay: React.FC<IMultipleShabadsDisplayProps> = ({
  multipleShabads,
  showMultiViewPanel,
  setMultipleShabads,
  clearMultipleShabads,
  removeMultipleShabads,
  setMultiViewPanel,
}) => {
  const [sortableState, setSortableState] = useState<IMultipleShabadsProps[]>(multipleShabads);
  const [history, setHistory] = useState<IMultipleShabadsProps[]>(multipleShabads);
  const urlHistory = useHistory();
  const wrapperRef = React.useRef(null);

  const undoMultipleShabads = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const setA = new Set(multipleShabads);
    const difference = new Set(history.filter(x => !setA.has(x)));
    setMultipleShabads(difference.size ? difference.values().next().value : null)
  }

  const onRemove = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const { id } = e.currentTarget.dataset
    removeMultipleShabads(parseInt(id))
    showToast(TEXTS.SHABAD_REMOVED_MESSAGE)
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

  useEffect(() => {
    showMultiViewPanel && wrapperRef.current.focus();
    window.scrollTo(0, 0);
  }, [wrapperRef, showMultiViewPanel]);

  return (
    <div className="multiple-shabads-display" ref={wrapperRef} tabIndex="-1" role="dialog" data-testid="multi-view">
      <div className={`multiple-shabads-display--wrapper ${showMultiViewPanel ? 'enable' : ''}`}>
        <div className="multiple-shabads-display--header">
          <h3>{TEXTS.MULTIPLE_SHABADS_HEADING}</h3>
          <p>{TEXTS.MULTIPLE_SHABADS_INTRO}</p>
        </div>

        {
          !multipleShabads.length
          && <div className="notification">
            {TEXTS.MULTIPLE_SHABADS_NOTIFICATION}
          </div>
        }

        <ReactSortable tag="ul" list={sortableState} setList={setSortableState}>
          {sortableState?.map(({ verse, id }) => (
            <li key={id}>
              <BarsIcon fill="#fff" />
              <div>{verse}</div>
              <button
                title="Remove"
                className="remove"
                data-id={id}
                data-cy="delete-shabad"
                onClick={onRemove}>-</button>
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

        <button title="Close" className="close" onClick={() => { setMultiViewPanel(false) }}>×</button>
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