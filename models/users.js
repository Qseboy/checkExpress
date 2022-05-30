const {Schema, model} = require("mongoose")

const users = new Schema({
    name: {
        type: String,
        required: true // если поле обязательное для заполнения
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true //Уникальное значение 
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = model("Users", users)