import React, { useState } from "react";
import { setFighterWeightDirect } from "../../../API/fighterAPI";
import { Fighter } from "../../../types";
import "../../../Styles/GlobalStyles.scss";
import "./FighterAddWeight.scss";

interface FighterAddWeightProps {
    fighter: Fighter;
    onWeightAdded: () => void;
}

const FighterAddWeight: React.FC<FighterAddWeightProps> = ({ fighter, onWeightAdded }) => {
    const [weight, setWeight] = useState<number | "">("");

    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(event.target.value ? Number(event.target.value) : "");
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (weight !== "") {
            try {
                await setFighterWeightDirect(fighter.id, weight);
                onWeightAdded();
            } catch (error) {
                console.error("Failed to add weight:", error);
            }
        }
    };

    return (
        <div className="popupContainer">
            <h1 className={"titleStyle"}>Gewicht eintragen</h1>
            <form onSubmit={handleFormSubmit}>
                <div className={"inputContainer"}>
                <label className="inputLabel">
                    Gewicht (in kg)
                    <input type="number" value={weight} onChange={handleWeightChange} className="inputField"/>
                </label>
                </div>
                <div className="buttonSectionFighterAddWeight">
                    <button className="blueButton" type="submit">
                        Hinzufügen
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FighterAddWeight;
