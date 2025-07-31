import request from "supertest";
import { app } from "@/app";
import { describe } from "node:test";
import { afterAll, beforeAll, expect, it } from "vitest";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "Jhon Doe",
      email: "jhondoe@email.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
