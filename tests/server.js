const { Server, Client } = require('mock-socket.io');

const io = new Server();

io.on('connect', socket => {
  socket.on('get', (request, cb) => {
    cb(getResponse(request));
  });
  socket.on('post', (request, cb) => {
    cb(getResponse(request));
  });
  socket.on('put', (request, cb) => {
    cb(getResponse(request));
  });
  socket.on('delete', (request, cb) => {
    cb(getResponse(request));
  });
  socket.on('head', (request, cb) => {
    cb(getResponse(request));
  });
  socket.on('patch', (request, cb) => {
    cb(getResponse(request));
  });
  socket.on('options', (request, cb) => {
    cb(getResponse(request));
  });
});

function getResponse(request) {
  const { method, data, params } = request;
  let response;
  switch (request.url) {
    case 'success':
      response = { statusCode: 200, body: { method, data: data || params } };
      break;
    case 'error':
      response = { statusCode: 500, body: 'ERROR' };
      break;
    case 'json-error':
      response = '{json: err}';
      break;
    case 'empty':
      response = {};
      break;
    default:
      response = { statusCode: 404 };
      break;
  }
  return response;
}

module.exports.MockClient = Client;
module.exports.MockServer = io;
