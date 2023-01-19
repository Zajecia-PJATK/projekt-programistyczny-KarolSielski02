const express = require("express");
const app = express();

app.use('/', express.static(__dirname, +'/js'));
app.use('/Styles', express.static(__dirname, +'/css'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.use("/node_modules", express.static('./node_modules/'));


app.listen(8080, function () {
    console.log("Server is running on localhost:8080")
});
app.use(express.static('public'))