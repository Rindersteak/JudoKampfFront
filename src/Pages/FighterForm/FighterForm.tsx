import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Fighter } from '../../types';
import './FighterForm.css';

type Props = {
  onAddFighter: (fighter: Fighter) => void;
};

const FighterForm: React.FC<Props> = ({ onAddFighter }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [clubname, setClubName] = useState("");
  const [birthdate, setBirthDate] = useState<Date | null>(null);
  const [weight, setWeight] = useState(0);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fighter = {
      id: 0,
      sex: "m",
      firstname: firstname,
      lastname: lastname,
      birthdate: new Date(),
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
  
    onAddFighter(fighter);
  
    try {
      const response = await fetch('http://localhost:8081/fighters/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fighter)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('An error occurred while submitting the fighter:', error);
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
  <div className="inputContainer halfWidth"> {/* Container für das Gewicht */}
    <label className="inputLabel" htmlFor="weight">Gewicht</label> {/* Label für das Gewicht */}
    <input className="inputField" type="number" id="weight" value={weight} onChange={e => setWeight(parseFloat(e.target.value))} required /> {/* Eingabefeld für das Gewicht, das den weight-Status aktualisiert */}
  </div>
</div>

<button className="addButton" type="submit" onClick={handleSubmit}>
  Hinzufügen
</button>

        </form>
  );

    

    


};


export default FighterForm; // Export der FighterForm-Komponente als Standardexport
