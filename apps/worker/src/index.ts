import { createClient } from "redis";

async function main() {
  const redis = createClient({ url: process.env.REDIS_HOST });
  await redis.connect();

}

main();

