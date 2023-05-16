import React, { useState, CSSProperties } from 'react';

type Participant = {
  firstName: string;
  lastName: string;
  club: string;
  regionalAssociation: string;
  birthDate: string;
  weight: string;
};

const initialParticipant: Participant = {
  firstName: '',
  lastName: '',
  club: '',
  regionalAssociation: '',
  birthDate: '',
  weight: '',
};

const ParticipantForm: React.FC = () => {
  const [participant, setParticipant] = useState<Participant>(initialParticipant);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setParticipant({
      ...participant,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParticipants([...participants, participant]);
    setParticipant(initialParticipant);
  };

  const inputStyle: CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    boxSizing: 'border-box'
  };

  const halfInputStyle: CSSProperties = {
    ...inputStyle,
    width: 'calc(50% - 10px)'
  }

  const flexContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between'
  }

  const appContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px'
  }

  const formContainer: CSSProperties = {
    width: '45%',
    backgroundColor: '#f2f2f2',
    padding: '20px',
    borderRadius: '10px'
  }

  const listContainer: CSSProperties = {
    width: '45%',
    backgroundColor: '#f2f2f2',
    padding: '20px',
    borderRadius: '10px',
    maxHeight: '500px',
    overflowY: 'scroll'
  }

  return (
      <div style={appContainer}>
        <div style={formContainer}>
          <h2 style={{color: 'blue'}}>Neuen Teilnehmer hinzufügen</h2>
          <form onSubmit={handleSubmit}>
            <input style={inputStyle} type="text" name="firstName" placeholder="Vorname" onChange={handleInputChange} required />
            <input style={inputStyle} type="text" name="lastName" placeholder="Nachname" onChange={handleInputChange} required />
            <input style={inputStyle} type="text" name="club" placeholder="Verein" onChange={handleInputChange} required />
            <select style={inputStyle} name="regionalAssociation" onChange={handleInputChange} required>
              <option value="">Landesverband wählen</option>
              {/* Hier können Sie die Liste der Landesverbände einfügen */}
              <option value="beispiel">Beispielverband</option>
            </select>
            <div style={flexContainer}>
              <input style={halfInputStyle} type="date" name="birthDate" placeholder="Geburtsdatum" onChange={handleInputChange} required />
              <input style={halfInputStyle} type="number" name="weight" placeholder="Gewicht" onChange={handleInputChange} required />
          </div>
          <button style={{backgroundColor: 'blue', color: 'white', padding: '10px 20px', marginTop: '10px', width: '100%'}}>Hinzufügen</button>
        </form>
      </div>

      <div style={listContainer}>
        <h2 style={{color: 'blue'}}>Teilnehmerliste</h2>
        {participants.map((participant, index) => (
          <div key={index}>
            <h3>{participant.firstName} {participant.lastName}</h3>
            <p>Verein: {participant.club}</p>
            <p>Landesverband: {participant.regionalAssociation}</p>
            <p>Geburtsdatum: {participant.birthDate}</p>
            <p>Gewicht: {participant.weight}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantForm;

