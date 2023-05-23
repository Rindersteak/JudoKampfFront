import { Fighter } from '../types';
import { API_DOMAIN } from './apiConfig';

export async function postFighter(fighter: Fighter) {
    try {
        const response = await fetch(`${API_DOMAIN}/fighters/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fighter)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Erfolg: Rückgabe der Antwort als JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('An error occurred while submitting the fighter:', error);
        throw error; // Fehler weiterwerfen, um ihn in der FighterForm-Komponente behandeln zu können
    }
}

export async function getFighters() {
    try {
        const response = await fetch(`${API_DOMAIN}/fighters/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading backend fighters:', error);
        throw error; // Fehler weiterwerfen, um ihn in der FighterList-Komponente behandeln zu können
    }
}

export function getTotalParticipants(fighters: Fighter[]) {
    return fighters.length;
}
