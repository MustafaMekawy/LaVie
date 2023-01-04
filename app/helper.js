class MyHelper {
  static reshandeler = (res, statuscode, apiStatus, data, message) => {
    res.status(statuscode).send({
      apiStatus,
      length: data.length,
      data,
      message,
    });
  };
}

module.exports = MyHelper;
