require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const emailRouter = require("./routes/router");

const port = 8100;

app.use(express.json());
app.use(cors());
app.use(emailRouter);

app.get("/", (req, res) => {
    res.send("Book-Shelf server is running");
});

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
