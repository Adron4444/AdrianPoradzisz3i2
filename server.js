const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000; // bardzo istotna linijka - port zostaje przydzielony przez Heroku

app.get("/", function (req, res) {
    res.send("<h1>Adrian Poradzisz 3i2a HerokuApp!</h1>")
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
