const express = require("express");
const { Router } = express;
const router = express.Router();
const { users } = require("../db/models/user");
const db = require("../config/database");
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')
//Middleware
// const { hashSync } = require ('bcrypt')
// const bcrypt = require ('bcrypt')
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

//Update user info
router.put('/:id', async (req, res) => {

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





module.exports = router;
