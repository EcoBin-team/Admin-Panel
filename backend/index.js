require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const supabaseConnect = require("./supabase/Supabase_Connect");
//routes
const userRouter = require("./routes/routerUser")
const codeRouter = require("./routes/codeRouter")
const depotRouter = require("./routes/depotRouter")
const feedRouter = require("./routes/feedsRouter")


app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.supabase = supabaseConnect;
  next();
});


  
  app.use("/users", userRouter)
  app.use("/codes", codeRouter)
  app.use("/depots", depotRouter)
  app.use("/", feedRouter)

app.listen(5000, () => {
  console.log('> Ready on http://localhost:5000');
});