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
    console.log(req);

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
                    articles.title AS articleTitle,
                    articles.timeframe AS timeframe,
                    articles.id AS articleId
                    FROM snapshots JOIN articles
                    ON snapshots.Timeframe = articles.timeframe
                    WHERE articles.countryId = ?
                    AND snapshots.CountryID = ?`;

        // Get and send data response
        db.all(sql2, [countryId, countryId], (err, data) => {
            if (err) throw err;
            countryInfo.push(data);
            res.json(countryInfo);
        });
    });
});



app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

db.on("trace", console.log);
