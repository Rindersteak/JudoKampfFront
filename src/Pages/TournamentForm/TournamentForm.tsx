// TournamentForm.tsx

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TournamentForm.css';
const TournamentForm: React.FC = () => {
    const [tournamentName, setTournamentName] = useState('');
    const [tournamentVenue, setTournamentVenue] = useState("");
    const [tournamentDate, setTournamentDate] = useState('');
    const [nationalAssociation, setNationalAssociation] = useState("");

    const [periodFrom, setPeriodFrom] = useState<Date | null>(null);
    const [periodTo, setPeriodTo] = useState<Date | null>(null);
    const [weight, setWeight] = useState(0);


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
        <form onSubmit={handleSubmit} className="formContainer">
            <h1 className="titleStyle">Neues Turnier anlegen</h1>
            <div>
                <div className="inputContainer">
                    <label className="inputLabel" htmlFor="tournamentName">Turniername</label>
                    <input className="inputField" type="text" id="tournamentName" value={tournamentName} onChange={e => setTournamentName(e.target.value)} required />
                </div>
                <div className="inputContainer">
                    <label className="inputLabel" htmlFor="tournamentVenue">Veranstaltungsort</label>
                    <input className="inputField" type="text" id="tournamentVenue" value={tournamentVenue} onChange={e => setTournamentVenue(e.target.value)} required />
                </div>
            </div>

            <div className="halfWidthWrapper">
                <div className="inputContainer halfWidth">
                    <label className="inputLabel" htmlFor="address">Adresse</label>
                    <input className="inputField" type="number" id="weight" value={weight} onChange={e => setWeight(parseFloat(e.target.value))} required /> {/* Eingabefeld für das Gewicht, das den weight-Status aktualisiert */}
                </div>
                <div className="inputContainer halfWidth"> {/* Container für das Gewicht */}
                    <input className="inputField" type="number" id="weight" value={weight} onChange={e => setWeight(parseFloat(e.target.value))} required /> {/* Eingabefeld für das Gewicht, das den weight-Status aktualisiert */}
                </div>
            </div>
            <div className="halfWidthWrapper">
                <div className="inputContainer halfWidth">
                    <input className="inputField" type="number" id="weight" value={weight} onChange={e => setWeight(parseFloat(e.target.value))} required /> {/* Eingabefeld für das Gewicht, das den weight-Status aktualisiert */}
                </div>
                <div className="inputContainer halfWidth">
                    <input className="inputField" type="number" id="weight" value={weight} onChange={e => setWeight(parseFloat(e.target.value))} required /> {/* Eingabefeld für das Gewicht, das den weight-Status aktualisiert */}
                </div>
            </div>

            <div className="inputContainer">
                <label className="inputLabel" htmlFor="nationalAssociation">Landesverband</label>
                <div className="selectContainer">
                    <select className="selectField" id="nationalAssociation" value={nationalAssociation} onChange={e => setNationalAssociation(e.target.value)} required>
                        <option value=""></option>
                        <option value="Landesverband 1">Landesverband 1</option>
                        <option value="Landesverband 2">Landesverband 2</option>
                    </select>
                </div>
            </div>
            <div className="halfWidthWrapper">
                <div className="inputContainer halfWidth">
                    <label className="inputLabel" htmlFor="period">Zeitraum</label>
                    <DatePicker
                        id="periodFrom"
                        selected={periodFrom}
                        onChange={(date: Date | null) => setPeriodFrom(date)}
                        dateFormat="dd.MM.yyyy"
                        required
                    />
                </div>
                <div className="inputContainer halfWidth"> {/* Container für das Gewicht */}
                    <DatePicker
                        id="periodTo"
                        selected={periodTo}
                        onChange={(date: Date | null) => setPeriodTo(date)}
                        dateFormat="dd.MM.yyyy"
                        required
                    /></div>
            </div>

            <button className="addButton" type="submit" onClick={handleSubmit}>
                Hinzufügen
            </button>

        </form>
    );






};

export default TournamentForm;