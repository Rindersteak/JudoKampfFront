import React, { useState } from 'react';
import { Fighter } from '../../types';
import './FighterForm.css';

type Props = {
    onAddFighter: (fighter: Fighter) => void;
};

const FighterForm: React.FC<Props> = ({ onAddFighter }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [club, setClub] = useState("");
    const [regionalAssociation, setRegionalAssociation] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [weight, setWeight] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddFighter({ firstName, lastName, club, regionalAssociation, birthDate, weight });
    }

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
                            <option value=""></option>
                            <option value="Landesverband A">Landesverband A</option>
                            <option value="Landesverband B">Landesverband B</option>
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

export default FighterForm;
