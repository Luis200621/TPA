import type { User, UUID } from "../../lib/types.ts";
import {
  JsonUserRepository,
  type CreateUserInput,
} from "../repositories/UserRepository.ts";

export interface RegisterInput extends CreateUserInput {}

export class AuthService {
  constructor(private readonly userRepository = new JsonUserRepository()) {}

  public async login(email: string, password: string): Promise<User | null> {
    const normalizedEmail = email.trim().toLowerCase();
    return await this.userRepository.findByEmailAndPassword(normalizedEmail, password.trim());
  }

  public async register(input: RegisterInput): Promise<User> {
    if (!input.email || !input.password || !input.nombre) {
      throw new Error("Faltan datos obligatorios para crear el perfil.");
    }

    const normalizedEmail = input.email.trim().toLowerCase();
    const existing = await this.userRepository.getByEmail(normalizedEmail);
    if (existing) {
      throw new Error("Ya existe una cuenta con ese correo.");
    }

    return await this.userRepository.create({
      ...input,
      email: normalizedEmail,
      rol: input.rol ?? (
        normalizedEmail.endsWith("@telealae.com") ? "medico" : "paciente"
      ),
    });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.getByEmail(email);
  }

  public async getUserById(id: UUID): Promise<User | null> {
    return await this.userRepository.getById(id);
  }
}
