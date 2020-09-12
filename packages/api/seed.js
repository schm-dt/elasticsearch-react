const elasticsearch = require("elasticsearch");

const {
  createParticipants,
  createCustomers,
  createReports
} = require("./mock-data");

const es = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace",
  apiVersion: "7.4"
});

const participants = createParticipants(1000);
const customers = createCustomers(1000);
const reports = createReports(1000);

const indices = ["participant", "customer", "report"];

(async () => {
  await Promise.all(
    indices.map(async index =>
      !(await es.indices.exists({ index }))
        ? es.indices.create({ index })
        : Promise.resolve()
    )
  );

  await es.bulk({
    body: [...participants, ...customers, ...reports].reduce(
      (acc, document) => [
        ...acc,
        { index: { _index: n.type, _type: n.type, _id: n.id } },
        document
      ],
      []
    )
  });
})();
