import { Fightgroup, Fighter } from "../types";
import { API_DOMAIN } from "../Config/apiConfig";

export async function getFightList(fightgroupId: number) {
  // Typ des Parameters hinzugefügt
  try {
    const response = await fetch(
      `${API_DOMAIN}/fightgroups/${fightgroupId}/fightlist`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Fightgroup;
  } catch (error) {
    console.error("Error loading fight list:", error);
    throw error;
  }
}

export async function getFightersList(fightgroupId: number) {
  try {
    const response = await fetch(
      `${API_DOMAIN}/fightgroups/${fightgroupId}/fighterslist`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Fighter[]; // Aktualisiere den Rückgabewert als Fighter-Array
  } catch (error) {
    console.error("Error loading fighters list:", error);
    throw error;
  }
}

export async function getWinner(fightId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fights/${fightId}/get-winner`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Fighter; // Aktualisiere den Rückgabewert als Fighter
  } catch (error) {
    console.error("Error loading winner:", error);
    throw error;
  }
}
