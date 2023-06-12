import React, { useState, useEffect } from 'react';
import { useParams, useLocation} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Tournament } from '../../../types';
import { deleteTournament, postTournament, getTournaments } from '../../../API/tournamentAPI';
import stateassociationOptions from '../../../Config/StateAssociations';
import './TournamentEdit.scss';
import ConfirmDelete from '../../../Tools/ConfirmDelete/ConfirmDelete';
import Modal from '../../../Tools/Modal/Modal';
import { BlockPicker, SketchPicker } from "react-color";
import ColorPicker from './../../../Tools/ColorPicker/ColorPicker'


type OptionType = {
  value: string;
  label: string;
};

interface TournamentEditProps {
  onUpdateTournament: (tournament: Tournament) => void;
  onDeleteTournament: (tournamentId: number) => void;
}

const TournamentEdit: React.FC<TournamentEditProps> = ({onUpdateTournament, onDeleteTournament }) => {
  const location = useLocation(); // get current URL
  const tournamentId = location.pathname.split('/').pop();

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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [listKey, setListKey] = useState(Math.random());
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);


    //creating state to store our color and also set color using onChange event for sketch picker
    const [sketchPickerColor, setSketchPickerColor] = useState({
      r: "241",
      g: "112",
      b: "19",
      a: "1",
    });
    // destructuring rgba from state
    const { r, g, b, a } = sketchPickerColor;
  
    //creating state to store our color and also set color using onChange event for block picker
    const [blockPickerColor, setBlockPickerColor] = useState("#37d67a");


  const handleSuccessPopup =  (status: boolean)  => {
    console.log('Turnier erfolgreich aktualisiert');
    setShowSuccessPopup(status);
    if (status) {
        setTimeout(() => {
            setShowSuccessPopup(false);
        }, 3000);
        setListKey(Math.random());
    }
  };

    // Funktion zum Abrufen der Turnierdetails anhand der ID
    useEffect(() => {
      const fetchTournament = async () => {
        try {
          const tournaments = await getTournaments();
          const tournament = getTournamentDetailsById(tournamentId ?? undefined, tournaments);
          setTournament(tournament);
          const selectedTournament = tournaments.find((t: Tournament) => t.id === tournament?.id);
          console.log(selectedTournament)
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
    }, [tournamentId]);
    
    


   const getTournamentDetailsById = (tournamentId: string | undefined, tournaments: Tournament[]): Tournament | null => {
    if (!tournamentId) {
      console.log("keine ID")
      return null;
    }
    const tournament = tournaments.find((t) => t.id === parseInt(tournamentId));
    //console.log(tournament)
    return tournament || null;
  };

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
      handleSuccessPopup(true);
      setLoading(false);
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Turniers:', error);
      setErrorMessage('(DB-Error) Fehler beim Aktualisieren!');
      setLoading(false);
    }
  };

  


  const handleDelete = async () => {
       setShowConfirmDeletePopup(true);
  };

  const handleDeleteConfirmed = async () => {
    if (tournament) {
      try {
        await deleteTournament(tournament.id);
        onDeleteTournament(tournament.id);
        setShowConfirmDeletePopup(false);
        window.location.href = '/';        //after successful deleting tournament, route user back to HomePage
      } catch (error) {
        setErrorMessage('(DB-Error) Fehler beim Löschen!');
      }
    }
  };

  const handleDeleteCanceled = () => {
    setShowConfirmDeletePopup(false);
  };

  const handleStateAssociationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStateAssociation(e.target.value);
  };


  return (
    <div className='tournamentEditMain'>
      <form className='formContainer' onSubmit={handleSubmit}>
      <h1 className="titleStyle">Turnier bearbeiten</h1>

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


        <div className='inputContainerAdressesTop'>
        <div>
          <label className="inputLabel" htmlFor="address">
            Adresse
          </label>
          <input
            className="inputField"
            type="text"
            id="addressCity"
            value={addressCity}
            onChange={(event) => setAddressCity(event.target.value)}
            placeholder="Stadt"
            required
          />
        </div>
        <div>
          <input
            className="inputField"
            type="text"
            id="addressZipCode"
            value={addressZipCode}
            onChange={(event) => setAddressZipCode(event.target.value)}
            placeholder="PLZ"
            required
          />
        </div>
        </div>

        <div className='inputContainerAdressesBottom'>
        <div>
          <input
            className="inputField"
            type="text"
            id="addressStreet"
            value={addressStreet}
            onChange={(event) => setAddressStreet(event.target.value)}
            placeholder="Straße"
            required
          />
        </div>
        <div>
          <input
            className="inputField"
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

      <div className="inputContainerTimeIntervall marginToButtonTournamentEdit">
                <div className="inputContainer halfWidth">
                    <label className="inputLabel" htmlFor="period">Zeitraum</label>
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
            <div className="colorContainer">
          <label className="inputLabel colorContainerLabel">
            Farbe der Kämpfer anpassen
          </label>

          <div className='firstColor'>
          <ColorPicker></ColorPicker>
          </div>

          <div className='secondColor'>
          <ColorPicker></ColorPicker>
          </div>
        </div>

      <div className='buttonSectionTournamentEdit'>
        <button className="blueButton" type="submit" disabled={loading}>
          {loading ? 'Laden...' : 'Änderung speichern'}
        </button>
        {showSuccessPopup && (
                <div className="successPopup">
                    Turnier wurde erfolgreich aktualisiert!
                </div>
            )}
        <button className="redButton" type="button" onClick={handleDelete}>
          Turnier löschen
        </button>
      </div>
      {showConfirmDeletePopup && (
        <Modal size="small" onClose={handleDeleteCanceled}>
          <ConfirmDelete
            onClose={handleDeleteCanceled}
            onConfirmDelete={handleDeleteConfirmed}
            idToDelete={Number(tournamentId)}
          />
        </Modal>
      )}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </form>
    </div>
  
  );
};

export default TournamentEdit;
