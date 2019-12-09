const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./FinalDatabase.db");

const session = require("express-session");

// Enable foreign key support
db.get("PRAGMA foreign_keys = ON");

const app = express();
const port = process.env.PORT || 4000;

app.use("/static", express.static("public"));
app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    secret: process.env.SECRET,
    saveUninitialized: false,
    cookie: {
      httpOnly: true
    }
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

app.get("/country/:id", (req, res) => {
  let countryId = req.params.id;
  let countryInfo = [];

  // SQL command to get name of country in question
  let sql1 = "SELECT Name, Image FROM countries WHERE id = ?";
  db.get(sql1, [countryId], (err, data) => {
    if (err) throw err;
    // Add the name to data to be sent back
    countryInfo.push(data);

    // SQL command to get important snapshot information and articles about country
    let sql2 = `SELECT
                    snapshots.Population AS population,
                    snapshots.GDP AS GDP,
                    snapshots.LifeExpectancyAtBirth AS lifeExp,
                    snapshots.SchoolEnrollmentprimary AS enrollment,
                    snapshots.ChildLaborPercent AS cLabor,
                    snapshots.AgeMin AS minAge,
                    snapshots.AgeMax AS maxAge,
                    articles.title AS articleTitle,
                    articles.timeframe AS timeframe,
                    articles.id AS articleId,
                    articles.reading_level AS readingLevel,
					articles.sentiment AS sentiment,
					articles.subjectivity AS subjectivity
                    FROM snapshots JOIN articles
                    ON snapshots.Timeframe = articles.timeframe
                    WHERE articles.countryId = ?
                    AND snapshots.CountryID = ?
                    ORDER BY snapshots.Timeframe ASC`;

    // Get and send data response
    db.all(sql2, [countryId, countryId], (err, data) => {
      if (err) throw err;
      countryInfo.push(data);
      res.json(countryInfo);
    });
  });
});

app.get("/article/:id", (req, res) => {
  let articleId = req.params.id;

  // SQL command to get article info and country map
  let sql = `SELECT articles.title AS title,
                articles.countryId AS countryId,
                articles.sentiment AS sentiment,
                articles.subjectivity AS subjectivity,
                articles.reading_level AS readingLevel,
                articles.avg_sent_len AS avgSentLen,
                articles.avg_word_len AS avgWordLen,
                articles.num_chars AS numChars,
                articles.num_words AS numWords,
                articles.num_sents AS numSents,
                countries.Name AS articleCountry,
                countries.Image AS countryImage,
                articles.abstract AS abstract,
                articles.link AS link
                FROM articles JOIN countries
                ON articles.countryId = countries.Id
                WHERE articles.id = ?`;

  // Get and send data response
  db.get(sql, [articleId], (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

db.on("trace", console.log);
