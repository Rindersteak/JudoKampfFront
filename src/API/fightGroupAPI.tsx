import { Fightgroup } from '../types';
import { API_DOMAIN } from '../Config/apiConfig';

export async function getFightgroups() {
  try {
    const response = await fetch(`${API_DOMAIN}/fightgroups/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data as Fightgroup[]; 
  } catch (error) {
    console.error('Error loading fightgroups:', error);
    throw error;
  }
}

export async function deleteFightGroup(fightgroupId: number) {
    try {
      const response = await fetch(`${API_DOMAIN}/fightgroups/delete/${fightgroupId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('An error occurred while deleting the fightgroup:', error);
      throw error;
    }
  }