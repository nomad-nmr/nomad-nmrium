// server/index.js

const express = require("express");
const cors = require('cors');
const fs = require('fs');
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors());

//Reads file from filesystem and returns a JSON string;
const fileread = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8", function (err) {
      if (err) { throw err }
      res.status(200).json({
        message: "File successfully read"
      })
    })
    return JSON.parse(data);
  }
  catch (error) {
    res.status(400).json({ message: "Failed to read file" });
    console.error(error.message);
  }
}

//Static paths to json files however would use router with request header.
app.get("/1", (req, res) => {
  const data1 = fileread("./data/1.json");
  console.log(data1);
  res.json(data1);
});

app.get("/2", (req, res) => {
  const data2 = fileread("./data/2.json");
  res.json(data2);
});

app.get("/3", (req, res) => {
  const data3 = fileread("./data/3.json");
  res.json(data3);
});

//save endpoint
//uses static path so saving only updates for spectra 2
app.post("/save", (req, res) => {
  try {
    //take the id from the header to determine path
    filePath = "data/2.json";
    const data = JSON.stringify(req.body);
    fs.writeFile(filePath, data, function (err) {
      if (err) { throw err }
      res.status(200).json({
        message: "File successfully written"
      })
    })
  }
  catch (error) {
    res.status(400).json({ message: "Failed to write file" });
    console.error(error.message);
  }

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
