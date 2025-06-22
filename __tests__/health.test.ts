import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";
import request from "supertest";
import { createServer } from "../src/app";

describe("Health Check", () => {
  it("should return 200 for health check", async () => {
    const response = await request(createServer().app).get("/hello");
    expect(response.status).toBe(200);
    // expect(response.body).toEqual({ status: "OK" });
  });
});
