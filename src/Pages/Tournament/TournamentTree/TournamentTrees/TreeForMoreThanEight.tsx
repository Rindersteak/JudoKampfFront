import React, { useEffect } from 'react';

const TreeForMoreThanEight: React.FC = () => {

    useEffect(() => {
        console.log('8+');
      }, []);

    return <div>8+</div>;
  };
  

export default TreeForMoreThanEight;