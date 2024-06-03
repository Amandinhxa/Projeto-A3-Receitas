const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "receitinhas",
  password: "root",
  port: 5432,
});
const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { username, email, password } = request.body;

  const createdAt = new Date();
  const updatedAt = new Date();

  pool.query(
    "INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [username, email, password, createdAt, updatedAt],
    (error, results) => {
      if (error) {
        response.status(500).json({ error: error.message });
        return;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { username, email, password } = request.body;

  const updatedAt = new Date();

  pool.query(
    "UPDATE users SET username = $1, email = $2, password = $3, updated_at = $4 WHERE id = $5",
    [username, email, password, updatedAt, id],
    (error, results) => {
      if (error) {
        response.status(500).json({ error: error.message });
        return;
      }
      if (results.rowCount === 0) {
        response.status(404).send(`User not found with ID: ${id}`);
      } else {
        response.status(200).send(`User modified with ID: ${id}`);
      }
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

const getRecipes = (request, response) => {
  pool.query("SELECT recipes.*, users.username FROM recipes inner join users on recipes.author_id = users.id ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getRecipeById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM recipes WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createRecipe = (request, response) => {
  const { title, description, ingredients, steps, authorId } = request.body;

  const createdAt = new Date();
  const updatedAt = new Date();

  pool.query(
    "INSERT INTO recipes (title, description, ingredients, steps, author_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
    [title, description, ingredients, steps, authorId, createdAt, updatedAt],
    (error, results) => {
      if (error) {
        response.status(500).json({ error: error.message });
        return;
      }
      response.status(201).send(`Recipe added with ID: ${results.rows[0].id}`);
    }
  );
};

const updateRecipe = (request, response) => {
  const id = parseInt(request.params.id);
  const { title, description, ingredients, steps, authorId } = request.body;

  const updatedAt = new Date();

  pool.query(
    "UPDATE recipes SET title = $1, description = $2, ingredients = $3, steps = $4, author_id = $5, updated_at = $6 WHERE id = $7",
    [title, description, ingredients, steps, authorId, updatedAt, id],
    (error, results) => {
      if (error) {
        response.status(500).json({ error: error.message });
        return;
      }
      if (results.rowCount === 0) {
        response.status(404).send(`Recipe not found with ID: ${id}`);
      } else {
        response.status(200).send(`Recipe modified with ID: ${id}`);
      }
    }
  );
};

const deleteRecipe = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM recipes WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Recipe deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
