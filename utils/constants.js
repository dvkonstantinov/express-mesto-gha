const { SECRET_KEY } = process.env;

const URL_REGEX = /^(https?):\/\/(w{3}\.)?([A-Za-z0-9\-.]*)\/?(([A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]*)?)#?/i;

module.exports = {
  SECRET_KEY,
  URL_REGEX,
};