import React from 'react'; // React importieren
import FighterForm from '../FighterForm/FighterForm'; // Importieren der FighterForm-Komponente aus einer anderen Datei
import FighterList from '../FighterList/FighterList'; // Importieren der FighterList-Komponente aus einer anderen Datei
import { Fighter } from '../../types'; // Importieren des Fighter-Typs aus einer externen Datei

import './FighterManager.css'; // Importieren von Styling für FighterManager

const FighterManager: React.FC = () => { // Deklaration der FighterManager-Komponente als Funktionskomponente
    const [fighters, setFighters] = React.useState<Fighter[]>([]); // Verwaltung des Zustands der Kämpfer mit dem useState-Hook

    const addFighter = (fighter: Fighter) => { // Funktion zum Hinzufügen eines Kämpfers
        setFighters([fighter, ...fighters]); // Hinzufügen des neuen Kämpfers zum Array der Kämpfer im Zustand
    };

    return (
        <div className="innerContainer"> {/* Div-Container mit der Klasse "innerContainer" */}
            <div className="formContainer"> {/* Div-Container für das Formular */}
                <FighterForm onAddFighter={addFighter} /> {/* FighterForm-Komponente mit der onAddFighter-Funktion als Prop */}
            </div>
            <div className="listContainer"> {/* Div-Container für die Teilnehmerliste */}
                <FighterList fighters={fighters} /> {/* FighterList-Komponente mit den Kämpfern im Zustand als Prop */}
            </div>
        </div>
    );
};

export default FighterManager; // Export der FighterManager-Komponente als Standardexport
