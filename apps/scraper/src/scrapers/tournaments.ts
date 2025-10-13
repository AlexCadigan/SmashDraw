import { API_RESOURCES } from "@shared/constants";
import { AtpTournamentApiResponse } from "../types/atpTournamentsApi";
import { fetchApi } from "../utils/fetchApi";
import { saveTournaments } from "@db/queries";

async function scrapeTournaments() {
    const data = await fetchApi<AtpTournamentApiResponse>({
        resource: API_RESOURCES.ATP_TOURNAMENTS,
    });

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
