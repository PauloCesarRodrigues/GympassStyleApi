import type { Gym } from "generated/prisma"
import type { GymsRepository } from "@/repositories/gyms-repository"

interface SearchGymsUseCaseProps {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository){}

  async execute({query, page}: SearchGymsUseCaseProps): Promise<SearchGymsUseCaseResponse>{

    const gyms = await this.gymsRepository.searchMany(query, page)

    return{
      gyms,
    }
  }
}


