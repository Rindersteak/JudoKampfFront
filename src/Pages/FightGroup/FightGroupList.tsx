import React, { useEffect, useState } from 'react';
import { Fightgroup } from '../../types';
import { getFightgroupsByTournamentId } from '../../API/fightGroupAPI';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';

interface FightGroupListProps {
  tournamentId?: string;
  onClose: () => void;
}

const FightGroupList: React.FC<FightGroupListProps> = ({ tournamentId }) => {
  const [fightGroups, setFightGroups] = useState<Fightgroup[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = useState<string>('gender');
  const navigate = useNavigate();

  useEffect(() => {
    const loadFightGroups = async () => {
      try {
        if (tournamentId) {
          const groups = await getFightgroupsByTournamentId(parseInt(tournamentId));
          setFightGroups(groups);
        }
      } catch (error) {
        console.error('Error loading fight groups:', error);
      }
    };
  
    loadFightGroups();
  }, [tournamentId]);

  const handleSortClick = (column: string) => {
    setSortColumn(column);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleRowClick = (group: Fightgroup) => {
    navigate(`/tournament-tree-for-two/${group.id}`, { state: { bannerTitle: group.name } });
  };

  const sortedFightGroups = fightGroups.sort((a: Fightgroup, b: Fightgroup) => {
    if (sortColumn === 'gender') {
      return sortOrder === 'asc' ? a.sex.localeCompare(b.sex) : b.sex.localeCompare(a.sex);
    } else if (sortColumn === 'ageclass') {
      return sortOrder === 'asc' ? a.ageclass.name.localeCompare(b.ageclass.name) : b.ageclass.name.localeCompare(a.ageclass.name);
    } else if (sortColumn === 'weightclass') {
      return sortOrder === 'asc' ? a.weightclass.name.localeCompare(b.weightclass.name) : b.weightclass.name.localeCompare(a.weightclass.name);
    } else if (sortColumn === 'participants') {
      return sortOrder === 'asc' ? a.fighters.length - b.fighters.length : b.fighters.length - a.fighters.length;
    }
    return 0;
  });

  return (
    <div className="fightGroupList"> {/* CSS-Klasse für FightGroupList hinzugefügt */}
      <h1 className="titleStyleList">Kampfgruppen</h1>
      <table className="tableStyle">
        <thead>
          <tr>
            <th className="headerCell">
              Geschlecht
              <button className="arrowButton" onClick={() => handleSortClick('gender')}>
                {sortOrder === 'asc' && sortColumn === 'gender' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
              </button>
            </th>
            <th className="headerCell">
              Jugend/Erwachsene
              <button className="arrowButton" onClick={() => handleSortClick('ageclass')}>
                {sortOrder === 'asc' && sortColumn === 'ageclass' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
              </button>
            </th>
            <th className="headerCell">
              Gewichtsklasse
              <button className="arrowButton" onClick={() => handleSortClick('weightclass')}>
                {sortOrder === 'asc' && sortColumn === 'weightclass' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
              </button>
            </th>
            <th className="headerCell">
              Altersklasse
              <button className="arrowButton" onClick={() => handleSortClick('ageclass')}>
                {sortOrder === 'asc' && sortColumn === 'ageclass' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
              </button>
            </th>
            <th className="headerCell">
              Teilnehmeranzahl
              <button className="arrowButton" onClick={() => handleSortClick('participants')}>
                {sortOrder === 'asc' && sortColumn === 'participants' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedFightGroups.map((group) => (
            <tr key={group.id} onClick={() => handleRowClick(group)}>
              <td>{group.sex}</td>
              <td>{group.ageclass.name}</td>
              <td>{group.weightclass.name}</td>
              <td>{group.ageclass.name}</td>
              <td>{group.fighters.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FightGroupList;
