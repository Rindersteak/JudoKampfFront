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
    return data as Fighter[];
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
    return data as Fighter;
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
    const response = await fetch(`${API_DOMAIN}/fights/${fightId}/fight-duration/${timer}`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Fight;
  } catch (error) {
    console.error('Error updating timer duration:', error);
    throw error;
  }
}

export async function removeWhiteWasari(fightId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fights/${fightId}/remove-white-wasari`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error removing white wasari:', error);
    throw error;
  }
}

export async function removeWhiteIppon(fightId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fights/${fightId}/remove-white-ippon`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error removing white ippon:', error);
    throw error;
  }
}

export async function removeWhiteFoul(fightId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fights/${fightId}/remove-white-foul`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error removing white foul:', error);
    throw error;
  }
}

export async function removeBlueWasari(fightId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fights/${fightId}/remove-blue-wasari`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error removing blue wasari:', error);
    throw error;
  }
}

export async function removeBlueIppon(fightId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fights/${fightId}/remove-blue-ippon`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error removing blue ippon:', error);
    throw error;
  }
}

export async function removeBlueFoul(fightId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fights/${fightId}/remove-blue-foul`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error removing blue foul:', error);
    throw error;
  }
}

export async function addWhiteWasari(fightId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fights/${fightId}/add-white-wasari`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error adding white wasari:', error);
    throw error;
  }
}

export async function addWhiteIppon(fightId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fights/${fightId}/add-white-ippon`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error adding white ippon:', error);
    throw error;
  }
}

export async function addWhiteFoul(fightId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fights/${fightId}/add-white-foul`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error adding white foul:', error);
    throw error;
  }
}

export async function addBlueWasari(fightId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fights/${fightId}/add-blue-wasari`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error adding blue wasari:', error);
    throw error;
  }
}

export async function addBlueIppon(fightId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fights/${fightId}/add-blue-ippon`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error adding blue ippon:', error);
    throw error;
  }
}

export async function addBlueFoul(fightId: number) {
  try {
    const response = await fetch(`${API_DOMAIN}/fights/${fightId}/add-blue-foul`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error adding blue foul:', error);
    throw error;
  }
}
