import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe("Create Gym Use Case", () => {

  beforeEach(()=>{
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  })

  it("Should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: 'Gym test',
      description: null,
      latitude: -27.0747279,
      longitude: -49.4889672,
      phone: null,
    });

    expect(gym.id).toEqual(expect.any(String));
  });

});
