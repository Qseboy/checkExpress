const {Router} = require("express")
const router = Router()
const Users = require("../models/users")

router.get("/", (req, res) => {
    res.render("singup", {
        title: "Регистрация",
        isSingUp: true
    })
})

router.post("/", async (req, res) => {
    const users = new Users({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password 
    })

    //Проверка на мыло
    const userEmail = req.body.email
    const checkUserEmail = await Users.findOne({email: userEmail})

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