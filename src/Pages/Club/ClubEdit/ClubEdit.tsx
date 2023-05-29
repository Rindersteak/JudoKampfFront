import React, { useState, useEffect, ChangeEvent } from 'react';
import { Club } from '../../../types';
import { putClub, deleteClub } from '../../../API/clubAPI';
import Modal from '../../../Tools/Modal/Modal';
import ConfirmDelete from '../../../Tools/ConfirmDelete/ConfirmDelete';

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

  const stateassociationOptions = [
    { value: 'lv1', label: 'Landesverband 1' },
    { value: 'lv2', label: 'Landesverband 2' },
  ];

  useEffect(() => {
    setShortName(club.shortname);
    setAddressCity(club.address.city);
    setAddressZipCode(club.address.postalcode);
    setClubName(club.name);
    setAddressStreet(club.address.street);
    setAddressStreetNumber(club.address.housenumber);
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

    const updatedClub = {
      ...club,
      shortName: shortname,
      name: clubName,
      address: {
        ...club.address,
        street: addressStreet,
        housenumber: addressStreetNumber,
        city: addressCity,
        postalcode: addressZipCode
      },
      stateassociation: stateassociation,
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
      await deleteClub(club.id);
      onDeleteClub(club.id);
    } catch (error) {
      console.error('(DB-Error) Fehler beim Löschen!', error);
    }
    setShowConfirmDeletePopup(false);
  }

  const handleDeleteCanceled = () => {
    setShowConfirmDeletePopup(false);
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer">
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
        <select
          id="stateassociation"
          value={stateassociation || ''}
          onChange={handleStateAssociationChange}
          required
          className="dropdown-field"
        >
          <option value="" disabled>
            Bitte auswählen
          </option>
          {stateassociationOptions.map((option) => (
            <option key={option.value} value={option.value} className="dropdown-content">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="halfWidthWrapper">
        <div className="inputContainer halfWidth">
          <label className="inputLabel" htmlFor="addressCity">Stadt</label>
          <input className="inputFieldWide" type="text" id="addressCity" value={addressCity} onChange={(e) => setAddressCity(e.target.value)} required />
        </div>
        <div className="inputContainer halfWidth">
          <label className="inputLabel" htmlFor="addressZipCode">PLZ</label>
          <input className="inputFieldSmall" type="text" id="addressZipCode" value={addressZipCode} onChange={(e) => setAddressZipCode(e.target.value)} required />
        </div>
      </div>

      <div className="halfWidthWrapper">
        <div className="inputContainer halfWidth">
          <label className="inputLabel" htmlFor="addressStreet">Straße</label>
          <input className="inputFieldWide" type="text" id="addressStreet" value={addressStreet} onChange={(e) => setAddressStreet(e.target.value)} required />
        </div>
        <div className="inputContainer halfWidth">
          <label className="inputLabel" htmlFor="addressStreetNumber">Nummer</label>
          <input className="inputFieldSmall" type="text" id="addressStreetNumber" value={addressStreetNumber} onChange={(e) => setAddressStreetNumber(e.target.value)} required />
        </div>
      </div>

      <button className="addButton" type="submit" disabled={loading}>
        {loading ? 'Laden...' : 'Aktualisieren'}
      </button>

      <button className="addDeleteButton" type="button" onClick={handleDelete}>
        Verein Löschen
      </button>

      {showConfirmDeletePopup && (
        <Modal size="small" onClose={handleDeleteCanceled}>
          <ConfirmDelete
            onClose={handleDeleteCanceled}
            onConfirmDelete={handleDeleteConfirmed}
            idToDelete={club.id}
          />
        </Modal>
      )}

      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </form>
  );
};

export default ClubEdit;