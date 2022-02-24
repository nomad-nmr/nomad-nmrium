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

const fileread = (filePath) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return data;
}     

app.get("/", (req, res) => {
  res.json({ message: "Hello from WWW!" });
});

// const data1 = require("../data/1.json");
// const data2 = require("../data/2.json");
// const data3 = require("../data/3.json");

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

app.post("/save", (req,res) => {
  try{
  filePath = "data/2.json";
  //const response = req
  const data = JSON.stringify(req.body);
  //console.log("CONSOLE LOG DATA "+ data);
  fs.writeFile(filePath, data, function(err) {
		if (err) { throw err }
		res.status(200).json({
			message: "File successfully written"
		})
    })
  }
 catch (error) {
   res.status(400).json({message: "Failed"});
  console.error(error.message);
 }

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
