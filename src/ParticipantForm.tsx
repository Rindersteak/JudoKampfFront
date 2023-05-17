/* ParticipantForm.tsx */

// Importieren der notwendigen Abhängigkeiten und Dateien
import React, { useState } from 'react';
import { Participant } from './types';
import './ParticipantForm.css';

// Definition der Props für die Komponente. Hier wird eine Funktion erwartet, die einen Teilnehmer hinzufügt
type Props = {
    onAddParticipant: (participant: Participant) => void;
};

// Hauptkomponente, welche das Formular rendert
const ParticipantForm: React.FC<Props> = ({ onAddParticipant }) => {

    // State-Variablen für die Formularfelder
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [club, setClub] = useState("");
    const [regionalAssociation, setRegionalAssociation] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [weight, setWeight] = useState(0);

    // Funktion, die ausgeführt wird, wenn das Formular abgeschickt wird
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Aufrufen der "onAddParticipant"-Funktion mit den aktuellen Werten der Formularfelder
        onAddParticipant({ firstName, lastName, club, regionalAssociation, birthDate, weight });
    }

    // Das gerenderte Formular
    return (
        <form onSubmit={handleSubmit} className="formContainer">
            <h1 className="titleStyle">Neuen Teilnehmer hinzufügen</h1>
            <div>
                <div className="inputContainer">
                    <label className="inputLabel" htmlFor="firstName">Vorname</label>
                    <input className="inputField" type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                </div>
                <div className="inputContainer">
                    <label className="inputLabel" htmlFor="lastName">Nachname</label>
                    <input className="inputField" type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required />
                </div>
            </div>
            <div>
                <div className="inputContainer">
                    <label className="inputLabel" htmlFor="club">Verein</label>
                    <input className="inputField" type="text" id="club" value={club} onChange={e => setClub(e.target.value)} required />
                </div>
                <div className="inputContainer">
                    <label className="inputLabel" htmlFor="regionalAssociation">Landesverband</label>
                    <div className="selectContainer">
                        <select className="selectField" id="regionalAssociation" value={regionalAssociation} onChange={e => setRegionalAssociation(e.target.value)} required>
                            {/* Hier können Sie die Optionen für die Landesverbände hinzufügen */}
                        </select>
                    </div>
                </div>
            </div>
            <div className="halfWidthWrapper">
                <div className="inputContainer halfWidth">
                    <label className="inputLabel" htmlFor="birthDate">Geburtsdatum</label>
                    <input className="inputField" type="string" id="birthDate" value={birthDate} onChange={e => setBirthDate(e.target.value)} required />
                </div>
                <div className="inputContainer halfWidth">
                    <label className="inputLabel" htmlFor="weight">Gewicht</label>
                    <input className="inputField" type="string" id="weight" value={weight} onChange={e => setWeight(parseFloat(e.target.value))} required />
                </div>
            </div>
            <button className="addButton" type="submit">Hinzufügen</button>
        </form>
    );
};

// Exportieren der Komponente
export default ParticipantForm;
