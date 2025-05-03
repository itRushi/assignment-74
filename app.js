require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const user = require("./routes/auth");
const customers = require("./routes/customers");
const loans = require("./routes/loans");
const repayments = require("./routes/repayments");

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/user", user);
app.use("/api/customers", customers);
app.use("/api/loans", loans);
app.use("/api/repayments", repayments);

const db = process.env.MONGODB_URI;
const port = process.env.PORT || 2026;

mongoose
  .set("strictQuery", true)
  .connect(db)
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

app.listen(port, () => console.log(`Server up and running on port ${port}!`));
