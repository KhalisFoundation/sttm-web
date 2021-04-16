/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs'
import { toMultipleShabadsURL } from '@/util/url/to-multiple-shabad-url';
import BarsIcon from '../Icons/Bars';
import { MinusIcon } from '../Icons/CustomIcons';

interface IShabadProps {
  id: number;
  shabadId: number;
  verse: string;
}

interface IMultipleShabadsDisplayProps {
  shabads: IShabadProps[];
  handleClearShabads: () => {};
  removeMultipleShabads: (id: number) => {};
  setMultipleShabads: () => {}
}

const MultipleShabadsDisplay: React.FC<IMultipleShabadsDisplayProps> = ({
  shabads,
  handleClearShabads,
  removeMultipleShabads,
}) => {

  const [sortableState, setSortableState] = useState<IShabadProps[]>(shabads);
  const history = useHistory();

  const onRemove = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget.dataset;
    removeMultipleShabads(parseInt(id));
  }

  const handleDisplayShabads = () => {
    const shabadIds = sortableState.map(state => state.shabadId)
    shabadIds.length && history.push(toMultipleShabadsURL({ shabadIds }));
  }

  // Update Local State {sortableState} after shabads get Updated
  useEffect(() => {
    setSortableState(shabads)
  }, [shabads])

  return (
    <div className="multiple-shabads-display">
      <h3>Multiple Shabads Display</h3>

      <ReactSortable tag="ul" list={sortableState} setList={setSortableState}>
        {sortableState?.map(({ verse, id }) => (
          <li key={id}>
            <BarsIcon fill="#fff" />
            <div>{verse}</div>
            <button
              title="Remove"
              data-id={id}
              onClick={onRemove}>-</button>
          </li>
        ))}
      </ReactSortable>

      <div className="multiple-shabads-display--footer">
        <button className="btn btn-secondary" onClick={handleClearShabads}>Clear</button>
        <button className="btn btn-primary" onClick={handleDisplayShabads}>Display</button>
      </div>
    </div>
  )
}

export default MultipleShabadsDisplay;