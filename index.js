// server.js
const express = require("express");
const MongoDB = require("./db");
const userRoutes = require("./routes/userRoute");
const display = require("./routes/DisplayRouter");
const order = require("./routes/OrderRouter");
const location = require("./routes/Location");
MongoDB();
const cors = require("cors"); // Import CORS middleware

const app = express();
const PORT = process.env.PORT || 5000;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-orgin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, COntent-Type, Accept"
  );
  next();
});
app.use(
  cors({
    origin: ["http://localhost:3000", "https://mern-app-log.onrender.com"],
  })
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", display);
app.use("/api", order);
app.use("/api", location);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
