import type { Gym } from "generated/prisma"
import type { GymsRepository } from "@/repositories/gyms-repository"

interface CreateGymUseCaseProps {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository){}

  async execute({description, latitude, longitude, phone, title}: CreateGymUseCaseProps): Promise<CreateGymUseCaseResponse>{

    const gym = await this.gymsRepository.create({
      description, latitude, longitude, phone, title
    })

    return{
      gym,
    }
  }
}


