const express = require("express");
const mongoose = require("mongoose");

const { MONGOURI } = require("./keys")

const User = require("./models/User")

const app = express();

const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/post")
const userRoutes = require("./routes/user")


mongoose.connect(MONGOURI , { useNewUrlParser: true , useUnifiedTopology: true }).then(() => {
    console.log("Database Connected")
})

.catch(() => {
    console.log("Database Is Not Connected")
})

app.use(express.json())

app.use("/api" , authRoutes)
app.use("/api" , postRoutes)

app.use("/api" , userRoutes)


const PORT = 8000;
app.listen(PORT , () => {
    console.log(`Server Is Running On Port ${PORT}`)
})