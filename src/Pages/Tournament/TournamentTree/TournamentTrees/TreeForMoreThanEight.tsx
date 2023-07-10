import React, { useEffect } from 'react';

interface Props {
  fightgroupId: number;
}

const TreeForMoreThanEight: React.FC<Props> = ({ fightgroupId }) => {
  useEffect(() => {
    console.log('8+');
  }, []);

  return <div>8+</div>;
};

export default TreeForMoreThanEight;
