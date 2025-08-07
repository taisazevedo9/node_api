import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";

import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { serializerCompiler } from "fastify-type-provider-zod";
import { routes } from "./routes.js";
import { ZodTypeProvider } from "fastify-type-provider-zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);

app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: "*", // Allow all origins for CORS
});
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Video API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});
app.register(routes);

app.listen({ port: 3333 }).then(() => {
  console.log("app is running on http://localhost:3333");
});

// // // const database = new DatabaseMemory();
// import { DatabasePostgres } from "./database/database-postgres.js";

// const database = new DatabasePostgres();

// app.post(
//   "/users",
//   {
//     schema: {
//       body: {
//         type: "object",
//         properties: {
//           name: { type: "string" },
//           email: { type: "string" },
//           password: { type: "string" },
//           age: { type: "number" },
//           isAdmin: { type: "boolean" },
//         },
//         required: ["name", "email", "password", "age", "isAdmin"],
//       },
//     },
//   },
//   async (request, reply) => {
//     const { name, email, password, age, isAdmin } = request.body as {
//       name: string;
//       email: string;
//       password: string;
//       age: number;
//       isAdmin: boolean;
//     };

//     const usuarioId = await database.create({
//       name,
//       email,
//       password,
//       age,
//       isAdmin,
//     });

//     return reply.status(200).send(usuarioId);
//   }
// );
// app.post("/videos", async (request, reply) => {

//     const {title,description,duration} = request.body;

//     await database.create({
//         title,
//         description,
//         duration,
//     });

//    return reply.status(201).send();

// }
// );
// app.get("/videos/:id", async (request, reply) => {
//     return { message: "Hello, World!" };
// });
// app.put("/videos/:id", async (request, reply) => {

//     const id = request.params.id;

//     const {title, description, duration} = request.body;

//     // Update the video in the database
//     await database.update(id, {
//         title,
//         description,
//         duration
//     });

//     return reply.status(204).send();

// });
// app.delete("/videos/:id", async (request, reply) => {
//     const id = request.params.id;

//     await database.delete(id);

//     return reply.status(204).send();
// }
// );

// app.listen({
//   host: "0.0.0.0",
//   port: process.env.PORT ?? 3333,
// });
