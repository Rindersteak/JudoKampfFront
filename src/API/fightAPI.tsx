import { Fightgroup, Fighter, Fight } from "../types";
import { API_DOMAIN } from "../Config/apiConfig";

export async function getFightList(fightgroupId: number): Promise<Fight[]> {
  try {
    const response = await fetch(
      `${API_DOMAIN}/fightgroups/${fightgroupId}/fightlist`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Fight[];
  } catch (error) {
    console.error("Error loading fight list:", error);
    throw error;
  }
}

export async function getFight() {
  try {
    const response = await fetch(`${API_DOMAIN}/fights/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data as Fight;
  } catch (error) {
    console.error('Error loading fight:', error);
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

export async function getFightById(fightId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fights/${fightId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Fight;
  } catch (error) {
    console.error('Error loading fight:', error);
    throw error;
  }
}

export async function updateTimerDuration(timer: number, fightId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fights/${fightId}/fight-duration/${timer}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Fight;
  } catch (error) {
    console.error('Error loading fight:', error);
    throw error;
  }
}

export async function updatePoints(fightId: number, operator:string, color:string,  category:string, points?:number): Promise<Fight> {
  try {

    let response = null;
    if(category === "wazaari" || category === "foul"){
      response =  await fetch(`${API_DOMAIN}/fights/${fightId}/${operator}-${color}-${category}/${points}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }else{
      response =  await fetch(`${API_DOMAIN}/fights/${fightId}/${operator}-${color}-${category}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Fight;
  } catch (error) {
    console.error("Error updating fight:", error);
    throw error;
  }
}
