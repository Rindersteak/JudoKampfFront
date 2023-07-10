import React, { useEffect } from 'react';

interface Props {
  fightgroupId: number;
}

const TreeForNone: React.FC<Props> = ({ fightgroupId }) => {
  useEffect(() => {
    console.log('Not enough fighters');
  }, []);

  return <div>Not enough fighters</div>;
};

export default TreeForNone;
