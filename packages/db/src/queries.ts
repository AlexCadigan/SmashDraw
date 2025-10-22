import { supabaseAdmin } from "./client";
import { logger } from "@shared/logger";
import { Database } from "./types";

/**
 * Type representing a tournament object to be inserted into the database.
 */
type TournamentInsert = Database["public"]["Tables"]["tournaments"]["Insert"];

/**
 * Result type for save operations.
 */
interface SaveResult {
    success: boolean;
    error?: string;
}

/**
 * Saves an array of tournaments to the Supabase `tournaments` table.
 * Logs success or failure using a structured logger.
 *
 * @param tournaments An array of tournaments to save
 *
 * @returns A promise resolving to a `SaveResult` indicating success or failure
 */
export async function saveTournaments(
    tournaments: TournamentInsert[],
): Promise<SaveResult> {
    if (!tournaments.length) {
        logger.info("No data to save", { table: "tournaments" });
        return { success: true };
    }

    try {
        const { error } = await supabaseAdmin
            .from("tournaments")
            .upsert(tournaments, { onConflict: "id" });

        if (error) throw error;

        logger.info("Successfully saved data", {
            table: "tournaments",
            count: tournaments.length,
        });

        return { success: true };
    } catch (err) {
        const error = err as { message?: string; code?: string };
        return handleSaveError("tournaments", error, tournaments.length);
    }
}

/**
 * Handles logging and return value for errors during save operations.
 *
 * @param table - The name of the table where the error occurred
 * @param error - The error object containing optional message and code
 * @param count - The number of items attempted to be saved
 *
 * @returns A `SaveResult` with `success: false` and the error message
 */
function handleSaveError(
    table: string,
    error: { message?: string; code?: string },
    count: number,
): SaveResult {
    logger.error("Error saving data", {
        table,
        count,
        message: error.message,
        code: error.code,
    });

    return { success: false, error: error.message ?? "Unknown error" };
}
