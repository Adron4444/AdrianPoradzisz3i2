const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000; // bardzo istotna linijka - port zostaje przydzielony przez Heroku

const name = {imie: "Adrian", nazwisko: "Poradzisz", klasa: "3i2", grupa: "I/A"};

app.get("/", function (req, res) {
    res.send("<h1>Adrian Poradzisz 3i2a HerokuApp!</h1>");
});

app.get("/data", function (req, res) {
    res.send(name);
});
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
});
