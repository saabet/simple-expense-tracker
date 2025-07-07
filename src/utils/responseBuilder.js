const response_success = (h, message, data = {}, code = 200) =>
  h.response({ status: 'success', message, data }).code(code);

const response_fail = (h, message, code = 400) =>
  h.response({ status: 'fail', message }).code(code);

const response_error = (h, message = 'Internal server error', code = 500) =>
  h.response({ status: 'error', message }).code(code);

module.exports = { response_success, response_fail, response_error };
