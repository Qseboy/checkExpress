const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const homeRoutes = require("./routes/home")
const addRoutes = require("./routes/add")
const coursesRoutes = require("./routes/courses")
const cardRoutes = require("./routes/card")
const app = express()

//connect hbs - handlebars
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "views")

//connect folder with static files(image, css and other)
app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({
    extended: true
}))

//use prefix in routes 
app.use("/", homeRoutes)
app.use("/add", addRoutes)
app.use("/courses", coursesRoutes)
app.use("/card", cardRoutes)


//Start app, connect to bd mongo
async function start() {
    try {
        const url = "mongodb+srv://qseboy:883ixlGt74X2w9kz@cluster0.ahlfkj9.mongodb.net/shop"
        await mongoose.connect(url, {useNewUrlParser: true})
    
        //dynamically set port for app 
        const PORT = process.env.PORT || 3000; 
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch(e) {
        console.log(e)
    }
}
start()


