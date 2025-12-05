import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockApiResponse, mockApiError } from "@/lib/test-utils";

/**
 * Example tests for API client with mocking
 * These demonstrate how to mock API responses in tests
 */

describe("API Client Mocking", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset fetch mock
    global.fetch = vi.fn();
  });

  it("should mock successful API response", async () => {
    const mockData = { id: 1, name: "Test Booking" };
    const response = await mockApiResponse(mockData);

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual(mockData);
  });

  it("should mock API error response", async () => {
    const response = await mockApiError(404, "Not Found");

    expect(response.status).toBe(404);
    const json = await response.json();
    expect(json.error).toBe("Not Found");
  });

  it("should mock API response with custom headers", async () => {
    const mockData = { success: true };
    const response = await mockApiResponse(mockData, {
      status: 201,
      headers: { "X-Custom-Header": "test" },
    });

    expect(response.status).toBe(201);
    expect(response.headers.get("X-Custom-Header")).toBe("test");
  });

  it("should handle API response as JSON", async () => {
    const mockData = {
      bookings: [
        { id: 1, date: "2025-12-25", location: "Amsterdam" },
        { id: 2, date: "2025-12-31", location: "Rotterdam" },
      ],
    };

    const response = await mockApiResponse(mockData);
    const json = await response.json();

    expect(json.bookings).toHaveLength(2);
    expect(json.bookings[0].date).toBe("2025-12-25");
  });

  it("should mock server error responses", async () => {
    const response = await mockApiError(500, "Internal Server Error");

    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json.error).toBe("Internal Server Error");
  });

  it("should mock validation error responses", async () => {
    const response = await mockApiError(400, "Invalid input");

    expect(response.status).toBe(400);
    expect(response.ok).toBe(false);
  });

  it("should handle multiple sequential API calls", async () => {
    const response1 = await mockApiResponse({ data: "first" });
    const response2 = await mockApiResponse({ data: "second" });

    const json1 = await response1.json();
    const json2 = await response2.json();

    expect(json1.data).toBe("first");
    expect(json2.data).toBe("second");
  });
});
