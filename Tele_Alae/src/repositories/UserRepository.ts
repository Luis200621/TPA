import type { User, UUID } from "../../lib/types.ts";

export interface CreateUserInput {
  nombre: string;
  run?: string;
  email: string;
  telefono?: string;
  emergencia?: string;
  password: string;
  rol?: User["rol"];
}

export class JsonUserRepository {
  private readonly storageFileUrl = new URL("../../data/users.json", import.meta.url);
  private readonly storageDirUrl = new URL("../../data/", import.meta.url);

  public async create(input: CreateUserInput): Promise<User> {
    const users = await this.readAll();
    const now = new Date().toISOString();
    const user: User = {
      id: crypto.randomUUID() as UUID,
      nombre: input.nombre,
      run: input.run,
      email: input.email,
      telefono: input.telefono,
      emergencia: input.emergencia,
      password: input.password,
      rol: input.rol ?? "paciente",
      createdAt: now as User["createdAt"],
      updatedAt: now as User["updatedAt"],
    };

    users.push(user);
    await this.writeAll(users);
    return user;
  }

  public async getByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.trim().toLowerCase();
    const users = await this.readAll();
    return users.find((user) => user.email.toLowerCase() === normalizedEmail) ?? null;
  }

  public async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    const users = await this.readAll();
    return users.find((user) => user.email.toLowerCase() === normalizedEmail && user.password === normalizedPassword) ?? null;
  }

  public async getById(id: UUID): Promise<User | null> {
    const users = await this.readAll();
    return users.find((user) => user.id === id) ?? null;
  }

  private async readAll(): Promise<User[]> {
    try {
      await Deno.mkdir(this.storageDirUrl, { recursive: true });
      const text = await Deno.readTextFile(this.storageFileUrl);
      return JSON.parse(text) as User[];
    } catch (error) {
      console.error("Error al leer usuarios:", error);
      return [];
    }
  }

  private async writeAll(users: User[]): Promise<void> {
    try {
      await Deno.mkdir(this.storageDirUrl, { recursive: true });
      await Deno.writeTextFile(this.storageFileUrl, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error("Error al escribir usuarios:", error);
      throw new Error(`No se pudo guardar el archivo de usuarios: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
