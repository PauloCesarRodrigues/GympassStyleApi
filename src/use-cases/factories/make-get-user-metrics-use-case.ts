import { GetUserMetricsUseCase } from "../get-user-metrics"
import { PrismaCheckInsReposiroty } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeGetUserMetricsUseCase(){
  const checkInsRepository = new PrismaCheckInsReposiroty()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}