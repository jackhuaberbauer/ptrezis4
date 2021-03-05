var rp = require("request-promise");
var cheerio = require("cheerio");
var iconv = require("iconv-lite");

const PLATTENTESTS_URL = "http://plattentests.de/archiv.php?sort=release";
const REZICACHE = [];

/**
 * 
 * @param {number} amount 
 * @param {number} skip 
 */
exports.getLatestReziIds = async function (amount, skip = 0) {
  const body = await rp(PLATTENTESTS_URL);
  const $ = cheerio.load(body);
  var $links = $("#archivliste a");
  var links = $links.toArray().filter((link) => {
    return (
      link.attribs.href != undefined &&
      link.attribs.href != "rezi.php?show=6500"
    );
  });
  return links.slice(skip, skip + amount).map((link) => {
    return parseInt(link.attribs.href.replace("rezi.php?show=", ""));
  });
};

/**
 * 
 * @param {string} Date in the format dd.MM.yyyy
 */
exports.getRezisForDate = async function(date) {
  const body = await rp(PLATTENTESTS_URL);
  const $ = cheerio.load(body);
  var $links = $(`h4:contains('${date}') + ul a`)
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
  reziObj.datevalue = date.getTime();
  reziObj["_id"] = reziObj.url;

  REZICACHE[reziId] = reziObj;

  return reziObj;
};

exports.isCurrentRezi = async function (reziId) {
  const body = await rp(PLATTENTESTS_URL);
  var $ = cheerio.load(body);
  var $links = $(".neuerezis a");
  var links = $links.toArray().filter(link => {return link.attribs && link.attribs.href.includes(reziId)})
  return links.length > 0;
};

var parseDate = function (input, format) {
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
