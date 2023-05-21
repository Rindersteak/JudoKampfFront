import React from 'react'; // React importieren
import FighterForm from '../FighterForm/FighterForm'; // Importieren der FighterForm-Komponente aus einer anderen Datei
import FighterList from '../FighterList/FighterList'; // Importieren der FighterList-Komponente aus einer anderen Datei
import { Fighter } from '../../types'; // Importieren des Fighter-Typs aus einer externen Datei

import './FighterManager.css'; // Importieren von Styling für FighterManager

const FighterManager: React.FC = () => {
    const [fighters, setFighters] = React.useState<Fighter[]>([]);

    const addFighter = (fighter: Fighter) => {
        setFighters([fighter, ...fighters]);
    };

    return (
        <div className="innerContainer">
            <div className="formContainer">
                <FighterForm onAddFighter={addFighter} />
            </div>
            <div className="listSection">
                <h1 className="titleStyleList">Teilnehmerliste</h1>
                <div className="listContainer">
                    <FighterList fighters={fighters} />
                </div>
            </div>
        </div>
    );
};


export default FighterManager; // Export der FighterManager-Komponente als Standardexport
