const { createServer: createHttpsServer } = require("https");
const next = require("next");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const hostname = dev ? "joinpickup.dev" : "localhost";
const PORT = process.env.PORT || 3000;
const app = next({ dev, port: PORT, hostname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createHttpsServer(
      {
        key: fs.readFileSync("./certs/joinpickup-dev.key"),
        cert: fs.readFileSync("./certs/joinpickup-dev.cert"),
      },
      (req, res) => handle(req, res)
    );

    return server.listen(PORT, (err) => {
      if (err) throw err;

      console.log("> Ready on https://joinpickup.dev");
    });
  })
  .catch((err) => {
    console.error(err);
  });
