const AppError = require("../utils/AppError");
const { hash } = require("bcrypt");

class UserCreateUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const chekUserExists = await this.userRepository.findByEmail(email);

    if (chekUserExists) {
      throw new AppError("Esse email já está em uso!");
    }

    const hashedPassword = await hash(password, 8);

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return userCreated;
  }
}
module.exports = UserCreateUseCase;
