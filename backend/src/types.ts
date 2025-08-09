import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  FastifyInstance,
  FastifyBaseLogger,
  RawServerDefault,
} from "fastify";

import { ZodTypeProvider } from "fastify-type-provider-zod";

export type CustomFastifyInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>;
