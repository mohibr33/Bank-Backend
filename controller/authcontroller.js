const connection = require("../config/db"); 
const { generateToken } = require('../utils/jwt');

const signup = (req, res) => {
    const { email, password, firstname, lastname } = req.body;

    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json("All fields are required");
    }

    const query = `INSERT INTO staff (email, password, firstname, lastname) VALUES (?,?,?,?)`;
    connection.query(query, [email, password, firstname, lastname], (err, result) => {
        if (err) {
            console.error("Database error:", err);  
            return res.status(500).json("Server Error 500");
        }

        const user = {
            id: result.insertId,
            email: email,
        };

        const token = generateToken(user);

        return res.status(200).json({
            message: "User has successfully signed up",
            token: token
        });
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const query = `SELECT * FROM staff WHERE email = ? AND password = ?`;
    connection.query(query, [email, password], (err, result) => {
        if (err) {
            console.error("Database error:", err);  // Log error for debugging
            return res.status(500).json({ message: "Login failed" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        res.status(200).json({
            message: "Login successful",
        });
    });
};

module.exports = {
    signup,
    login
};
