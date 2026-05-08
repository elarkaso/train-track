function getHealth(req, res) {
  res.status(200).json({
    status: "ok",
    service: "traintrack-backend"
  });
}

module.exports = {
  getHealth
};