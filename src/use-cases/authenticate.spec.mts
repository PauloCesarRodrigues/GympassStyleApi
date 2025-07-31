import { expect, describe, it, beforeEach } from "vitest";
import {  hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
    //sut = system under test
  });

  it("Should be able to authenticate", async () => {
    await usersRepository.create({
      name: "jhon Doe",
      email: "jhondoe@any.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "jhondoe@any.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "jhondoe@any.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "jhon Doe",
      email: "jhondoe@any.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "jhondoe@any.com",
        password: "senhaerrada",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
