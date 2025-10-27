import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(import.meta.dirname, "../../../.env") });

export const ENV = {
    SUPABASE_URL: requireEnvVar("SUPABASE_URL"),
    SERVICE_ROLE_API_KEY: requireEnvVar("PRIVATE_SUPABASE_SERVICE_ROLE_KEY"),
};

/**
 * Retrieves a required environment variable and ensures it is defined.
 *
 * @param key The name of the environment variable to retrieve.
 * @returns The value of the specified environment variable.
 */
function requireEnvVar(key: string): string {
    const value = process.env[key];

    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }

    return value;
}
