const Eureka = require("eureka-js-client").Eureka;
const { getConfig } = require("./SpringConfigClient");

let eureka;

const getEurekaClient = async () => {
  if (eureka) {
    return eureka;
  }

  const config = await getConfig();

  eureka = new Eureka({
    instance: {
      app: config["eureka.instance.app"],
      hostName: config["eureka.instance.hostName"],
      ipAddr: config["eureka.instance.ipAddr"],
      statusPageUrl: `http://${config["eureka.instance.hostName"]}:${config.port}`,
      port: {
        $: config.port,
        "@enabled": true,
      },
      vipAddress: config["eureka.instance.app"],
      dataCenterInfo: {
        "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
        name: "MyOwn",
      },
    },
    eureka: {
      host: config["eureka.server.host"],
      port: 8761,
      servicePath: "/eureka/apps/",
      registerWithEureka: true,
      fetchRegistry: true,
    },
  });

  return eureka;
};

module.exports = { getEurekaClient };
