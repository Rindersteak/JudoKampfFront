import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Fighter } from '../../types';
import './FighterForm.css';

type Props = {
  onAddFighter: (fighter: Fighter) => void;
  onShowSuccessPopup: (status: boolean) => void;
};

const FighterForm: React.FC<Props> = ({ onAddFighter, onShowSuccessPopup }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [clubname, setClubName] = useState("");
  const [birthdate, setBirthDate] = useState<Date | null>(null);
  const [weight, setWeight] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!birthdate) {
      setErrorMessage("Bitte Geburtsdatum eingeben.");
      setLoading(false);
      return;
    }
  
    if (weight > 300) {
      setErrorMessage("Max. 300");
      setLoading(false);
      return;
    }

    const fighter = {
      id: 0,
      sex: "m",
      firstname: firstname,
      lastname: lastname,
      birthdate: birthdate,
      ageclass: {
        id: 0,
        name: "",
        lowerAge: 0,
        upperAge: 0,
      },
      weight: weight,
      weightclass: {
        id: 0,
        name: "",
        upperBoundary: 0,
        lowerBoundary: 0,
      },
      club: {
        id: 0,
        shortName: clubname,
        name: clubname,
        address: {
          id: 0,
          street: "",
          houseNumber: "",
          city: "",
          state: "",
          postalCode: "",
        },
      },
    };


    try {
      const response = await fetch('http://localhost:8081/fighters/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fighter)
      });

      setLoading(false);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Nur wenn der POST-Aufruf erfolgreich war, den Kämpfer zur Liste hinzufügen und Popup anzeigen
      onAddFighter(fighter);
      onShowSuccessPopup(true);
    } catch (error) {
      console.error('An error occurred while submitting the fighter:', error);
      setErrorMessage("Es gab ein Problem beim Hinzufügen des Kämpfers.");
      setLoading(false);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <h1 className="titleStyle">Neuen Teilnehmer hinzufügen</h1>
      <div>
        <div className="inputContainer">
          <label className="inputLabel" htmlFor="firstName">Vorname</label>
          <input className="inputField" type="text" id="firstName" value={firstname} onChange={e => setFirstName(e.target.value)} required />
        </div>
        <div className="inputContainer">
          <label className="inputLabel" htmlFor="lastName">Nachname</label>
          <input className="inputField" type="text" id="lastName" value={lastname} onChange={e => setLastName(e.target.value)} required />
        </div>
      </div>

      <div className="inputContainer">
        <label className="inputLabel" htmlFor="club">Verein</label>
        <div className="selectContainer">
          <select className="selectField" id="club" value={clubname} onChange={e => setClubName(e.target.value)} required>
            <option value=""></option>
            <option value="Verein 1">Verein 1</option>
            <option value="Verein 2">Verein 2</option>
          </select>
        </div>
      </div>


      <div className="halfWidthWrapper">
        <div className="inputContainer halfWidth">
          <label className="inputLabel" htmlFor="birthDate">Geburtsdatum</label>
          <DatePicker
            id="birthDate"
            selected={birthdate}
            onChange={(date: Date | null) => setBirthDate(date)}
            dateFormat="dd.MM.yyyy"
            required
          />
        </div>
        <div className="inputContainer halfWidth">
          <label className="inputLabel" htmlFor="weight">Gewicht</label>
          <input className="inputField" type="number" id="weight" value={weight} onChange={e => setWeight(parseFloat(e.target.value))} required />
        </div>
      </div>

      <button className="addButton" type="submit" disabled={loading}>
        {loading ? "Laden..." : "Hinzufügen"}
      </button>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </form>
  );
};

export default FighterForm;
