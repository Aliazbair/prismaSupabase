const express = require("express");
// init express
const app = express();

app.use(express.json());

// setup route

app.use("/users", require("./routes/user"));
app.use("/posts", require("./routes/post"));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
