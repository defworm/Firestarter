<<<<<<< HEAD
const express = require("express");
const { Router } = express;
const router = express.Router();
const { users } = require("../db/models/user");
const db = require("../config/database");
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')
=======
require("dotenv").config();
const router = require("express").Router();

// this is the connection to the database
const pool = require("../db")

>>>>>>> a2ad0cba9b18f9e70bccd9933aa216a64266aec4
//Middleware
const bcrypt = require("bcrypt");
const jwt = require("json-web-token");
// const { hashSync } = require ('bcrypt')
// const cookie = require('cookie')
const { User } = db
//Use this path to test your connection in Postman localhost:3001/user
router.get("/", (req, res) => {
    res.send("router is working");
});

//The below path is .../user/health
router.get("/health", async (req, res) => {
    res.send({
        statusCode: 200,
        message: "router is healthy",
    });
});

<<<<<<< HEAD
router.get("/users", async (req, res) => {
    try {
        // Use the findAll() function to fetch all users
        const users = await users.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error getting users" });
    }
});

//addUser
router.post('/profile', async (req, res) => {
    // const hashedPassword = bcrypt.hashSync(password);
    let { username, firstname, lastname, email, hashedPassword } = req.body;
    const user = User.create({
        userrole: "Customer",
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        passwordDigest: await bcrypt.hash(hashedPassword, 10)
    })
    res.json(user)
})

//Find users
router.get('/findusers', async (req, res) => {
    const find = Users.findOne({ attributes: ["username", "firstname", "lastname"], where: { email: req.query.email }, paranoid: false })
    if (find) {
        return res.status(200).json({ success: true, data: users });
    }
    else
        res.status(500).json({ 'success': false });

})
=======
// The below route is working 1/5/23 TS
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    res.json(user.rows[0]);
    console.log(`user.rows[0] = ${user.rows[0]}`);
  } catch (err) {
    console.error(`user/:id err.message = ${err.message}`);
  }
});

//addUser // This is working but we need to add password auth to it
router.post("/createuser", async (req, res) => {
  // const hashedpassword = bcrypt.hashSync(password);
 
  // let passwordDigest = await bcrypt.hash(passwordDigest, 10);

  try {
    // Input from form should be in JSON format with double quotes
    const { username, firstname, lastname, email, passwordDigest } = req.body;
    await pool.query(
      `INSERT INTO users (username, firstname, lastname, email, "passwordDigest") VALUES($1, $2, $3, $4, $5)`,
      [username, firstname, lastname, email, passwordDigest]
    );
    res.json("New user created");
    // res.redirect("/products");
  } catch(err) {
    console.error(err.message + "error creating new user");
    // res.render("error404");
      // if (err && err.name == "ValidationError") {
        // let message = "Validation Error: ";
        // for (var field in err.errors) {
          // message += `${field} was ${err.errors[field].value}. `;
          // message += `${err.errors[field].message}`;
        // console.log("Validation error message", message);
        // res.render("./createuser", { message });
      // } else {
      // }
  }});

//Find all users //not working
router.get("/findusers", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers);
    console.log(`allUsers = ${allUsers}`);
  } catch (err) {
    console.error(err.message);
  }
});
>>>>>>> a2ad0cba9b18f9e70bccd9933aa216a64266aec4

//Update user info  //not working not updated
router.put("/:id", async (req, res) => {
  const { username, firstName, lastName, email, passwordDigest } = req.body;
  // let passwordHash = hashSync(password);
  User.findOne({
    where: { email: email },
    paranoid: false,
  });
  if (
    !User ||
    !(await bcrypt.compare(req.body.password, User.passwordDigest))
  ) {
    res
      .status(404)
      .json({
        message: `Could not find a User with the provided email and password`,
      });
    return User.update(
      {
        username: username ? username : User.username,
        firstName: firstName ? firstName : User.firstName,
        lastName: lastName ? lastName : User.lastName,
        passwordDigest: passwordDigest ? passwordDigest : User.passwordDigest,
      },
      { where: { email: email } }
    );
  }
});

<<<<<<< HEAD
    const { firstName, lastName, email, hashedPassword, } = req.body;
    // let passwordHash = hashSync(password);
    const user = User.findOne({
        where: { email: email }, paranoid: false
    })
    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({ message: `Could not find a user with the provided username and password` })
        return User.update({
            username: username ? username : users.username,
            firstName: firstName ? firstName : users.firstName,
            lastName: lastName ? lastName : users.lastName,
            hashedPassword: hashedPassword ? hashedPassword : user.hashedPassword,
        }, { where: { email: email } })
    }

})

    
// login in the user
router.get('/login', async (req, res) => {
    let user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.hashedpassword, user.passwordDigest)) {
        res.status(404).json({ message: `Could not find a user with the provided username and password` })
    } else {
        const result = await jwt.encode(process.env.JWT_SECRET, { id: user.userId })           
    res.json({ user: user, token: result.value })           
   }
})

//Delete user
router.delete('/:userid', async (req, res) => {
    const user = User.findOne({ where: { username: username } })
    if (user) {
        return Users.destroy({ where: { username: username } }).then(r => [r, data])
    }
    else {
        return res.status(200).json({ 'status': "Successfully deleted user" });
    }
})
=======
// login in the user // not working not updated
router.get("/login", async (req, res) => {
  const { email, passwordDigest } = req.body;
  const foundUser = await User.findOne({ email: email });
  const validity = await foundUser.compare(
    passwordDigest,
    foundUser.passwordDigest
  );

  if (foundUser) {
    if (!foundUser || !(await validity)) {
      // bcrypt.compare(passwordDigest, user.passwordDigest))
      res
        .status(404)
        .json({
          message: `Could not find a user with the provided username and password`,
        });
    } else {
      const result = await jwt.encode(process.env.JWT_SECRET, {
        id: foundUser.id,
      });
      res.json({ user: foundUser, token: result.value }).then((products) => {
        console.log(foundUser);
        res.render(`./products`), { products };
      });
    }
  }
});

//Delete user not working not updated
router.delete("/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  User.findOne({ where: { id: id } })
    .then((data) => {
      if (data) {
        return User.destroy({ where: { id: id } }).then((r) => [r, data]);
      }
      throw new RequestError("User is not found", 409);
    })
    .then((res) => {
      return res.status(200).json({ status: "Successfully deleted user" });
    })
    .catch((err) => {
      next(err);
    });
});
>>>>>>> a2ad0cba9b18f9e70bccd9933aa216a64266aec4





module.exports = router;
