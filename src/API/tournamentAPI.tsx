import { Tournament } from "../types";
import { Fighter, FighterAdd } from "../types";
import { API_DOMAIN } from "../Config/apiConfig";

export async function postTournament(tournament: Tournament) {
  try {
    const response = await fetch(`${API_DOMAIN}/tournaments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tournament),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while submitting the tournament:", error);
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
    console.error("Error loading backend tournaments:", error);
    throw error;
  }
}

export async function deleteTournament(tournamentId: number) {
  try {
    const response = await fetch(
      `${API_DOMAIN}/tournaments/${tournamentId}/delete`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("An error occurred while deleting the tournament:", error);
    throw error;
  }
}

export async function putTournament(tournament: Tournament) {
  try {
    const response = await fetch(
      `${API_DOMAIN}/tournaments/${tournament.id}/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tournament),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while updating the tournament:", error);
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

export async function postTournamentFighter(
  tournamentId: number,
  fighter: FighterAdd
) {
  try {
    const response = await fetch(
      `${API_DOMAIN}/tournaments/${tournamentId}/add-fighter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fighter),
      }
    );
    console.log(JSON.stringify(fighter));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while submitting the fighter:", error);
    throw error;
  }
}

export async function getTournamentFightersList(tournamentId: string) {
  try {
    const response = await fetch(
      `${API_DOMAIN}/tournaments/${tournamentId}/fighterslist`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Fighter[];
  } catch (error) {
    console.error("Error loading tournament fighters list:", error);
    throw error;
  }
}

export async function createFightgroups(tournamentId: string): Promise<void> {
  try {
    const response = await fetch(`${API_DOMAIN}/tournaments/${tournamentId}/create-fightgroups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating fightgroups:", error);
    throw error;
  }
}
