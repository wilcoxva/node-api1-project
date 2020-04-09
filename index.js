const express = require("express")
const db = require("./database.js")

const server = express()

server.use(express.json())

server.post("/users", (req, res) => {
    if (!req.body,name || !req.body.bio) {
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user.",
        })
    }
    const newUser = db.createUser({
        name: req.body.name,
    })

    res.status(201).json(newUser)

    return newUser;
})

server.get("/api/users", (req, res) => {
    const users = db.getUsers()
    res.json(users)
})

server.get("/api/users/:id", (req, res) => {
    const userId = req.params.id
    const user = db.getUserById(userId)

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: "User not found"
        })
    }
})

server.delete("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        db.deleteUser(user.id)
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
        })
    }



})

server.put("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name || user.name,
        })

        res.json(updatedUser)
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
        })
    }
})

server.listen(8080, () => {
    console.log("server started at port 8080")
})