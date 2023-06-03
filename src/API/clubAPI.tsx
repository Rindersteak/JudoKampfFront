import { Club } from '../types';
import { API_DOMAIN } from '../Config/apiConfig';

export async function postClub(club: Club) {
  try {
    const response = await fetch(`${API_DOMAIN}/clubs/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(club)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Erfolg: Rückgabe der Antwort als JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred while submitting the club:', error);
    throw error; // Fehler weiterwerfen, um ihn in der ClubForm-Komponente behandeln zu können
  }
}

export async function getClubs() {
  try {
    const response = await fetch(`${API_DOMAIN}/clubs/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading backend clubs:', error);
    throw error; // Fehler weiterwerfen, um ihn in der ClubList-Komponente behandeln zu können
  }
}

export async function deleteClub(clubId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/clubs/${clubId}/delete`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('An error occurred while deleting the club:', error);
    throw error;
  }
}

export async function putClub(club: Club) {
  try {
    const response = await fetch(`${API_DOMAIN}/clubs/${club.id}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(club),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred while updating the club:', error);
    throw error;
  }
}

export function getTotalClubs(clubs: Club[]): number {
    const uniqueClubIds = new Set<number>();
    clubs.forEach((club) => {
      if (club.id) {
        uniqueClubIds.add(club.id);
      }
    });
    return uniqueClubIds.size;
  }
  