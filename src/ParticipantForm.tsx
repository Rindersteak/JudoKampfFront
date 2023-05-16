import React, { useState, CSSProperties } from 'react';
import { Participant } from './types';

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

    const labelStyle: CSSProperties = {
        color: 'black',
        fontWeight: 'bold'
    };

    const inputStyle: CSSProperties = {
        padding: '10px',
        width: '100%',
        marginBottom: '10px',
        backgroundColor: '#f2f2f2',
        border: 'none',
        borderRadius: '5px',
        boxSizing: 'border-box', // Padding und Border in der Gesamtbreite / -höhe
        height: '35px', // Festlegen einer expliziten Höhe
    };


    const halfInputStyle: CSSProperties = {
        ...inputStyle,
        padding: '10px',
        width: '48%',
        marginBottom: '10px',
        backgroundColor: '#f2f2f2',
        border: 'none',
        borderRadius: '5px',
        boxSizing: 'border-box',
        height: '100%',
    };

    const fullInputStyle: CSSProperties = {
        ...inputStyle,
        padding: '10px',
        width: '100%',
        marginBottom: '10px',
        backgroundColor: '#f2f2f2',
        border: 'none',
        borderRadius: '5px',
        boxSizing: 'border-box',
        height: '35px',
    };

    const flexContainer: CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        border: 'none',
        flexWrap: 'wrap',
    };

    const formContainer: CSSProperties = {
        backgroundColor: '#ffffff',
        padding: '20px',
        width: '40%',
        border: 'none',
    };


    return (
        <div style={formContainer}>
            <h2 style={{ color: 'blue', textAlign: 'center' }}>Neuen Teilnehmer hinzufügen</h2>
            <form onSubmit={handleSubmit}>
                <label style={labelStyle} htmlFor="firstName">Vorname</label>
                <input style={inputStyle} type="text" id="firstName" name="firstName" onChange={handleInputChange} required />
                <label style={labelStyle} htmlFor="lastName">Nachname</label>
                <input style={inputStyle} type="text" id="lastName" name="lastName" onChange={handleInputChange} required />
                <label style={labelStyle} htmlFor="club">Verein</label>
                <input style={inputStyle} type="text" id="club" name="club" onChange={handleInputChange} required />
                <label style={labelStyle} htmlFor="association">Landesverband</label>
                <div style={{ position: 'relative' }}>
                    <select style={inputStyle} id="association" name="association" onChange={handleInputChange} required defaultValue="">
                        <option value=""></option>
                        <option value="beispiel">Beispielverband</option>
                    </select>
                    <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 12 12" fill="blue">
            <path d="M0 9L6 0 12 9H0z" transform="rotate(180 6 4.5)" />


          </svg>
        </span>
                </div>
                <div style={flexContainer}>
                    <div style={{ width: '45%' }}>
                        <label style={labelStyle} htmlFor="birthDate">Geburtsdatum</label>
                        <input style={fullInputStyle} type="string" id="birthDate" name="birthDate" onChange={handleInputChange} required />
                    </div>
                    <div style={{ width: '45%' }}>
                        <label style={labelStyle} htmlFor="weight">Gewicht</label>
                        <input style={fullInputStyle} type="number" id="weight" name="weight" onChange={handleInputChange} required />
                    </div>
                </div>
                <button style={{
                    backgroundColor: 'blue',
                    color: 'white',
                    padding: '10px 20px',
                    marginTop: '10px',
                    width: '100%',
                    borderRadius: '5px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                }}>Hinzufügen</button>
            </form>
        </div>
    );

};

export default ParticipantForm;
