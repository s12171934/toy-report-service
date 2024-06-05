const { getRedis } = require('../config/RedisConfig');
const { produceBoardDelete } = require('../config/kafkaProducer');

const procReport = async (req) => {
  const username = JSON.parse(req.headers.passport).username;

  if (!username) {
    return false;
  }
  
  const redis = await getRedis();
  const boardId = req.params.boardId;

  //신고 발생시 레디스에 key : board id, value : 신고자 username set으로 설정
  //만료 기간 갱신
  redis.sadd(boardId, username, (err, reply) => {
    if (err) {
      console.err(err);
    } else {
      console.log(reply);

      redis.expire(boardId, 60 * 60 * 24);
    }
  });

  //만료 전 신고 수가 일정 수 이상이면 삭제 시도
  const reportNumber = redis.scard(boardId);

  if (reportNumber >= 5) {
    redis.del(boardId);

    //Board DB에서 게시물 삭제
    produceBoardDelete(boardId);
  }

  return true;
}

module.exports = { procReport };
