// You are welcome to drop express for any other server implementation
const express = require('express')
const server = express()
const dataStorageRouter = require('./routes/api-routes');

// The tests exercise the server by requiring it as a module,
// rather than running it in a separate process and listening on a port
module.exports = server

server.use(express.json());

server.use('/data', dataStorageRouter);

server.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

if (require.main === module) {
  // Start server only when we run this on the command line and explicitly ignore this while testing

  const port = process.env.PORT || 3000
  server.listen((port), () => {
    console.log(`App listening at http://localhost:${port}`)
  })
}
