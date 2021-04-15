/* eslint-disable react/prop-types */
import React from 'react'
import { ReactSortable } from 'react-sortablejs'

interface IShabadProps {
  id: number;
  shabadId: number;
  verse: string;
}
interface IMultipleShabadsDisplayProps {
  shabads: IShabadProps[];
  handleClearShabads: () => {};
  removeMultipleShabads: (id: string | undefined) => {};
  setMultipleShabads: () => {}
}

const MultipleShabadsDisplay: React.FC<IMultipleShabadsDisplayProps> = ({ shabads, handleClearShabads, removeMultipleShabads, setMultipleShabads }) => {

  const [sortableState, setSortableState] = React.useState<IShabadProps[]>(shabads);

  const onRemove = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset;
    removeMultipleShabads(id);
  }

  const handleDisplayShabads = () => { }

  // Update Local State {sortableState} after shabads get Updated
  React.useEffect(() => {
    setSortableState(shabads)
  }, [shabads])

  return (
    <div className="multiple-shabads-display">
      <h3>Multiple Shabads Display</h3>

      <ReactSortable tag="ul" list={sortableState} setList={setSortableState}>
        {sortableState?.map(({ verse, id }) => (
          <li key={id}>
            {verse}
            <button data-id={id} onClick={onRemove}>-</button>
          </li>
        ))}
      </ReactSortable>

      <div className="multiple-shabads-display--footer">
        <button onClick={handleClearShabads}>Clear</button>
        <button onClick={handleDisplayShabads}>Display</button>
      </div>
    </div>
  )
}

export default MultipleShabadsDisplay;