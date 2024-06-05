(async function () {
  const express = require("express");

  //APP 설정
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  //Spring config server에서 config 호출
  const { getConfig } = require("./src/config/SpringConfigClient");
  const config = await getConfig();
  const port = config.port;

  //Eureka client로 등록
  const { getEurekaClient } = require("./src/config/EurekaClientConfig");
  const eureka = await getEurekaClient();
  eureka.start();

  //Route설정
  const reportRoutes = require("./src/routes/ReportRoutes");
  app.use("/report", reportRoutes);

  //port설정
  app.listen(port, () => {
    console.log(`listen to ${port} : Report Micro Service`);
  });

  module.exports = app;
})();
