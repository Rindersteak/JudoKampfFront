import React, { useState } from 'react'; // React und useState importieren
import { Fighter } from '../../types'; // Importieren des Fighter-Typs aus einer externen Datei
import './FighterForm.css'; // Importieren von Styling für FighterForm

type Props = {
    onAddFighter: (fighter: Fighter) => void; // Props-Typ definieren, der eine Funktion onAddFighter erwartet, die einen Kämpfer entgegennimmt und nichts zurückgibt
};

const FighterForm: React.FC<Props> = ({ onAddFighter }) => { // Deklaration der FighterForm-Komponente als Funktionskomponente
    const [firstName, setFirstName] = useState(""); // State-Hook für den Vornamen des Kämpfers
    const [lastName, setLastName] = useState(""); // State-Hook für den Nachnamen des Kämpfers
    const [club, setClub] = useState(""); // State-Hook für den Club des Kämpfers
    const [regionalAssociation, setRegionalAssociation] = useState(""); // State-Hook für den Landesverband des Kämpfers
    const [birthDate, setBirthDate] = useState(""); // State-Hook für das Geburtsdatum des Kämpfers
    const [weight, setWeight] = useState(0); // State-Hook für das Gewicht des Kämpfers

    const handleSubmit = (e: React.FormEvent) => { // Funktion zum Behandeln des Formularabsendens
        e.preventDefault();
        onAddFighter({ firstName, lastName, club, regionalAssociation, birthDate, weight }); // Aufruf der onAddFighter-Funktion aus den Props und Übergabe der Kämpferdaten
    }

    return (
        <form onSubmit={handleSubmit} className="formContainer"> {/* Formular-Container mit der Klasse "formContainer" */}
            <h1 className="titleStyle">Neuen Teilnehmer hinzufügen</h1> {/* Überschrift für das Formular */}
            <div>
                <div className="inputContainer"> {/* Container für den Vornamen-Eingabebereich */}
                    <label className="inputLabel" htmlFor="firstName">Vorname</label> {/* Label für den Vornamen */}
                    <input className="inputField" type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required /> {/* Eingabefeld für den Vornamen, das den firstName-Status aktualisiert */}
                </div>
                <div className="inputContainer"> {/* Container für den Nachnamen-Eingabebereich */}
                    <label className="inputLabel" htmlFor="lastName">Nachname</label> {/* Label für den Nachnamen */}
                    <input className="inputField" type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required /> {/* Eingabefeld für den Nachnamen, das den lastName-Status aktualisiert */}
                </div>
            </div>
            <div>
                <div className="inputContainer"> {/* Container für den Vereins-Eingabebereich */}
                    <label className="inputLabel" htmlFor="club">Verein</label> {/* Label für den Verein */}
                    <input className="inputField" type="text" id="club" value={club} onChange={e => setClub(e.target.value)} required /> {/* Eingabefeld für den Verein, das den club-Status aktualisiert */}
                </div>
                <div className="inputContainer"> {/* Container für den Landesverband-Auswahlbereich */}
                    <label className="inputLabel" htmlFor="regionalAssociation">Landesverband</label> {/* Label für den Landesverband */}
                    <div className="selectContainer"> {/* Container für die Auswahlliste */}
                        <select className="selectField" id="regionalAssociation" value={regionalAssociation} onChange={e => setRegionalAssociation(e.target.value)} required> {/* Auswahlliste für den Landesverband, die den regionalAssociation-Status aktualisiert */}
                            <option value=""></option> {/* Standardoption */}
                            <option value="Landesverband A">Landesverband A</option> {/* Option für Landesverband A */}
                            <option value="Landesverband B">Landesverband B</option> {/* Option für Landesverband B */}
                        </select>
                    </div>
                </div>
            </div>
            <div className="halfWidthWrapper"> {/* Wrapper für den Geburtsdatum- und Gewichtsbereich */}
                <div className="inputContainer halfWidth"> {/* Container für das Geburtsdatum */}
                    <label className="inputLabel" htmlFor="birthDate">Geburtsdatum</label> {/* Label für das Geburtsdatum */}
                    <input className="inputField" type="string" id="birthDate" value={birthDate} onChange={e => setBirthDate(e.target.value)} required /> {/* Eingabefeld für das Geburtsdatum, das den birthDate-Status aktualisiert */}
                </div>
                <div className="inputContainer halfWidth"> {/* Container für das Gewicht */}
                    <label className="inputLabel" htmlFor="weight">Gewicht</label> {/* Label für das Gewicht */}
                    <input className="inputField" type="string" id="weight" value={weight} onChange={e => setWeight(parseFloat(e.target.value))} required /> {/* Eingabefeld für das Gewicht, das den weight-Status aktualisiert */}
                </div>
            </div>
            <button className="addButton" type="submit">Hinzufügen</button> {/* Submit-Button zum Hinzufügen des Teilnehmers */}
        </form>
    );
};


export default FighterForm; // Export der FighterForm-Komponente als Standardexport
