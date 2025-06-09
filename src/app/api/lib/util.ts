import { RAPIDAPI_HOST } from "./constants";

/**
 * Represents the result of a fetch operation.
 *
 * @template T - The expected shape of the successful response data.
 *
 * @property {T} [data] - The data returned from the fetch call if successful.
 * @property {{ message: string; status: number }} [error] - An object describing the error if the fetch failed.
 *   - message: A descriptive error message.
 *   - status: The HTTP status code associated with the error.
 */
type FetchResult<T> = {
    data?: T;
    error?: { message: string; status: number };
};

/**
 * Builds a full RapidAPI URL with query parameters.
 *
 * @param {string} endpoint - The API endpoint path (e.g., 'tournaments').
 * @param {Record<string, string | number>} [params] - An optional object representing query parameters to be appended to the URL.
 * @returns {string} The fully constructed URL as a string.
 */
export function buildRapidApiUrl(
    endpoint: string,
    params?: Record<string, string | number>,
): string {
    const url = new URL(`https://${RAPIDAPI_HOST}/${endpoint}?lang=en`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, String(value));
        });
    }

    return url.toString();
}

/**
 * Performs a GET request to a RapidAPI endpoint with necessary headers and returns the result.
 *
 * @template T - The expected type of the response data.
 * @param {string} url - The full URL of the RapidAPI endpoint to fetch.
 * @returns {Promise<FetchResult<T>>} A promise that resolves to an object containing either the fetched data or an error.
 */
export async function fetchFromRapidApi<T>(
    url: string,
): Promise<FetchResult<T>> {
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
                "x-rapidapi-host": RAPIDAPI_HOST,
            },
        });

        if (!res.ok) {
            return {
                error: {
                    message: `Failed to fetch: ${res.statusText}`,
                    status: res.status,
                },
            };
        }

        const data = (await res.json()) as T;
        return { data };
    } catch (error: unknown) {
        let errorMessage = "Unknown error occurred";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            error: {
                message: errorMessage,
                status: 500,
            },
        };
    }
}

/**
 * Builds the RapidAPI URL from an endpoint and params,
 * then performs a fetch using standard headers.
 *
 * @template T - The expected shape of the response data.
 * @param {string} endpoint - The API endpoint path (e.g., "tournaments").
 * @param {Record<string, string | number>} [params] - Query parameters for the URL.
 * @returns {Promise<FetchResult<T>>} - The result of the fetch call.
 */
export async function fetchRapidApiData<T>(
    endpoint: string,
    params?: Record<string, string | number>,
): Promise<FetchResult<T>> {
    const url = buildRapidApiUrl(endpoint, params);
    return await fetchFromRapidApi<T>(url);
}
