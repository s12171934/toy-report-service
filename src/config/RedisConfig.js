const Redis = require("ioredis");
const { getConfig } = require("./SpringConfigClient");

let redis;

const getRedis = async () => {
  if (redis) {
    return redis;
  }

  const config = await getConfig();

  redis = new Redis({
    port: config["redis.port"],
    host: config["redis.host"],
  });

  return redis;
};

module.exports = { getRedis };
