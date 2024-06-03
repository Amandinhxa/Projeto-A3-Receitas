const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = 3000;
const cors = require("cors");
const corsOptions = {
  origin: "*",
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

// Rotas para usuários
app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

// Rotas para receitas
app.get("/recipes", db.getRecipes);
app.get("/recipes/:id", db.getRecipeById);
app.post("/recipes", db.createRecipe);
app.put("/recipes/:id", db.updateRecipe);
app.delete("/recipes/:id", db.deleteRecipe);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
