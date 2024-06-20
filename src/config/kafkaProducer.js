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
const sendEvent = async (topic, message) => {
  const producer = await getProducer();

  await producer.connect();

  await producer.send({
    topic: topic,
    messages: message
  });

  console.log('Message send to Kafka:' + message);

  await producer.disconnect();
}

module.exports = { sendEvent };