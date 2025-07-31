import request from "supertest";
import { app } from "@/app";
import { describe } from "node:test";
import { afterAll, beforeAll, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a gym", async () => {
    const {token} = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
    .post("/gyms")
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'test gym',
      phone: '11999999999',
      description: "description test",
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    expect(response.statusCode).toEqual(201)
  });
});
