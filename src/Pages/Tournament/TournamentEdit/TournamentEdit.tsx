import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Tournament } from '../../../types';
import { deleteTournament, postTournament, getTournaments } from '../../../API/tournamentAPI';
import stateassociationOptions from '../../../Config/StateAssociations';
import './TournamentEdit.css';


type OptionType = {
  value: string;
  label: string;
};


interface TournamentEditProps {
  onUpdateTournament: (tournament: Tournament) => void;
  onDeleteTournament: (tournamentId: number) => void;
}


const TournamentEdit: React.FC<TournamentEditProps> = ({ onUpdateTournament, onDeleteTournament }) => {
  const { tournamentId } = useParams<{ tournamentId: string }>();

  const [tournamentName, setTournamentName] = useState('');
  const [tournamentLocation, setTournamentLocation] = useState('');
  const [stateassociation, setStateAssociation] = useState<string>('');
  const [addressCity, setAddressCity] = useState('');
  const [addressZipCode, setAddressZipCode] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressStreetNumber, setAddressStreetNumber] = useState('');
  const [periodFrom, setPeriodFrom] = useState<Date | null>(null);
  const [periodTo, setPeriodTo] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [tournament, setTournament] = useState<Tournament | null>(null);

  const handleSuccessPopup = () => {
    console.log('Turnier erfolgreich aktualisiert');
  };



  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const tournaments = await getTournaments(); // Fetch all tournaments from the backend
        const selectedTournament = tournaments.find((t: Tournament) => t.id === 112 ); // Input ID
        if (selectedTournament) {
          setTournamentName(selectedTournament.name);
          setTournamentLocation(selectedTournament.location);
          setStateAssociation(selectedTournament.stateassociation);
          setAddressCity(selectedTournament.address.city);
          setAddressZipCode(selectedTournament.address.postalcode);
          setAddressStreet(selectedTournament.address.street);
          setAddressStreetNumber(selectedTournament.address.housenumber);
          setPeriodFrom(new Date(selectedTournament.startdate));
          setPeriodTo(new Date(selectedTournament.enddate));


        }
      } catch (error) {
        console.error('Error loading tournament:', error);
      }
    };
  
    fetchTournament();
  }, []);
  



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!periodFrom || !periodTo) {
      setErrorMessage('Bitte Datum eingeben.');
      setLoading(false);
      return;
    }

    const updatedTournament: Tournament = {
      ...tournament!,
      name: tournamentName,
      location: tournamentLocation,
      stateassociation: stateassociation,
      address: {
        ...tournament!.address,
        city: addressCity,
        postalcode: addressZipCode,
        street: addressStreet,
        housenumber: addressStreetNumber,
      },
      startdate: periodFrom.toISOString(),
      enddate: periodTo.toISOString(),
    };

    try {
      await postTournament(updatedTournament);
      onUpdateTournament(updatedTournament);
      setLoading(false);
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Turniers:', error);
      setErrorMessage('(DB-Error) Fehler beim Aktualisieren!');
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    if (tournament) {
      try {
        await deleteTournament(tournament.id);
        onDeleteTournament(tournament.id);
      } catch (error) {
        setErrorMessage('(DB-Error) Fehler beim Löschen!');
      }
    }
  };


  const handleStateAssociationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStateAssociation(e.target.value);
  };


  return (
    <form onSubmit={handleSubmit} className="formContaineTournament">
      <h1 className="titleStyle">Turnier bearbeiten</h1>
      <div>
        <div className="inputContainer">
          <label className="inputLabel" htmlFor="tournamentName">
            Turniername
          </label>
          <input
            className="inputField"
            type="text"
            id="tournamentName"
            value={tournamentName}
            onChange={(event) => setTournamentName(event.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label className="inputLabel" htmlFor="tournamentLocation">
            Veranstaltungsort
          </label>
          <input
            className="inputField"
            type="text"
            id="tournamentLocation"
            value={tournamentLocation}
            onChange={(event) => setTournamentLocation(event.target.value)}
            required
          />
        </div>
      </div>
      <div className="halfWidthWrapper">
        <div className="inputContainer halfWidth">
          <label className="inputLabel" htmlFor="address">
            Adresse
          </label>
          <input
            className="inputFieldWide"
            type="text"
            id="addressCity"
            value={addressCity}
            onChange={(event) => setAddressCity(event.target.value)}
            placeholder="Stadt"
            required
          />
        </div>
        <div className="inputContainer halfWidth">
          <input
            className="inputFieldSmall"
            type="text"
            id="addressZipCode"
            value={addressZipCode}
            onChange={(event) => setAddressZipCode(event.target.value)}
            placeholder="PLZ"
            required
          />
        </div>
      </div>
      <div className="halfWidthWrapperAddress">
        <div className="inputContainer halfWidth">
          <input
            className="inputFieldWide"
            type="text"
            id="addressStreet"
            value={addressStreet}
            onChange={(event) => setAddressStreet(event.target.value)}
            placeholder="Straße"
            required
          />
        </div>
        <div className="inputContainer halfWidth">
          <input
            className="inputFieldSmall"
            type="text"
            id="addressStreetNumber"
            value={addressStreetNumber}
            onChange={(event) => setAddressStreetNumber(event.target.value)}
            placeholder="Nummer"
            required
          />
        </div>
      </div>
      <div className="inputContainer">
        <label className="inputLabel" htmlFor="nationalAssociation">
          Verein
        </label>
        <div className="inputContainerSelect">
          <select
            className="selectField"
            id="stateassociation"
            value={stateassociation || ''}
            onChange={handleStateAssociationChange}
            required
          >
            <option value=""></option>
            {stateassociationOptions.map((option: OptionType) => (
              <option key={option.value} value={option.value} className="dropdown-content">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="halfWidthWrapper">
        <div className="inputContainer halfWidth">
          <label className="inputLabel" htmlFor="period">
            Zeitraum
          </label>
          <DatePicker
            id="periodFrom"
            selected={periodFrom}
            onChange={(date: Date | null) => setPeriodFrom(date)}
            dateFormat="dd.MM.yyyy"
            required
          />
        </div>
        <div className="dashContainer">
          <div className="dash">-</div>
        </div>
        <div className="inputContainer halfWidth">
          <DatePicker
            id="periodTo"
            selected={periodTo}
            onChange={(date: Date | null) => setPeriodTo(date)}
            dateFormat="dd.MM.yyyy"
            required
          />
        </div>
      </div>

      <button className="addButton" type="submit" disabled={loading}>
        {loading ? 'Laden...' : 'Änderung speichern'}
      </button>

      <button className="addDeleteButton" type="button" onClick={handleDelete}>
        Turnier Löschen
      </button>

      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </form>
  );
};

export default TournamentEdit;
