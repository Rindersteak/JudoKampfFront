import { Fightpool, Fighter, Fight } from "../types";
import { API_DOMAIN } from "../Config/apiConfig";

export async function getFightPoolById(fightpoolId: number): Promise<Fightpool> {
    try {
        const response = await fetch(`${API_DOMAIN}/fightpools/${fightpoolId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data as Fightpool;
    } catch (error) {
        console.error('Error loading fightpool:', error);
        throw error;
    }
}

export async function getAllFightPools(): Promise<Fightpool[]> {
    try {
        const response = await fetch(`${API_DOMAIN}/fightpools/`);

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
