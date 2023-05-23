import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Fighter } from '../../types';
// import '../../Styles/Form.css'
import { postFighter } from '../../API/fighterAPI';
import './FighterForm.css'

// Definieren der Properties für die Komponente
type Props = {
  onAddFighter: (fighter: Fighter) => void;
  onShowSuccessPopup: (status: boolean) => void;
};

const FighterForm: React.FC<Props> = ({ onAddFighter, onShowSuccessPopup }) => {
  // Initialisierung der Zustandsvariablen für die Eingabefelder und das Laden und die Fehlermeldung
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [clubname, setClubName] = useState("");
  const [birthdate, setBirthDate] = useState<Date | null>(null);
  const [weight, setWeight] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Behandlung der Formular-Einreichung
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Validierung der Eingaben
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

    const birthdateAsString = birthdate?.toISOString();

    // Erstellen des Fighter-Objekts basierend auf den Zustandsvariablen
    const fighter = {
      id: 0,
      sex: "m",
      firstname: firstname,
      lastname: lastname,
      birthdate: birthdateAsString,
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

    // Versuch, den Fighter zum Backend hinzuzufügen
    try {
      // Verwende die postFighter Funktion aus der Fighter API, um den Kämpfer hinzuzufügen
      await postFighter(fighter);
  
      // Hinzufügen des Fighters und Anzeigen des Erfolgspopups nur, wenn der POST erfolgreich war
      onAddFighter(fighter);
      onShowSuccessPopup(true);
      setLoading(false);
  } catch (error) {
      setErrorMessage("(DB-Error) Fehler beim Anlegen!");
      setLoading(false);
  }

  };


// Rendern des Formulars
  return (
      <form onSubmit={handleSubmit} className="formContainer">
        <h1 className="titleStyle">Neuen Teilnehmer hinzufügen</h1>

        <div>
          {/* Eingabefeld für den Vornamen */}
          <div className="inputContainer">
            <label className="inputLabel" htmlFor="firstName">Vorname</label>
            <input className="inputField" type="text" id="firstName" value={firstname} onChange={e => setFirstName(e.target.value)} required />
          </div>
          {/* Eingabefeld für den Nachnamen */}
          <div className="inputContainer">
            <label className="inputLabel" htmlFor="lastName">Nachname</label>
            <input className="inputField" type="text" id="lastName" value={lastname} onChange={e => setLastName(e.target.value)} required />
          </div>
        </div>
        {/* Auswahl des Vereins */}
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
        {/* Geburtsdatum und Gewicht */}
        <div className="halfWidthWrapper">
          {/* Eingabefeld für das Geburtsdatum */}
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
          {/* Eingabefeld für das Gewicht */}
          <div className="inputContainer halfWidth">
            <label className="inputLabel" htmlFor="weight">Gewicht</label>
            <input className="inputField" type="number" id="weight" value={weight} onChange={e => setWeight(parseFloat(e.target.value))} required />
          </div>
        </div>
        {/* Hinzufügen-Button und Fehlermeldung */}
        <button className="addButton" type="submit" disabled={loading}>
          {loading ? "Laden..." : "Hinzufügen"}
        </button>
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      </form>
  );
};

export default FighterForm;
