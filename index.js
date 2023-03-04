import express from "express";
import * as kucoin from "bdtask-bsbot-api";
import * as _binance from "bsbotbinanceapi";
import * as _binanceUS from "bsbotbinanceusa";
import { auth } from "./Auth.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("", async (req, res) => {
  res.send({ status: "success", msg: "Server started" });
});

app.post("/api/binance/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost");
  if (req.body.hasOwnProperty("userId")) {
    let authData = auth.checkAuth(req.body.postData);
    if (authData.status != "success") {
      return res.send(authData);
    }
  }

  const sbot = new _binance.Sbot();
  try {
    let responseData = await sbot[req.body.method](req.body.postData);
    return res.send(responseData);
  } catch (error) {
    return res.send({ status: "failed", msg: error.message });
  }
});

app.post("/api/kucoin/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost");
  if (req.body.hasOwnProperty("userId")) {
    let authData = auth.checkAuth(req.body.postData);
    if (authData.status != "success") {
      return res.send(authData);
    }
  }

  const sbot = new kucoin.Sbot();
  try {
    let responseData = await sbot[req.body.method](req.body.postData);
    return res.send(responseData);
  } catch (error) {
    return res.send({ status: "failed", msg: error.message });
  }
});

app.post("/api/binanceUS/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost");
  if (req.body.hasOwnProperty("userId")) {
    let authData = auth.checkAuth(req.body.postData);
    if (authData.status != "success") {
      return res.send(authData);
    }
  }

  const sbot = new _binanceUS.Sbot();
  try {
    let responseData = await sbot[req.body.method](req.body.postData);
    return res.send(responseData);
  } catch (error) {
    return res.send({ status: "failed", msg: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server Running on Port: ${port}`);
});
