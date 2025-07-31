import { expect, describe, it, beforeEach } from "vitest";
import {  hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
    //sut = system under test
  });

  it("Should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "jhon Doe",
      email: "jhondoe@any.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id
    });

    expect(user.name).toEqual('jhon Doe');
  });

  it("Should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

});
