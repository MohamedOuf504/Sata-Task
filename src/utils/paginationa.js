const config = require("../configuration/config.service");

const paginationa = (query) => {
  const limit = parseInt(query.limit) || config.limit;
  const page = parseInt(query.page) || config.page;
  const skip = (page - 1) * limit;

  return {
    limit,
    skip,
  };
};

module.exports = paginationa;
