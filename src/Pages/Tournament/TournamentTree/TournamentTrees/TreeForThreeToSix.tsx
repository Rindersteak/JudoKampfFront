import React, { useEffect } from 'react';

const TreeForThreeToSix: React.FC = () => {

    useEffect(() => {
        console.log('3-6');
      }, []);

    return <div>3-6</div>;
  };
  

export default TreeForThreeToSix;