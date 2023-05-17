import React, { useState } from 'react';
import { Participant } from './types';
import './ParticipantForm.css';

type Props = {
    onAddParticipant: (participant: Participant) => void;
};

const ParticipantForm: React.FC<Props> = ({ onAddParticipant }) => {
    const initialParticipant: Participant = {
        firstName: '',
        lastName: '',
        regionalAssociation: '',
        birthDate: '',
        weight: 0,
        club: ''
    };

    const [participant, setParticipant] = useState<Participant>(initialParticipant);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setParticipant({
            ...participant,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAddParticipant(participant);
        setParticipant(initialParticipant);
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Neuen Teilnehmer hinzufügen</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName" className="form-label">Vorname</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-input"
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="lastName" className="form-label">Nachname</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-input"
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="club" className="form-label">Verein</label>
                <input
                    type="text"
                    id="club"
                    name="club"
                    className="form-input"
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="association" className="form-label">Landesverband</label>
                <div className="select-container">
                    <select
                        id="association"
                        name="association"
                        className="form-select"
                        onChange={handleInputChange}
                        required
                        defaultValue=""
                    >
                        <option value=""></option>
                        <option value="beispiel">Beispielverband</option>
                    </select>
                    <span className="select-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 12 12" fill="blue">
              <path d="M0 9L6 0 12 9H0z" transform="rotate(180 6 4.5)" />
            </svg>
          </span>
                </div>

                <div className="flex-container">
                    <div className="input-container">
                        <label htmlFor="birthDate" className="form-label">Geburtsdatum</label>
                        <input
                            type="string"
                            id="birthDate"
                            name="birthDate"
                            className="form-input"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="weight" className="form-label">Gewicht</label>
                        <input
                            type="number"
                            id="weight"
                            name="weight"
                            className="form-input"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <button className="form-button">Hinzufügen</button>
            </form>
        </div>
    );
};

export default ParticipantForm;
