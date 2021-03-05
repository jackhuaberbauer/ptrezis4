var express = require("express");
var pt = require("./lib/plattentests");
var app = express();
const port = process.env.port || 1337;
app.use(express.static(__dirname + "/public"));
// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));


app.get("/rezis", async (req, res) => {
  if (!req.query.date) {res.json("no date given"); return;}
  const date = req.query.date

  console.log(`Query rezis (date: ${date})`)
  Number.parseInt()
  var reziIds = await pt.getRezisForDate(date);
  const rezis = [];
  for (const reziId of reziIds) {
    rezis.push(await pt.getReziDetails(reziId))
  }
  res.json(rezis)
});



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
