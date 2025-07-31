import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe("Fetch User Check-in history Use Case", () => {

  beforeEach(async ()=>{
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);
  })

  it("Should be able to fetch check-in history", async () => {
    const gym1 = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id:'user-01'
    })

    const gym2 = await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id:'user-01'
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1
    });

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([gym1, gym2])
  });

  it("Should be able to fetch paginated check-in history", async () => {
    for(let i = 1;i <= 22; i++){
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id:'user-01'
      })
    }


    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2
    });

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: 'gym-21'}),
      expect.objectContaining({gym_id: 'gym-22'}),
    ])
  });
});
