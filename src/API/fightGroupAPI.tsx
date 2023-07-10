import { Fightgroup, Fightpool } from "../types";
import { API_DOMAIN } from "../Config/apiConfig";
import { Fighter } from "../types";

export async function getFightgroups() {
  try {
    const response = await fetch(`${API_DOMAIN}/fightgroups/`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Fightgroup[];
  } catch (error) {
    console.error("Error loading fightgroups:", error);
    throw error;
  }
}

export async function deleteFightGroup(fightgroupId: number) {
  try {
    const response = await fetch(
      `${API_DOMAIN}/fightgroups/delete/${fightgroupId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("An error occurred while deleting the fightgroup:", error);
    throw error;
  }
}

export async function getFightgroupsByTournamentId(tournamentId: number) {
  try {
    const response = await fetch(
      `${API_DOMAIN}/fightgroups/get-by-tournamentid/${tournamentId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Fightgroup[]; // Aktualisiere den Rückgabewert als Fightgroup-Array
  } catch (error) {
    console.error("Error loading fightgroups by tournament ID:", error);
    throw error;
  }
}

export async function getFightgroup(fightgroupId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fightgroups/${fightgroupId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Fightgroup;
  } catch (error) {
    console.error("Error loading fightgroup:", error);
    throw error;
  }
}

export async function getFightersListByFightgroupId(fightgroupId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fightgroups/${fightgroupId}/fighterslist`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data as Fighter[];
  } catch (error) {
    console.error('Error loading fighters list by fightgroup ID:', error);
    throw error;
  }
}

export async function getFightpoolsByFightgroupId(fightgroupId: number): Promise<Fightpool[]> {
  try {
    const response = await fetch(`${API_DOMAIN}/fightgroups/${fightgroupId}/fightpools`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Fightpool[];
  } catch (error) {
    console.error('Error loading fightpools:', error);
    throw error;
  }
}

export async function createFightPools(fightgroupId: string): Promise<void> {
  try {
    const response = await fetch(`${API_DOMAIN}/fightgroups/${fightgroupId}/create-fightpools`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating fightpools:", error);
    throw error;
  }
}