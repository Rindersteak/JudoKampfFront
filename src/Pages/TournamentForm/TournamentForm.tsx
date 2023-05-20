// TournamentForm.tsx

import React, { useState } from 'react';

const TournamentForm: React.FC = () => {
    const [tournamentName, setTournamentName] = useState('');
    const [tournamentDate, setTournamentDate] = useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTournamentName(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTournamentDate(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Hier können Sie die Daten des Turniers an Ihren Server senden oder in einem Zustandsverwaltungssystem speichern
        console.log(tournamentName, tournamentDate);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name des Turniers:
                <input type="text" value={tournamentName} onChange={handleNameChange} />
            </label>
            <label>
                Datum des Turniers:
                <input type="date" value={tournamentDate} onChange={handleDateChange} />
            </label>
            <input type="submit" value="Turnier anlegen" />
        </form>
    );
};

export default TournamentForm;
