const redis = require("redis");
const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});
client
  .connect()
  .then(() => console.log("Redis Connected"))
  .catch((err) => console.error("Redis Connection Error:", err));
module.exports = client;
