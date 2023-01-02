// Add Express
const express = require("express");
const dotenv = require("dotenv").config();

// Initialize Express
const app = express();
const cors = require("cors");
app.use(cors());

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.DB_URL);

// Create GET request
app.get("/", (req, res) => {
  res.send("Node Server is Running...");
});

app.get("/api/v1/projectsdata", async function (req, res) {
    try {
        const connection = await client.connect();
        const db = connection.db("portfolio");

		const projectsData = await db.collection("projects").find({}).toArray();
        const skillsData = await db.collection("skills").find({}).toArray();
        const achievementsData = await db.collection("achievements").find({}).toArray()
		
		let portfolioData = [];
		portfolioData.push(projectsData, skillsData, achievementsData);

		res.json(portfolioData);
        await connection.close();
    } catch (error) {
        console.log(error);
    }
});

// Initialize server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Node Server is listening at 5000`);
});

module.exports = app;
