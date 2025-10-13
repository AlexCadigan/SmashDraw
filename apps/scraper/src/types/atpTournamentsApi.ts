/**
 * Represents a single ATP tournament as returned by the external ATP Tour API.
 */
interface Tournament {
    Name?: string;
}

/**
 * Represents a block of tournaments grouped by date in the ATP Tour API response.
 */
interface TournamentDateBlock {
    Tournaments?: Tournament[];
}

/**
 * Represents the full ATP tournaments API response.
 */
export interface AtpTournamentApiResponse {
    TournamentDates?: TournamentDateBlock[];
}
