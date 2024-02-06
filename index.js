import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//setting view engine to ejs
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const randomActivity = response.data
    res.render("index.ejs", { activity: randomActivity });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/filter?type=" + req.body.type + "&participants=" + req.body.participants);
    const randomActivity = response.data[Math.floor(Math.random() * response.data.length)];
    res.render("index.ejs", { activity: randomActivity });

  }
  catch (error) {
    console.error("Failed to make POST request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
