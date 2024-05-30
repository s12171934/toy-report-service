(async function () {
  const express = require("express");
  const reportRoutes = require("./src/routes/ReportRoutes");

  const { getConfig } = require("./src/config/SpringConfigClient");
  const config = await getConfig();
  const port = config.port;

  const { getEurekaClient } = require("./src/config/EurekaClientConfig");
  const eureka = await getEurekaClient();
  eureka.start();

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/report", reportRoutes);

  app.listen(port, () => {
    console.log(`listen to ${port} : Report Micro Service`);
  });

  module.exports = app;
})();
