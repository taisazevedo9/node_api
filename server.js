import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();
// const database = new DatabaseMemory();
const database = new DatabasePostgres();

server.get("/videos", async (request, reply) => {

   const search = request.query.search;
   const videos = await database.list(search);
   return reply.status(200).send(videos);
});

server.post("/videos", async (request, reply) => {

    const {title,description,duration} = request.body;
   
    await database.create({
        title,
        description,
        duration,         
    });

   return reply.status(201).send();

}
);
server.get("/videos/:id", async (request, reply) => {
    return { message: "Hello, World!" };
});
server.put("/videos/:id", async (request, reply) => {

    const id = request.params.id;
   
    const {title, description, duration} = request.body;

    // Update the video in the database
    await database.update(id, {
        title,
        description,
        duration
    });

    return reply.status(204).send();


});
server.delete("/videos/:id", async (request, reply) => {
    const id = request.params.id;

    await database.delete(id);

    return reply.status(204).send();
}
);


server.listen({ port: process.env.PORT ?? 3333 });
