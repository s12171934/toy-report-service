const { getRedis } = require('../config/RedisConfig');
const { produceBoardDelete } = require('../config/kafkaProducer');

const procReport = async (req) => {
  const username = JSON.parse(req.headers.passport).username;

  if (!username) {
    return false;
  }
  
  const redis = await getRedis();
  const boardId = req.params.boardId;

  redis.sadd(boardId, username, (err, reply) => {
    if (err) {
      console.err(err);
    } else {
      console.log(reply);

      redis.expire(boardId, 60 * 60 * 24);
    }
  });

  const reportNumber = redis.scard(boardId);

  if (reportNumber >= 5) {
    redis.del(boardId);

    // board db에서 게시물 삭제하는 로직 ++
    produceBoardDelete(boardId);
  }

  return true;
}

module.exports = { procReport };
