const {Router} = require("express");
const res = require("express/lib/response");
const router = Router()
const UsersTest = require("../models/usersTest")

router.get("/", async (req, res) => {
    const users = await UsersTest.find();
    res.render("singupTest", {
        title: "Регистрация",
        isSingUp: true,
        users
    })
})

//Вывод пользователей 
router.get("/allUsersTest", async (req, res) => {
    const users = await UsersTest.find();
    res.render("allUsersTest", {
        title: "Список пользователей",
        users
    })
})

//удаление пользователя
router.post("/allUsersTest", async (req, res) => {
    try {
        await UsersTest.deleteOne({_id: req.body.id})
        const users = await UsersTest.find();
        res.render("allUsersTest", {
            title: "Список пользователей",
            users
        })
    } catch(e) {
        console.log(e)
    }
})

router.post("/", async (req, res) => {
    const users = new UsersTest({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password 
    })

    //Проверка на мыло
    const userEmail = req.body.email
    const checkUserEmail = await UsersTest.findOne({email: userEmail})

    if(checkUserEmail) {
        console.log("Такой имейл существует, 409")
    } else {
        try {
            await users.save()
            res.redirect("/")
        } catch(e) {
            console.log(e)
        }
    }
})

module.exports = router