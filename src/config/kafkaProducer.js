//Kafka Event Producer 설정 및 produce function
const { Kafka } = require('kafkajs');
const { getConfigData } = require('./SpringConfigClient');

let globalProducer;

const getProducer = async () => {
  if(globalProducer) return globalProducer;

  const config = await getConfigData();

  const kafka = new Kafka({
    clientId: config['kafka.clientId'],
    brokers: config['kafka.brokersIp']
  });

  globalProducer = kafka.producer();
  return globalProducer;
}

//누적 신고수에 의해 게시물 삭제가 필요시 event 발생
const produceBoardDelete = async (boardId) => {
  const producer = await getProducer();

  await producer.connect();

  await producer.send({
    topic: 'board-delete',
    messages: [
      boardId
    ]
  });

  console.log('Message send to Kafka:' + boardId);

  await producer.disconnect();
}

module.exports = { produceBoardDelete };