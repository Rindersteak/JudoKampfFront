import React, { useState } from 'react';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setParticipant({
      ...participant,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier können Sie die Teilnehmerdaten an Ihren Backend-Service senden
    console.log(participant);
  };

  return (
      <div>
        <h2 style={{color: 'blue'}}>Neuen Teilnehmer hinzufügen</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="Vorname" onChange={handleInputChange} required />
          <input type="text" name="lastName" placeholder="Nachname" onChange={handleInputChange} required />
          <input type="text" name="club" placeholder="Verein" onChange={handleInputChange} required />
          <select name="regionalAssociation" onChange={handleInputChange} required>
            <option value="">Landesverband wählen</option>
            {/* Hier können Sie die Liste der Landesverbände einfügen */}
            <option value="beispiel">Beispielverband</option>
          </select>
          <input type="date" name="birthDate" placeholder="Geburtsdatum" onChange={handleInputChange} required />
          <input type="number" name="weight" placeholder="Gewicht" onChange={handleInputChange} required />
          <button style={{backgroundColor: 'blue', color: 'white'}}>Hinzufügen</button>
        </form>
      </div>
  );
};

export default ParticipantForm;
