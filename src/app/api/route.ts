import { NextResponse } from "next/server";
import { fetchRapidApiData } from "./lib/util";
import { LEAGUES_BY_DATE_ENDPOINT } from "./lib/constants";

/**
 * API route handler for fetching tennis leagues by date from RapidAPI.
 *
 * @returns {Promise<NextResponse>} A JSON response containing the league data
 *                                  or an error message with an appropriate status code.
 */
export async function GET(): Promise<NextResponse> {
    const result = await fetchRapidApiData(LEAGUES_BY_DATE_ENDPOINT, {
        date: "eq.2025-06-07",
    });

    if (result.error) {
        return NextResponse.json(
            { error: result.error.message },
            { status: result.error.status },
        );
    }

    return NextResponse.json(result.data);
}
