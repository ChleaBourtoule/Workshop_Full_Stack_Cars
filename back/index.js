const connection = require("./db-config");
const { setupRoutes } = require("./routes");
const cors = require("cors");
const express = require("express");
const app = express();
// utilise le package cors pour autoriser les appels extérieurs
app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT || 3000;

// se connecte à la base de données en récupérant l'objet connection (dans db-config.js)
connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log(
      "connected to database with threadId :  " + connection.threadId
    );
  }
});

app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
