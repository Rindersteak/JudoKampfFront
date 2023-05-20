import React from 'react'; // React importieren
import { Fighter } from '../../types'; // Importieren des Fighter-Typs aus einer externen Datei
import './FighterEntry.css'; // Importieren von Styling für FighterEntry

type Props = {
    fighter: Fighter; // Props-Typ definieren, der einen Kämpfer erwartet
};

const FighterEntry: React.FC<Props> = ({ fighter }) => { // Deklaration der FighterEntry-Komponente als Funktionskomponente
    return (
        <div className="participantEntry"> {/* Div-Container mit der Klasse "participantEntry" */}
            <span className="name">{fighter.firstName} {fighter.lastName}</span> {/* Anzeige des Vor- und Nachnamens des Kämpfers */}
            <span className="club">{fighter.club}</span> {/* Anzeige des Clubs des Kämpfers */}
        </div>
    );
};

export default FighterEntry; // Export der FighterEntry-Komponente als Standardexport
