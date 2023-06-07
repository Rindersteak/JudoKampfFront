import React from 'react';
import TournamentPair, { ITournamentPair } from './TournamentPair';
import '../TreeStyles.scss';

interface IFighter {
    firstName: string,
    lastName: string,
    club: string
}

interface ITournamentBonsai {
    pair: ITournamentPair,
    winner: IFighter
}

const TournamentBonsai: React.FC<ITournamentBonsai> = ({ pair, winner }) => {
    return (
        <div className="tournamentBonsai">
            <TournamentPair 
                firstNameBlue={pair.firstNameBlue} 
                lastNameBlue={pair.lastNameBlue} 
                clubBlue={pair.clubBlue}
                firstNameWhite={pair.firstNameWhite} 
                lastNameWhite={pair.lastNameWhite} 
                clubWhite={pair.clubWhite} 
            />
            <div className="winnerLine"></div>
            <div className="winner">
                <p>{winner.firstName} {winner.lastName}</p>
                <p>{winner.club}</p>
            </div>
        </div>
    );
}

export default TournamentBonsai;
