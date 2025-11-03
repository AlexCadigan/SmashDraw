import { NextRequest, NextResponse } from "next/server";
import { API_RESOURCES, ApiResource, HttpStatus } from "@shared/constants";
import { apiRequest } from "@shared/apiRequest";

/**
 * Handles GET requests to the API endpoint, resolving the requested resource
 * and returning the fetched data or an appropriate error response.
 *
 * @param req The incoming Next.js `NextRequest` object.
 * @returns A `NextResponse` containing either:
 *  - The fetched data with status 200 OK, or
 *  - An error message with an appropriate HTTP status code.
 */
export async function GET(req: NextRequest) {
    const params = parseQueryParams(req);
    const resource = resolveResource(params);

    if (!resource) {
        return NextResponse.json(
            { error: "Must provide a valid resource key or custom URL" },
            { status: HttpStatus.BAD_REQUEST },
        );
    }

    return handleApiResponse(resource);
}

/**
 * Extracts query parameters from a NextRequest.
 *
 * @param req The incoming Next.js request
 * @returns An object containing optional resourceKey and customUrl
 */
function parseQueryParams(req: NextRequest): {
    resourceKey: string | null;
    customUrl: string | null;
} {
    const url = new URL(req.url);
    return {
        resourceKey: url.searchParams.get("resource"),
        customUrl: url.searchParams.get("url"),
    };
}

/**
 * Resolves an API resource based on query parameters in a Next.js request.
 *
 * @param req The incoming Next.js request object.
 * @returns If url is provided and valid, returns { name: "Custom API", endpoint: <customUrl> }.
 * If resource is provided and exists in API_RESOURCES, returns the corresponding ApiResource.
 * Returns null if neither a valid resource nor a valid customUrl is provided.
 */
function resolveResource(params: {
    resourceKey: string | null;
    customUrl: string | null;
}): ApiResource | null {
    const { resourceKey, customUrl } = params;

    if (customUrl) {
        if (!validateCustomUrl(customUrl)) return null;
        return { name: "Custom API", endpoint: customUrl };
    }

    if (resourceKey && resourceKey in API_RESOURCES) {
        return API_RESOURCES[resourceKey as keyof typeof API_RESOURCES];
    }

    return null;
}

/**
 * Validates whether a given string is a well-formed URL.
 *
 * @param customUrl The string to validate as a URL.
 * @returns `true` if the string is a valid URL, otherwise `false`.
 */
function validateCustomUrl(customUrl: string): boolean {
    try {
        new URL(customUrl);
        return true;
    } catch {
        return false;
    }
}

/**
 * Handles fetching data from a given API resource and returns a Next.js response.
 *
 * @param resource The API resource to fetch, containing `name` and `endpoint`.
 * @returns A `NextResponse` containing either the fetched data or an error message.
 */
async function handleApiResponse(resource: ApiResource): Promise<NextResponse> {
    try {
        const data = await apiRequest(resource);

        if (data === null) {
            return NextResponse.json(
                { error: "Failed to fetch data from API" },
                { status: HttpStatus.BAD_GATEWAY },
            );
        }

        return NextResponse.json({
            name: resource.name,
            endpoint: resource.endpoint,
            data,
        });
    } catch (err) {
        const message =
            err instanceof Error ? err.message : "Unknown error occurred";
        return NextResponse.json(
            { error: `Internal server error: ${message}` },
            { status: HttpStatus.INTERNAL_SERVER_ERROR },
        );
    }
}
