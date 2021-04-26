/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs'
import { toMultipleShabadsURL } from '@/util/url/to-multiple-shabad-url';
import BarsIcon from '../Icons/Bars';
import { TEXTS } from '@/constants';
import { showToast } from '@/util'

import { clearMultipleShabads, removeMultipleShabads, setMultiViewPanel } from '@/features/actions';

interface IShabadProps {
  id: number;
  shabadId: number;
  verse: string;
}

interface IMultipleShabadsDisplayProps {
  multipleShabads: IShabadProps[];
  showMultiViewPanel: boolean;
  clearMultipleShabads: () => {};
  removeMultipleShabads: (id: number) => {};
  setMultiViewPanel: (bool: boolean) => {}
}

const MultipleShabadsDisplay: React.FC<IMultipleShabadsDisplayProps> = ({
  multipleShabads,
  showMultiViewPanel,
  clearMultipleShabads,
  removeMultipleShabads,
  setMultiViewPanel,
}) => {
  const [sortableState, setSortableState] = useState<IShabadProps[]>(multipleShabads);
  const history = useHistory();

  const onRemove = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const { id } = e.currentTarget.dataset
    removeMultipleShabads(parseInt(id))
    showToast(TEXTS.SHABAD_REMOVED_MESSAGE)
  }

  const handleDisplayShabads = () => {
    const shabadIds = sortableState.map(state => state.shabadId)
    history.push(toMultipleShabadsURL({ shabadIds }));
  }

  // Update Local State {sortableState} after shabads get Updated
  useEffect(() => {
    setSortableState(multipleShabads)
  }, [multipleShabads])

  return (
    <aside className={`multiple-shabads-display ${showMultiViewPanel ? 'enable' : ''}`}>
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
              onClick={onRemove}>-</button>
          </li>
        ))}
      </ReactSortable>

      <div className="multiple-shabads-display--footer">
        <button className="btn btn-secondary" onClick={clearMultipleShabads}>Clear</button>
        <button className="btn btn-primary" disabled={sortableState.length === 0} onClick={handleDisplayShabads}>Display</button>
      </div>

      <button title="Close" className="close toast-notification-close-button" onClick={() => { setMultiViewPanel(false) }}>X</button>
    </aside>
  )
}

const mapStateToProps = ({ multipleShabads, showMultiViewPanel }: any) => ({ multipleShabads, showMultiViewPanel })

const mapDispatchToProps = {
  removeMultipleShabads,
  clearMultipleShabads,
  setMultiViewPanel,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultipleShabadsDisplay);