import { afterEach, describe, expect, it, vi } from "vitest";
import express from "express";
import { getKitApiKey, getKitFormId, nativeKitSubscriptionSchema, subscribeToDearNadine } from "./kit";
import { registerDearNadineHttpRoutes } from "./dearNadineHttp";

const originalFetch = global.fetch;
const originalKey = process.env.KIT_API_KEY;
const originalFormId = process.env.KIT_FORM_ID;

afterEach(() => {
  global.fetch = originalFetch;
  process.env.KIT_API_KEY = originalKey;
  process.env.KIT_FORM_ID = originalFormId;
});

describe("native Kit subscription", () => {
  it("validates the only retained public input as an email address", () => {
    expect(nativeKitSubscriptionSchema.safeParse({ emailAddress: "not-an-email" }).success).toBe(false);
    expect(nativeKitSubscriptionSchema.parse({ emailAddress: " reader@example.com " })).toMatchObject({
      emailAddress: "reader@example.com",
      website: "",
    });
  });

  it("throws an error when KIT_API_KEY is missing", () => {
    delete process.env.KIT_API_KEY;
    expect(() => getKitApiKey()).toThrow("Kit API is not configured. KIT_API_KEY environment variable is missing.");
  });

  it("uses custom KIT_FORM_ID when specified", () => {
    process.env.KIT_FORM_ID = "123456";
    expect(getKitFormId()).toBe("123456");
  });

  it("creates or updates a subscriber and adds it to the Dear Nadine Kit form", async () => {
    process.env.KIT_API_KEY = "test-kit-api-key";
    delete process.env.KIT_FORM_ID;
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ subscriber: { id: 42 } }), { status: 201 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ subscriber: { id: 42 } }), { status: 201 }));
    global.fetch = fetchMock as typeof fetch;

    await subscribeToDearNadine("reader@example.com", "https://iterateforlawyers.example/dear-nadine");

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0]?.[0]).toBe("https://api.kit.com/v4/subscribers");
    expect(fetchMock.mock.calls[1]?.[0]).toBe("https://api.kit.com/v4/forms/9851247/subscribers");
    expect(JSON.parse(fetchMock.mock.calls[0]?.[1]?.body as string)).toMatchObject({
      email_address: "reader@example.com",
      state: "inactive",
    });
    expect(fetchMock.mock.calls[1]?.[1]).toMatchObject({
      headers: expect.objectContaining({ "X-Kit-Api-Key": "test-kit-api-key" }),
    });
  });
});

describe("Kit HTTP route /api/dear-nadine/subscribe", () => {
  function setupApp() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    registerDearNadineHttpRoutes(app);
    return app;
  }

  it("returns success json response when subscribing via API", async () => {
    process.env.KIT_API_KEY = "test-kit-api-key";
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ subscriber: { id: 42 } }), { status: 201 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ subscriber: { id: 42 } }), { status: 201 }));
    global.fetch = fetchMock as typeof fetch;

    const req = {
      body: { email_address: "reader@example.com" },
      headers: { accept: "application/json" },
      is: (type: string) => type === "json",
      get: () => "localhost:3000",
      protocol: "http",
    } as any;

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as any;

    const app = setupApp();
    // Simulate route handling directly or test endpoint logic
    const routes = (app as any)._router.stack.filter((r: any) => r.route?.path === "/api/dear-nadine/subscribe");
    const handler = routes[0].route.stack[0].handle;

    await handler(req, res);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      status: "pending",
      message: "Check your inbox for Kit confirmation.",
    });
  });

  it("handles honeypot submissions silently without calling Kit API", async () => {
    const fetchMock = vi.fn();
    global.fetch = fetchMock as typeof fetch;

    const req = {
      body: { email_address: "bot@example.com", website: "spam-link.com" },
      headers: { accept: "application/json" },
      is: (type: string) => type === "json",
      get: () => "localhost:3000",
      protocol: "http",
    } as any;

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as any;

    const app = setupApp();
    const routes = (app as any)._router.stack.filter((r: any) => r.route?.path === "/api/dear-nadine/subscribe");
    const handler = routes[0].route.stack[0].handle;

    await handler(req, res);

    expect(fetchMock).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      status: "pending",
      message: "Check your inbox for Kit confirmation.",
    });
  });

  it("returns 400 when email address is invalid", async () => {
    const req = {
      body: { email_address: "invalid-email" },
      headers: { accept: "application/json" },
      is: (type: string) => type === "json",
      get: () => "localhost:3000",
      protocol: "http",
    } as any;

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as any;

    const app = setupApp();
    const routes = (app as any)._router.stack.filter((r: any) => r.route?.path === "/api/dear-nadine/subscribe");
    const handler = routes[0].route.stack[0].handle;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
      })
    );
  });
});

