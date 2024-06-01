import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import dotenv from "dotenv";

dotenv.config();

const server = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

await server.register(import("../dist/app/index.js"));

export default async function (req: Request, res: Response) {
  await server.ready();
  server.server.emit("request", req, res);
}