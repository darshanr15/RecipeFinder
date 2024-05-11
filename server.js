const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const uri = "mongodb://localhost:27017";
const dbname = "iplab";

async function connect() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbname);
    const Recipes = db.collection("Recipes");

    app.post("/api/recipes/search", async (req, res) => {
      try {
        const { term } = req.body;
        const regex = new RegExp(term, "i");
        // Search for recipes by name containing the search term
        const matchedRecipes = await Recipes.find({ name: regex }).toArray();
        res.json(matchedRecipes);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
connect();
