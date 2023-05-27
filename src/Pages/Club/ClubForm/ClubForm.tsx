import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Fighter } from '../../../types';
import { postFighter } from '../../../API/fighterAPI';
import './ClubForm.css';
import Select from 'react-select';

type ClubFormProps = {
  onAddClub: (fighter: Fighter) => void;
  onShowSuccessPopup: (status: boolean) => void;
};

const ClubForm: React.FC<ClubFormProps> = ({ onAddClub, onShowSuccessPopup }) => {
  const [shortname, setShortName] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressZipCode, setAddressZipCode] = useState("");
  const [clubName, setClubName] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressStreetNumber, setAddressStreetNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [landesverband, setLandesverband] = useState<{ value: string; label: string; } | null>(null);
  const [loading, setLoading] = useState(false);

  const landesverbandOptiopns = [
    { value: 'm', label: 'Landesverband 1' },
    { value: 'f', label: 'Landesverband 2' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");


    if (!clubName) {
      setErrorMessage("Bitte Vereinsnamen eingeben.");
      setLoading(false);
      return;
    }

    if (!landesverband) {
      setErrorMessage("Bitte Landesverband auswählen");
      setLoading(false);
      return;
    }
 
    const club = {
      id: 0,
      shortname: shortname,
      name: clubName,
      address: {
        id: 0,
        street: addressStreet,
        housenumber: addressStreetNumber,
        city: addressCity,
        state: "string",
        postalcode: addressZipCode
      }
    }
/*
    try {
      await postFighter(fighter);
      onAddClub(fighter);
      onShowSuccessPopup(true);
      setLoading(false);
    } catch (error) {
      setErrorMessage("(DB-Error) Fehler beim Anlegen!");
      setLoading(false);
    }
    */
  };

  return (
    <form onSubmit={handleSubmit} className="formContaineTournament">
        <h1 className="titleStyle">Neuen Verein anlegen</h1>
        <div>
            <div className="inputContainer">
                <label className="inputLabel" htmlFor="tournamentName">Vereinsname</label>
                <input className="inputField" type="text" id="tournamentName" value={clubName} onChange={(event) => setClubName(event.target.value)} required />
            </div>

            <div className="inputContainer">
        <label className="inputLabel" htmlFor="landesverband">Landesverband</label>
        <Select
  id="landesverband"
  value={landesverband}
  options={landesverbandOptiopns}
  onChange={(newValue: { value: string; label: string; } | null) => setLandesverband(newValue)}
  required
  className="custom-select"
  styles={{ control: (provided,state) => ({
     ...provided, 
     //height: "5px",
     //minHeight: "10px",
     backgroundColor: state.selectProps.value ? '#EDEFF2' : '#EDEFF2',
     }) 
     }}
/>

        </div>
        </div>
        <div className="halfWidthWrapper">
            <div className="inputContainer halfWidth">
                <label className="inputLabel" htmlFor="address">Adresse</label>
                <input className="inputFieldWide" type="text" id="addressCity" value={addressCity} onChange={e => setAddressCity((e.target.value))} placeholder="Stadt" required />
            </div>
            <div className="inputContainer halfWidth">
                <input className="inputFieldSmall" type="text" id="addressZipCode" value={addressZipCode} onChange={e => setAddressZipCode((e.target.value))} placeholder="PLZ" required />
            </div>
        </div>
        <div className="halfWidthWrapper">
            <div className="inputContainer halfWidth">
                <input className="inputFieldWide" type="text" id="addressStreet" value={addressStreet} onChange={e => setAddressStreet((e.target.value))} placeholder="Straße" required />
            </div>
            <div className="inputContainer halfWidth">
                <input className="inputFieldSmall" type="text" id="addressStreetNumber" value={addressStreetNumber} onChange={e => setAddressStreetNumber((e.target.value))} placeholder="Nummer" required />
            </div>
        </div>
        <button className="addButton" type="submit" disabled={loading}>
    {loading ? "Laden..." : "Hinzufügen"}
  </button>

  {errorMessage && <div className="errorMessage">{errorMessage}</div>}

    </form>
);
};

export default ClubForm;
