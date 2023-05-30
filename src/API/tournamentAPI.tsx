import { Tournament } from '../types';
import { Fighter } from '../types';
import { API_DOMAIN } from '../Config/apiConfig';

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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred while submitting the tournament:', error);
    throw error;
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
    throw error;
  }
}

export async function deleteTournament(tournamentId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/tournaments/delete/${tournamentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('An error occurred while deleting the tournament:', error);
    throw error;
  }
}

export async function putTournament(tournament: Tournament) {
  try {
    const response = await fetch(`${API_DOMAIN}/tournaments/update/${tournament.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tournament),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred while updating the tournament:', error);
    throw error;
  }
}

export function getTotalTournaments(tournaments: Tournament[]): number {
    const uniqueTournamentIds = new Set<number>();
    tournaments.forEach((tournament) => {
      if (tournament.id) {
        uniqueTournamentIds.add(tournament.id);
      }
    });
    return uniqueTournamentIds.size;
}

  
 // Fighter in Tournament (nach ID) anlegen

  export async function postTournamentFighter(tournamentId: number, fighter: Fighter) {
    try {
        const response = await fetch(`${API_DOMAIN}/tournaments/${tournamentId}/add-fighter`, {
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
