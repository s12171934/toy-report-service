const reportService = require("../services/ReportService");

const procReport = async (req, res) => {
  const success = await reportService.procReport(req);

  if (success) {
    res.status(200);
  }
  else {
    res.status(404).json({message: 'Fail to report'});
  }
};

module.exports = { procReport };
