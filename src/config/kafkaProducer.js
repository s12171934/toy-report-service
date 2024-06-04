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