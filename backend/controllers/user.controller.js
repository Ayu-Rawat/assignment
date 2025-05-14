import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import sql from "../db/db.js"

const signup = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            throw new ApiError(400, "Bad Request", "Username and password are required")
        }

        const query = `SELECT * FROM user WHERE username = $1`
        const values = [username]
        const existingUser = await sql.query(query, values)
        
        if (existingUser.length > 0) {
            throw new ApiError(409, "Conflict", "Username already exists")
        }
        const insertQuery = `INSERT INTO user (username, password) VALUES ($1, $2)`
        const insertValues = [username, password]
        const result = await sql.query(insertQuery, insertValues)
        res.status(201).json(new ApiResponse(201, "User created successfully", result))
    } catch (error) {
        console.log(error.stack);
        console.log(error.message);
        console.log(error);
        throw new ApiError(500, "Internal Server Error", error.message)
    }
})

const login = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            throw new ApiError(400, "Bad Request", "Username and password are required")
        }
        const query = `SELECT * FROM user WHERE username = $1 AND password = $2`
        const values = [username, password]
        const result = await sql.query(query, values)
        if (result.length === 0) {
            throw new ApiError(401, "Unauthorized", "Invalid username or password")
        }

        res.status(200).json(new ApiResponse(200, "Login successful", result))
    } catch (error) {
        console.error(error.stack);
        throw new ApiError(500, "Internal Server Error", error.message)
    }
})



export {
    signup,
    login,
}
    