import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
const SECRET_KEY = "9015F79E-F71D-4671-B196-E6FE910D7A10"; // Use variável de ambiente em produção

export class AuthController {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const { username, password } = request.body as {
      username: string;
      password: string;
    };

    // Valide o usuário (exemplo simplificado)
    if (username === "tais" && password === "tais123") {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
      return reply.send({ token });
    }
    return reply.status(401).send({ message: "Credenciais inválidas" });
  }
}
