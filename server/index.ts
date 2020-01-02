import Express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import morganBody from "morgan-body";

import { env } from "./EnvVariables";
import finishedOrders from "./data/finishedOrders.json";
import orderProducts from "./data/orderProducts.json";
import unfinishedOrders from "./data/unfinishedOrders.json";

const FAKE_DB = {
  finishedOrders,
  unfinishedOrders,
};

const app = Express();

app.use(morgan("combined"));
if (env.NODE_ENV === "development") {
  morganBody(app);
}

app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

// Setup CORS
const originsWhitelist = ["http://localhost:4200"];
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    callback(null, originsWhitelist.includes(origin!));
  },
};
app.use(cors(corsOptions));

app.get("/finished-orders", (_req, res) => {
  return res.json(FAKE_DB.finishedOrders);
});

app.post("/finished-orders", (req, res) => {
  FAKE_DB.finishedOrders = [
    ...FAKE_DB.finishedOrders,
    req.body,
  ];
  return res.json(FAKE_DB.finishedOrders);
});
app.get("/unfinished-orders", (_req, res) => {
  return res.json(FAKE_DB.unfinishedOrders);
});
app.get("/order-products", (req, res) => {
  const order = orderProducts[req.query.id];
  return res.json(order);
});

// tslint:disable-next-line:no-console
app.listen(env.HTTP_PORT, () => console.log(`🙉 Application listening on port ${env.HTTP_PORT}!`));
