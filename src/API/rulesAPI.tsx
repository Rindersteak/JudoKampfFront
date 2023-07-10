import { API_DOMAIN } from "../Config/apiConfig";

export async function getRules(tournamentId: string) {
    try {
      const response = await fetch(
        `${API_DOMAIN}/rules/${tournamentId}`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error loading tournament fighters list:", error);
      throw error;
    }
  }