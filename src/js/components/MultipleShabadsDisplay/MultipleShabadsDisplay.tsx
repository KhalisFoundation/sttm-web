/* eslint-disable react/prop-types */
import React from 'react'

interface IShabadProps {
  shabadId: number;
  verseId: number;
  verse: string;
}
interface IMultipleShabadsDisplayProps {
  shabads: IShabadProps[]
}
const MultipleShabadsDisplay: React.FC<IMultipleShabadsDisplayProps> = ({ shabads }) => {
  return (
    <>
      <div className="multiple-shabads-display">
        <h3>Multiple Shabads Display</h3>

        <ul>
          {
            shabads?.map(({ verse }, index) => {
              return (
                <li key={index}>
                  <span>D</span>
                  {verse}
                  <button>-</button>
                </li>
              )
            })
          }
          <li></li>
        </ul>

        <div className="multiple-shabads-display--footer">
          <button>Clear</button>
          <button>Display</button>
        </div>
      </div>
    </>
  )
}

export default MultipleShabadsDisplay;