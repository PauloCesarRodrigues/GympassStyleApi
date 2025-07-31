import type { User, Prisma } from "generated/prisma";
import type { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository{
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find(item => item.id === id)
    if(!user) return null
    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find(item => item.email === email)
    if(!user) return null
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      email: data.email,
      created_at: new Date(),
      name: data.name,
      password_hash: data.password_hash
    }

    this.items.push(user)
    return user
  }
}