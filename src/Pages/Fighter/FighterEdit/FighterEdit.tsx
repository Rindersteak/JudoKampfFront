import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Fighter } from '../../../types';
import { putFighter, deleteFighter } from '../../../API/fighterAPI';
import Select from 'react-select';

interface FighterEditProps {
  fighter: Fighter;
  onUpdateFighter: (fighter: Fighter) => void;
  onDeleteFighter: (fighterId: number) => void;
}

const FighterEdit: React.FC<FighterEditProps> = ({ fighter, onUpdateFighter, onDeleteFighter }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [clubname, setClubName] = useState("");
  const [birthdate, setBirthDate] = useState<Date | null>(null);
  const [weight, setWeight] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState<{ value: string; label: string; } | null>(null);
  const [club, setClub] = useState<{ value: string; label: string; } | null>(null);


  const genderOptions = [
    { value: 'm', label: 'Männlich' },
    { value: 'f', label: 'Weiblich' },
  ];

  const clubOptions = [
    { value: 'Verein 1', label: 'Verein 1' },
    { value: 'Verein 2', label: 'Verein 2' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!birthdate) {
      setErrorMessage('Bitte Geburtsdatum eingeben.');
      setLoading(false);
      return;
    }

    if (weight > 300) {
      setErrorMessage('Max. 300');
      setLoading(false);
      return;
    }
    

    const birthdateAsString = birthdate.toISOString();

    const updatedFighter = {
      ...fighter,
      firstname,
      lastname,
      club: {
        ...fighter.club,
        name: club?.value || '',
      },
      birthdate: birthdateAsString,
      weight,
      sex: gender?.value || '',
    };

    

    try {
      await putFighter(updatedFighter);
      onUpdateFighter(updatedFighter);
      setLoading(false);
    } catch (error) {
      setErrorMessage('(DB-Error) Fehler beim Bearbeiten!');
      setLoading(false);
    }
  };


  // initialisiert den Zustand der Komponente mit den Daten des übergebenen Fighter
  useEffect(() => {
    setFirstName(fighter.firstname);
    setLastName(fighter.lastname);
    setClubName(fighter.club.name);
    setBirthDate(new Date(fighter.birthdate));
    setWeight(fighter.weight);
    setGender(genderOptions.find(option => option.value === fighter.sex) || null);
    setClub(clubOptions.find(option => option.value === fighter.club.name) || null);
  }, [fighter]);


  const handleDelete = async () => {
    try {
      await deleteFighter(fighter.id);
      onDeleteFighter(fighter.id);
    } catch (error) {
      setErrorMessage('(DB-Error) Fehler beim Löschen!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <h1 className="titleStyle">Teilnehmer bearbeiten</h1>

      <div>
        <div className="inputContainer">
          <label className="inputLabel" htmlFor="firstName">
            Vorname
          </label>
          <input
            className="inputField"
            type="text"
            id="firstName"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label className="inputLabel" htmlFor="lastName">
            Nachname
          </label>
          <input
            className="inputField"
            type="text"
            id="lastName"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="inputContainer">
        <label className="inputLabel" htmlFor="gender">
          Geschlecht
        </label>
        <div className="selectContainer">
          <Select
            id="gender"
            value={gender}
            options={genderOptions}
            onChange={(newValue: { value: string; label: string } | null) => setGender(newValue)}
            required
          />
        </div>
      </div>

      <div className="inputContainer">
        <label className="inputLabel" htmlFor="club">
          Verein
        </label>
        <div className="selectContainer">
          <Select
            id="club"
            value={club}
            options={clubOptions}
            onChange={(newValue: { value: string; label: string } | null) => setClub(newValue)}
            required
          />
        </div>
      </div>

      <div className="halfWidthWrapper">
        <div className="inputContainer halfWidth">
          <label className="inputLabel" htmlFor="birthDate">
            Geburtsdatum
          </label>
          <DatePicker
            id="birthDate"
            selected={birthdate}
            onChange={(date: Date | null) => setBirthDate(date)}
            dateFormat="dd.MM.yyyy"
            required
          />
        </div>
        <div className="inputContainer halfWidth">
          <label className="inputLabel" htmlFor="weight">
            Gewicht
          </label>
          <input
            className="inputField"
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            required
          />
        </div>
      </div>

      <button className="addButton" type="submit" disabled={loading}>
        {loading ? 'Laden...' : 'Aktualisieren'}
      </button>

      <button className="addDeleteButton" type="button" onClick={handleDelete}>
        Teilnehmer Löschen
      </button>

      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </form>
  );
};

export default FighterEdit;
