import { API_RESOURCES } from "@shared/constants";
import { AtpTournamentApiResponse } from "../types/atpTournamentsApi";
import { apiRequest } from "../utils/apiRequest";
import { saveTournaments } from "@db/queries";

/**
 * Scrapes tennis tournament data and saves it to the database.
 *
 * @returns Resolves once the tournaments are successfully fetched and saved.
 */
async function scrapeTournaments(): Promise<void> {
    const data = await apiRequest<AtpTournamentApiResponse>(
        API_RESOURCES.ATP_TOURNAMENTS,
    );

    if (!data) {
        return;
    }

    // Build array of tournaments
    const tournaments = (data.TournamentDates ?? []).flatMap((dateBlock) =>
        (dateBlock.Tournaments ?? [])
            .filter((tournament) => tournament.Name)
            .map((tournament) => ({ name: tournament.Name! })),
    );

    await saveTournaments(tournaments);
}

scrapeTournaments();
