import React, { useState, useEffect, ChangeEvent } from 'react';
import { Club } from '../../../types';
import { putClub, deleteClub } from '../../../API/clubAPI';
import Modal from '../../../Tools/Modal/Modal';
import ConfirmDelete from '../../../Tools/ConfirmDelete/ConfirmDelete';
import stateassociationOptions from '../../../Config/StateAssociations';
import '../../../Styles/GlobalStyles.scss'
import './ClubEdit.scss'

interface ClubEditProps {
  club: Club;
  onUpdateClub: (club: Club) => void;
  onDeleteClub: (clubId: number) => void;
}

const ClubEdit: React.FC<ClubEditProps> = ({ club, onUpdateClub, onDeleteClub }) => {
  const [shortname, setShortName] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressZipCode, setAddressZipCode] = useState("");
  const [clubName, setClubName] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressStreetNumber, setAddressStreetNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [stateassociation, setStateAssociation] = useState('');
  const [loading, setLoading] = useState(false);

  type OptionType = {
    value: string;
    label: string;
  };

  useEffect(() => {
    setShortName(club.shortname);
    setAddressCity(club.address?.city || '');
    setAddressZipCode(club.address?.postalcode || '');
    setClubName(club.name);
    setAddressStreet(club.address?.street || '');
    setAddressStreetNumber(club.address?.housenumber || '');
    setStateAssociation(String(club.stateassociation));
  }, [club]);


  const handleStateAssociationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStateAssociation(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!clubName) {
      setErrorMessage("Bitte Vereinsnamen eingeben.");
      setLoading(false);
      return;
    }

    if (!stateassociation) {
      setErrorMessage("Bitte Landesverband auswählen");
      setLoading(false);
      return;
    }


    const updatedClub: Club = {
      ...club,
      shortname: shortname,
      name: clubName,
      address: {
        ...club.address,
        street: addressStreet,
        housenumber: addressStreetNumber,
        city: addressCity,
        postalcode: addressZipCode,
        id: club.address?.id || 0,
        state: club.address?.state, // Feld ohne den optionalen Operator ? übernehmen
      },
      stateassociation: stateassociation,
      id: club.id || 0,
    };


    try {
      await putClub(updatedClub);
      onUpdateClub(updatedClub);
      setLoading(false);
    } catch (error) {
      setErrorMessage('(DB-Error) Fehler beim Bearbeiten!');
      setLoading(false);
    }
  };

  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);

  const handleDelete = () => {
    setShowConfirmDeletePopup(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteClub(club.id || 0); // Verwenden Sie eine Standardwert, wenn club.id undefined ist
      onDeleteClub(club.id || 0); // Verwenden Sie eine Standardwert, wenn club.id undefined ist
    } catch (error) {
      console.error('(DB-Error) Fehler beim Löschen!', error);
    }
    setShowConfirmDeletePopup(false);
  };

  const handleDeleteCanceled = () => {
    setShowConfirmDeletePopup(false);
  };

  return (
    <div className='clubEditMain'>
      <form className='formContainer' onSubmit={handleSubmit}>
      <h1 className="titleStyle">Verein bearbeiten</h1>

      <div className="inputContainer">
        <label className="inputLabel" htmlFor="clubName">
          Vereinsname
        </label>
        <input
          className="inputField"
          type="text"
          id="clubName"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
          required
        />
      </div>

      <div className="inputContainer">
        <label className="inputLabel" htmlFor="stateassociation">
          Landesverband
        </label>
        <div className='inputContainerSelect'>
        <select
          id="stateassociation"
          value={stateassociation || ''}
          onChange={handleStateAssociationChange}
          required
          className="selectField"
        >
          <option value="">
            Bitte auswählen
          </option>
          {stateassociationOptions.map((option: OptionType) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      </div>
      </div>
      <label className="inputLabel" htmlFor="address">Adresse</label>
      <div className="inputContainerAdressesTop">
        <div>
          <input className="inputField" type="text" id="addressCity" value={addressCity} onChange={e => setAddressCity((e.target.value))} placeholder="Stadt" required />
        </div>
        
        <div>
          <input className="inputField" type="text" id="addressZipCode" value={addressZipCode} onChange={e => setAddressZipCode((e.target.value))} placeholder="PLZ" required />
        </div>
        </div>

        <div className='inputContainerAdressesBottom'>
          <div>
            <input className="inputField" type="text" id="addressStreet" value={addressStreet} onChange={e => setAddressStreet((e.target.value))} placeholder="Straße" required />
          </div>

          <div>
            <input className="inputField" type="text" id="addressStreetNumber" value={addressStreetNumber} onChange={e => setAddressStreetNumber((e.target.value))} placeholder="Nummer" required />
          </div>
        </div>

      <div className='buttonSection'>
      <button className="blueButton" type="submit" disabled={loading}>
        {loading ? 'Laden...' : 'Aktualisieren'}
      </button>

      <button className="redButton" type="button" onClick={handleDelete}>
        Verein löschen
      </button>
      </div> 

      {showConfirmDeletePopup && (
        <Modal size="small" onClose={handleDeleteCanceled}>
          <ConfirmDelete
            onClose={handleDeleteCanceled}
            onConfirmDelete={handleDeleteConfirmed}
            idToDelete={club.id || 0} 
          />
        </Modal>
      )}


      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </form>
    </div>
  
  );
};

export default ClubEdit;
