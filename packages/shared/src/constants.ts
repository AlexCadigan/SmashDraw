/**
 * Centralized registry of external API endpoints used by the application.
 * Each entry defines a unique resource identifier and its corresponding
 * endpoint URL.
 */
export const API_RESOURCES = {
    ATP_TOURNAMENTS: {
        name: "ATP_TOURNAMENTS",
        endpoint: "https://www.atptour.com/en/-/tournaments/calendar/tour",
    },
} as const;

/**
 * Represents a single API resource from the `API_RESOURCES` registry.
 */
export type ApiResource = (typeof API_RESOURCES)[keyof typeof API_RESOURCES];
