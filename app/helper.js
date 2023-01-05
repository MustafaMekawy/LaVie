class MyHelper {
  static reshandeler = (res, statuscode, apiStatus, data, message) => {
    res.status(statuscode).send({
      apiStatus,
      // length: data.length,
      data,
      message,
    });
  };
  
  static aDayhasPassed = (now, targetDate) => {
    const day = 1 * 24 * 60 * 60 * 1000;
    if (now - targetDate < day) return false;
    else return true;
  };
}

module.exports = MyHelper;
