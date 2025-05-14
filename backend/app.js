import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: '*',
    credentials: true
}))

app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({extended: true, limit: "50mb"}))
app.use(express.static("public"))

// Routes import
import healthcheckRouter from "./routes/healthcheck.routes.js"
import userRouter from "./routes/user.routes.js"

// Routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)

export {app}