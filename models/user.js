const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            //количество товара
            count: {
                type: Number,
                required: true,
                default: 1
            },
            //референция к курсу, связка с таблицей Course
            courseId: {
                type: Schema.Types.ObjectId,
                ref: "Course",
                required: true
            }
        }]
    }
})
userSchema.methods.addToCart = function(course) {
    const items = [...this.cart.items]
    const idx = items.findIndex(c => {
        console.log(c)
        return c.courseId.toString() === course._id.toString()
    })

    if (idx >= 0) {
        items[idx].count = items[idx].count + 1
    } else {
        items.push({
            courseId: course._id,
            count: 1
        })
    }

    this.cart = {items}
    return this.save()
}

module.exports = model("User", userSchema)