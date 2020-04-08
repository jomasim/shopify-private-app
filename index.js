import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
app.use(bodyParser.json());
dotenv.config();

const auth = Buffer.from(
  process.env.SHOPIFY_API_KEY + ":" + process.env.ACCESS_TOKEN
).toString("base64");

const shopRequestUrl =  "https://crimstonstore.myshopify.com/admin/api/2020-04/products.json"

const shopRequestHeaders = {
  "X-Shopify-Access-Token": process.env.ACCESS_TOKEN,
  Authorization: "Basic " + auth
};

app.get("/", (req, res) => {
  res.status(200).send("Welcome to amazing shop");
});
app.get("/products", (req, res) => {
  return axios
    .get(shopRequestUrl, { headers: shopRequestHeaders })
    .then(shopResponse => {
      res.status(200).send(shopResponse.data);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});
app.post("/products", (req, res) => {
  const post_data = req.body || {};
  axios
    .post(shopRequestUrl, post_data, { headers: shopRequestHeaders })
    .then(shopResponse => {
      res.status(201).send(shopResponse.data);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
