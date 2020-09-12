const express = require("express");
const elasticsearch = require("elasticsearch");
const cors = require("cors");

const es = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace",
  apiVersion: "7.4"
});

const app = express();

app.use(cors());

app.get("/search", async (req, res) => {
  const result = await es.search({
    index: ["participant", "customer", "report"],
    body: {
      query: {
        multi_match: {
          fields: ["*"],
          fuzziness: "AUTO",
          query: req.query.q
        }
      }
    }
    // body: {
    //     query: {
    //         multi_match: {
    //             fields: ['*'],
    //             type: 'cross_fields',
    //             query: req.query.q,
    //         }
    //     }
    // }
  });

  res.send(result);
});

app.get("/healthcheck", (_, res) => {
  res.send("OK");
});

app.listen(9000);
