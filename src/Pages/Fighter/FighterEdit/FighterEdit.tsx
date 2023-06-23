import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Fighter } from "../../../types";
import { putFighter, deleteFighter } from "../../../API/fighterAPI";
import Select from "react-select";
import "../../../Styles/GlobalStyles.scss";
import "./FighterEdit.scss";
import { getClubs } from "../../../API/clubAPI";

interface FighterEditProps {
  fighter: Fighter;
  onUpdateFighter: (fighter: Fighter) => void;
  onDeleteFighter: (fighterId: number) => void;
}

type OptionType = {
  value: string;
  label: string;
};

const FighterEdit: React.FC<FighterEditProps> = ({
  fighter,
  onUpdateFighter,
  onDeleteFighter,
}) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [birthdate, setBirthDate] = useState<Date | null>(null);
  const [weight, setWeight] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState<OptionType | null>(null);
  const [club, setClub] = useState<OptionType | null>(null);
  const [clubOptions, setClubOptions] = useState<OptionType[]>([]);


  const genderOptions = [
    { value: "m", label: "Männlich" },
    { value: "f", label: "Weiblich" },
  ];
  

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

    const birthdateAsString = birthdate.toISOString();

    const updatedFighter = {
      ...fighter,
      firstname,
      lastname,
      club: {
        ...fighter.club,
        name: club?.value || "",
      },
      birthdate: birthdateAsString,
      weight,
      sex: gender?.value || "",
    };

    try {
      await putFighter(updatedFighter);
      onUpdateFighter(updatedFighter);
      setLoading(false);
    } catch (error) {
      setErrorMessage("(DB-Error) Fehler beim Bearbeiten!");
      setLoading(false);
    }
  };

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

  // initialisiert den Zustand der Komponente mit den Daten des übergebenen Fighter
  useEffect(() => {
    setFirstName(fighter.firstname);
    setLastName(fighter.lastname);
    setBirthDate(new Date(fighter.birthdate));
    setWeight(fighter.weight || 0);
    setGender(
      genderOptions.find((option) => option.value === fighter.sex) || null
    );
    setClub(
      clubOptions.find((option) => option.value === fighter.club) || null
    );
  }, [fighter]);
  

  const handleDelete = async () => {
    try {
      await deleteFighter(fighter.id);
      onDeleteFighter(fighter.id);
    } catch (error) {
      setErrorMessage("(DB-Error) Fehler beim Löschen!");
    }
  };

  const handleClubChange = (newValue: OptionType | null) => {
    setClub(newValue);
  };

  const handleGenderChange = (newValue: OptionType | null) => {
    setGender(newValue);
  };

  return (
    <div className="fighterEditMain">
      <form className="formContainer formWidthFighterEdit" onSubmit={handleSubmit}>
        <h1 className="titleStyle">Teilnehmer bearbeiten</h1>

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
            Verein
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
        <div className="inputContainer marginTopWeightFighterEdit">
          <label className="inputLabel" htmlFor="weight">
            Gewicht
          </label>
          <input
            className="inputField"
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            required
          />
            </div>
        </div>

        <div className="buttonSectionFighterEdit">
          <button className="blueButton" type="submit" disabled={loading}>
            {loading ? "Laden..." : "Aktualisieren"}
          </button>

          <button className="redButton" type="button" onClick={handleDelete}>
            Teilnehmer Löschen
          </button>
        </div>

        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default FighterEdit;