require("dotenv").config();
const app = require("express")();
const PORT = process.env.PORT;
const router = require("./routes/routes");
app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server start's at ${PORT}`);
});
