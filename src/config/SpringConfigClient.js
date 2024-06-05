//Spring Config Server에서 GITHUB repo의 board-dev.yml의 config를 가져옴
const axios = require("axios");

let config;

const getConfig = async () => {
  if (config) {
    return config;
  }

  try {
    const response = await axios.get(
      "http://admin:admin1234@localhost:9000/report/dev"
    );
    config = response.data.propertySourrces[0].source;
    return config;
  } catch (error) {
    console.error("Error fetching config", error);
  }
};

module.exports = { getConfig };
