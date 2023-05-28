import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Fighter } from '../../types';
import { postFighter } from '../../API/fighterAPI';
import { getClubs } from '../../API/clubAPI';
import './FighterForm.css';
import Select from 'react-select';

type Props = {
  onAddFighter: (fighter: Fighter) => void;
  onShowSuccessPopup: (status: boolean) => void;
};

type OptionType = {
  value: string;
  label: string;
};

const FighterForm: React.FC<Props> = ({ onAddFighter, onShowSuccessPopup }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [clubname, setClubName] = useState("");
  const [birthdate, setBirthDate] = useState<Date | null>(null);
  const [weight, setWeight] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState<OptionType | null>(null);
  const [club, setClub] = useState<OptionType | null>(null);
  const [clubOptions, setClubOptions] = useState<OptionType[]>([]);

  const genderOptions: OptionType[] = [
    { value: 'm', label: 'Männlich' },
    { value: 'f', label: 'Weiblich' }
  ];

  useEffect(() => {
    async function fetchClubs() {
      try {
        const clubs = await getClubs();
        const clubOptions = clubs.map((club: any) => ({
          value: club.id.toString(),
          label: club.name
        }));
        setClubOptions(clubOptions);
      } catch (error) {
        console.log("Error fetching clubs:", error);
      }
    }
    fetchClubs();
  }, []);

  const handleGenderChange = (newValue: OptionType | null) => {
    setGender(newValue);
  };

  const handleClubChange = (newValue: OptionType | null) => {
    setClub(newValue);
  };

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

    const birthdateAsString = birthdate?.toISOString();

    const fighter = {
      id: 0,
      sex: gender?.value || '',
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
        shortname: club?.value || '',
        name: club?.value || '',
        address: {
          id: 0,
          street: "",
          housenumber: "",
          city: "",
          state: "",
          postalcode: "",
        },
        stateassociation: ''
      },
    };

    try {
      await postFighter(fighter);
      onAddFighter(fighter);
      onShowSuccessPopup(true);
      setLoading(false);
    } catch (error) {
      setErrorMessage("(DB-Error) Fehler beim Anlegen!");
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
        <label className="inputLabel" htmlFor="gender">Geschlecht</label>
        <select
          id="gender"
          value={gender ? gender.value : ''}
          onChange={(e) => {
            const selectedOption = genderOptions.find(
              (option) => option.value === e.target.value
            );
            handleClubChange(selectedOption || null);
          }}
          required
          className="dropdown-field"
        >
          <option value="" disabled>
            Bitte auswählen
          </option>
          {genderOptions.map((option: OptionType) => (
            <option
              key={option.value}
              value={option.value}
              className="dropdown-content"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>


      <div className="inputContainer">
        <label className="inputLabel" htmlFor="club">
          Verein
        </label>
        <select
          id="club"
          value={club ? club.value : ''}
          onChange={(e) => {
            const selectedOption = clubOptions.find(
              (option) => option.value === e.target.value
            );
            handleClubChange(selectedOption || null);
          }}
          required
          className="dropdown-field"
        >
          <option value="" disabled>
            Bitte auswählen
          </option>
          {clubOptions.map((option: OptionType) => (
            <option
              key={option.value}
              value={option.value}
              className="dropdown-content"
            >
              {option.label}
            </option>
          ))}
        </select>
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
