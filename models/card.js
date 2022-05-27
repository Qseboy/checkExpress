const path = require("path")
const fs = require("fs")

class Card {
    static async add(course) {
        const card = await Card.fetch()

        const idx = card.courses.findIndex(c => c.id === course.id)
        const candidate = card.courses[idx]

        if (candidate) {
            //курс есть
            candidate.count++
            card.courses[idx] = candidate
        } else {
            //надо добавить
            course.count = 1
            card.courses.push(course)
        }

        card.price += +course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, "..", "data", "card.json"),
                JSON.stringify(card),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, "..", "data", "card.json"),
                "utf-8",
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }
}

module.exports = Card