import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history"
import { PrismaCheckInsReposiroty } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeFetchUserCheckInsHistoryUseCase(){
  const checkInsRepository = new PrismaCheckInsReposiroty()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}