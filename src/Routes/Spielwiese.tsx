import React from 'react';
import './Spielwiese.scss';

const Spielwiese = () => {
    return (
      <div className='mainRectangleContainer'>
        <div className='rectangleTopContainer'>
          <div>Kämpfer 1</div>
          <div>Verein</div>
        </div>


        <div className='empty'></div>
        <div className='empty2'></div>
        
        <div className='horizontaToplLine'>
          <div className='lineContainer'>--------------</div>
          <div></div>
        </div>

        <div className='horizontalBottomLine'>
          <div className='lineContainer'>--------------</div>
          <div></div>
        </div>

        <div className='borderRightContainer'></div>


        <div className='rectangeBottomContainer'>
          <div>Kämpfer 2</div>
          <div>Verein</div>
        </div>

        <div className='rectangeWinnerContainer'>
          <div>Winner</div>
          <div>Verein</div>
        </div>
      </div>

    )
  };

  export default Spielwiese;