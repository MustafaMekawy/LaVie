class MyHelper {
  static reshandeler = (res, statuscode, apiStatus, data, message) => {
    res.status(statuscode).send({
      apiStatus,
      data,
      message,
    });
  };
}

module.exports = MyHelper;
