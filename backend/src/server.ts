import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { routes } from "./routes.js";
import cors from "@fastify/cors";

const app = Fastify();

// Configuração do Swagger
app.register(fastifySwagger, {
  swagger: {
    info: {
      title: "Node API",
      description: "Documentação da API",
      version: "1.0.0",
    },
  },
});
app.register(cors, {
  origin: "*", // Permite apenas o frontend acessar
  // methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  staticCSP: true,
  transformStaticCSP: (header) => header,
});

// Registre as rotas da aplicação
app.register(routes);

// Inicialização do servidor
app.listen(
  {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 3333,
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
  }
);
