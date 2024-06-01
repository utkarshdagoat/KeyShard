import { Fluence, KeyPair } from "@fluencelabs/js-client";
import relays from "../relays.json" assert { type: "json" };
import { type Static, Type } from "@sinclair/typebox";
import { type FastifyInstance } from "fastify";

import { helloWorld, helloWorldRemote, showSubnet, runDeployedServices, runRoundOne, addRoundOneMessages, type AddRoundOneMessagesResultType, initiateRoundTwo, type InitiateRoundTwoResultType, type AddSharesResultType, addShares, type EndRoundTwoResultType, endRoundTwo } from "../compiled-aqua/main.js";

const DEFAULT_ACCESS_TOKEN = "abcdefhi";

const DEFAULT_PEER_PRIVATE_KEY = Buffer.from(
  (await KeyPair.randomEd25519()).toEd25519PrivateKey(),
).toString("base64");

// This is an authorization token for the gateway service.
const ACCESS_TOKEN = process.env.ACCESS_TOKEN ?? DEFAULT_ACCESS_TOKEN;
if (ACCESS_TOKEN === DEFAULT_ACCESS_TOKEN) {
  console.warn(
    "Default access token is used. Remember to generate the appropriate token and save it in env variables.",
  );
}

// This is the peer's private key.
const PEER_PRIVATE_KEY =
  process.env.PEER_PRIVATE_KEY ?? DEFAULT_PEER_PRIVATE_KEY;
if (PEER_PRIVATE_KEY === DEFAULT_PEER_PRIVATE_KEY) {
  console.warn(
    "Randomly generated peer private key is used.",
  );
}

const PEER_PRIVATE_KEY_BYTES = new Uint8Array(
  Buffer.from(PEER_PRIVATE_KEY, "base64"),
);

export default async function (server: FastifyInstance) {
  await server.register(import("@fastify/rate-limit"), {
    max: 100,
    timeWindow: "1 minute",
  });

  server.addHook("onReady", async () => {
    await Fluence.connect(relays[0], {
      keyPair: {
        type: "Ed25519",
        source: PEER_PRIVATE_KEY_BYTES,
      },
    });
  });

  interface AuthQuery {
    Querystring: {
      access_token: string | undefined
    },
    Headers: {
      access_token: string | undefined
    }
  }

  server.addHook<AuthQuery>("onRequest", async (request, reply) => {
    const header = request.query.access_token ?? request.headers.access_token;
    if (header !== ACCESS_TOKEN) {
      await reply.status(403).send({
        error: "Unauthorized",
        statusCode: 403,
      });
    }
  });

  server.addHook("onClose", async () => {
    await Fluence.disconnect();
  });

  const callbackBody = Type.Object({
    name: Type.String(),
  });

  type CallbackBodyType = Static<typeof callbackBody>;

  const callbackResponse = Type.String();

  type CallbackResponseType = Static<typeof callbackResponse>;

  const runDeployedServicesResponse = Type.Array(
    Type.Object({
      answer: Type.Union([Type.String(), Type.Null()]),
      worker: Type.Object({
        host_id: Type.String(),
        pat_id: Type.String(),
        worker_id: Type.Union([Type.String(), Type.Null()]),
      }),
    }),
  );


  type RunDeployedServicesResponseType = Static<typeof runDeployedServicesResponse>;

  // Request and response
  server.post<{ Body: CallbackBodyType; Reply: CallbackResponseType }>(
    "/my/callback/hello",
    { schema: { body: callbackBody, response: { 200: callbackResponse } } },
    async (request, reply) => {
      const { name } = request.body;
      const result = await helloWorld(name);
      return reply.send(result);
    },
  );

  // Fire and forget
  server.get("/my/webhook/hello", async (_request, reply) => {
    const data = helloWorldRemote("Fluence");
    return reply.send(data);
  });

  // No validation schema for simplicity
  server.get(
    "/my/callback/showSubnet",
    async (_request, reply) => {
      const result = await showSubnet();
      return reply.send(result);
    },
  );

  server.post<{ Reply: RunDeployedServicesResponseType }>(
    "/my/callback/runDeployedServices",
    { schema: { response: { 200: runDeployedServicesResponse } } },
    async (_request, reply) => {
      const result = await runDeployedServices();
      return reply.send(result);
    },
  );

  interface RoundOneReply {
    round1_state: number[],
    round1_msg: number[]
  }

  interface RoundOneRequest {
    id: number
  }

  const runRoundOneService =
    Type.Object({
      round1_state: Type.Array(Type.Number()),
      round1_msg: Type.Array(Type.Number())
    })

  server.post<{ Body: RoundOneRequest, Reply: RoundOneReply }>(
    "/my/callback/roundOne",
    { schema: { response: { 200: runRoundOneService } } },
    async (request, reply) => {
      const { id } = request.body;
      const result = await runRoundOne(id);
      return reply.send(result);
    },
  );
  interface AddMessagesRequest {
    messages: number[][],
    id: number,
    round1State: number[],
  }



  const addRoundOneMessagesService = Type.Object({
    round1_state: Type.Array(Type.Number())
  })

  server.post<{ Body: AddMessagesRequest, Reply: AddRoundOneMessagesResultType }>(
    "/my/callback/roundOne/addMessages",
    { schema: { response: { 200: addRoundOneMessagesService } } },
    async (request, reply) => {
      const { id, messages, round1State } = request.body;
      console.log("id", id)
      console.log("messages", messages)
      console.log("round1State", round1State)
      const result = await addRoundOneMessages(round1State, messages, id);
      // console.log(result)
      return reply.send(result);
    },
  );

  interface intiateRoundTwoRequest {
    round1State: number[]
  }

  const initiateRoundTwoService = Type.Object({
    round2_state: Type.Array(Type.Number()),
    shares: Type.Array(Type.Number())
  })

  server.post<{ Body: intiateRoundTwoRequest, Reply: InitiateRoundTwoResultType }>(
    "/my/callback/roundTwo/initiate",
    { schema: { response: { 200: initiateRoundTwoService } } },
    async (request, reply) => {
      const { round1State } = request.body;
      const result = await initiateRoundTwo(round1State);
      // console.log(result)
      return reply.send(result);
    },
  );

  interface AddSharesRequest {
    round2State: number[],
    shares: number[][],
    id: number
  }

  const addSharesService = Type.Object({
    round2_state: Type.Array(Type.Number()),
  })

  server.post<{ Body: AddSharesRequest, Reply: AddSharesResultType }>(
    "/my/callback/roundTwo/addShares",
    { schema: { response: { 200: addSharesService } } },
    async (request, reply) => {
      const { round2State, shares, id } = request.body;
      const result = await addShares(round2State, shares, id)
      // console.log(result)
      return reply.send(result);
    },
  );


  interface endRoundTwoRequest {
    round2State: number[],
  }

  const endRoundTwoService = Type.Object({
    share: Type.Array(Type.Number()),
    pk: Type.String(),
    t_pk: Type.String()
  })


  server.post<{ Body: endRoundTwoRequest, Reply: EndRoundTwoResultType }>(
    "/my/callback/roundTwo/end",
    { schema: { response: { 200: endRoundTwoService } } },
    async (request, reply) => {
      const { round2State } = request.body;
      const result = await endRoundTwo(round2State)
      // console.log(result)
      return reply.send(result);
    },
  );

};