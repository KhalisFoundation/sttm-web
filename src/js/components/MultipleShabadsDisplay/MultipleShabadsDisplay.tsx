/* eslint-disable react/prop-types */
import React from 'react'

interface IShabadProps {
  id: number,
  shabadId: number;
  verseId: number;
  verse: string;
}
interface IMultipleShabadsDisplayProps {
  shabads: IShabadProps[];
  isMultipleShabadsRender: boolean;
  handleClearShabads: () => {};
  removeMultipleShabads: (id: number) => {};
}
const MultipleShabadsDisplay: React.FC<IMultipleShabadsDisplayProps> = ({ shabads, handleClearShabads, removeMultipleShabads }) => {

  const handleRemoveShabad = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset;
    removeMultipleShabads(parseInt(id));
  }

  const handleDisplayShabads = () => { }

  return (
    <>
      <div className="multiple-shabads-display">
        <h3>Multiple Shabads Display</h3>

        <ul>
          {
            shabads.map(({ verse, verseId }) => {
              return (
                <li key={verseId}>
                  {verse}
                  <button data-id={verseId} onClick={handleRemoveShabad}>-</button>
                </li>
              )
            })
          }
        </ul>

        <div className="multiple-shabads-display--footer">
          <button onClick={handleClearShabads}>Clear</button>
          <button onClick={handleDisplayShabads}>Display</button>
        </div>
      </div>
    </>
  )
}

export default MultipleShabadsDisplay;