const express = require("express");
const io = require("socket.io")
const app = express();
const PORT = 8000;


app.use(express.urlencoded({ extended: false }));
app.use(express.raw());
app.use(express.text());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hi from '/' from the server")
})


app.listen(PORT, () => console.log("Server is running!!"))