import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TournamentForm.css'
import { Club, Address, Tournament } from '../../types';
import { getClubs } from '../../API/clubAPI';
import { postTournament } from '../../API/tournamentAPI';

type Props = {
    onAddTournament: (tournament: Tournament) => void;
};




const TournamentForm: React.FC<Props> = ({ onAddTournament }) => {
    const [tournamentName, handleNameChange] = useState('');
    const [tournamentLocation, setTournamentLocation] = useState("");
    const [nationalAssociation, setNationalAssociation] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressZipCode, setAddressZipCode] = useState("");
    const [addressStreet, setAddressStreet] = useState("");
    const [addressStreetNumber, setAddressStreetNumber] = useState("");
    const [clubs, setClubs] = useState<Club[]>([]);
    const [periodFrom, setPeriodFrom] = useState<Date | null>(null);
    const [periodTo, setPeriodTo] = useState<Date | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [listKey, setListKey] = useState(Math.random());

    const handleSuccessPopup = (status: boolean) => {
        setShowSuccessPopup(status);
        if (status) {
            setTimeout(() => {
                setShowSuccessPopup(false);
            }, 3000);
            setListKey(Math.random());
        }
    };

    useEffect(() => {
        fetchClubs();
    }, []);

    const fetchClubs = async () => {
        try {
            const clubsData = await getClubs();
            setClubs(clubsData);
        } catch (error) {
            console.error('Error loading clubs:', error);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");

        if (!periodFrom || !periodTo) {
            setErrorMessage("Bitte Datum eingeben.");
            setLoading(false);
            return;
        }

        const tournament: Tournament = {
            id: 0,
            name: tournamentName,
            address: {
                id: 0,
                street: addressStreet,
                housenumber: addressStreetNumber,
                city: addressCity,
                state: "",
                postalcode: addressZipCode,
            },
            stateassociation:'',
            ageclass: {
                id: 0,
                name: "",  // You need to set the correct value here
                lowerAge: 0,  // You need to set the correct value here
                upperAge: 0,  // You need to set the correct value here
            },
            weightclass: {
                id: 0,
                name: "",  // You need to set the correct value here
                upperBoundary: 0,  // You need to set the correct value here
                lowerBoundary: 0,  // You need to set the correct value here
            },
            code: "",  // You need to set the correct value here
            location: tournamentLocation, // You need to set the correct location here
            startdate: periodFrom.toISOString(),
            enddate: periodTo.toISOString(),
            fighters: [],  // You need to set the correct fighters here
            fights: [],  // You need to set the correct fights here
        };




        try {
            // Senden Sie den Antrag an Ihr Backend
            await postTournament(tournament);
            onAddTournament(tournament);
            setLoading(false);
            console.log('Turnier erfolgreich eingereicht');
        } catch (error) {
            setErrorMessage("(DB-Error) Fehler beim Anlegen!");
            setLoading(false);
        }
    };



    return (
        <form onSubmit={handleSubmit} className="formContaineTournament">
            <h1 className="titleStyle">Neues Turnier anlegen</h1>
            <div>
                <div className="inputContainer">
                    <label className="inputLabel" htmlFor="tournamentName">Turniername</label>
                    <input className="inputField" type="text" id="tournamentName" value={tournamentName} onChange={(event) => handleNameChange(event.target.value)} required />
                </div>
                <div className="inputContainer">
                    <label className="inputLabel" htmlFor="tournamentLocation">Veranstaltungsort</label>
                    <input className="inputField" type="text" id="tournamenLocation" value={tournamentLocation} onChange={e => setTournamentLocation(e.target.value)} required />
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
            <div className="halfWidthWrapperAddress">
                <div className="inputContainer halfWidth">
                    <input className="inputFieldWide" type="text" id="addressStreet" value={addressStreet} onChange={e => setAddressStreet((e.target.value))} placeholder="Straße" required />
                </div>
                <div className="inputContainer halfWidth">
                    <input className="inputFieldSmall" type="text" id="addressStreetNumber" value={addressStreetNumber} onChange={e => setAddressStreetNumber((e.target.value))} placeholder="Nummer" required />
                </div>
            </div>
            <div className="inputContainer">
                <label className="inputLabel" htmlFor="nationalAssociation">Verein</label>
                <div className="selectContainer">
                    <select
                        className="selectField"
                        id="nationalAssociation"
                        value={nationalAssociation}
                        onChange={e => setNationalAssociation(e.target.value)}
                        required
                    >
                        <option value=""></option>
                        {clubs.map(club => (
                            <option key={club.id} value={club.name}>{club.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="halfWidthWrapper">
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
            <button className="addButton" type="submit" disabled={loading}>
        {loading ? "Laden..." : "Hinzufügen"}
      </button>

      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

        </form>
    );
};

export default TournamentForm;