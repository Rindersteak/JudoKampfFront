import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import TournamentForm from '../Pages//Tournament/TournamentForm/TournamentForm';
import FighterList from '../Pages/Fighter/FighterList/FighterList';
import FighterManager from '../Pages/Fighter/FighterManager/FighterManager';
import TournamentDetails from '../Pages/Tournament/TournamentDetails/TournamentDetails';
import TournamentList from '../Pages/Tournament/TournamentList/TournamentList';
import ClubList from '../Pages/Club/ClubList/ClubList'
import FightDetails from '../Pages/Fight/FightDetails/FightDetails'
import TournamentTable from '../Pages/Tournament/TournamentTree/TournamentTable';
import TournamentEdit from '../Pages/Tournament/TournamentEdit/TournamentEdit';
import Spielwiese from './Spielwiese';


interface AppRoutesProps {
    onOpenTournamentForm: () => void;
    onOpenFighterManager: () => void;
    onOpenFighterList: () => void;
    onOpenTournamentList: () => void;
    onOpenClubManager: () => void;
    onOpenClubList: () => void;
    onOpenTournamentEdit: () => void;
}

const exampleGroups = [
    {
      name: 'All',
      fighters: [
        { 
          id: 1, 
          firstname: 'Fighter', 
          lastname: 'One', 
          club: 'Club A', 
          groupNumber: 1,
          placement: 1
        },
        { 
          id: 2, 
          firstname: 'Fighter', 
          lastname: 'Two', 
          club: 'Club A', 
          groupNumber: 2,
          placement: 2
        },
        { 
          id: 3, 
          firstname: 'Fighter', 
          lastname: 'Three', 
          club: 'Club A', 
          groupNumber: 3,
          placement: 3
        },
        { 
          id: 4, 
          firstname: 'Fighter', 
          lastname: 'Four', 
          club: 'Club B', 
          groupNumber: 4,
          placement: 4
        },
        { 
          id: 5, 
          firstname: 'Fighter', 
          lastname: 'Five', 
          club: 'Club B', 
          groupNumber: 5,
          placement: 5
        },
        { 
          id: 6, 
          firstname: 'Fighter', 
          lastname: 'Six', 
          club: 'Club B', 
          groupNumber: 6,
          placement: 6
        },
        { 
          id: 7, 
          firstname: 'Fighter', 
          lastname: 'Seven', 
          club: 'Club C', 
          groupNumber: 7,
          placement: 7
        },
        { 
          id: 8, 
          firstname: 'Fighter', 
          lastname: 'Eight', 
          club: 'Club C', 
          groupNumber: 8,
          placement: 8
        }
      ],
    },
  ];

  

const AppRoutes: React.FC<AppRoutesProps> = ({
    onOpenTournamentForm,
    onOpenFighterManager,
    onOpenFighterList,
    onOpenClubManager,
    onOpenTournamentList,
    onOpenClubList,
    onOpenTournamentEdit
}) => (
    <Routes>
        <Route
            path="/"
            element={<HomePage
                onOpenTournamentForm={onOpenTournamentForm}
                onOpenFighterManager={onOpenFighterManager}
                onOpenTournamentList={onOpenTournamentList}
                onLogoClick={() => {}} 
            />}
        />
        <Route path="/tournament-form" element={<TournamentForm onAddTournament={onOpenTournamentForm} />} />
        <Route
            path="/fighter-manager"
            element={<FighterManager />}
        />
        <Route
            path="/fighter-list"
            element={<FighterList onDeleteFighter={() => {}} />} // Füge hier das onDeleteFighter-Prop hinzu
        />
        <Route
            path="/tournament-details/:tournamentId"
            element={
                <TournamentDetails
                    onOpenFighterList={onOpenFighterList}
                    onOpenFighterManager={onOpenFighterManager}
                    onOpenClubManager={onOpenClubManager}
                    onOpenClubList={onOpenClubList}
                    onOpenTournamentEdit={onOpenTournamentEdit}
                />
            }
        />
        <Route path="/tournament-list" element={<TournamentList onClose={onOpenTournamentList} />} />
        <Route path="/club-list" element={<ClubList onDeleteClub={() => {}}/>} />
        <Route path="/fight-details" element={<FightDetails/>} />
        <Route path="/tournament-table" element={<TournamentTable groups={exampleGroups} />} />
        <Route path="/spielwiese" element={<Spielwiese />} />
    </Routes>
);

export default AppRoutes;
