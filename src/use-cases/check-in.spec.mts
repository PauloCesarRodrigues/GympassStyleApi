import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "generated/prisma/runtime/library";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";


let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe("Check in Use Case", () => {

  beforeEach(async ()=>{
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Test gym',
      description: null,
      latitude: -27.0747279,
      longitude: -49.4889672,
      phone: null,
    });

    vi.useFakeTimers()
  })

  afterEach(()=>{
    vi.useRealTimers()
  })

  it("Should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'gym-01',
      userLatitude: -27.0747279,
      userLogitude: -49.4889672,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

// TDD - RED, GREEN, REFACTOR
  it("Should not be able to check in twice in the same day", async () => {

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'gym-01',
      userLatitude: -27.0747279,
      userLogitude: -49.4889672,
    });

    await expect(()=> 
      sut.execute({
      gymId: 'gym-01',
      userId: 'gym-01',
      userLatitude: -27.0747279,
      userLogitude: -49.4889672,
    })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  });

  it("Should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'gym-01',
      userLatitude: -27.0747279,
      userLogitude: -49.4889672,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

      const {checkIn} = await sut.execute({
      gymId: 'gym-01',
      userId: 'gym-01',
      userLatitude: -27.0747279,
      userLogitude: -49.4889672,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  });

  it("Should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Test gym',
      description: null,
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
      phone: ''
    })

    await expect(()=> sut.execute({
      gymId: 'gym-02',
      userId: 'gym-01',
      userLatitude: -27.2092052,
      userLogitude: -49.6401091,
    })).rejects.toBeInstanceOf(MaxDistanceError)
  });
});
