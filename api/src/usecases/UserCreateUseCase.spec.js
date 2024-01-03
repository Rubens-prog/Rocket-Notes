const UserCreateUseCase = require("./UserCreateUseCase");
const UserCreateRepositoryinMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateUseCase", () => {
  let userCreateRepositoryinMemory = null;
  let userCreateUseCase = null;

  beforeEach(() => {
    userCreateRepositoryinMemory = new UserCreateRepositoryinMemory();
    userCreateUseCase = new UserCreateUseCase(userCreateRepositoryinMemory);
  });

  it("User should be created", async () => {
    const user = {
      name: "Hello",
      email: "asdf@teste.com",
      password: "123",
    };

    const userCreated = await userCreateUseCase.execute(user);

    expect(userCreated).toHaveProperty("id");
  });

  it("Prevent duplicate email", async () => {
    const user1 = {
      name: "user1",
      email: "user@teste.com",
      password: "123",
    };

    const user2 = {
      name: "user2",
      email: "user@teste.com",
      password: "123",
    };

    await userCreateUseCase.execute(user1);

    await expect(userCreateUseCase.execute(user2)).rejects.toEqual(
      new AppError("Esse email já está em uso!")
    );
  });
});
