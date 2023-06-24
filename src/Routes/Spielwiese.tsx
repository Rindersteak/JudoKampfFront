import React, { useState } from "react";
import logo from "../img/kodokan_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import "./Spielwiese.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type MenuOption = "menuRulesAdults" | "menuRulesTeenagers" | "menuClasses";

const Spielwiese = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuOption | null>(null);
    const [birthdate, setBirthDate] = useState<Date | null>(null);

    return (
    <div className="mainContainerFighterDetails">

        <div className="fightGroupContainer">
            <h1 className="titleStyleList">
                Kampfgruppe
            </h1>

            <div className="inputContainer">
                <label className="inputLabel">
                    Geschlecht
                </label>
                <input
                    className="inputField"
                    type="text"
                    readOnly
                    required
                />
            </div>

            <div className="inputContainer">
                <label className="inputLabel">
                    Jugend/Erwachsene
                </label>
                <input
                    className="inputField"
                    type="text"
                    readOnly
                    required
                />
            </div>

            <div className="inputContainer">
                <label className="inputLabel">
                    Gwichtsklasse
                </label>
                <input
                    className="inputField"
                    type="text"
                    readOnly
                    required
                />
            </div>

            <div className="inputContainer">
                <label className="inputLabel">
                    Altersklasse
                </label>
                <input
                    className="inputField"
                    type="text"
                    readOnly
                    required
                />
            </div>

            <div className="inputContainer">
                <label className="inputLabel">
                    Kampf-ID
                </label>
                <input
                    className="inputField"
                    type="text"
                    readOnly
                    required
                />
            </div>

        </div>

        <div className="fighterOneContainer">
            <h1 className="titleStyleList">
                Kämpfer 1
            </h1>
            <div className="inputContainer">
                <label className="inputLabel" htmlFor="firstName">
                    Vorname
                </label>
                <input
                    className="inputField"
                    type="text"
                    readOnly
                    required
                />
            </div>

            <div className="inputContainer">
                <label className="inputLabel">
                    Nachname
                </label>
                <input
                    className="inputField"
                    type="text"
                    readOnly
                    required
                />
            </div>

            <div className="inputContainer">
                <label className="inputLabel">
                    Verein
                </label>
                <input
                    className="inputField"
                    type="text"
                    readOnly
                    required
                />
            </div>

            <div className="inputContainer">
                <label className="inputLabel">
                    Landesverband
                </label>
                <input
                    className="inputField"
                    type="text"
                    readOnly
                    required
                />
            </div>

            <div className="inputContainer">
                <label className="inputLabel" htmlFor="birthDate">
                    Geburtsdatum
                </label>
                <DatePicker
                    id="birthDate"
                    dateFormat="dd.MM.yyyy"
                    onChange={(date: Date | null) => setBirthDate(date)}
                    readOnly
                    required
                />
                <div className="inputContainer marginTopWeightFighterEdit">
                    <label className="inputLabel">
                        Gewicht (in Kg)
                    </label>
                    <input
                        className="inputField"
                        type="number"
                        required
                    />
                </div>
            </div>


        </div>

        <div className="fighterTwoContainer">
            <h1 className="titleStyleList">
                Kämpfer 2
            </h1>

            <div className="inputContainer">
                <label className="inputLabel" htmlFor="firstName">
                    Vorname
                </label>
                <input
                    className="inputField"
                    type="text"
                    readOnly
                    required
                />
            </div>

            <div className="inputContainer">
                <label className="inputLabel">
                    Nachname
                </label>
                <input
                    className="inputField"
                    type="text"
                    readOnly
                    required
                />
            </div>

            <div className="inputContainer">
                <label className="inputLabel">
                    Verein
                </label>
                <input
                    className="inputField"
                    type="text"
                    readOnly
                    required
                />
            </div>

            <div className="inputContainer">
                <label className="inputLabel">
                    Landesverband
                </label>
                <input
                    className="inputField"
                    type="text"
                    readOnly
                    required
                />
            </div>

            <div className="inputContainer">
                <label className="inputLabel" htmlFor="birthDate">
                    Geburtsdatum
                </label>
                <DatePicker
                    id="birthDate"
                    dateFormat="dd.MM.yyyy"
                    onChange={(date: Date | null) => setBirthDate(date)}
                    readOnly
                    required
                />
                <div className="inputContainer marginTopWeightFighterEdit">
                    <label className="inputLabel">
                        Gewicht (in Kg)
                    </label>
                    <input
                        className="inputField"
                        type="number"
                        required
                    />
                </div>
            </div>
        </div>
        <div className="buttonContainer">
            <button className="blueButton blueButtonWidth">
                Kampf starten
            </button>

        </div>
    </div>

  );
};

export default Spielwiese;
