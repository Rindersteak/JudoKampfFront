import { Tournament } from '../types';
import { API_DOMAIN } from './apiConfig';

export async function postTournament(tournament: Tournament) {
    try {
        const response = await fetch(`${API_DOMAIN}/tournaments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tournament)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Erfolg: Rückgabe der Antwort als JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('An error occurred while submitting the tournament:', error);
        throw error; // Fehler weiterwerfen, um ihn in der TournamentForm-Komponente behandeln zu können
    }
}

export async function getTournaments() {
    try {
        const response = await fetch(`${API_DOMAIN}/tournaments/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading backend tournaments:', error);
        throw error; // Fehler weiterwerfen, um ihn in der TournamentList-Komponente behandeln zu können
    }
}

export async function getTotalTournaments() {
    try {
        const response = await fetch(`${API_DOMAIN}/tournaments/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.length;
    } catch (error) {
        console.error('Error loading backend tournaments:', error);
        throw error; // Fehler weiterwerfen, um ihn in der TournamentList-Komponente behandeln zu können
    }
}
