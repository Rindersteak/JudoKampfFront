import React from 'react'; // React importieren
import FighterEntry from '../FighterEntry/FighterEntry'; // Importieren der FighterEntry-Komponente aus einer anderen Datei
import { Fighter } from '../../types'; // Importieren des Fighter-Typs aus einer externen Datei
import './FighterList.css'; // Importieren von Styling für FighterList

type Props = {
    fighters: Fighter[]; // Props-Typ definieren, der ein Array von Kämpfern erwartet
};

const FighterList: React.FC<Props> = ({ fighters }) => { // Deklaration der FighterList-Komponente als Funktionskomponente
    return (
        <div className="listContainer"> {/* Div-Container mit der Klasse "listContainer" */}
            <h2 className="titleStyle">Teilnehmerliste</h2> {/* Überschrift für die Teilnehmerliste */}
            <div className="entryList"> {/* Div-Container für die Einträge */}
                <div className="entryStyle headerStyle"> {/* Div-Container für die Überschriftszeile */}
                    <span className="nameStyle">Name</span> {/* Spalte für den Namen */}
                    <span className="clubStyle">Verein</span> {/* Spalte für den Verein */}
                </div>
                {fighters.map((fighter, index) => ( // Iteration über die Kämpfer im Array und Rendern von FighterEntry-Komponenten für jeden Kämpfer
                    <FighterEntry key={index} fighter={fighter} /> // FighterEntry-Komponente mit dem Kämpfer als Prop
                ))}
                {/* Testeinträge */}
                {Array.from({ length: 10 }).map((_, index) => ( // Erstellen von 10 Testeinträgen
                    <FighterEntry key={`test-${index}`} fighter={{ firstName: 'Vorname', lastName: 'Nachname', club: 'Beispielverein', regionalAssociation: '', birthDate: '2023-05-17', weight: 0 }} /> // FighterEntry-Komponente mit festen Werten als Prop
                ))}
            </div>
        </div>
    );
};

export default FighterList; // Export der FighterList-Komponente als Standardexport
