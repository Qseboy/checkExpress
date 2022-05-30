const {Router} = require("express")
const router = Router()


router.get("/", (req, res) => {
    res.render("singup", {
        title: "Регистрация",
        isSingUp: true
    })
})


module.exports = router