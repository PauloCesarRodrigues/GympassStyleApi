import type { Gym } from "generated/prisma"
import type { GymsRepository } from "@/repositories/gyms-repository"

interface FetchNearbyGymsUseCaseProps {
  userLatidute: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository){}

  async execute({userLatidute, userLongitude}: FetchNearbyGymsUseCaseProps): Promise<FetchNearbyGymsUseCaseResponse>{

    const gyms = await this.gymsRepository.findManyNearby({latitude:userLatidute, longitude: userLongitude})

    return{
      gyms,
    }
  }
}


