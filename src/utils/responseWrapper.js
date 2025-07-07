const wrapHandler = (handler) => async (request, h) => {
  try {
    return await handler(request, h);
  } catch (err) {
    console.error('Error:', err.message);
    return h.response({ message: 'Internal Server Error' }).code(500);
  }
};

module.exports = { wrapHandler };
