import React, { useEffect } from 'react';

interface Props {
  fightgroupId: number;
}

const TreeForSevenToEight: React.FC<Props> = ({ fightgroupId }) => {
  useEffect(() => {
    console.log('7-8');
  }, []);

  return <div>7-8</div>;
};

export default TreeForSevenToEight;
