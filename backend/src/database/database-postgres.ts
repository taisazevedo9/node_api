import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
  #usuarios = new Map();

  async list(search = "") {
    let usuarios;

    if (search) {
      usuarios = await sql`SELECT * FROM users WHERE title ILIKE ${
        "%" + search + "%"
      } OR name ILIKE ${"%" + search + "%"}`;
    } else {
      usuarios = await sql`SELECT * FROM users`;
    }
    return usuarios;
  }

  async create(usuario: any) {
    const usuarioId = randomUUID();
    const { name, email, password, age, isAdmin } = usuario;

    await sql`
        INSERT INTO users (id, name, email, password, age, is_admin)
        VALUES (${usuarioId}, ${name}, ${email}, ${password}, ${age}, ${isAdmin})
    `;
    this.#usuarios.set(usuarioId, usuario);
    return usuarioId;
  }
  async update(id: string, usuario: any) {
    const { name, email, password, age, isAdmin } = usuario;
    await sql`
            UPDATE users
            SET name = ${name}, email = ${email}, password = ${password}, age = ${age}, is_admin = ${isAdmin}
            WHERE id = ${id}
    `;
  }

  async delete(id: string) {
    await sql`
            DELETE FROM users
            WHERE id = ${id}
        `;
    this.#usuarios.delete(id);
  }
}
