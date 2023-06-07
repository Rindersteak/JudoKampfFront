import React, { useEffect, useState } from 'react';
import { Fightgroup } from '../../types';
import { getFightgroups } from '../../API/fightGroupAPI';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

interface FightGroupListProps {}

const FightGroupList: React.FC<FightGroupListProps> = () => {
  const [fightGroups, setFightGroups] = useState<Fightgroup[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = useState<string>('gender');

  useEffect(() => {
    const loadFightGroups = async () => {
      try {
        const groups = await getFightgroups();
        setFightGroups(groups);
      } catch (error) {
        console.error('Error loading fight groups:', error);
      }
    };

    loadFightGroups();
  }, []);

  const handleSortClick = (column: string) => {
    setSortColumn(column);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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
    <div className="fightGroupList">
      <h1 className="titleStyle">Kampfgruppen</h1>
      <table className="tableStyle">
        <thead>
          <tr>
            <th className="headerCell">
              Geschlecht
              <button className="arrowButton" onClick={() => handleSortClick('gender')}>
                {sortOrder === 'asc' && sortColumn === 'gender' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
            <th className="headerCell">
              Jugend/Erwachsene
              <button className="arrowButton" onClick={() => handleSortClick('ageclass')}>
                {sortOrder === 'asc' && sortColumn === 'ageclass' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
            <th className="headerCell">
              Gewichtsklasse
              <button className="arrowButton" onClick={() => handleSortClick('weightclass')}>
                {sortOrder === 'asc' && sortColumn === 'weightclass' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
            <th className="headerCell">
              Altersklasse
              <button className="arrowButton" onClick={() => handleSortClick('ageclass')}>
                {sortOrder === 'asc' && sortColumn === 'ageclass' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
            <th className="headerCell">
              Teilnehmeranzahl
              <button className="arrowButton" onClick={() => handleSortClick('participants')}>
                {sortOrder === 'asc' && sortColumn === 'participants' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedFightGroups.map((group) => (
            <tr key={group.id}>
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
