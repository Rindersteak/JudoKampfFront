import React, { useEffect } from 'react';

const TreeForNone: React.FC = () => {

    useEffect(() => {
        console.log('not enough fighters');
      }, []);

    return <div>Not enough fighters</div>;
  };
  

export default TreeForNone;
