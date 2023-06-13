import { ChangeEvent, FormEvent, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Club } from "../../../types";
import { postClub } from "../../../API/clubAPI";
import "./ClubForm.scss";
import stateassociationOptions from "../../../Config/StateAssociations";
import "../../../Styles/GlobalStyles.scss";

type ClubFormProps = {
  onAddClub: (club: Club) => void;
  onShowSuccessPopup: (status: boolean) => void;
};

type OptionType = {
  value: string;
  label: string;
};

const ClubForm: React.FC<ClubFormProps> = ({
  onAddClub,
  onShowSuccessPopup,
}) => {
  const [shortname, setShortName] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressZipCode, setAddressZipCode] = useState("");
  const [clubName, setClubName] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressStreetNumber, setAddressStreetNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [stateassociation, setStateAssociation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
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

    const club: Club = {
      id: 0,
      shortname: shortname,
      name: clubName,
      address: {
        id: 0,
        street: addressStreet,
        housenumber: addressStreetNumber,
        city: addressCity,
        state: "string",
        postalcode: addressZipCode,
      },
      stateassociation: stateassociation,
    };

    try {
      await postClub(club);
      onAddClub(club);
      onShowSuccessPopup(true);
      setLoading(false);
    } catch (error) {
      setErrorMessage("(DB-Error) Fehler beim Anlegen!");
      setLoading(false);
    }
  };

  const handleStateAssociationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStateAssociation(e.target.value);
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <h1 className="titleStyle">Neuen Verein anlegen</h1>

      <div className="inputContainer">
        <label className="inputLabel" htmlFor="tournamentName">
          Vereinsname
        </label>
        <input
          className="inputField"
          type="text"
          id="tournamentName"
          value={clubName}
          onChange={(event) => setClubName(event.target.value)}
          required
        />
      </div>

      <div className="inputContainer">
        <label className="inputLabel" htmlFor="stateassociation">
          Landesverband
        </label>
        <div className="inputContainerSelect">
          <select
            id="stateassociation"
            value={stateassociation || ""}
            onChange={handleStateAssociationChange}
            required
            className="selectField"
          >
            <option value=""></option>
            {stateassociationOptions.map((option: OptionType) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <label className="inputLabel" htmlFor="address">
        Adresse
      </label>
      <div className="inputContainerAdressesTop">
        <div>
          <input
            className="inputField"
            type="text"
            id="addressCity"
            value={addressCity}
            onChange={(e) => setAddressCity(e.target.value)}
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
            onChange={(e) => setAddressZipCode(e.target.value)}
            placeholder="PLZ"
            required
          />
        </div>
      </div>

      <div className="inputContainerAdressesBottom">
        <div>
          <input
            className="inputField"
            type="text"
            id="addressStreet"
            value={addressStreet}
            onChange={(e) => setAddressStreet(e.target.value)}
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
            onChange={(e) => setAddressStreetNumber(e.target.value)}
            placeholder="Nummer"
            required
          />
        </div>
      </div>

      <div className="buttonSection">
        <button className="blueButton" type="submit" disabled={loading}>
          {loading ? "Laden..." : "Hinzufügen"}
        </button>
      </div>

      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </form>
  );
};

export default ClubForm;
