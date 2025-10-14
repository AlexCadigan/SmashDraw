import axios, { AxiosError } from "axios";
import { logger } from "./logger";
import { ApiResource } from "@shared/constants";

/**
 * Makes a standardized GET request to a specified API resource with built-in logging.
 *
 * @param resource An object containing the API resource's `name` (used for log context)
 * and `endpoint` (the full URL to call).
 *
 * @returns A promise that resolves to the response data (typed as `T`) if successful,
 * or `null` if the request fails or throws an error.
 */
export async function apiRequest<T>(resource: ApiResource): Promise<T | null> {
    const { name, endpoint } = resource;

    logger.info("Attempting API request", { api: name, endpoint });

    try {
        const response = await axios.get<T>(endpoint);

        logger.info("API request Success", {
            api: name,
            endpoint,
            status: response.status,
        });

        return response.data;
    } catch (err) {
        const axiosError = err as AxiosError;

        logger.error("API request Failure", {
            api: name,
            endpoint,
            message: axiosError.message,
            status: axiosError.response?.status,
            data: axiosError.response?.data,
        });

        return null;
    }
}
