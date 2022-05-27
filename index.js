const express = require("express")
const path = require("path")
const exphbs = require("express-handlebars")
const homeRoutes = require("./routes/home")
const addRoutes = require("./routes/add")
const coursesRoutes = require("./routes/courses")
const cardRoutes = require("./routes/card")
const app = express()

//connect hbs - handlebars
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
})

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "views")

//connect folder with static files(image, css and other)
app.use(express.static("public"))

app.use(express.urlencoded({
    extended: true
}))

//use prefix in routes 
app.use("/", homeRoutes)
app.use("/add", addRoutes)
app.use("/courses", coursesRoutes)
app.use("/card", cardRoutes)

//dynamically set port for app 
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
