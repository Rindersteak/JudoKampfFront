import React from 'react';
import { Fighter } from '../../types';
import './Fighter.css';

type Props = {
  fighter: Fighter;
  className?: string;
};

const FighterEntry: React.FC<Props> = ({ fighter, className }) => {
  const entryClassName = className ? `entryStyle ${className}` : 'entryStyle';

  return (
    <div className={entryClassName}>
      <span className="nameStyle">{fighter.firstname} {fighter.lastname}</span>
      <span className="clubStyle">{fighter.club.name}</span>
    </div>
  );
};

export default FighterEntry;
