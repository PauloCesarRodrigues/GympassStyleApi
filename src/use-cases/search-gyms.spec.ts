import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe("Fetch User Check-in history Use Case", () => {

  beforeEach(async ()=>{
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  })

  it("Should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: 'Test Gym 1',
      description: null,
      latitude: -27.0747279,
      longitude: -49.4889672,
      phone: null,
    });

    const gym2 = await gymsRepository.create({
      title: 'Test Gym 2',
      description: null,
      latitude: -27.0747278,
      longitude: -49.4889671,
      phone: null,
    });

    const { gyms } = await sut.execute({
      query: 'Gym 2',
      page: 1
    });

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({title: 'Test Gym 2'})
    ])
  });

  it("Should be able to fetch paginated gym search", async () => {
    for(let i = 1;i <= 22; i++){
      await gymsRepository.create({
        title: `Test Gym ${i}`,
        description: null,
        latitude: -27.0747279,
        longitude: -49.4889672,
        phone: null,
      });
    }


    const { gyms } = await sut.execute({
      query: 'Test',
      page: 2
    });

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({title: 'Test Gym 21'}),
      expect.objectContaining({title: 'Test Gym 22'}),
    ])
  });
});
