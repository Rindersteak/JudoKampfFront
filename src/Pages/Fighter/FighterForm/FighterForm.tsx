import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FighterAdd } from "../../../types";
import { postFighter } from "../../../API/fighterAPI";
import { getClubs } from "../../../API/clubAPI";
import { postTournamentFighter } from "../../../API/tournamentAPI";
import "./FighterForm.scss";
import "../../../Styles/GlobalStyles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faCirclePlus,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import ClubManager from "../../Club/ClubManager/ClubManager";
import Modal from "../../../Tools/Modal/Modal";

type Props = {
  tournamentId: string;
  onShowSuccessPopup: (status: boolean) => void;
};

type OptionType = {
  value: string;
  label: string;
};

const FighterForm: React.FC<Props> = ({ tournamentId, onShowSuccessPopup }) => {
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
  const [showClubManager, setShowClubManager] = useState(false);

  const genderOptions: OptionType[] = [
    { value: "m", label: "Männlich" },
    { value: "f", label: "Weiblich" },
  ];

  useEffect(() => {
    async function fetchClubs() {
      try {
        const clubs = await getClubs();
        const clubOptions = clubs.map((club: any) => ({
          value: club.id.toString(),
          label: club.name,
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

  const handleOpenClubManager = () => {
    setShowClubManager(true);
  };

  const handeCloseClubManager = () => {
    setShowClubManager(false);
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
      sex: gender?.value || "",
      firstname: firstname,
      lastname: lastname,
      birthdate: birthdateAsString,
      club: {
        id: club?.value ? parseInt(club.value) : 0,
      },
    };

    try {
      console.log(tournamentId);
      await postTournamentFighter(Number(tournamentId), fighter);
      onShowSuccessPopup(true);
      setLoading(false);
      console.log("Tournament ID:", tournamentId);
    } catch (error) {
      setErrorMessage("(DB-Error) Fehler beim Anlegen!");
      console.log("Tournament FormID:", tournamentId);
      setLoading(false);
    }
  };

  return (
    <form
      className="formContainer formWidthFighterForm"
      onSubmit={handleSubmit}
    >
      <h1 className="titleStyle">Neuen Teilnehmer hinzufügen</h1>
      <div className="inputContainer">
        <label className="inputLabel" htmlFor="firstName">
          Vorname
        </label>
        <input
          className="inputField"
          type="text"
          id="firstName"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="inputContainer">
        <label className="inputLabel" htmlFor="lastName">
          Nachname
        </label>
        <input
          className="inputField"
          type="text"
          id="lastName"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      <div className="inputContainer">
        <label className="inputLabel" htmlFor="gender">
          Geschlecht
        </label>
        <div className="inputContainerSelect">
          <select
            id="gender"
            value={gender ? gender.value : ""}
            onChange={(e) => {
              const selectedOption = genderOptions.find(
                (option) => option.value === e.target.value
              );
              handleGenderChange(selectedOption || null);
            }}
            required
            className="selectField"
          >
            <option value=""></option>
            {genderOptions.map((option: OptionType) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="inputContainer">
        <label className="inputLabel" htmlFor="club">
          Verein{" "}
          <FontAwesomeIcon
            className="clubPlusIcon"
            icon={faCirclePlus}
            onClick={handleOpenClubManager}
          />
        </label>
        <div className="inputContainerSelect">
          <select
            id="club"
            value={club ? club.value : ""}
            onChange={(e) => {
              const selectedOption = clubOptions.find(
                (option) => option.value === e.target.value
              );
              handleClubChange(selectedOption || null);
            }}
            required
            className="selectField"
          >
            <option value=""></option>
            {clubOptions.map((option: OptionType) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="inputContainer">
        <label className="inputLabel" htmlFor="birthDate">
          Geburtsdatum
        </label>
        <DatePicker
          id="birthDate"
          selected={birthdate}
          onChange={(date: Date | null) => setBirthDate(date)}
          dateFormat="dd.MM.yyyy"
          required
        />
      </div>
      {/* <div className="inputContainer">
          <label className="inputLabel" htmlFor="weight">Gewicht</label>
          <input className="inputField" type="number" id="weight" value={weight} onChange={e => setWeight(parseFloat(e.target.value))} required />
        </div> */}

      <div className="buttonSection">
        <button className="blueButton" type="submit" disabled={loading}>
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spin={true} />
          ) : (
            "Hinzufügen"
          )}
        </button>
      </div>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {showClubManager && (
        <Modal size="large" onClose={handeCloseClubManager}>
          <ClubManager />
        </Modal>
      )}
    </form>
  );
};

export default FighterForm;
