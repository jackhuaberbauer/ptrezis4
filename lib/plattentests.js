var rp = require("request-promise");
var cheerio = require("cheerio");
var iconv = require("iconv-lite");

const PLATTENTESTS_URL = "http://plattentests.de/archiv.php?sort=release";

const REZICACHE = [];

var bodycache = undefined;

/**
 * 
 * @param {string} Date in the format dd.MM.yyyy
 */
exports.getRezisForDate = async function(date) {
  return await getRezis(`h4:contains('${date}') + ul a`);
}

exports.getCurrentRezis = async function() {
  return await getRezis(".neuerezis a");
}

exports.getReziDetails = async function (reziId) {
  if (REZICACHE[reziId]) {
    console.log(`Take rezi '${reziId}' from Cache`);
    return REZICACHE[reziId];
  }

  console.log(`Parse rezi '${reziId}'`);
  const url = "http://plattentests.de/rezi.php?show=" + reziId;
  var body = await rp({
    uri: url,
    method: "GET",
    encoding: null,
  });
  body = iconv.decode(body, "iso-8859-1");

  const reziObj = {};
  var $ = cheerio.load(body);
  reziObj.url = url;
  reziObj.title = $("title")
    .text()
    .replace("Plattentests.de-Rezension", "")
    .replace("•", "")
    .trim();
  reziObj.rating = $('strong:contains("/10")')
    .first()
    .text()
    .replace("/10", "");
  var references = $("#reziref").text().replace("Referenzen", "").substring(2);
  var refarray = references.split(";");
  for (var i = 0; i < refarray.length; i++) {
    refarray[i] = refarray[i].trim();
  }

  reziObj.references = refarray.join("; ");
  var datestring = $('p:contains("VÖ: ")')
    .first()
    .html()
    .split("<br>")[1]
    .replace("V&#xD6;:", "")
    .trim();
  var date = parseDate(datestring, "dd.mm.yyyy");
  reziObj.datestring = datestring.replace('VÖ: ', '')
  reziObj.datevalue = date.getTime();
  reziObj["_id"] = reziObj.url;

  REZICACHE[reziId] = reziObj;

  return reziObj;
};

const parseDate = function (input, format) {
  format = format || "yyyy-mm-dd"; // default format
  var parts = input.match(/(\d+)/g),
    i = 0,
    fmt = {};
  // extract date-part indexes from the format
  format.replace(/(yyyy|dd|mm)/g, function (part) {
    fmt[part] = i++;
  });

  return new Date(parts[fmt["yyyy"]], parts[fmt["mm"]] - 1, parts[fmt["dd"]]);
};

const getRezis = async function(anchorSelector) {
  var body = undefined
  if (bodycache) {
    console.log("Take  plattentests list from cache")
    body = bodycache;
  } else {
    console.log("Fetch plattentests list")
    body = await rp(PLATTENTESTS_URL);
    bodycache = body;
  }
  const $ = cheerio.load(body);
  var $links = $(anchorSelector)
  var links = $links.toArray().filter((link) => {
    return (
      link.attribs.href != undefined &&
      link.attribs.href != "rezi.php?show=6500"
    );
  });
  return links.map((link) => {
    return parseInt(link.attribs.href.replace("rezi.php?show=", ""));
  });
}