import { Fighter } from "../types";
import { API_DOMAIN } from "../Config/apiConfig";

export async function postFighter(fighter: Fighter) {
  try {
    const response = await fetch(`${API_DOMAIN}/fighters/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fighter),
    });
    console.log(JSON.stringify(fighter));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Erfolg: Rückgabe der Antwort als JSON
    const data = await response.json();

    // Tournament ID Kram aus Swagger handlen

    return data;
  } catch (error) {
    console.error("An error occurred while submitting the fighter:", error);
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
    console.error("Error loading backend fighters:", error);
    throw error; // Fehler weiterwerfen, um ihn in der FighterList-Komponente behandeln zu können
  }
}

// Participant muss zu Fighter umbenannt werden
export function getTotalParticipants(fighters: Fighter[]) {
  return fighters.length;
}

export async function deleteFighter(fighterId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fighters/${fighterId}/delete`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("An error occurred while deleting the fighter:", error);
    throw error;
  }
}

export async function putFighter(fighter: Fighter) {
  try {
    const response = await fetch(
      `${API_DOMAIN}/fighters/${fighter.id}/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fighter),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while updating the fighter:", error);
    throw error;
  }
}

// HTTP Weight
export async function setFighterWeightDirect(fighterId: number, weight: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fighters/${fighterId}/set-weight/${weight}`, {
      method: "PATCH"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error setting weight for fighter ${fighterId}:`, error);
    throw error;
  }
}

export async function setFighterWeight(fighterId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fighters/${fighterId}/set-weight`, {
      method: "PATCH"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error clearing weight for fighter ${fighterId}:`, error);
    throw error;
  }
}